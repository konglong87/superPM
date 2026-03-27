# Super-PM for OpenCode

Complete guide for using Super-PM with [OpenCode.ai](https://opencode.ai).

## Quick Install

Tell OpenCode:

```
Clone https://github.com/konglong87/super-pm to ~/.config/opencode/super-pm, then create directory ~/.config/opencode/skills, then symlink ~/.config/opencode/super-pm/skills to ~/.config/opencode/skills/super-pm, then restart opencode.
```

## Manual Installation

### Prerequisites

- [OpenCode.ai](https://opencode.ai) installed
- Git installed

### macOS / Linux

```bash
# 1. Install Super-PM (or update existing)
if [ -d ~/.config/opencode/super-pm ]; then
  cd ~/.config/opencode/super-pm && git pull
else
  git clone https://github.com/konglong87/super-pm.git ~/.config/opencode/super-pm
fi

# 2. Create skills directory
mkdir -p ~/.config/opencode/skills

# 3. Remove old symlink if it exists
rm -rf ~/.config/opencode/skills/super-pm

# 4. Create symlink
ln -s ~/.config/opencode/super-pm/skills ~/.config/opencode/skills/super-pm

# 5. Restart OpenCode
```

#### Verify Installation

```bash
ls -l ~/.config/opencode/skills/super-pm
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
git clone https://github.com/konglong87/super-pm.git "%USERPROFILE%\.config\opencode\super-pm"

:: 2. Create skills directory
mkdir "%USERPROFILE%\.config\opencode\skills" 2>nul

:: 3. Remove existing symlink (safe for reinstalls)
rmdir "%USERPROFILE%\.config\opencode\skills\super-pm" 2>nul

:: 4. Create skills junction (works without special privileges)
mklink /J "%USERPROFILE%\.config\opencode\skills\super-pm" "%USERPROFILE%\.config\opencode\super-pm\skills"

:: 5. Restart OpenCode
```

#### PowerShell

Run as Administrator, or with Developer Mode enabled:

```powershell
# 1. Install Super-PM
git clone https://github.com/konglong87/super-pm.git "$env:USERPROFILE\.config\opencode\super-pm"

# 2. Create skills directory
New-Item -ItemType Directory -Force -Path "$env:USERPROFILE\.config\opencode\skills"

# 3. Remove existing symlink (safe for reinstalls)
Remove-Item "$env:USERPROFILE\.config\opencode\skills\super-pm" -Force -ErrorAction SilentlyContinue

# 4. Create skills junction (works without special privileges)
New-Item -ItemType Junction -Path "$env:USERPROFILE\.config\opencode\skills\super-pm" -Target "$env:USERPROFILE\.config\opencode\super-pm\skills"

# 5. Restart OpenCode
```

#### Git Bash

Note: Git Bash's native `ln` command copies files instead of creating symlinks. Use `cmd //c mklink` instead.

```bash
# 1. Install Super-PM
git clone https://github.com/konglong87/super-pm.git ~/.config/opencode/super-pm

# 2. Create skills directory
mkdir -p ~/.config/opencode/skills

# 3. Remove existing symlink (safe for reinstalls)
rm -rf ~/.config/opencode/skills/super-pm 2>/dev/null

# 4. Create skills junction (works without special privileges)
cmd //c "mklink /J \"$(cygpath -w ~/.config/opencode/skills/super-pm)\" \"$(cygpath -w ~/.config/opencode/super-pm/skills)\""

# 5. Restart OpenCode
```

#### WSL Users

If running OpenCode inside WSL, use the [macOS / Linux](#macos--linux) instructions instead.

#### Verify Installation (Windows)

**Command Prompt:**
```cmd
dir /AL "%USERPROFILE%\.config\opencode\skills"
```

**PowerShell:**
```powershell
Get-ChildItem "$env:USERPROFILE\.config\opencode\skills" | Where-Object { $_.LinkType }
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

Use OpenCode's native `skill` tool to list all available skills:

```
use skill tool to list skills
```

### Using a Skill

**Option 1: Direct invocation**
```
use skill tool to load super-pm/pm-demand
```

**Option 2: Natural language**
```
帮我进行需求调研
```

The AI will automatically invoke the relevant skill.

### Personal Skills

Create your own skills in `~/.config/opencode/skills/`:

```bash
mkdir -p ~/.config/opencode/skills/my-skill
```

Create `~/.config/opencode/skills/my-skill/SKILL.md`:

```markdown
---
name: my-skill
description: Use when [condition] - [what it does]
---

# My Skill

[Your skill content here]
```

### Project Skills

Create project-specific skills in your OpenCode project:

```bash
# In your OpenCode project
mkdir -p .opencode/skills/my-project-skill
```

Create `.opencode/skills/my-project-skill/SKILL.md`:

```markdown
---
name: my-project-skill
description: Use when [condition] - [what it does]
---

# My Project Skill

[Your skill content here]
```

## Skill Locations

OpenCode discovers skills from these locations:

1. **Project skills** (`.opencode/skills/`) - Highest priority
2. **Personal skills** (`~/.config/opencode/skills/`)
3. **Super-PM skills** (`~/.config/opencode/skills/super-pm/`) - via symlink

## Core Skills

Super-PM provides 25+ skills for product management:

### 需求洞察模块
- **pm-demand** - 需求调研入口
- **pm-search** - 联网调研整合
- **pm-priority** - 优先级排序
- **pm-mvp** - MVP最小可行产品拆解
- **pm-pool** - 需求池管理
- **pm-journey** - 用户旅程地图

### 方案落地模块
- **pm-docs** - 文档生成（BRD/MRD/PRD）
- **pm-proto** - 原型设计
- **pm-tech** - 技术对接方案
- **pm-feature** - 功能细节拆解
- **pm-data** - 数据指标体系
- **pm-position** - 产品定位
- **pm-commercial** - 商业化方案

### 增长迭代模块
- **pm-aarrr** - 增长分析
- **pm-growth** - 增长方案
- **pm-report** - 数据报告
- **pm-feedback** - 用户反馈分析
- **pm-abtest** - A/B测试方案
- **pm-iteration** - 迭代计划
- **pm-retro** - 迭代复盘

### 风控管理模块
- **pm-agile** - 敏捷管理
- **pm-cross** - 跨部门协作
- **pm-risk** - 风险管控
- **pm-release** - 上线方案
- **pm-change** - 需求变更管理

## Features

### Native Skills Integration

Super-PM uses OpenCode's native `skill` tool for skill discovery and loading. Skills are symlinked into `~/.config/opencode/skills/super-pm/` so they appear alongside your personal and project skills.

### Automatic Workflow

When you describe a product management task, OpenCode will automatically:
1. Detect the relevant skill
2. Load the skill instructions
3. Follow the structured workflow
4. Generate professional documentation

### Document Flow

Skills work together through Markdown documents:
- Previous skill outputs are read as inputs
- Each skill generates structured documents
- Documents are stored in `docs/` directory
- Human-readable and editable

## Updating

```bash
cd ~/.config/opencode/super-pm
git pull
```

Restart OpenCode to load the updates.

## Uninstalling

**macOS / Linux:**
```bash
rm ~/.config/opencode/skills/super-pm
rm -rf ~/.config/opencode/super-pm
```

**Windows (PowerShell):**
```powershell
Remove-Item "$env:USERPROFILE\.config\opencode\skills\super-pm"
Remove-Item -Recurse -Force "$env:USERPROFILE\.config\opencode\super-pm"
```

## Troubleshooting

### Skills not found

1. Verify skills symlink: `ls -l ~/.config/opencode/skills/super-pm` (should point to super-pm/skills/)
2. Use OpenCode's `skill` tool to list available skills
3. Check skill structure: each skill needs a `SKILL.md` file with valid frontmatter
4. Restart OpenCode after installation

### Windows: Module not found error

If you see `Cannot find module` errors on Windows:
- **Cause:** Git Bash `ln -sf` copies files instead of creating symlinks
- **Fix:** Use `mklink /J` directory junctions instead (see Windows installation steps)

### Skills not loading

1. Check OpenCode logs: `opencode run "test" --print-logs --log-level DEBUG`
2. Verify skill files exist: `ls ~/.config/opencode/skills/super-pm/*/SKILL.md`
3. Ensure YAML frontmatter is valid

## Getting Help

- Report issues: https://github.com/konglong87/super-pm/issues
- Main documentation: https://github.com/konglong87/super-pm
- OpenCode docs: https://opencode.ai/docs/

## Testing

Verify your installation:

```bash
# Check skills are discoverable
opencode run "use skill tool to list all skills" 2>&1 | grep -i "pm-"

# Test a skill
opencode run "帮我进行需求调研"
```

The agent should list super-pm skills and be able to use them.