const fs = require('fs');
const path = require('path');

const DRAFTS_DIR = path.join(__dirname, '../specs/drafts');
const REQUIREMENTS_DIR = path.join(__dirname, '../specs/requirements');
const REGISTRY_FILE = path.join(__dirname, '../specs/screenRegistry.js');

if (!fs.existsSync(REQUIREMENTS_DIR)) {
    fs.mkdirSync(REQUIREMENTS_DIR, { recursive: true });
}

const screenRegistry = {};

const files = fs.readdirSync(DRAFTS_DIR).filter(f => f.endsWith('.md') && f !== 'README.md');

function parseValue(val) {
    val = val.trim();
    if (val === 'true') return true;
    if (val === 'false') return false;
    if (val.startsWith('"') && val.endsWith('"')) return val.slice(1, -1);
    if (val.startsWith("'") && val.endsWith("'")) return val.slice(1, -1);
    if (val.startsWith('[') && val.endsWith(']')) {
        // Simple array parse
        return val.slice(1, -1).split(',').map(v => parseValue(v.trim()));
    }
    if (!isNaN(val) && val !== '') return Number(val);
    return val;
}

files.forEach(file => {
    const content = fs.readFileSync(path.join(DRAFTS_DIR, file), 'utf-8');
    const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);

    if (match) {
        const frontmatterRaw = match[1];
        const body = match[2].trim();

        const metadata = {};
        const lines = frontmatterRaw.split('\n');

        let currentKey = null;
        let currentList = null; // for array of objects

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            if (!line.trim()) continue;

            if (line.startsWith('  -')) {
                // List item
                if (currentKey) {
                    if (!Array.isArray(metadata[currentKey])) {
                        metadata[currentKey] = [];
                    }

                    const itemContent = line.replace('  -', '').trim();

                    if (itemContent) {
                        // Simple list item or start of object?
                        // If it has a colon, it might be an object key-value on one line? 
                        // But in our case: "  - target: veg-qr"
                        if (itemContent.includes(':')) {
                            // It's an object start
                            const parts = itemContent.split(':');
                            const objKey = parts[0].trim();
                            const objVal = parseValue(parts.slice(1).join(':'));
                            const newObj = {};
                            newObj[objKey] = objVal;
                            metadata[currentKey].push(newObj);
                            currentList = newObj; // Track this object to add more props to it
                        } else {
                            // Simple value
                            metadata[currentKey].push(parseValue(itemContent));
                            currentList = null;
                        }
                    } else {
                        // Empty dash? Unlikely in this format but possible
                    }
                }
            } else if (line.startsWith('    ')) {
                // Indented property of a list item object
                if (currentList) {
                    const parts = line.trim().split(':');
                    const key = parts[0].trim();
                    const val = parseValue(parts.slice(1).join(':'));
                    currentList[key] = val;
                }
            } else if (!line.startsWith(' ')) {
                // Top level key
                const parts = line.split(':');
                const key = parts[0].trim();
                const val = parts.slice(1).join(':').trim();

                if (val === '') {
                    currentKey = key;
                    metadata[key] = []; // Initialize as array, might be overwritten if it's not a list
                } else {
                    currentKey = null;
                    currentList = null;
                    metadata[key] = parseValue(val);
                }
            }
        }

        // Determine registry key
        const registryKey = metadata.screenId || file.replace('.md', '');

        // Add specFile path
        metadata.specFile = `specs/requirements/${file}`;

        screenRegistry[registryKey] = metadata;

        // Write clean markdown
        fs.writeFileSync(path.join(REQUIREMENTS_DIR, file), body);
    } else {
        console.warn(`No frontmatter found in ${file}, skipping metadata extraction but moving file.`);
        fs.writeFileSync(path.join(REQUIREMENTS_DIR, file), content);
    }
});

const registryContent = `export const screenRegistry = ${JSON.stringify(screenRegistry, null, 2)};`;
fs.writeFileSync(REGISTRY_FILE, registryContent);

console.log(`Migrated ${files.length} files.`);
