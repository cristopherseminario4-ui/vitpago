const fs = require('fs');
const path = require('path');

const PAGES = ['index', 'nosotros', 'funcionamiento', 'contacto'];

function renderPage(frontendRoot, pageName) {
    const page = PAGES.indexOf(pageName) === -1 ? 'index' : pageName;
    const template = fs.readFileSync(path.join(frontendRoot, 'pages', page + '.html'), 'utf8');
    const header = fs.readFileSync(path.join(frontendRoot, 'partials', 'header.html'), 'utf8');
    const footer = fs.readFileSync(path.join(frontendRoot, 'partials', 'footer.html'), 'utf8');
    return template.replace('{{HEADER}}', header).replace('{{FOOTER}}', footer);
}

module.exports = { renderPage, PAGES };
