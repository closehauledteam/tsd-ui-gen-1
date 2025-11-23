const fs = require('fs');
const path = require('path');

const DRAFTS_DIR = path.join(__dirname, '../specs/drafts');
const REQUIREMENTS_DIR = path.join(__dirname, '../specs/requirements');
const REGISTRY_FILE = path.join(__dirname, '../specs/screenRegistry.js');

// Ensure output dir exists
if (!fs.existsSync(REQUIREMENTS_DIR)) {
    fs.mkdirSync(REQUIREMENTS_DIR, { recursive: true });
}

const screenRegistry = {};

const files = fs.readdirSync(DRAFTS_DIR).filter(f => f.endsWith('.md') && f !== 'README.md');

files.forEach(file => {
    const content = fs.readFileSync(path.join(DRAFTS_DIR, file), 'utf-8');

    // Simple frontmatter parser
    const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);

    if (match) {
        const frontmatterRaw = match[1];
        const body = match[2].trim();

        const metadata = {};
        frontmatterRaw.split('\n').forEach(line => {
            const parts = line.split(':');
            if (parts.length >= 2) {
                const key = parts[0].trim();
                let value = parts.slice(1).join(':').trim();

                // Handle basic types
                if (value.startsWith('"') && value.endsWith('"')) {
                    value = value.slice(1, -1);
                } else if (!isNaN(value)) {
                    value = Number(value);
                } else if (value === 'true') value = true;
                else if (value === 'false') value = false;

                // Handle lists (very basic implementation for this specific use case)
                // This parser is fragile but sufficient for the current file format if they are flat key-values.
                // However, looking at veg-registration.md, 'services' and 'transitions' are lists.
                // A simple split by newline won't work well for nested lists in YAML.
                // Let's use a slightly more robust approach for the specific structure we know.
            }
        });

        // RE-PARSING STRATEGY:
        // Since we don't have a yaml parser library guaranteed, and the format is simple,
        // let's do a custom parse that handles the specific array format seen in the file.

        const lines = frontmatterRaw.split('\n');
        let currentKey = null;

        lines.forEach(line => {
            if (!line.trim()) return;

            if (line.startsWith('  -')) {
                // Array item
                if (currentKey && Array.isArray(metadata[currentKey])) {
                    let val = line.replace('  -', '').trim();
                    if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);

                    // Check if it's an object in the array (like transitions)
                    // The example showed:
                    // transitions:
                    //   - target: veg-qr
                    //     label: "Выбрать блок"
                    // This is actually complex to parse with simple regex.
                    // BUT, looking at the file content provided in Step 5:
                    /*
                    transitions:
                      - target: veg-qr
                        label: "Выбрать блок"
                    */
                    // This is multi-line array objects. My simple parser above will fail.
                }
            } else if (!line.startsWith(' ')) {
                // Top level key
                const parts = line.split(':');
                const key = parts[0].trim();
                const val = parts.slice(1).join(':').trim();

                if (val === '') {
                    currentKey = key;
                    metadata[key] = []; // Assume array start
                } else {
                    currentKey = null;
                    let parsedVal = val;
                    if (parsedVal.startsWith('"') && parsedVal.endsWith('"')) parsedVal = parsedVal.slice(1, -1);
                    else if (!isNaN(parsedVal)) parsedVal = Number(parsedVal);
                    metadata[key] = parsedVal;
                }
            } else if (line.startsWith('    ')) {
                // nested object property
                // This is getting too complex for a regex parser.
            }
        });
    }
});

// ALTERNATIVE:
// Since I have access to the `run_command` tool, I can just install `js-yaml` temporarily or use a python script if python is available.
// Python has `pyyaml` usually or at least easy json handling.
// Let's check if python3 is available and has yaml.
