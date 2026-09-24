#!/usr/bin/env node
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const skills = path.join(root, 'skills');
const target = path.join(skills, '00-tools/pm-selfcheck/expected-skills.txt');
const names = fs.readdirSync(skills, { recursive: true })
  .filter(entry => entry === 'SKILL.md' || entry.endsWith('/SKILL.md'))
  .map(entry => {
    const text = fs.readFileSync(path.join(skills, entry), 'utf8');
    const name = text.match(/^name:\s*(\S+)/m)?.[1];
    if (!name) throw new Error(`Missing name in ${entry}`);
    return name;
  }).sort();
if (new Set(names).size !== names.length) throw new Error('Duplicate skill names');
const content = names.join('\n') + '\n';
if (process.argv.includes('--write')) {
  fs.writeFileSync(target, content);
} else if (process.argv.includes('--check')) {
  if (!fs.existsSync(target) || fs.readFileSync(target, 'utf8') !== content) {
    console.error('pm-selfcheck expected-skills.txt is out of sync. Run npm run sync:skill-index.');
    process.exit(1);
  }
} else {
  console.error('Usage: node scripts/sync-skill-index.cjs --check|--write');
  process.exit(2);
}
