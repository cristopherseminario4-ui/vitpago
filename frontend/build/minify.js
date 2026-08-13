const fs = require('fs');
const path = require('path');

function minifyCSS(src) {
    const noComments = src.replace(/\/\*[\s\S]*?\*\//g, '');
    return noComments
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean)
        .join('');
}

function minifyJS(src) {
    const noComments = src.replace(/\/\*[\s\S]*?\*\//g, '');
    return noComments
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean)
        .join('\n');
}

const cssSrcPath = path.join(__dirname, '..', 'css', 'styles.css');
const jsSrcPath = path.join(__dirname, '..', 'js', 'main.js');

const cssMin = minifyCSS(fs.readFileSync(cssSrcPath, 'utf8'));
const jsMin = minifyJS(fs.readFileSync(jsSrcPath, 'utf8'));

fs.writeFileSync(path.join(__dirname, '..', 'css', 'styles.min.css'), cssMin);
fs.writeFileSync(path.join(__dirname, '..', 'js', 'main.min.js'), jsMin);

console.log('OK: styles.min.css y main.min.js generados.');
