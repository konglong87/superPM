const assert = require('node:assert/strict');
const { test } = require('node:test');
const { spawnSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const contract = JSON.parse(fs.readFileSync(path.join(root, 'skills/_shared/workflow-contract.json'), 'utf8'));
const gate = contract.ideaGate;

test('the new-idea gate lists exactly the workflows that can enter demand', () => {
  assert.deepEqual([...gate.appliesTo].sort(), ['discover', 'validate-idea', 'write-prd']);
});

for (const [workflow, steps] of Object.entries(contract.commands)) {
  test(`${workflow} documents its dependency-closed install bundle`, () => {
    const text = fs.readFileSync(path.join(root, 'skills/workflows', workflow, 'SKILL.md'), 'utf8');
    const bundle = [workflow, ...steps, ...(gate.appliesTo.includes(workflow) ? [gate.newIdea] : [])];
    const installCommand = `npx skills add https://github.com/konglong87/superPM --skill ${bundle.join(' ')}`;
    assert.ok(text.includes(installCommand), `${workflow} lacks the complete install command`);
    assert.match(text, /缺少依赖.*停止|missing dependencies.*stop/i);
    for (const skill of bundle) {
      assert.ok(fs.readdirSync(path.join(root, 'skills'), { recursive: true })
        .some(entry => entry.endsWith(`/${skill}/SKILL.md`)), `missing source: ${skill}`);
    }
  });
}

test('generated preflight blocks agree with the contract', () => {
  const result = spawnSync(process.execPath, ['scripts/sync-workflow-deps.cjs', '--check'], {
    cwd: root, encoding: 'utf8'
  });
  assert.equal(result.status, 0, result.stderr || result.stdout);
});
