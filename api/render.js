const path = require('path');
const { URL } = require('url');
const { renderPage, PAGES } = require('../backend/render');

const FRONTEND_ROOT = path.join(__dirname, '..', 'frontend');

module.exports = (req, res) => {
    let page = 'index';
    try {
        const parsed = new URL(req.url, 'http://localhost');
        const requested = parsed.searchParams.get('page');
        if (requested && PAGES.indexOf(requested) !== -1) {
            page = requested;
        }
    } catch (err) {
        // deja page en 'index' si la URL no se pudo parsear
    }

    try {
        const html = renderPage(FRONTEND_ROOT, page);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.end(html);
    } catch (err) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        res.end('Error ensamblando la pagina: ' + err.message);
    }
};
