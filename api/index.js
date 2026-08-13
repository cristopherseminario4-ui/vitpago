const path = require('path');
const { renderIndex } = require('../backend/render');

const FRONTEND_ROOT = path.join(__dirname, '..', 'frontend');

module.exports = (req, res) => {
    try {
        const html = renderIndex(FRONTEND_ROOT);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.end(html);
    } catch (err) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        res.end('Error ensamblando la pagina: ' + err.message);
    }
};
