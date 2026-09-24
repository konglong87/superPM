const assert = require('node:assert/strict');
const { test } = require('node:test');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const contract = JSON.parse(fs.readFileSync(path.join(root, 'skills/_shared/workflow-contract.json')));

for (const [command, expected] of Object.entries(contract.commands)) {
  test(`${command} follows the shared workflow order`, () => {
    const content = fs.readFileSync(path.join(root, 'commands', command, 'SKILL.md'), 'utf8');
    assert.match(content, /skills\/_shared\/workflow-contract\.md/);
    const actual = [...content.matchAll(/执行 \/(pm-[\w-]+)/g)].map(match => match[1]);
    assert.deepEqual(actual, expected);
    for (const name of actual) {
      const exists = fs.readdirSync(path.join(root, 'skills'), { recursive: true })
        .some(entry => entry === `${name}/SKILL.md` || entry.endsWith(`/${name}/SKILL.md`));
      assert.ok(exists, `missing skill: ${name}`);
    }
  });
}

test('new-idea command chains honor the brainstorm gate', () => {
  for (const command of ['discover', 'validate-idea', 'write-prd']) {
    const text = fs.readFileSync(path.join(root, 'commands', command, 'SKILL.md'), 'utf8');
    assert.match(text, /pm-brainstorm/);
    assert.match(text, /explicitly opted out|明确跳过/);
  }
});
