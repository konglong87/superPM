const assert = require('node:assert/strict');
const { test } = require('node:test');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const manifest = JSON.parse(fs.readFileSync(path.join(root, 'package.json')));
const plugin = JSON.parse(fs.readFileSync(path.join(root, '.claude-plugin/plugin.json')));
const marketplace = JSON.parse(fs.readFileSync(path.join(root, '.claude-plugin/marketplace.json')));
const skillFiles = fs.readdirSync(path.join(root, 'skills'), { recursive: true })
  .filter(entry => entry === 'SKILL.md' || entry.endsWith('/SKILL.md'));

test('published version and skill count match the files', () => {
  const version = fs.readFileSync(path.join(root, 'VERSION'), 'utf8').trim().replace(/^v/, '');
  assert.equal(manifest.version, version);
  assert.equal(plugin.version, version);
  assert.equal(marketplace.plugins[0].version, version);
  assert.equal(manifest.skills.total, skillFiles.length);
});

test('every modular plugin skill link stays inside the package and exists', () => {
  for (const entry of fs.readdirSync(path.join(root, 'plugins'))) {
    const pluginRoot = path.join(root, 'plugins', entry);
    const target = path.join(pluginRoot, 'skills');
    assert.equal(fs.lstatSync(target).isSymbolicLink(), true);
    assert.equal(fs.statSync(target).isDirectory(), true);
    assert.equal(fs.realpathSync(target).startsWith(path.join(root, 'skills') + path.sep), true);
  }
});


test('plugin command links point to the installable workflow skills', () => {
  for (const entry of fs.readdirSync(path.join(root, 'commands'))) {
    const commandFile = path.join(root, 'commands', entry, 'SKILL.md');
    assert.equal(fs.lstatSync(commandFile).isSymbolicLink(), true);
    assert.equal(fs.realpathSync(commandFile), path.join(root, 'skills', 'workflows', entry, 'SKILL.md'));
  }
});
