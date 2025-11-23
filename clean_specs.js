const fs = require('fs');
const path = require('path');

const screensDir = path.join(__dirname, 'specs', 'screens');

fs.readdir(screensDir, (err, files) => {
    if (err) {
        console.error('Error reading directory:', err);
        return;
    }

    files.forEach(file => {
        if (path.extname(file) === '.md') {
            const filePath = path.join(screensDir, file);
            fs.readFile(filePath, 'utf8', (err, data) => {
                if (err) {
                    console.error(`Error reading file ${file}:`, err);
                    return;
                }

                // Remove frontmatter: content between first two --- lines
                const lines = data.split('\n');
                let newContent = data;

                if (lines[0].trim() === '---') {
                    let endLine = -1;
                    for (let i = 1; i < lines.length; i++) {
                        if (lines[i].trim() === '---') {
                            endLine = i;
                            break;
                        }
                    }

                    if (endLine !== -1) {
                        newContent = lines.slice(endLine + 1).join('\n').trim();

                        fs.writeFile(filePath, newContent, 'utf8', (err) => {
                            if (err) {
                                console.error(`Error writing file ${file}:`, err);
                            } else {
                                console.log(`Cleaned frontmatter from ${file}`);
                            }
                        });
                    }
                }
            });
        }
    });
});
