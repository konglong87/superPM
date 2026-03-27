/**
 * Super-PM plugin for Cursor editor
 *
 * Injects super-pm bootstrap context via system prompt transform.
 * Skills are discovered from the symlinked skills directory.
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
  const configDir = path.join(homeDir, '.cursor');

  // Helper to generate bootstrap content
  const getBootstrapContent = () => {
    const skillPath = path.join(superPMSkillsDir, 'start-super-pm', 'SKILL.md');
    if (!fs.existsSync(skillPath)) return null;

    const fullContent = fs.readFileSync(skillPath, 'utf8');
    const { content } = extractAndStripFrontmatter(fullContent);

    const toolMapping = `**Tool Mapping for Cursor:**
When skills reference tools, use Cursor native equivalents:
- \`TodoWrite\` → Task tracking in Cursor
- \`Task\` tool with subagents → Cursor's multi-agent system
- \`Skill\` tool → Cursor's native skill loading
- \`Read\`, \`Write\`, \`Edit\`, \`Bash\` → Your native tools

**Skills location:**
Super-PM skills are in \`${configDir}/skills/super-pm/\`
Cursor will discover them from the symlinked directory.`;

    return `<EXTREMELY_IMPORTANT>
You have Super-PM - Product Manager Skills Pack for full lifecycle product management support.

**IMPORTANT: The start-super-pm skill content is included below. It is ALREADY LOADED - you are currently following it. Do NOT use the skill tool to load "start-super-pm" again - that would be redundant.**

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