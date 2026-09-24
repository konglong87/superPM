# Super-PM for Codex

Guide for using Super-PM with OpenAI Codex via native skill discovery.

## Quick Install

Tell Codex:

```
Fetch and follow instructions from https://raw.githubusercontent.com/konglong87/superPM/main/.codex/INSTALL.md
```

Or execute this command directly:

```
Clone https://github.com/konglong87/superPM to ~/.codex/super-pm, then create directory ~/.agents/skills, then symlink ~/.codex/super-pm/skills to ~/.agents/skills/super-pm, then restart codex.
```

## Manual Installation

### Prerequisites

- OpenAI Codex CLI
- Git

### Steps (macOS / Linux)

1. Clone the repo:
   ```bash
   git clone https://github.com/konglong87/superPM.git ~/.codex/super-pm
   ```

2. Create the skills symlink:
   ```bash
   mkdir -p ~/.agents/skills
   ln -s ~/.codex/super-pm/skills ~/.agents/skills/super-pm
   ```

3. Restart Codex.

### Windows

Use a junction instead of a symlink (works without Developer Mode):

```powershell
# 1. Clone the repo
git clone https://github.com/konglong87/superPM.git "$env:USERPROFILE\.codex\super-pm"

# 2. Create skills directory
New-Item -ItemType Directory -Force -Path "$env:USERPROFILE\.agents\skills"

# 3. Create junction
cmd /c mklink /J "$env:USERPROFILE\.agents\skills\super-pm" "$env:USERPROFILE\.codex\super-pm\skills"

# 4. Restart Codex
```

## How It Works

Codex has native skill discovery — it scans `~/.agents/skills/` at startup, parses SKILL.md frontmatter, and loads skills on demand. Super-PM skills are made visible through a single symlink:

```
~/.agents/skills/super-pm/ → ~/.codex/super-pm/skills/
```

Each skill includes:
- YAML frontmatter with trigger conditions
- Structured workflow instructions
- Document generation patterns
- Integration with other skills

## Usage

Skills are discovered automatically. Codex activates them when:
- You mention a skill by name (e.g., "use pm-demand")
- The task matches a skill's description
- You explicitly request a product management workflow

### Example Usage

**需求调研：**
```
帮我做一个新产品的需求调研
```

For a new product, the route checks `/pm-brainstorm` first unless you explicitly skip it or already have a relevant artifact; then `pm-demand` handles research.

**优先级排序：**
```
帮我给这些需求排优先级
```

Codex will use `pm-priority` skill.

**MVP 规划：**
```
规划这个产品的MVP版本
```

Codex will activate `pm-mvp` skill.

### Direct Skill Invocation

You can also explicitly request a skill:

```
Use the pm-demand skill to help me with requirement research for an e-commerce app
```

### Personal Skills

Create your own skills in `~/.agents/skills/`:

```bash
mkdir -p ~/.agents/skills/my-skill
```

Create `~/.agents/skills/my-skill/SKILL.md`:

```markdown
---
name: my-skill
description: Use when [condition] - [what it does]
---

# My Skill

[Your skill content here]
```

The `description` field is how Codex decides when to activate a skill automatically — write it as a clear trigger condition.

## Skill Catalog

Super-PM currently has **49 core/tool skills and six installable workflows** across demand insight, solution design, growth iteration, risk management, product strategy, career development, expert perspectives and five tools. See [`skills/INDEX.md`](../skills/INDEX.md) for the maintained catalog rather than a second copy here.

Core skills are Markdown instructions. The optional `/pm-preview` uses local Node.js and ships its own renderer/sanitizer, with no CDN or `npm install` required. The `npx skills add` installation method itself requires Node.js/npm.

## Workflow Example

Here's a typical product management workflow with Super-PM:

1. **需求调研** → Use `pm-demand`
   - Output: `docs/01-需求调研/需求调研报告.md`

2. **市场分析** → Use `pm-search --type=market`
   - Output: `docs/01-需求调研/市场调研报告.md`

3. **优先级排序** → Use `pm-priority`
   - Output: `docs/01-需求调研/优先级排序报告.md`

4. **MVP规划** → Use `pm-mvp`
   - Output: `docs/01-需求调研/MVP方案.md`

5. **PRD文档** → Use `pm-docs --type=prd`
   - Output: `docs/02-方案设计/PRD产品需求文档.md`

Each skill reads previous outputs and builds upon them.

## Updating

```bash
cd ~/.codex/super-pm && git pull
```

Skills update instantly through the symlink.

## Uninstalling

**macOS / Linux:**
```bash
rm ~/.agents/skills/super-pm
rm -rf ~/.codex/super-pm
```

**Windows (PowerShell):**
```powershell
Remove-Item "$env:USERPROFILE\.agents\skills\super-pm"
Remove-Item -Recurse -Force "$env:USERPROFILE\.codex\super-pm"
```

## Troubleshooting

### Skills not showing up

1. Verify the symlink: `ls -la ~/.agents/skills/super-pm`
2. Check skills exist: `ls ~/.codex/super-pm/skills`
3. Restart Codex — skills are discovered at startup

### Windows junction issues

Junctions normally work without special permissions. If creation fails, try running PowerShell as administrator.

### Skill not activating

- Check the skill's `description` field in SKILL.md
- Try explicit invocation: "use pm-demand"
- Verify the task matches the skill's trigger condition

## Getting Help

- Report issues: https://github.com/konglong87/superPM/issues
- Main documentation: https://github.com/konglong87/superPM
- Codex documentation: https://github.com/openai/codex

## Testing

Test your installation:

```bash
# Test basic skill discovery
codex "list available skills"

# Test skill invocation
codex "use pm-demand to help me design a food delivery app"
```

Codex should recognize and use the super-pm skills.