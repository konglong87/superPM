# Super-PM for Cursor

Guide for using Super-PM with Cursor editor.

## Quick Install

Tell Cursor:

```
Clone https://github.com/konglong87/super-pm to ~/.cursor/super-pm, create directory ~/.cursor/skills, symlink ~/.cursor/super-pm/skills to ~/.cursor/skills/super-pm, then restart Cursor.
```

## Manual Installation

### Prerequisites

- Cursor editor installed
- Git installed

### macOS / Linux

```bash
# 1. Install Super-PM (or update existing)
if [ -d ~/.cursor/super-pm ]; then
  cd ~/.cursor/super-pm && git pull
else
  git clone https://github.com/konglong87/super-pm.git ~/.cursor/super-pm
fi

# 2. Create skills directory
mkdir -p ~/.cursor/skills

# 3. Remove old symlink if it exists
rm -rf ~/.cursor/skills/super-pm

# 4. Create symlink
ln -s ~/.cursor/super-pm/skills ~/.cursor/skills/super-pm

# 5. Restart Cursor
```

#### Verify Installation

```bash
ls -l ~/.cursor/skills/super-pm
```

Should show a symlink pointing to the super-pm/skills directory.

### Windows

**Prerequisites:**
- Git installed
- Either **Developer Mode** enabled OR **Administrator privileges**
  - Windows 10: Settings → Update & Security → For developers
  - Windows 11: Settings → System → For developers

Pick your shell below: [Command Prompt](#command-prompt) | [PowerShell](#powershell) | [Git Bash](#git-bash)

#### Command Prompt

Run as Administrator, or with Developer Mode enabled:

```cmd
:: 1. Install Super-PM
git clone https://github.com/konglong87/super-pm.git "%USERPROFILE%\.cursor\super-pm"

:: 2. Create skills directory
mkdir "%USERPROFILE%\.cursor\skills" 2>nul

:: 3. Remove existing symlink (safe for reinstalls)
rmdir "%USERPROFILE%\.cursor\skills\super-pm" 2>nul

:: 4. Create skills junction (works without special privileges)
mklink /J "%USERPROFILE%\.cursor\skills\super-pm" "%USERPROFILE%\.cursor\super-pm\skills"

:: 5. Restart Cursor
```

#### PowerShell

Run as Administrator, or with Developer Mode enabled:

```powershell
# 1. Install Super-PM
git clone https://github.com/konglong87/super-pm.git "$env:USERPROFILE\.cursor\super-pm"

# 2. Create skills directory
New-Item -ItemType Directory -Force -Path "$env:USERPROFILE\.cursor\skills"

# 3. Remove existing symlink (safe for reinstalls)
Remove-Item "$env:USERPROFILE\.cursor\skills\super-pm" -Force -ErrorAction SilentlyContinue

# 4. Create skills junction (works without special privileges)
New-Item -ItemType Junction -Path "$env:USERPROFILE\.cursor\skills\super-pm" -Target "$env:USERPROFILE\.cursor\super-pm\skills"

# 5. Restart Cursor
```

#### Git Bash

Note: Git Bash's native `ln` command copies files instead of creating symlinks. Use `cmd //c mklink` instead.

```bash
# 1. Install Super-PM
git clone https://github.com/konglong87/super-pm.git ~/.cursor/super-pm

# 2. Create skills directory
mkdir -p ~/.cursor/skills

# 3. Remove existing symlink (safe for reinstalls)
rm -rf ~/.cursor/skills/super-pm 2>/dev/null

# 4. Create skills junction (works without special privileges)
cmd //c "mklink /J \"$(cygpath -w ~/.cursor/skills/super-pm)\" \"$(cygpath -w ~/.cursor/super-pm/skills)\""

# 5. Restart Cursor
```

#### WSL Users

If running Cursor inside WSL, use the [macOS / Linux](#macos--linux) instructions instead.

#### Verify Installation (Windows)

**Command Prompt:**
```cmd
dir /AL "%USERPROFILE%\.cursor\skills"
```

**PowerShell:**
```powershell
Get-ChildItem "$env:USERPROFILE\.cursor\skills" | Where-Object { $_.LinkType }
```

Look for `<JUNCTION>` in the output.

#### Troubleshooting Windows

**"You do not have sufficient privilege" error:**
- Enable Developer Mode in Windows Settings, OR
- Right-click your terminal → "Run as Administrator"

**"Cannot create a file when that file already exists":**
- Run the removal commands (step 3) first, then retry

**Symlinks not working after git clone:**
- Run `git config --global core.symlinks true` and re-clone

## Usage

### Finding Skills

In Cursor's AI chat, ask to list available skills:

```
list all available skills
```

### Using a Skill

**Option 1: Natural language**
```
帮我进行需求调研，设计一个电商小程序
```

Cursor will automatically invoke the `pm-demand` skill.

**Option 2: Explicit invocation**
```
use the pm-demand skill to help with requirement research
```

**Option 3: By description**
```
我需要分析市场数据和竞品情况
```

Cursor will recognize this matches `pm-search` skill.

### Personal Skills

Create your own skills in `~/.cursor/skills/`:

```bash
mkdir -p ~/.cursor/skills/my-skill
```

Create `~/.cursor/skills/my-skill/SKILL.md`:

```markdown
---
name: my-skill
description: Use when [condition] - [what it does]
---

# My Skill

[Your skill content here]
```

### Project Skills

Create project-specific skills in your Cursor project:

```bash
# In your Cursor project
mkdir -p .cursor/skills/my-project-skill
```

Create `.cursor/skills/my-project-skill/SKILL.md`:

```markdown
---
name: my-project-skill
description: Use when [condition] - [what it does]
---

# My Project Skill

[Your skill content here]
```

## Skill Locations

Cursor discovers skills from these locations:

1. **Project skills** (`.cursor/skills/`) - Highest priority
2. **Personal skills** (`~/.cursor/skills/`)
3. **Super-PM skills** (`~/.cursor/skills/super-pm/`) - via symlink

## Core Skills

Super-PM provides 37 skills across 5 modules:

### 需求洞察模块 (9 skills)
- **pm-demand** - 需求调研入口
- **pm-brainstorm** - 头脑风暴
- **pm-clarify** - 需求细化与验证
- **pm-market** - 市场分析
- **pm-search** - 联网调研整合
- **pm-priority** - 优先级排序
- **pm-mvp** - MVP规划
- **pm-pool** - 需求池管理
- **pm-journey** - 用户旅程地图

### 方案设计模块 (7 skills)
- **pm-docs** - 文档生成（BRD/MRD/PRD）
- **pm-proto** - 原型设计
- **pm-tech** - 技术对接方案
- **pm-feature** - 功能细节拆解
- **pm-data** - 数据指标体系
- **pm-position** - 产品定位
- **pm-user-story** - 用户故事

### 增长迭代模块 (8 skills)
- **pm-aarrr** - AARRR增长分析
- **pm-growth** - 增长方案
- **pm-report** - 数据报告
- **pm-feedback** - 用户反馈分析
- **pm-abtest** - A/B测试方案
- **pm-iteration** - 迭代计划
- **pm-retro** - 迭代复盘
- **pm-roadmap** - 产品路线图

### 风控管理模块 (5 skills)
- **pm-agile** - 敏捷管理
- **pm-cross** - 跨部门协作
- **pm-risk** - 风险管控
- **pm-release** - 上线方案
- **pm-change** - 需求变更管理

### 产品策略模块 (5 skills)
- **pm-business-model** - 商业模式画布
- **pm-decision** - 战略决策支持
- **pm-funnel** - 漏斗分析优化
- **pm-portfolio** - 产品组合管理
- **pm-resource** - 资源分配与ROI

## Typical Workflow

Here's how to use Super-PM skills in Cursor for a complete product workflow:

### 1. 需求调研 (Requirement Research)
```
帮我做一个生鲜电商小程序的需求调研
```
Output: `docs/01-需求调研/需求调研报告.md`

### 2. 市场分析 (Market Research)
```
分析生鲜电商市场的竞品情况
```
Output: `docs/01-需求调研/市场调研报告.md`

### 3. 优先级排序 (Priority Sorting)
```
给这些需求排优先级
```
Output: `docs/01-需求调研/优先级排序报告.md`

### 4. MVP规划 (MVP Planning)
```
规划这个产品的MVP版本
```
Output: `docs/01-需求调研/MVP方案.md`

### 5. PRD文档 (PRD Generation)
```
生成PRD产品需求文档
```
Output: `docs/02-方案设计/PRD产品需求文档.md`

Each skill automatically reads previous outputs and builds upon them.

## Features

### Automatic Skill Discovery

Cursor scans the skills directory at startup and parses SKILL.md frontmatter to understand when to activate each skill.

### Document Flow

Skills work together through Markdown documents:
- Each skill generates structured documentation
- Outputs are stored in `docs/` directory
- Human-readable and editable
- Previous outputs serve as inputs for next skills

### Lightweight Design

- Pure Markdown instructions, no code dependencies
- Relies on AI understanding, not complex logic
- Each SKILL.md is 100-300 lines
- Fast execution (< 30 seconds typically)

## Updating

```bash
cd ~/.cursor/super-pm
git pull
```

Restart Cursor to load the updates.

## Uninstalling

**macOS / Linux:**
```bash
rm ~/.cursor/skills/super-pm
rm -rf ~/.cursor/super-pm
```

**Windows (PowerShell):**
```powershell
Remove-Item "$env:USERPROFILE\.cursor\skills\super-pm"
Remove-Item -Recurse -Force "$env:USERPROFILE\.cursor\super-pm"
```

## Troubleshooting

### Skills not found

1. Verify skills symlink: `ls -l ~/.cursor/skills/super-pm` (should point to super-pm/skills/)
2. Check skill files: `ls ~/.cursor/skills/super-pm/*/SKILL.md`
3. Restart Cursor after installation
4. Try asking Cursor to "list available skills"

### Windows: Junction issues

If you see errors creating junctions:
- **Cause:** Insufficient privileges
- **Fix:** Run PowerShell as Administrator or enable Developer Mode

### Skills not activating

- Check the skill's `description` in SKILL.md
- Use more specific language matching the skill's trigger
- Try explicit invocation: "use the pm-demand skill"

## Getting Help

- Report issues: https://github.com/konglong87/super-pm/issues
- Main documentation: https://github.com/konglong87/super-pm
- Cursor documentation: https://cursor.sh/docs

## Testing

Test your installation in Cursor's AI chat:

```
# Test skill discovery
list all available pm skills

# Test skill invocation
use pm-demand to help me design a food delivery app

# Test natural language
我需要做一个需求调研
```

Cursor should recognize and use the super-pm skills.