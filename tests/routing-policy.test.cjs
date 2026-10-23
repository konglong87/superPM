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


test('discussion routing distinguishes positioning from new-product brainstorming', () => {
  const scenarios = JSON.parse(read('evals/scenarios.json'));
  const positioning = scenarios.find(item => item.id === 'discussion-only');
  const brainstorming = scenarios.find(item => item.id === 'brainstorm-discussion-only');
  assert.equal(positioning.expectedRoute, 'pm-position');
  assert.match(positioning.prompt, /已有产品/);
  assert.equal(brainstorming.expectedRoute, 'pm-brainstorm');
  assert.match(brainstorming.prompt, /还没有确定/);
});

test('deep-talk stays distinct from brainstorm and only composes when requested', () => {
  const deepTalk = read('skills/01-demand-insight/pm-deep-talk/SKILL.md');
  const brainstorm = read('skills/01-demand-insight/pm-brainstorm/SKILL.md');
  const router = read('skills/start-super-pm/SKILL.md');
  const card = read('skills/start-super-pm/routing-card.md');

  assert.match(deepTalk, /目标与价值/);
  assert.match(deepTalk, /证据与替代方案/);
  assert.match(deepTalk, /分析视角/);
  assert.match(deepTalk, /每轮只问一个问题/);
  assert.match(deepTalk, /已核实事实、用户决策和待验证假设/);
  assert.match(deepTalk, /事实.*假设.*决策/s);
  assert.match(deepTalk, /尊重用户.*停止|用户说停止/);
  assert.match(router, /pm-deep-talk/);
  assert.match(card, /pm-deep-talk/);
  assert.match(brainstorm, /明确要求.*进一步分析|主动要求分析可行性/);
  assert.match(brainstorm, /不是默认|不得默认追加盘问/);
});

test('deep-talk routing does not hijack open-ended ideation or fact-finding', () => {
  const router = read('skills/start-super-pm/SKILL.md');
  const deepTalk = read('skills/01-demand-insight/pm-deep-talk/SKILL.md');
  assert.match(router, /想法尚未成形.*pm-brainstorm/);
  assert.match(router, /事实调研.*对应技能/);
  assert.match(deepTalk, /还没有方向.*pm-brainstorm/);
  assert.match(deepTalk, /只需要事实调研.*对应 skill/);
});

test('deep-talk evaluation scenarios cover routing, interaction, evidence and composition', () => {
  const scenarios = JSON.parse(read('evals/scenarios.json'));
  const deepTalkScenarios = scenarios.filter(item => item.expectedRoute === 'pm-deep-talk');
  assert.equal(deepTalkScenarios.length, 4);
  assert.ok(deepTalkScenarios.some(item => item.id === 'deep-talk-explicit-plan-review'));
  assert.ok(deepTalkScenarios.some(item => item.id === 'deep-talk-facts-are-agent-work'));
  assert.ok(deepTalkScenarios.some(item => item.id === 'deep-talk-respects-stop-and-surfaces-open-items'));
  assert.ok(deepTalkScenarios.some(item => item.id === 'deep-talk-optional-from-brainstorm'));
});
