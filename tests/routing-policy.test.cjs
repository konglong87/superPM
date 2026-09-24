const assert = require('node:assert/strict');
const { test } = require('node:test');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');

const entries = [
  'skills/start-super-pm/SKILL.md',
  'skills/start-super-pm/routing-card.md',
  'skills/SKILL.md',
  'skills/01-demand-insight/pm-demand/SKILL.md',
  'skills/01-demand-insight/pm-brainstorm/SKILL.md'
];

test('entry routes honor user scope instead of 1% forced activation', () => {
  for (const file of entries) {
    const text = read(file);
    assert.doesNotMatch(text, /1%.*(?:必须|应该)|不可协商|强制入口逻辑/, file);
    assert.match(text, /不写文件|不落盘|只讨论/, file);
  }
});

test('new idea gate is conditional while explicit skill requests keep their own gate', () => {
  const contract = read('skills/_shared/workflow-contract.md');
  const router = read('skills/start-super-pm/SKILL.md');
  for (const text of [contract, router]) {
    assert.match(text, /显式.*(?:命令|skill)|explicit/i);
    assert.match(text, /相关.*(?:资料|产物|文档)/);
    assert.match(text, /跳过.*brainstorm|brainstorm.*跳过/i);
  }
  assert.doesNotMatch(read('skills/01-demand-insight/pm-demand/SKILL.md'), /所有步骤均为 \[MANDATORY\]，不得跳过任何步骤/);
  assert.doesNotMatch(read('skills/01-demand-insight/pm-brainstorm/SKILL.md'), /所有步骤均为 \[MANDATORY\]，不得跳过任何步骤/);
});

test('discussion does not create folders before the user asks for an artifact', () => {
  for (const file of [
    'skills/01-demand-insight/pm-demand/SKILL.md',
    'skills/01-demand-insight/pm-brainstorm/SKILL.md'
  ]) {
    const text = read(file);
    const preamble = text.split('## Preamble')[1]?.split('\n---\n')[0] || '';
    assert.doesNotMatch(preamble, /mkdir\s+-p/, file);
    assert.match(text, /只问缺失的关键信息|无需重复提问/);
  }
});

test('README does not claim an unmeasured 80 percent coverage', () => {
  assert.doesNotMatch(read('README.md'), /覆盖 80%/);
  assert.doesNotMatch(read('skills/SKILL.md'), /80% 用户/);
});

test('specific new product intent is not mistaken for completed brainstorming', () => {
  const router = read('skills/start-super-pm/SKILL.md');
  const card = read('skills/start-super-pm/routing-card.md');
  for (const [name, text] of [['router', router], ['card', card]]) {
    assert.match(text, /我已经想清楚了/, name);
    assert.match(text, /pm-brainstorm/, name);
    assert.match(text, /pm-clarify/, name);
  }
});

test('priority skill does not assign numbers to unnamed A B C requirements', () => {
  const priority = read('skills/01-demand-insight/pm-priority/SKILL.md');
  assert.match(priority, /A.?B.?C.*(?:占位|代号)/);
  assert.match(priority, /(?:Reach|覆盖人数).*(?:Effort|工作量)/);
});
