import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, isAbsolute, join, normalize, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = normalize(fileURLToPath(new URL('..', import.meta.url)));
const port = Number(process.env.PORT) || 8120;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.pdf': 'application/pdf',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8',
};

function resolvePath(urlPath) {
  if (urlPath === '/') urlPath = '/index.html';
  const filePath = normalize(join(root, urlPath));
  // Guard against path traversal escaping the project root.
  const rel = relative(root, filePath);
  if (rel.startsWith('..') || isAbsolute(rel)) return null;
  return filePath;
}

const server = createServer(async (req, res) => {
  try {
    const { pathname } = new URL(req.url, `http://${req.headers.host}`);
    let filePath = resolvePath(decodeURIComponent(pathname));
    if (!filePath) {
      res.writeHead(403);
      res.end('Forbidden');
      return;
    }

    let data;
    try {
      data = await readFile(filePath);
    } catch (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404);
        res.end('Not found');
        return;
      }
      if (err.code === 'EISDIR') {
        // Directory request -> serve its index.html.
        const idx = join(filePath, 'index.html');
        data = await readFile(idx);
        filePath = idx;
      } else {
        throw err;
      }
    }

    const ext = extname(filePath).toLowerCase();
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
    res.end(data);
  } catch {
    res.writeHead(500);
    res.end('Server error');
  }
});

server.listen(port, () => {
  console.log(`\n  Local dev server: http://localhost:${port}/\n  Serving: ${root}\n  Press Ctrl+C to stop.\n`);
});

function shutdown(signal) {
  console.log(`\n  ${signal} received — shutting down gracefully...`);
  server.close(() => {
    console.log('  Server stopped.');
    process.exit(0);
  });
  // Fallback: force-exit if a keep-alive connection keeps the socket open.
  setTimeout(() => process.exit(0), 1000).unref();
}

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));
