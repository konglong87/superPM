const assert = require('node:assert/strict');
const { test } = require('node:test');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const skillPath = path.join(root, 'skills/00-tools/prompt-pe/SKILL.md');
const skill = fs.readFileSync(skillPath, 'utf8');

function section(name) {
  const start = skill.indexOf(`## ${name}`);
  const end = skill.indexOf('## Red Flags - STOP and Clarify', start);
  assert.ok(start >= 0, `missing section: ${name}`);
  assert.ok(end > start, `section boundary missing: ${name}`);
  return skill.slice(start, end);
}

test('prompt-pe is a standalone prompt enhancement tool with repository metadata', () => {
  assert.match(skill, /^name: prompt-pe$/m);
  assert.match(skill, /^description: \|$/m);
  assert.match(skill, /explicitly invokes \/prompt-pe/);
  assert.match(skill, /leave existing super-pm\/start-super-pm routing unchanged/);
  assert.match(skill, /^allowed-tools:\n  - Read\n  - AskUserQuestion$/m);
  assert.match(skill, /^# Prompt PE（提示词具象化增强器）$/m);
  assert.doesNotMatch(skill, /name: prompt-enhancer/);
});

test('prompt-pe converts clarification into a reusable structured prompt', () => {
  const contract = section('Prompt PE 输出契约');
  for (const heading of [
    '## 角色',
    '## 目标',
    '## 背景',
    '## 具体任务',
    '## 关键实体与术语',
    '## 约束条件',
    '## 输出要求',
    '## 验收标准',
    '## 非目标'
  ]) {
    assert.match(contract, new RegExp(`^${heading.replace(/[.*+?^${}()|[\\]\\]/g, '\\$&')}$`, 'm'));
  }
  assert.match(contract, /只提问当前价值最高的 3～5 个问题/);
  assert.match(contract, /不得把猜测写成确定事实/);
});

test('prompt-pe is not wired into a workflow or router', () => {
  const workflowRoots = [
    path.join(root, 'skills/workflows'),
    path.join(root, 'commands'),
    path.join(root, 'skills/start-super-pm')
  ];
  for (const directory of workflowRoots) {
    const files = fs.readdirSync(directory, { recursive: true })
      .filter(entry => entry.endsWith('.md'));
    for (const file of files) {
      const content = fs.readFileSync(path.join(directory, file), 'utf8');
      assert.doesNotMatch(content, /prompt-pe/, `${path.relative(root, path.join(directory, file))} wires prompt-pe`);
    }
  }
});
