const assert = require('node:assert/strict');
const { after, before, test } = require('node:test');
const { spawn } = require('node:child_process');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const serverFile = path.resolve(__dirname, '../skills/pm-preview/scripts/preview-server.cjs');
const fixture = fs.mkdtempSync(path.join(os.tmpdir(), 'superpm-preview-test-'));
const docs = path.join(fixture, 'docs');
const sibling = path.join(fixture, 'docs-private');
const state = path.join(fixture, 'state');
let server;
let baseUrl;

before(async () => {
  fs.mkdirSync(docs);
  fs.mkdirSync(sibling);
  fs.mkdirSync(state);
  fs.writeFileSync(path.join(docs, 'safe.md'), '# Safe document\n');
  fs.writeFileSync(path.join(sibling, 'private.md'), 'private marker');
  fs.symlinkSync(path.join(sibling, 'private.md'), path.join(docs, 'linked.md'));

  server = spawn(process.execPath, [serverFile], {
    env: { ...process.env, PREVIEW_DOCS_DIR: docs, PREVIEW_DIR: fixture, PREVIEW_HOST: '127.0.0.1' },
    stdio: ['ignore', 'pipe', 'pipe']
  });
  baseUrl = await new Promise((resolve, reject) => {
    let output = '';
    const timeout = setTimeout(() => reject(new Error(`preview startup timed out: ${output}`)), 5000);
    server.stdout.on('data', chunk => {
      output += chunk;
      for (const line of output.split('\n')) {
        try {
          const event = JSON.parse(line);
          if (event.type === 'server-started') {
            clearTimeout(timeout);
            resolve(`http://127.0.0.1:${event.port}`);
          }
        } catch { /* wait for a complete JSON line */ }
      }
    });
    server.once('error', reject);
    server.once('exit', code => reject(new Error(`preview exited before startup: ${code}; ${output}`)));
  });
});

after(async () => {
  if (server && server.exitCode === null) {
    server.kill('SIGTERM');
    await new Promise(resolve => { server.once('exit', resolve); setTimeout(resolve, 1000); });
  }
  fs.rmSync(fixture, { recursive: true, force: true });
});

test('a document under docs is readable', async () => {
  const response = await fetch(`${baseUrl}/api/doc?path=safe.md`);
  assert.equal(response.status, 200);
  assert.match((await response.json()).content, /Safe document/);
});

test('a same-prefix sibling path is forbidden', async () => {
  const response = await fetch(`${baseUrl}/api/doc?path=${encodeURIComponent('../docs-private/private.md')}`);
  assert.equal(response.status, 403);
});

test('a symlink from docs to outside is forbidden', async () => {
  const response = await fetch(`${baseUrl}/api/doc?path=linked.md`);
  assert.equal(response.status, 403);
});

test('static assets cannot serve arbitrary HTML from docs', async () => {
  fs.writeFileSync(path.join(docs, 'active.html'), '<script>window.PWNED = true</script>');
  const response = await fetch(`${baseUrl}/files/active.html`);
  assert.equal(response.status, 404);
});


test('a symlinked image outside docs is not served', async () => {
  fs.writeFileSync(path.join(sibling, 'private.png'), 'private image');
  fs.symlinkSync(path.join(sibling, 'private.png'), path.join(docs, 'linked.png'));
  const response = await fetch(`${baseUrl}/files/linked.png`);
  assert.equal(response.status, 404);
});

test('malformed asset encoding does not kill the server', async () => {
  const response = await fetch(`${baseUrl}/files/%ZZ`);
  assert.equal(response.status, 400);
  assert.equal((await fetch(`${baseUrl}/api/doc?path=safe.md`)).status, 200);
});

test('the preview vendors its renderer and sanitizer', async () => {
  for (const asset of ['marked.umd.js', 'purify.min.js']) {
    const response = await fetch(`${baseUrl}/vendor/${asset}`);
    assert.equal(response.status, 200);
    assert.match(response.headers.get('content-type'), /javascript/);
    assert.ok((await response.text()).length > 1000);
  }
  const html = await (await fetch(baseUrl)).text();
  assert.match(html, /vendor\/purify\.min\.js/);
  assert.doesNotMatch(html, /cdn\.jsdelivr\.net/);
});
