const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

const SPECS_DRAFTS_DIR = path.join(__dirname, '..', 'specs', 'drafts');
const SPECS_SCREENS_DIR = path.join(__dirname, '..', 'specs', 'screens');
const SERVICES_DIR = path.join(__dirname, '..', 'src', 'services');
const FEATURES_DIR = path.join(__dirname, '..', 'src', 'features');

// Serve admin interface
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Get list of spec files from a specific source
app.get('/api/specs', async (req, res) => {
    try {
        const source = req.query.source || 'drafts'; // 'drafts' or 'screens'
        const specsDir = source === 'screens' ? SPECS_SCREENS_DIR : SPECS_DRAFTS_DIR;
        const files = await fs.readdir(specsDir);
        const specFiles = files.filter(f => f.endsWith('.md'));
        res.json(specFiles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const SPECS_REQUIREMENTS_DIR = path.join(__dirname, '..', 'specs', 'requirements');

// Get spec file content
app.get('/api/specs/:source/:filename', async (req, res) => {
    try {
        // We ignore source for now and always look in requirements as per new structure
        // or we could keep supporting old sources if needed, but user asked for new structure.
        // Let's prioritize requirements dir.
        const filePath = path.join(SPECS_REQUIREMENTS_DIR, req.params.filename);

        // Check if file exists
        try {
            await fs.access(filePath);
        } catch {
            // Fallback to drafts if not found in requirements (for backward compatibility during migration)
            const fallbackPath = path.join(SPECS_DRAFTS_DIR, req.params.filename);
            try {
                const content = await fs.readFile(fallbackPath, 'utf-8');
                return res.json({ content });
            } catch {
                return res.status(404).json({ error: 'Spec file not found' });
            }
        }

        const content = await fs.readFile(filePath, 'utf-8');
        res.json({ content });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Save spec file content
app.put('/api/specs/:source/:filename', async (req, res) => {
    try {
        const specsDir = req.params.source === 'screens' ? SPECS_SCREENS_DIR : SPECS_DRAFTS_DIR;
        const filePath = path.join(specsDir, req.params.filename);
        await fs.writeFile(filePath, req.body.content, 'utf-8');
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Get available services
app.get('/api/services', async (req, res) => {
    try {
        const files = await fs.readdir(SERVICES_DIR);
        const serviceFiles = files.filter(f => f.endsWith('.ts'));

        const services = await Promise.all(
            serviceFiles.map(async (file) => {
                const content = await fs.readFile(path.join(SERVICES_DIR, file), 'utf-8');
                const methods = extractMethods(content);
                return {
                    name: file.replace('.ts', ''),
                    methods
                };
            })
        );

        res.json(services);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Load registry helper
async function loadRegistry() {
    try {
        const registryPath = path.join(__dirname, '..', 'specs', 'screenRegistry.js');
        const content = await fs.readFile(registryPath, 'utf-8');
        // Hacky way to parse the JS object since we can't easily import ESM in CJS here without setup
        const jsonContent = content.replace('export const screenRegistry = ', '').replace(/;\s*$/, '');
        // We need to be careful if it's not strict JSON. 
        // Let's try to evaluate it safely or use a regex approach if it's simple.
        // Given the file content seen, it looks like valid JSON structure inside the assignment.
        return JSON.parse(jsonContent);
    } catch (error) {
        console.error('Error loading registry:', error);
        return {};
    }
}

// Get modules from registry
app.get('/api/modules', async (req, res) => {
    try {
        const registry = await loadRegistry();
        const modules = {};

        Object.values(registry).forEach(screen => {
            const moduleId = screen.module || 'other';
            if (!modules[moduleId]) {
                modules[moduleId] = {
                    id: moduleId,
                    title: screen.moduleTitle || moduleId,
                    screens: []
                };
            }
            modules[moduleId].screens.push({
                screenId: screen.screenId,
                title: screen.title,
                filename: path.basename(screen.specFile)
            });
        });

        res.json(Object.values(modules));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get flow graph data for a module from registry
app.get('/api/flow/:module', async (req, res) => {
    try {
        const registry = await loadRegistry();
        const moduleId = req.params.module;

        const nodes = [];
        const edges = [];

        Object.values(registry).forEach(screen => {
            if (screen.module === moduleId) {
                nodes.push({
                    id: screen.screenId,
                    label: screen.title || screen.screenId,
                    filename: path.basename(screen.specFile)
                });

                if (screen.transitions && Array.isArray(screen.transitions)) {
                    screen.transitions.forEach(transition => {
                        edges.push({
                            from: screen.screenId,
                            to: transition.target,
                            label: transition.label || ''
                        });
                    });
                }
            }
        });

        res.json({ nodes, edges });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Simple method extraction from service files
function extractMethods(content) {
    const methods = [];
    const methodRegex = /(\w+):\s*async\s*\([^)]*\)/g;
    let match;

    while ((match = methodRegex.exec(content)) !== null) {
        methods.push(match[1]);
    }

    return methods;
}

// Parse spec metadata from YAML frontmatter
function parseSpecMetadata(content) {
    const frontmatterRegex = /^---\n([\s\S]*?)\n---/;
    const match = content.match(frontmatterRegex);

    if (!match) return {};

    const metadata = {};
    const lines = match[1].split('\n');
    let currentKey = null;
    let currentArray = null;
    let i = 0;

    while (i < lines.length) {
        const line = lines[i];
        const trimmedLine = line.trim();

        // Array item starting with "- "
        if (trimmedLine.startsWith('- ')) {
            if (currentArray) {
                const itemContent = trimmedLine.substring(2);

                // Check if it's a simple value or start of an object
                if (itemContent.includes(':')) {
                    // It's an object - parse all its properties
                    const obj = {};
                    const [firstKey, ...firstValueParts] = itemContent.split(':');
                    obj[firstKey.trim()] = firstValueParts.join(':').trim().replace(/^["']|["']$/g, '');

                    // Look ahead for more properties of this object (indented lines)
                    i++;
                    while (i < lines.length && lines[i].startsWith('    ') && !lines[i].trim().startsWith('- ')) {
                        const propLine = lines[i].trim();
                        const [propKey, ...propValueParts] = propLine.split(':');
                        if (propKey && propValueParts.length) {
                            obj[propKey.trim()] = propValueParts.join(':').trim().replace(/^["']|["']$/g, '');
                        }
                        i++;
                    }
                    currentArray.push(obj);
                    i--; // Back up one since we'll increment at end of loop
                } else {
                    // Simple value
                    currentArray.push(itemContent);
                }
            }
        } else if (line.includes(':') && !line.startsWith(' ')) {
            // Top-level key
            const [key, ...valueParts] = line.split(':');
            const trimmedKey = key.trim();
            const value = valueParts.join(':').trim();

            if (value === '' || value === '[]') {
                // It's an array
                metadata[trimmedKey] = [];
                currentKey = trimmedKey;
                currentArray = metadata[trimmedKey];
            } else {
                metadata[trimmedKey] = value.replace(/^["']|["']$/g, '');
                currentKey = null;
                currentArray = null;
            }
        }

        i++;
    }

    return metadata;
}

// Generate FormUI.tsx
function generateFormUI(metadata) {
    return `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export function FormUI() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>${metadata.title || 'Screen'}</Text>
      <Text>TODO: Implement UI for ${metadata.screenId}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});
`;
}

// Generate Flow.ts
function generateFlow(metadata) {
    return `// Flow logic for ${metadata.screenId}
export const ${metadata.screenId.replace(/-/g, '')}Flow = {
  // TODO: Implement flow logic
};
`;
}

// Generate Screen.tsx
function generateScreen(metadata) {
    const screenName = metadata.screenId.split('-').map(w =>
        w.charAt(0).toUpperCase() + w.slice(1)
    ).join('');

    return `import React from 'react';
import { FormUI } from './${metadata.uiFile?.replace('.tsx', '') || 'FormUI'}';

export function ${screenName}Screen() {
  return <FormUI />;
}
`;
}

// Check if code exists for a spec
app.get('/api/code-exists/:screenId', async (req, res) => {
    try {
        const screenId = req.params.screenId;
        const featurePath = path.join(FEATURES_DIR, screenId);

        try {
            await fs.access(featurePath);
            res.json({ exists: true });
        } catch {
            res.json({ exists: false });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Generate code from spec
app.post('/api/generate-code', async (req, res) => {
    try {
        const { source, filename, content } = req.body;

        // Parse spec metadata
        const metadata = parseSpecMetadata(content);

        if (!metadata.featureDir) {
            return res.status(400).json({ error: 'featureDir not found in spec' });
        }

        // Create feature directory
        const featurePath = path.join(__dirname, '..', metadata.featureDir);
        await fs.mkdir(featurePath, { recursive: true });

        // Generate FormUI.tsx
        const formUIContent = generateFormUI(metadata);
        await fs.writeFile(path.join(featurePath, metadata.uiFile || 'FormUI.tsx'), formUIContent, 'utf-8');

        // Generate Flow.ts
        const flowContent = generateFlow(metadata);
        await fs.writeFile(path.join(featurePath, metadata.flowFile || 'flow.ts'), flowContent, 'utf-8');

        // Generate Screen.tsx
        const screenContent = generateScreen(metadata);
        await fs.writeFile(path.join(featurePath, metadata.screenFile || 'Screen.tsx'), screenContent, 'utf-8');

        // Move spec to screens if it was in drafts
        if (source === 'drafts') {
            const sourcePath = path.join(SPECS_DRAFTS_DIR, filename);
            const destPath = path.join(SPECS_SCREENS_DIR, filename);
            await fs.copyFile(sourcePath, destPath);
        }

        res.json({
            success: true,
            featureDir: metadata.featureDir,
            screenId: metadata.screenId
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


app.listen(PORT, () => {
    console.log(`Admin server running at http://localhost:${PORT}/admin`);
    console.log(`Open your browser to http://localhost:${PORT}/admin`);
});
