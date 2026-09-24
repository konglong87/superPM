const assert = require('node:assert/strict');
const { test } = require('node:test');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const skillDir = path.join(root, 'skills/00-tools/pm-evidence-audit');
const skill = () => fs.readFileSync(path.join(skillDir, 'SKILL.md'), 'utf8');
const rubric = () => fs.readFileSync(path.join(skillDir, 'references/rubric.md'), 'utf8');

test('evidence audit is a distinct, standalone, read-first skill', () => {
  const text = skill();
  assert.match(text, /^name: pm-evidence-audit$/m);
  assert.match(text, /证据|evidence/i);
  assert.match(text, /pm-prd-review/);
  assert.match(text, /references\/rubric\.md/);
  assert.match(text, /不默认.*(?:写入|修改|覆盖)/);
  assert.match(text, /不联网|禁止联网/);
});

test('the rubric uses one stable set of claim status constants', () => {
  const text = rubric();
  for (const status of ['VERIFIED', 'UNVERIFIED', 'CONFLICTED', 'OUTDATED', 'INFERENCE']) {
    assert.ok(text.includes('| `' + status + '` |'), status);
  }
  assert.match(text, /无来源.*UNVERIFIED|UNVERIFIED.*无来源/);
  assert.match(text, /相互矛盾.*CONFLICTED|CONFLICTED.*相互矛盾/);
  assert.match(text, /来源存在.*不等于.*支持/);
});

test('the output remains traceable and asks for a next verification action', () => {
  const text = skill();
  for (const field of ['CLAIM-', '状态', '来源', '日期', '依据', '下一步']) {
    assert.ok(text.includes(field), `missing ${field}`);
  }
  assert.match(text, /不能.*(?:编造|虚构).*(?:来源|数据)/);
});

test('router distinguishes claim evidence audit from PRD completeness review', () => {
  for (const file of ['skills/start-super-pm/SKILL.md', 'skills/start-super-pm/routing-card.md', 'skills/SKILL.md']) {
    const text = fs.readFileSync(path.join(root, file), 'utf8');
    assert.match(text, /pm-evidence-audit/);
    assert.match(text, /pm-prd-review|文档完整性/);
  }
});
