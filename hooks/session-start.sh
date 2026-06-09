#!/usr/bin/env bash
# SessionStart hook for super-pm plugin

set -euo pipefail

# Determine plugin root directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]:-$0}")" && pwd)"
PLUGIN_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"

# Check for project-specific PM configuration
project_config_message=""
if [ -f "PM-CLAUDE.md" ]; then
    # Read project configuration
    project_config=$(cat "PM-CLAUDE.md" 2>/dev/null || true)
    if [ -n "$project_config" ]; then
        project_config_message="\n\n<project-pm-context>\n**Project-specific PM Configuration:**\n\`\`\`markdown\n${project_config}\n\`\`\`\n</project-pm-context>"
    fi
fi

# Check for existing docs directory and provide status
docs_status_message=""
if [ -d "docs" ]; then
    # Check what stages have been completed
    completed_stages=""
    [ -d "docs/01-需求调研" ] && completed_stages="${completed_stages}- ✅ 需求洞察阶段\n"
    [ -d "docs/02-方案设计" ] && completed_stages="${completed_stages}- ✅ 方案落地阶段\n"
    [ -d "docs/03-增长迭代" ] && completed_stages="${completed_stages}- ✅ 增长迭代阶段\n"
    [ -d "docs/04-风控管理" ] && completed_stages="${completed_stages}- ✅ 风控管理阶段\n"

    if [ -n "$completed_stages" ]; then
        docs_status_message="\n\n<pm-progress>\n**📊 Current PM Workflow Progress:**\n${completed_stages}\nUse \`/pm-status\` to see detailed progress and recommended next steps.\n</pm-progress>"
    fi
fi

# Read start-super-pm content
start_super_pm_content=$(cat "${PLUGIN_ROOT}/skills/start-super-pm/SKILL.md" 2>/dev/null || true)

# Escape string for JSON embedding using bash parameter substitution
escape_for_json() {
    local s="$1"
    s="${s//\\/\\\\}"
    s="${s//\"/\\\"}"
    s="${s//$'\n'/\\n}"
    s="${s//$'\r'/\\r}"
    s="${s//$'\t'/\\t}"
    s="${s//\$/\\\$}"
    s="${s//\`/\\\`}"
    printf '%s' "$s"
}

start_super_pm_escaped=$(escape_for_json "$start_super_pm_content")
project_config_escaped=$(escape_for_json "$project_config_message")
docs_status_escaped=$(escape_for_json "$docs_status_message")

# Build quick reference card
snapshot_card_raw=$(cat <<'CARD_EOF'
## 🃏 super-pm 速查卡片（每次必看）

| 用户说了什么 | 你的路由 |
|---|---|
| **"我想做一个XX"** / "帮我规划" / "从零开始" + 产品形态词(社区/app/小程序等) | → /pm-brainstorm （先发散，再收敛） |
| **"写需求文档"** / "写PRD" / "写产品文档" | → 先检查前置文档！无则 → /pm-brainstorm → /pm-demand → /pm-docs |
| **"验证这个需求"** / "调研XX痛点" | → /pm-demand （方向明确，直接验证） |
| **"分析竞品"** / "市场多大" | → /pm-market 或 /pm-search |

**核心原则**: 文档是产出不是起点 | 想法模糊先 brainstorm | 方向明确再 demand
CARD_EOF
)
snapshot_card_escaped=$(escape_for_json "$snapshot_card_raw")

# Build the full context string
session_context="<EXTREMELY_IMPORTANT>\nYou have super-pm - a Product Manager Skills Pack.\n\n**Below is the full content of your 'start-super-pm' skill - your introduction to using PM skills. For all other skills, use the 'Skill' tool:**\n\n${start_super_pm_escaped}\n${project_config_escaped}\n${docs_status_escaped}\n${snapshot_card_escaped}\n</EXTREMELY_IMPORTANT>"

# Output context injection as JSON.
# Claude Code: hookSpecificOutput.additionalContext (nested object)
# Cursor: additional_context (snake_case, top-level)
# Other platforms (Copilot CLI etc.): additionalContext (camelCase, top-level, SDK standard)
if [ -n "${CURSOR_PLUGIN_ROOT:-}" ]; then
  printf '{\n  "additional_context": "%s"\n}\n' "$session_context"
elif [ -n "${CLAUDE_PLUGIN_ROOT:-}" ] && [ -z "${COPILOT_CLI:-}" ]; then
  printf '{\n  "hookSpecificOutput": {\n    "hookEventName": "SessionStart",\n    "additionalContext": "%s"\n  }\n}\n' "$session_context"
else
  printf '{\n  "additionalContext": "%s"\n}\n' "$session_context"
fi

exit 0