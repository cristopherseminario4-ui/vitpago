const fs = require('fs');
const path = require('path');

function renderIndex(frontendRoot) {
    const template = fs.readFileSync(path.join(frontendRoot, 'pages', 'index.html'), 'utf8');
    const header = fs.readFileSync(path.join(frontendRoot, 'partials', 'header.html'), 'utf8');
    const footer = fs.readFileSync(path.join(frontendRoot, 'partials', 'footer.html'), 'utf8');
    return template.replace('{{HEADER}}', header).replace('{{FOOTER}}', footer);
}

module.exports = { renderIndex };
