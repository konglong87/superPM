/**
 * Super-PM plugin for Codex CLI
 *
 * Codex uses native skill discovery from ~/.agents/skills/
 * This plugin provides bootstrap injection via system prompt transform.
 */

import path from 'path';
import fs from 'fs';
import os from 'os';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Simple frontmatter extraction
const extractAndStripFrontmatter = (content) => {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { frontmatter: {}, content };

  const frontmatterStr = match[1];
  const body = match[2];
  const frontmatter = {};

  for (const line of frontmatterStr.split('\n')) {
    const colonIdx = line.indexOf(':');
    if (colonIdx > 0) {
      const key = line.slice(0, colonIdx).trim();
      const value = line.slice(colonIdx + 1).trim().replace(/^["']|["']$/g, '');
      frontmatter[key] = value;
    }
  }

  return { frontmatter, content: body };
};

export const SuperPMPlugin = async ({ client, directory }) => {
  const homeDir = os.homedir();
  const superPMSkillsDir = path.resolve(__dirname, '../../skills');

  // Helper to generate bootstrap content
  const getBootstrapContent = () => {
    const skillPath = path.join(superPMSkillsDir, 'start-super-pm', 'SKILL.md');
    if (!fs.existsSync(skillPath)) return null;

    const fullContent = fs.readFileSync(skillPath, 'utf8');
    const { content } = extractAndStripFrontmatter(fullContent);

    const toolMapping = `**Tool Mapping for Codex:**
When skills reference tools, use Codex native equivalents:
- \`TodoWrite\` → Task tracking system
- \`Task\` tool with subagents → Codex subagent system
- \`Skill\` tool → Codex native skill loading
- \`Read\`, \`Write\`, \`Edit\`, \`Bash\` → Your native tools

**Skills location:**
Super-PM skills are in \`~/.agents/skills/super-pm/\`
Codex will discover them automatically at startup.`;

    return `<EXTREMELY_IMPORTANT>
You have Super-PM - Product Manager Skills Pack for full lifecycle support.

**IMPORTANT: The start-super-pm skill content is included below. It is ALREADY LOADED - you are currently following it. Do NOT load "start-super-pm" again - that would be redundant.**

${content}

${toolMapping}
</EXTREMELY_IMPORTANT>`;
  };

  return {
    // Inject bootstrap via system prompt transform
    'experimental.chat.system.transform': async (_input, output) => {
      const bootstrap = getBootstrapContent();
      if (bootstrap) {
        (output.system ||= []).push(bootstrap);
      }
    }
  };
};