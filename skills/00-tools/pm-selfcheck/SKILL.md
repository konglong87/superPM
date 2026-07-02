---
name: pm-selfcheck
description: |
  Use when: 需要检查super-pm skills健康状态、定期维护审计、验证元数据完整性
  Do NOT use when: 正在使用某个功能skill、仅需执行产品管理任务
allowed-tools:
  - Read
  - Bash
---

## Preamble

```bash
bash "$(dirname "${BASH_SOURCE[0]}")"/check-update.sh 2>/dev/null || true
# 读取技能包版本号
SKILL_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" 2>/dev/null && pwd)" || true
if [ -f "$SKILL_ROOT/VERSION" ]; then echo "📦 super-pm $(cat "$SKILL_ROOT/VERSION")"; fi
echo "🔍 pm-selfcheck v1.0"
echo "正在扫描 super-pm 健康状态..."
echo ""
```

---

## 检查项

### 1. 元数据完整性

扫描所有 SKILL.md，检查：
- `name:` 字段是否缺失
- `description:` 字段是否缺失
- `allowed-tools:` 字段是否缺失
- VERSION 文件是否存在且格式正确

### 2. 体积检查

| 评级 | 范围 | 状态 |
|------|------|------|
| ⚠️ 超大 | > 600行 | 需要拆分 |
| ✅ 标准 | 200-600行 | 健康 |
| ⚠️ 薄弱 | < 100行 | 需要补充 |

### 3. 文档路径一致性

扫描所有 `docs/` 引用，检查：
- 中文路径：`docs/01-需求调研/`、`docs/02-方案设计/` 等
- 英文路径：`docs/01-demand-insight/` 等
- 是否存在引用异常（如根目录 `docs/xxx.md`）

### 4. 搜索依赖检测

检查搜索增强工具是否可用：

```bash
echo "=== 4. 搜索依赖检测 ==="

# AnySearch skill 检测
ANYSEARCH_FOUND=false
for candidate in \
  "$HOME/.claude/skills/anysearch/scripts/anysearch_cli.py" \
  "$HOME/.opencode/skills/anysearch/scripts/anysearch_cli.py" \
  "$HOME/.openclaw/skills/anysearch/scripts/anysearch_cli.py" \
  "$HOME/.cursor/skills/anysearch/scripts/anysearch_cli.py" \
  "$HOME/.anysearch/scripts/anysearch_cli.py"; do
  if [ -f "$candidate" ]; then
    ANYSEARCH_FOUND=true
    echo "✅ AnySearch: 已安装 ($candidate)"
    break
  fi
done
if [ "$ANYSEARCH_FOUND" = false ]; then
  echo "❌ AnySearch: 未安装（搜索将降级到 Exa MCP / WebSearch）"
  echo "   安装: git clone https://github.com/konglong87/anysearch.git ~/.claude/skills/anysearch"
fi

# Exa MCP 检测（检查 settings.json 中是否配置了 mcpServers.exa）
EXA_FOUND=false
for settings_file in \
  ".claude/settings.json" \
  "$HOME/.claude/settings.json"; do
  if [ -f "$settings_file" ] && grep -q '"exa"' "$settings_file" 2>/dev/null; then
    EXA_FOUND=true
    echo "✅ Exa MCP: 已配置 ($settings_file)"
    break
  fi
done
if [ "$EXA_FOUND" = false ]; then
  echo "❌ Exa MCP: 未配置（搜索将降级到 WebSearch）"
  echo "   配置: 在 .claude/settings.json 中添加 mcpServers.exa"
fi

# WebSearch 始终可用
echo "✅ WebSearch: 内置兜底，始终可用"
```

### 5. 跨 Agent 兜底覆盖率

扫描所有使用 `AskUserQuestion` 的 SKILL.md，检查：
- 是否包含 `跨 Agent 交互规则` 章节
- 兜底规则是否完整（6 条规则全部覆盖）
- 统计覆盖率：有兜底规则的 skill 数 / 使用 AskUserQuestion 的 skill 总数

```bash
echo "=== 5. 跨 Agent 兜底覆盖率 ==="
total=0
covered=0
for f in $(find ~/.claude/skills/super-pm -name 'SKILL.md' | sort); do
  if grep -q 'AskUserQuestion' "$f"; then
    total=$((total+1))
    if grep -q '跨 Agent 交互规则' "$f"; then
      covered=$((covered+1))
    else
      dir=$(dirname "$f" | sed 's|.*/super-pm/||')
      echo "❌ $dir: 缺少跨 Agent 兜底规则"
    fi
  fi
done
echo "覆盖率: ${covered}/${total}"
if [ "$covered" -eq "$total" ]; then
  echo "✅ 所有 AskUserQuestion skill 均有跨 Agent 兜底规则"
else
  echo "⚠️  有 $((total-covered)) 个 skill 缺少兜底规则"
fi
```

### 6. 输出建议

根据扫描结果给出维护建议。

---

## 执行检查

执行以下命令收集数据：

```bash
echo "=== 1. 元数据完整性 ==="
for f in $(find ~/.claude/skills/super-pm -name 'SKILL.md' | sort); do
  dir=$(dirname "$f" | sed 's|.*/super-pm/||')
  missing=""
  grep -q '^name:' "$f" || missing="$missing name"
  grep -q '^description:' "$f" || missing="$missing description"
  grep -q 'allowed-tools:' "$f" || missing="$missing allowed-tools"
# VERSION 文件检查
VERSION_FILE="$(dirname "$(dirname "$f")")/VERSION"
if [ ! -f "$VERSION_FILE" ]; then
  echo "❌ VERSION 文件缺失"
fi
  if [ -n "$missing" ]; then
    echo "❌ $dir 缺失:$missing"
  fi
done

echo ""
echo "=== 2. 体积检查 ==="
for f in $(find ~/.claude/skills/super-pm -name 'SKILL.md' | sort); do
  dir=$(dirname "$f" | sed 's|.*/super-pm/||' | sed 's|/|/|')
  lines=$(wc -l < "$f" | tr -d ' ')
  if [ "$lines" -gt 600 ]; then
    echo "⚠️  $dir: ${lines}行 (超大)"
  elif [ "$lines" -lt 100 ]; then
    echo "⚠️  $dir: ${lines}行 (薄弱)"
  fi
done
echo "✅ 其他skill体积正常"

echo ""
echo "=== 3. 文档路径检查 ==="
for f in $(find ~/.claude/skills/super-pm -name 'SKILL.md' | sort); do
  dir=$(dirname "$f" | sed 's|.*/super-pm/||')
  grep -oP '`?docs/[^`()\n]+`?' "$f" 2>/dev/null | sed "s/^/$dir: /"
done
```

---

## 生成报告

```markdown
# pm-selfcheck 报告

**检查时间**: {当前时间}
**super-pm 版本**: {从 VERSION 文件读取}

## 1️⃣ 元数据完整性
{自动检测结果}

## 2️⃣ 体积状态
{自动检测结果}

## 3️⃣ 文档路径引用
{自动检测结果}

## 4️⃣ 搜索依赖状态
{自动检测结果 — AnySearch / Exa MCP / WebSearch 可用性}

## 5️⃣ 跨 Agent 兜底覆盖率
{自动检测结果 — AskUserQuestion skill 兜底规则覆盖率}

## 6️⃣ 维护建议
{根据检测结果生成建议}
```

---

## 注意事项

1. 建议每次 Phase 迭代后执行一次
2. 出现超大型skill时，考虑拆分到references目录
3. 出现薄弱skill时，参考同类skill补充执行流程

---

## 常见误区 / Red Flags — STOP

出现以下情况立即停止并回溯：

| 误区 | 正确做法 |
|------|---------|
| 使用"应该"、"大概"、"看起来"做结论 | 必须基于实际数据和验证 |
| 未运行检查就声称已完成 | 先验证，再陈述 |

---

## 产出质量检查 / Verification Checklist

- [ ] 所有 SKILL.md 已扫描完毕
- [ ] 元数据完整性验证通过
- [ ] 体积检查无异常
- [ ] 文档路径引用一致
- [ ] 搜索依赖状态已检测（AnySearch / Exa MCP / WebSearch）
- [ ] 跨 Agent 兜底覆盖率已检测（AskUserQuestion skill 兜底规则覆盖率）

> ⚠️ 任何异常请标注修复。
