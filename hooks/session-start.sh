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
        docs_status_message="\n\n<pm-progress>\n**📊 Current PM Workflow Progress:**\n${completed_stages}\nUse \`/pm-selfcheck\` to see detailed progress and recommended next steps.\n</pm-progress>"
    fi
fi

# Escape string for JSON embedding using bash parameter substitution
escape_for_json() {
    local s="$1"
    s="${s//\\/\\\\}"
    s="${s//\"/\\\"}"
    s="${s//$'\n'/\\n}"
    s="${s//$'\r'/\\r}"
    s="${s//$'\t'/\\t}"
    printf '%s' "$s"
}

project_config_escaped=$(escape_for_json "$project_config_message")
docs_status_escaped=$(escape_for_json "$docs_status_message")

