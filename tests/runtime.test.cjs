const assert = require('node:assert/strict');
const { test } = require('node:test');
const { spawnSync } = require('node:child_process');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const selfcheck = path.join(root, 'skills/00-tools/pm-selfcheck/scripts/selfcheck.sh');
const upgradeRoot = path.join(root, 'skills/super-pm-upgrade/scripts/package-root.sh');

function foreignCwd(action) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'superpm-foreign-cwd-'));
  try { return action(dir); } finally { fs.rmSync(dir, { recursive: true, force: true }); }
}

test('a pasted shell block cannot infer its source SKILL.md via BASH_SOURCE', () => {
  foreignCwd(cwd => {
    const result = spawnSync('bash', ['-lc', 'printf "<%s>" "${BASH_SOURCE[0]}"'], { cwd, encoding: 'utf8' });
    assert.equal(result.status, 0);
    assert.equal(result.stdout, '<>');
  });
});

test('no skill instructs agents to run a silent self-relative update preamble', () => {
  const files = fs.readdirSync(path.join(root, 'skills'), { recursive: true })
    .filter(name => name === 'SKILL.md' || name.endsWith('/SKILL.md'));
  for (const name of files) {
    const text = fs.readFileSync(path.join(root, 'skills', name), 'utf8');
    assert.doesNotMatch(text, /BASH_SOURCE\[0\]|bash [^\n]*check-update\.sh/, name);
  }
});

test('selfcheck scans the installed repository from an unrelated project', () => {
  foreignCwd(cwd => {
    const result = spawnSync('bash', [selfcheck], { cwd, encoding: 'utf8' });
    assert.equal(result.status, 0, result.stderr + result.stdout);
    assert.match(result.stdout, /super-pm v2\.6\.2/);
    assert.match(result.stdout, /55\/55/);
  });
});

test('a lone copied selfcheck gives a clear incomplete-install error', () => {
  foreignCwd(cwd => {
    const target = path.join(cwd, '.agents/skills/pm-selfcheck');
    fs.cpSync(path.join(root, 'skills/00-tools/pm-selfcheck'), target, { recursive: true });
    const result = spawnSync('bash', [path.join(target, 'scripts/selfcheck.sh')], { cwd, encoding: 'utf8' });
    assert.notEqual(result.status, 0);
    assert.match(result.stderr + result.stdout, /incomplete|未完整安装/i);
  });
});

test('upgrade root check never mistakes the unrelated project for the package', () => {
  foreignCwd(cwd => {
    fs.mkdirSync(path.join(cwd, '.git'));
    fs.writeFileSync(path.join(cwd, 'VERSION'), 'v9.9.9\n');
    const result = spawnSync('bash', [upgradeRoot], { cwd, encoding: 'utf8' });
    assert.equal(result.status, 0, result.stderr);
    assert.equal(result.stdout.trim(), root);
  });
});

test('expected skills index is synchronized with discoverable skills', () => {
  const result = spawnSync(process.execPath, ['scripts/sync-skill-index.cjs', '--check'], {
    cwd: root, encoding: 'utf8'
  });
  assert.equal(result.status, 0, result.stderr);
});

test('a flat copy of the full skill pack is diagnosed without a VERSION file', () => {
  foreignCwd(cwd => {
    const flat = path.join(cwd, '.agents/skills');
    fs.mkdirSync(flat, { recursive: true });
    const expected = fs.readFileSync(path.join(root, 'skills/00-tools/pm-selfcheck/expected-skills.txt'), 'utf8').trim().split('\n');
    const sources = fs.readdirSync(path.join(root, 'skills'), { recursive: true })
      .filter(name => name === 'SKILL.md' || name.endsWith('/SKILL.md'));
    for (const file of sources) {
      const text = fs.readFileSync(path.join(root, 'skills', file), 'utf8');
      const name = text.match(/^name:\s*(\S+)/m)[1];
      const dest = path.join(flat, name);
      fs.mkdirSync(dest, { recursive: true });
      fs.symlinkSync(path.join(root, 'skills', file), path.join(dest, 'SKILL.md'));
    }
    assert.equal(expected.length, 55);
    const target = path.join(flat, 'pm-selfcheck');
    fs.cpSync(path.join(root, 'skills/00-tools/pm-selfcheck/scripts'), path.join(target, 'scripts'), { recursive: true });
    fs.copyFileSync(path.join(root, 'skills/00-tools/pm-selfcheck/expected-skills.txt'), path.join(target, 'expected-skills.txt'));
    const result = spawnSync('bash', [path.join(target, 'scripts/selfcheck.sh')], { cwd, encoding: 'utf8' });
    assert.equal(result.status, 0, result.stderr + result.stdout);
    assert.match(result.stdout, /mode=flat \| skills=55\/55/);
  });
});

test('a copied upgrade skill refuses to treat the caller repo as the pack', () => {
  foreignCwd(cwd => {
    fs.mkdirSync(path.join(cwd, '.git'));
    fs.writeFileSync(path.join(cwd, 'VERSION'), 'v9.9.9\n');
    const target = path.join(cwd, '.agents/skills/super-pm-upgrade/scripts');
    fs.mkdirSync(target, { recursive: true });
    fs.copyFileSync(upgradeRoot, path.join(target, 'package-root.sh'));
    const result = spawnSync('bash', [path.join(target, 'package-root.sh')], { cwd, encoding: 'utf8' });
    assert.notEqual(result.status, 0);
    assert.match(result.stderr, /not a full Git clone/);
  });
});
