const fs = require('fs').promises;
const path = require('path');

const SPECS_DIR = path.join(__dirname, '..', 'specs', 'drafts');

const moduleMetadata = {
    // Vegetable Grower
    'veg-registration': {
        module: 'vegetable-grower',
        moduleTitle: 'Овощевод',
        transitions: [{ target: 'veg-qr', label: 'Выбрать блок' }]
    },
    'veg-qr': {
        module: 'vegetable-grower',
        moduleTitle: 'Овощевод',
        transitions: [{ target: 'veg-dashboard', label: 'Сканирование' }]
    },
    'veg-dashboard': {
        module: 'vegetable-grower',
        moduleTitle: 'Овощевод',
        transitions: [
            { target: 'task-start', label: 'Начать задачу' },
            { target: 'task-instruction', label: 'Инструкция' }
        ]
    },
    'task-instruction': {
        module: 'vegetable-grower',
        moduleTitle: 'Овощевод',
        transitions: []
    },
    'task-start': {
        module: 'vegetable-grower',
        moduleTitle: 'Овощевод',
        transitions: [
            { target: 'task-running', label: 'Старт' },
            { target: 'task-instruction', label: 'Инструкция' }
        ]
    },
    'task-running': {
        module: 'vegetable-grower',
        moduleTitle: 'Овощевод',
        transitions: [
            { target: 'task-paused', label: 'Пауза' },
            { target: 'task-finish', label: 'Стоп' }
        ]
    },
    'task-paused': {
        module: 'vegetable-grower',
        moduleTitle: 'Овощевод',
        transitions: [
            { target: 'task-running', label: 'Продолжить' },
            { target: 'task-finish', label: 'Стоп' }
        ]
    },
    'task-finish': {
        module: 'vegetable-grower',
        moduleTitle: 'Овощевод',
        transitions: [{ target: 'veg-dashboard', label: 'Завершить' }]
    },

    // Commodity Expert
    'receive-item': {
        module: 'commodity-expert',
        moduleTitle: 'Товаровед',
        transitions: [{ target: 'confirm-receive', label: 'Подтвердить' }]
    },
    'confirm-receive': {
        module: 'commodity-expert',
        moduleTitle: 'Товаровед',
        transitions: [{ target: 'quality-control', label: 'Контроль качества' }]
    },
    'quality-control': {
        module: 'commodity-expert',
        moduleTitle: 'Товаровед',
        transitions: []
    },

    // Plant Protection
    'protection-crop-list': {
        module: 'plant-protection',
        moduleTitle: 'Защита растений',
        transitions: [{ target: 'protection-crop-details', label: 'Выбрать культуру' }]
    },
    'protection-crop-details': {
        module: 'plant-protection',
        moduleTitle: 'Защита растений',
        transitions: [{ target: 'protection-crop-form', label: 'Обработка' }]
    },
    'protection-crop-form': {
        module: 'plant-protection',
        moduleTitle: 'Защита растений',
        transitions: [{ target: 'protection-crop-list', label: 'Завершить' }]
    },

    // Management
    'task-creation': {
        module: 'management',
        moduleTitle: 'Управление',
        transitions: []
    },
    'technology-card': {
        module: 'management',
        moduleTitle: 'Управление',
        transitions: []
    }
};

async function updateSpec(filename) {
    const screenId = filename.replace('.md', '');
    const metadata = moduleMetadata[screenId];

    if (!metadata) {
        console.log(`Skipping ${filename} - no metadata defined`);
        return;
    }

    const filePath = path.join(SPECS_DIR, filename);
    let content = await fs.readFile(filePath, 'utf-8');

    // Parse frontmatter
    const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
    if (!frontmatterMatch) {
        console.log(`Skipping ${filename} - no frontmatter found`);
        return;
    }

    const frontmatter = frontmatterMatch[1];
    const restContent = content.slice(frontmatterMatch[0].length);

    // Add module fields before services or at end
    let newFrontmatter = frontmatter;

    // Add module and moduleTitle
    if (!newFrontmatter.includes('module:')) {
        const insertPos = newFrontmatter.lastIndexOf('screenFile:');
        if (insertPos !== -1) {
            const lineEnd = newFrontmatter.indexOf('\n', insertPos);
            newFrontmatter =
                newFrontmatter.slice(0, lineEnd + 1) +
                `module: ${metadata.module}\n` +
                `moduleTitle: "${metadata.moduleTitle}"\n` +
                newFrontmatter.slice(lineEnd + 1);
        }
    }

    // Add transitions before ---
    if (!newFrontmatter.includes('transitions:') && metadata.transitions.length > 0) {
        const transitionsYaml = 'transitions:\n' +
            metadata.transitions.map(t => `  - target: ${t.target}\n    label: "${t.label}"`).join('\n');
        newFrontmatter += '\n' + transitionsYaml;
    }

    const newContent = `---\n${newFrontmatter}\n---${restContent}`;
    await fs.writeFile(filePath, newContent, 'utf-8');
    console.log(`Updated ${filename}`);
}

async function main() {
    const files = await fs.readdir(SPECS_DIR);
    const specFiles = files.filter(f => f.endsWith('.md') && f !== 'README.md');

    for (const file of specFiles) {
        try {
            await updateSpec(file);
        } catch (error) {
            console.error(`Error updating ${file}:`, error.message);
        }
    }

    console.log('Done!');
}

main();
