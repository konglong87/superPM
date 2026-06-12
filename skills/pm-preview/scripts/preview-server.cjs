const crypto = require('crypto');
const http = require('http');
const fs = require('fs');
const path = require('path');

// ========== WebSocket Protocol (RFC 6455) ==========

const OPCODES = { TEXT: 0x01, CLOSE: 0x08, PING: 0x09, PONG: 0x0A };
const WS_MAGIC = '258EAFA5-E914-47DA-95CA-C5AB0DC85B11';

function computeAcceptKey(clientKey) {
  return crypto.createHash('sha1').update(clientKey + WS_MAGIC).digest('base64');
}

function encodeFrame(opcode, payload) {
  const fin = 0x80;
  const len = payload.length;
  let header;

  if (len < 126) {
    header = Buffer.alloc(2);
    header[0] = fin | opcode;
    header[1] = len;
  } else if (len < 65536) {
    header = Buffer.alloc(4);
    header[0] = fin | opcode;
    header[1] = 126;
    header.writeUInt16BE(len, 2);
  } else {
    header = Buffer.alloc(10);
    header[0] = fin | opcode;
    header[1] = 127;
    header.writeBigUInt64BE(BigInt(len), 2);
  }

  return Buffer.concat([header, payload]);
}

function decodeFrame(buffer) {
  if (buffer.length < 2) return null;

  const secondByte = buffer[1];
  const opcode = buffer[0] & 0x0F;
  const masked = (secondByte & 0x80) !== 0;
  let payloadLen = secondByte & 0x7F;
  let offset = 2;

  if (!masked) throw new Error('Client frames must be masked');

  if (payloadLen === 126) {
    if (buffer.length < 4) return null;
    payloadLen = buffer.readUInt16BE(2);
    offset = 4;
  } else if (payloadLen === 127) {
    if (buffer.length < 10) return null;
    payloadLen = Number(buffer.readBigUInt64BE(2));
    offset = 10;
  }

  const maskOffset = offset;
  const dataOffset = offset + 4;
  const totalLen = dataOffset + payloadLen;
  if (buffer.length < totalLen) return null;

  const mask = buffer.slice(maskOffset, dataOffset);
  const data = Buffer.alloc(payloadLen);
  for (let i = 0; i < payloadLen; i++) {
    data[i] = buffer[dataOffset + i] ^ mask[i % 4];
  }

  return { opcode, payload: data, bytesConsumed: totalLen };
}

// ========== Configuration ==========

const PORT = process.env.PREVIEW_PORT || (49152 + Math.floor(Math.random() * 16383));
const HOST = process.env.PREVIEW_HOST || '127.0.0.1';
const URL_HOST = process.env.PREVIEW_URL_HOST || (HOST === '127.0.0.1' ? 'localhost' : HOST);
const SESSION_DIR = process.env.PREVIEW_DIR || '/tmp/superpm-preview';
const DOCS_DIR = process.env.PREVIEW_DOCS_DIR || path.join(process.cwd(), 'docs');
const STATE_DIR = path.join(SESSION_DIR, 'state');
let ownerPid = process.env.PREVIEW_OWNER_PID ? Number(process.env.PREVIEW_OWNER_PID) : null;

const MIME_TYPES = {
  '.html': 'text/html', '.css': 'text/css', '.js': 'application/javascript',
  '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg', '.gif': 'image/gif', '.svg': 'image/svg+xml'
};

// ========== Templates and Constants ==========

const WAITING_PAGE = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>superPM Document Preview</title>
<style>body { font-family: system-ui, sans-serif; padding: 2rem; max-width: 800px; margin: 0 auto; }
h1 { color: #333; } p { color: #666; }</style>
</head>
<body><h1>superPM Document Preview</h1>
<p>Waiting for documents...</p></body></html>`;

const frameTemplate = fs.readFileSync(path.join(__dirname, 'preview-frame.html'), 'utf-8');
const helperScript = fs.readFileSync(path.join(__dirname, 'preview-helper.js'), 'utf-8');
const helperInjection = '<script>\n' + helperScript + '\n</script>';

// ========== Document Scanning ==========

/**
 * Recursively scan docs directory and return a sorted tree structure.
 * Returns: [{ name, path (relative), children? }]
 */
function scanDocs(dir, basePath) {
  if (!basePath) basePath = dir;
  const entries = [];

  try {
    const items = fs.readdirSync(dir, { withFileTypes: true });
    for (const item of items) {
      const fullPath = path.join(dir, item.name);
      const relPath = path.relative(basePath, fullPath);

      if (item.isDirectory() && !item.name.startsWith('.')) {
        const children = scanDocs(fullPath, basePath);
        if (children.length > 0) {
          entries.push({ name: item.name, path: relPath, children });
        }
      } else if (item.isFile() && item.name.endsWith('.md')) {
        entries.push({ name: item.name, path: relPath });
      }
    }
  } catch (e) {
    // Directory may not exist yet
  }

  // Sort: directories first (by name), then files (by name)
  entries.sort((a, b) => {
    if (a.children && !b.children) return -1;
    if (!a.children && b.children) return 1;
    return a.name.localeCompare(b.name, 'zh');
  });

  return entries;
}

// ========== HTTP Request Handler ==========

function handleRequest(req, res) {
  touchActivity();

  if (req.method === 'GET' && req.url === '/') {
    // Serve the frame with embedded doc tree
    const docTree = scanDocs(DOCS_DIR);
    const treeJson = JSON.stringify(docTree);
    let html = frameTemplate.replace('<!-- DOC_TREE -->', treeJson);

    if (html.includes('</body>')) {
      html = html.replace('</body>', helperInjection + '\n</body>');
    } else {
      html += helperInjection;
    }

    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(html);
  } else if (req.method === 'GET' && req.url === '/api/docs') {
    // API: get doc tree
    const docTree = scanDocs(DOCS_DIR);
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify(docTree));
  } else if (req.method === 'GET' && req.url.startsWith('/api/doc')) {
    // API: get single doc content
    const urlObj = new URL(req.url, 'http://localhost');
    const docPath = urlObj.searchParams.get('path');
    if (!docPath) {
      res.writeHead(400);
      res.end(JSON.stringify({ error: 'Missing path parameter' }));
      return;
    }

    const fullPath = path.join(DOCS_DIR, path.normalize(docPath));
    // Security: ensure path is within DOCS_DIR
    if (!fullPath.startsWith(DOCS_DIR)) {
      res.writeHead(403);
      res.end(JSON.stringify({ error: 'Forbidden' }));
      return;
    }

    if (!fs.existsSync(fullPath) || !fullPath.endsWith('.md')) {
      res.writeHead(404);
      res.end(JSON.stringify({ error: 'Not found' }));
      return;
    }

    try {
      const content = fs.readFileSync(fullPath, 'utf-8');
      const stat = fs.statSync(fullPath);
      res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify({
        path: docPath,
        name: path.basename(fullPath),
        content: content,
        size: stat.size,
        mtime: stat.mtime.toISOString()
      }));
    } catch (e) {
      res.writeHead(500);
      res.end(JSON.stringify({ error: 'Read error' }));
    }
  } else if (req.method === 'GET' && req.url.startsWith('/files/')) {
    // Serve static assets from DOCS_DIR (e.g. images embedded in docs)
    const fileName = req.url.slice(7);
    const filePath = path.join(DOCS_DIR, path.basename(fileName));
    if (!fs.existsSync(filePath)) {
      res.writeHead(404);
      res.end('Not found');
      return;
    }
    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(fs.readFileSync(filePath));
  } else {
    res.writeHead(404);
    res.end('Not found');
  }
}

// ========== WebSocket Connection Handling ==========

const clients = new Set();

function handleUpgrade(req, socket) {
  const key = req.headers['sec-websocket-key'];
  if (!key) { socket.destroy(); return; }

  const accept = computeAcceptKey(key);
  socket.write(
    'HTTP/1.1 101 Switching Protocols\r\n' +
    'Upgrade: websocket\r\n' +
    'Connection: Upgrade\r\n' +
    'Sec-WebSocket-Accept: ' + accept + '\r\n\r\n'
  );

  let buffer = Buffer.alloc(0);
  clients.add(socket);

  socket.on('data', (chunk) => {
    buffer = Buffer.concat([buffer, chunk]);
    while (buffer.length > 0) {
      let result;
      try {
        result = decodeFrame(buffer);
      } catch (e) {
        socket.end(encodeFrame(OPCODES.CLOSE, Buffer.alloc(0)));
        clients.delete(socket);
        return;
      }
      if (!result) break;
      buffer = buffer.slice(result.bytesConsumed);

      switch (result.opcode) {
        case OPCODES.TEXT:
          // Client messages are logged but don't trigger state changes
          touchActivity();
          console.log(JSON.stringify({ source: 'client-event', payload: result.payload.toString() }));
          break;
        case OPCODES.CLOSE:
          socket.end(encodeFrame(OPCODES.CLOSE, Buffer.alloc(0)));
          clients.delete(socket);
          return;
        case OPCODES.PING:
          socket.write(encodeFrame(OPCODES.PONG, result.payload));
          break;
        case OPCODES.PONG:
          break;
        default: {
          const closeBuf = Buffer.alloc(2);
          closeBuf.writeUInt16BE(1003);
          socket.end(encodeFrame(OPCODES.CLOSE, closeBuf));
          clients.delete(socket);
          return;
        }
      }
    }
  });

  socket.on('close', () => clients.delete(socket));
  socket.on('error', () => clients.delete(socket));
}

function broadcast(msg) {
  const frame = encodeFrame(OPCODES.TEXT, Buffer.from(JSON.stringify(msg)));
  for (const socket of clients) {
    try { socket.write(frame); } catch (e) { clients.delete(socket); }
  }
}

// ========== Activity Tracking ==========

const IDLE_TIMEOUT_MS = 30 * 60 * 1000; // 30 minutes
let lastActivity = Date.now();

function touchActivity() {
  lastActivity = Date.now();
}

// ========== File Watching ==========

const debounceTimers = new Map();

// ========== Server Startup ==========

function startServer() {
  if (!fs.existsSync(STATE_DIR)) fs.mkdirSync(STATE_DIR, { recursive: true });

  // Track known files to distinguish new from updated
  function getAllMdFiles() {
    const files = [];
    function walk(dir) {
      try {
        for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
          const fp = path.join(dir, item.name);
          if (item.isDirectory() && !item.name.startsWith('.')) {
            walk(fp);
          } else if (item.isFile() && item.name.endsWith('.md')) {
            files.push(path.relative(DOCS_DIR, fp));
          }
        }
      } catch (e) { /* ignore */ }
    }
    walk(DOCS_DIR);
    return files;
  }

  const knownFiles = new Set(getAllMdFiles());

  const server = http.createServer(handleRequest);
  server.on('upgrade', handleUpgrade);

  // Watch DOCS_DIR recursively for .md changes (macOS supports recursive natively)
  let watcher = null;
  try {
    watcher = fs.watch(DOCS_DIR, { recursive: true }, (eventType, filename) => {
      if (!filename || !filename.endsWith('.md')) return;

      const key = filename;
      if (debounceTimers.has(key)) clearTimeout(debounceTimers.get(key));
      debounceTimers.set(key, setTimeout(() => {
        debounceTimers.delete(key);
        const filePath = path.join(DOCS_DIR, filename);

        if (!fs.existsSync(filePath)) {
          // File deleted
          knownFiles.delete(filename);
          console.log(JSON.stringify({ type: 'doc-removed', file: filename }));
          broadcast({ type: 'reload' });
          return;
        }

        touchActivity();

        if (!knownFiles.has(filename)) {
          knownFiles.add(filename);
          console.log(JSON.stringify({ type: 'doc-added', file: filename }));
        } else {
          console.log(JSON.stringify({ type: 'doc-updated', file: filename }));
        }

        broadcast({ type: 'reload' });
      }, 100));
    });
    watcher.on('error', (err) => console.error('fs.watch error:', err.message));
  } catch (e) {
    console.error('Failed to watch docs directory:', e.message);
  }

  function shutdown(reason) {
    console.log(JSON.stringify({ type: 'server-stopped', reason }));
    const infoFile = path.join(STATE_DIR, 'server-info');
    if (fs.existsSync(infoFile)) fs.unlinkSync(infoFile);
    fs.writeFileSync(
      path.join(STATE_DIR, 'server-stopped'),
      JSON.stringify({ reason, timestamp: Date.now() }) + '\n'
    );
    if (watcher) {
      try { watcher.close(); } catch (e) { /* ignore */ }
    }
    clearInterval(lifecycleCheck);
    server.close(() => process.exit(0));
  }

  function ownerAlive() {
    if (!ownerPid) return true;
    try { process.kill(ownerPid, 0); return true; } catch (e) { return e.code === 'EPERM'; }
  }

  // Check every 60s: exit if owner process died or idle for 30 minutes
  const lifecycleCheck = setInterval(() => {
    if (!ownerAlive()) shutdown('owner process exited');
    else if (Date.now() - lastActivity > IDLE_TIMEOUT_MS) shutdown('idle timeout');
  }, 60 * 1000);
  lifecycleCheck.unref();

  // Validate owner PID at startup
  if (ownerPid) {
    try { process.kill(ownerPid, 0); }
    catch (e) {
      if (e.code !== 'EPERM') {
        console.log(JSON.stringify({ type: 'owner-pid-invalid', pid: ownerPid, reason: 'dead at startup' }));
        ownerPid = null;
      }
    }
  }

  server.listen(PORT, HOST, () => {
    const info = JSON.stringify({
      type: 'server-started', port: Number(PORT), host: HOST,
      url_host: URL_HOST, url: 'http://' + URL_HOST + ':' + PORT,
      docs_dir: DOCS_DIR, state_dir: STATE_DIR
    });
    console.log(info);
    fs.writeFileSync(path.join(STATE_DIR, 'server-info'), info + '\n');
  });
}

if (require.main === module) {
  startServer();
}

module.exports = { computeAcceptKey, encodeFrame, decodeFrame, OPCODES };