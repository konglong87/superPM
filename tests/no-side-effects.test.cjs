const assert = require('node:assert/strict');
const { test } = require('node:test');
const { spawnSync } = require('node:child_process');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const formerlyWriting = require('./fixtures/preamble-write-skills.json');
const skillPaths = fs.readdirSync(path.join(root, 'skills'), { recursive: true })
  .filter(file => file === 'SKILL.md' || file.endsWith('/SKILL.md'));

function preamble(file) {
  const text = fs.readFileSync(path.join(root, 'skills', file), 'utf8');
  return text.split(/## Preamble[^\n]*\n/)[1]?.split(/\n---\n/)[0] || '';
}

test('no skill creates output directories or files during Preamble', () => {
  const offenders = skillPaths.filter(file => /(^\s*(?:mkdir|touch|cp|mv|rm|tee)\b|(?:>|>>)\s*docs\/)/m.test(preamble(file)));
  assert.deepEqual(offenders, []);
});

test('formerly side-effecting skills keep a standalone write-time guard', () => {
  assert.equal(formerlyWriting.length, 41);
  for (const file of formerlyWriting) {
    const text = fs.readFileSync(path.join(root, file), 'utf8');
    assert.match(text, /## 写入时边界/);
    assert.match(text, /只讨论时不写文件/);
    assert.match(text, /覆盖.*确认|确认.*覆盖/);
    assert.doesNotMatch(text, /```bash\n```/, `${file} has an empty shell block`);
  }
});

test('representative copied Preamble commands do not change the project', () => {
  for (const file of [
    '01-demand-insight/pm-priority/SKILL.md',
    '04-risk-management/pm-release/SKILL.md',
    '06-career/pm-resume/SKILL.md'
  ]) {
    const code = preamble(file).match(/```bash\n([\s\S]*?)\n```/)?.[1] || '';
    const cwd = fs.mkdtempSync(path.join(os.tmpdir(), 'superpm-no-write-'));
    try {
      const run = spawnSync('bash', ['-c', code], { cwd, env: { ...process.env, HOME: cwd }, encoding: 'utf8' });
      assert.equal(run.status, 0, `${file}: ${run.stderr}`);
      assert.deepEqual(fs.readdirSync(cwd), [], `${file} created files`);
    } finally {
      fs.rmSync(cwd, { recursive: true, force: true });
    }
  }
});
