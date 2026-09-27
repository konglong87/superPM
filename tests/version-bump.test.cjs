const assert = require('node:assert/strict');
const { test } = require('node:test');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { execFileSync } = require('node:child_process');

const root = path.resolve(__dirname, '..');
const pluginNames = fs.readdirSync(path.join(root, 'plugins'))
  .filter(name => fs.existsSync(path.join(root, 'plugins', name, 'plugin.json')));

test('version bump synchronizes every distributable manifest', () => {
  const fixture = fs.mkdtempSync(path.join(os.tmpdir(), 'superpm-version-test-'));
  const write = (name, value) => {
    const file = path.join(fixture, name);
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, value);
  };
  try {
    fs.copyFileSync(path.join(root, 'bump-version.sh'), path.join(fixture, 'bump-version.sh'));
    execFileSync('git', ['init', '-q', fixture]);
    write('skills/VERSION', 'v0.1.0');
    write('VERSION', 'v0.1.0');
    for (const name of ['package.json', '.claude-plugin/plugin.json', '.cursor-plugin/plugin.json',
      ...pluginNames.map(plugin => `plugins/${plugin}/plugin.json`)]) {
      write(name, '{"version": "0.1.0"}\n');
    }
    write('.claude-plugin/marketplace.json', '{"plugins": [{"version": "0.1.0"}, {"version": "0.1.0"}]}\n');
    execFileSync('bash', [path.join(fixture, 'bump-version.sh'), '0.2.0'], { cwd: fixture });
    for (const name of ['package.json', '.claude-plugin/plugin.json', '.cursor-plugin/plugin.json',
      ...pluginNames.map(plugin => `plugins/${plugin}/plugin.json`)]) {
      assert.equal(JSON.parse(fs.readFileSync(path.join(fixture, name))).version, '0.2.0', name);
    }
    assert.deepEqual(JSON.parse(fs.readFileSync(path.join(fixture, '.claude-plugin/marketplace.json')))
      .plugins.map(plugin => plugin.version), ['0.2.0', '0.2.0']);
    assert.equal(fs.readFileSync(path.join(fixture, 'VERSION'), 'utf8'), 'v0.2.0');
    assert.equal(fs.readFileSync(path.join(fixture, 'skills/VERSION'), 'utf8'), 'v0.2.0');
  } finally {
    fs.rmSync(fixture, { recursive: true, force: true });
  }
});
