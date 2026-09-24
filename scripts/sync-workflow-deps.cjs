#!/usr/bin/env node
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const contract = JSON.parse(fs.readFileSync(path.join(root, 'skills/_shared/workflow-contract.json'), 'utf8'));
const source = 'https://github.com/konglong87/superPM';
const start = '<!-- workflow-deps:start -->';
const end = '<!-- workflow-deps:end -->';
const check = process.argv.includes('--check');
const write = process.argv.includes('--write');
if (check === write) {
  console.error('Usage: node scripts/sync-workflow-deps.cjs --check|--write');
  process.exit(2);
}

function render(name, steps) {
  const ideaGate = contract.ideaGate.appliesTo.includes(name);
  const bundle = [name, ...steps, ...(ideaGate ? [contract.ideaGate.newIdea] : [])];
  const lines = [
    start,
    '## 安装依赖预检（执行工作流之前）',
    '',
    `本工作流入口 **${name}** 只负责编排；单独安装它**不会**自动安装所调用的技能。`,
    `必需技能：${steps.map(skill => `\`${skill}\``).join('、')}。`,
    ...(ideaGate ? [`新产品额外需要 \`${contract.ideaGate.newIdea}\`；仅在已有相关头脑风暴产物或用户明确跳过时可不调用它。`] : []),
    '',
    '先用当前平台的技能列表检查必需技能是否可用。**若缺少依赖，停止工作流**，不要假装已执行；告知用户缺少的技能并给出安装方式。不要擅自安装或跳过。',
    '完整安装命令（只装本入口并不够）：',
    '',
    '```bash',
    `npx skills add ${source} --skill ${bundle.join(' ')}`,
    '```',
    '',
    '没有 Node.js/npm 时，可按仓库 README 手动安装完整技能包；安装后重新检查技能列表，再继续流程。',
    end
  ];
  return lines.join('\n');
}

let outOfSync = false;
for (const [name, steps] of Object.entries(contract.commands)) {
  const file = path.join(root, 'skills/workflows', name, 'SKILL.md');
  const original = fs.readFileSync(file, 'utf8');
  const block = render(name, steps);
  let updated;
  if (original.includes(start) && original.includes(end)) {
    const before = original.slice(0, original.indexOf(start));
    const after = original.slice(original.indexOf(end) + end.length);
    updated = before + block + after;
  } else {
    const frontmatterEnd = original.indexOf('\n---\n', 4);
    if (frontmatterEnd < 0) throw new Error(`Missing YAML frontmatter: ${file}`);
    const split = frontmatterEnd + '\n---\n'.length;
    updated = original.slice(0, split) + '\n' + block + '\n' + original.slice(split);
  }
  if (original !== updated) {
    outOfSync = true;
    if (write) fs.writeFileSync(file, updated);
    else console.error(`Out of sync: ${path.relative(root, file)}`);
  }
}
if (check && outOfSync) process.exit(1);
if (write) console.log('Workflow dependency preflights synchronized.');
