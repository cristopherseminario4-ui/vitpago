const http = require('http');
const fs = require('fs');
const path = require('path');
const { renderIndex } = require('./render');

const ROOT = path.join(__dirname, '..', 'frontend');
const PORT = process.env.PORT || 4173;

const MIME = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'text/javascript; charset=utf-8',
    '.svg': 'image/svg+xml',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.ico': 'image/x-icon',
};

const server = http.createServer((req, res) => {
    const urlPath = req.url.split('?')[0];

    if (urlPath === '/' || urlPath === '/index.html') {
        try {
            const html = renderIndex(ROOT);
            res.writeHead(200, { 'Content-Type': MIME['.html'] });
            res.end(html);
        } catch (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
            res.end('Error ensamblando la pagina: ' + err.message);
        }
        return;
    }

    const filePath = path.join(ROOT, decodeURIComponent(urlPath));
    if (!filePath.startsWith(ROOT)) {
        res.writeHead(403, { 'Content-Type': 'text/plain' });
        res.end('Forbidden');
        return;
    }

    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
            res.end('404 - No encontrado');
            return;
        }
        const ext = path.extname(filePath).toLowerCase();
        res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
        res.end(data);
    });
});

server.listen(PORT, () => {
    console.log('VIT PAGO corriendo en http://localhost:' + PORT);
});
