# Super-PM for Codex

Guide for using Super-PM with OpenAI Codex via native skill discovery.

## Quick Install

Tell Codex:

```
Fetch and follow instructions from https://raw.githubusercontent.com/konglong87/super-pm/main/.codex/INSTALL.md
```

Or execute this command directly:

```
Clone https://github.com/konglong87/super-pm to ~/.codex/super-pm, then create directory ~/.agents/skills, then symlink ~/.codex/super-pm/skills to ~/.agents/skills/super-pm, then restart codex.
```

## Manual Installation

### Prerequisites

- OpenAI Codex CLI
- Git

### Steps (macOS / Linux)

1. Clone the repo:
   ```bash
   git clone https://github.com/konglong87/super-pm.git ~/.codex/super-pm
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
git clone https://github.com/konglong87/super-pm.git "$env:USERPROFILE\.codex\super-pm"

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

Codex will automatically invoke `pm-demand` skill.

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

## Core Skills

Super-PM provides 37 skills across 5 modules:

### 需求洞察模块 (9 skills)
- **pm-demand** - 需求调研入口，收集用户痛点
- **pm-brainstorm** - 头脑风暴
- **pm-clarify** - 需求细化与验证
- **pm-market** - 市场分析
- **pm-search** - 联网调研整合（市场/竞品/数据/舆情/合规）
- **pm-priority** - 优先级排序（RICE/KANO/MoSCoW）
- **pm-mvp** - MVP最小可行产品拆解
- **pm-pool** - 需求池管理
- **pm-journey** - 用户旅程地图

### 方案设计模块 (7 skills)
- **pm-docs** - 文档生成（BRD/MRD/PRD）
- **pm-proto** - 原型设计方案
- **pm-tech** - 技术对接方案
- **pm-feature** - 功能细节拆解
- **pm-data** - 数据指标体系
- **pm-position** - 产品定位
- **pm-user-story** - 用户故事

### 增长迭代模块 (8 skills)
- **pm-aarrr** - AARRR增长分析
- **pm-growth** - 增长执行方案
- **pm-report** - 数据报告（周报/月报/季报）
- **pm-feedback** - 用户反馈分析
- **pm-abtest** - A/B测试方案
- **pm-iteration** - 迭代计划
- **pm-retro** - 迭代复盘
- **pm-roadmap** - 产品路线图

### 风控管理模块 (5 skills)
- **pm-agile** - 敏捷管理
- **pm-cross** - 跨部门协作
- **pm-risk** - 风险管控
- **pm-release** - 上线执行方案
- **pm-change** - 需求变更管理

### 产品策略模块 (5 skills)
- **pm-business-model** - 商业模式画布
- **pm-decision** - 战略决策支持
- **pm-funnel** - 漏斗分析优化
- **pm-portfolio** - 产品组合管理
- **pm-resource** - 资源分配与ROI

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

- Report issues: https://github.com/konglong87/super-pm/issues
- Main documentation: https://github.com/konglong87/super-pm
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