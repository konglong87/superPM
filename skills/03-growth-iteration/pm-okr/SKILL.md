---
name: pm-okr
description: |
  Use when: 需要制定 OKR（目标与关键结果）、拆解公司/产品级目标、做目标对齐与 cascading、设定复盘节奏
  Do NOT use when: 仅需简单待办清单（用 pm-iteration）；目标已由上级完全锁定且无需拆解
allowed-tools:
  - Agent
  - Read
  - Write
  - AskUserQuestion
  - Bash
---

## Preamble (run first)

```bash
bash "$(dirname "${BASH_SOURCE[0]}")/../../check-update.sh" 2>/dev/null || true
# 读取技能包版本号
SKILL_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" 2>/dev/null && pwd)" || true
PKG_ROOT="$(cd "$SKILL_ROOT" && while [ "$PWD" != "/" ]; do [ -f VERSION ] && { pwd; break; }; cd ..; done)"
if [ -n "$PKG_ROOT" ] && [ -f "$PKG_ROOT/VERSION" ]; then echo "📦 super-pm $(cat "$PKG_ROOT/VERSION")"; fi
# 创建增长迭代目录
mkdir -p docs/03-增长迭代

if [ -f "docs/05-产品战略/战略决策建议.md" ]; then
  echo "✅ 战略决策建议 - 已找到（可承接为 O 的来源）"
else
  echo "⏳ 战略决策建议 - 未找到（可选）"
fi
```

---

## 跨 Agent 交互规则

当流程要求与用户交互时：

1. 如果当前环境支持 AskUserQuestion，使用 AskUserQuestion（最佳体验）。
2. 如果当前环境不支持 AskUserQuestion，必须用普通聊天消息提出同样问题。
3. 一次只问一个问题。
4. 提问后必须停止当前回合，等待用户回答（STOP and WAIT）。
5. 不得在用户回答前生成文档、写入 docs。
6. 已有 docs 文件不能替代本轮用户回答。

---

## 适用场景

- 用户说"定 OKR""目标拆解""关键结果怎么写""目标对齐""季度目标"
- 与 `pm-iteration`（迭代待办）区分：OKR 管**方向与可度量结果**，iteration 管**执行排期**。

---

## OKR 基本法（简述）

- **O（Objective）**：方向性、鼓舞人心、定性、不堆指标。
- **KR（Key Result）**：可度量、有基线值与目标值、可验证、通常 2-4 个/每 O。
- **对齐（Cascading）**：公司 → 产品/团队 → 个人，下层 KR 支撑上层 O。
- **信心指数**：制定时标注 50%（有挑战）/ 70%（较稳），用于复盘。

---

## 执行流程

### 步骤 1: 明确目标来源（主 agent - 用户交互）

使用 AskUserQuestion 询问：

> 🎯 OKR 范围
>
> 这次 OKR 落到哪一层？
>
> A) 产品级 OKR（承接公司/战略）
> B) 团队级 OKR
> C) 个人/项目级 OKR
>
> 目标来源：
> 1) 沿用战略决策建议
> 2) 我手动输入业务重点
> 3) 基于当前增长/数据现状推导

记录 `OKR_LEVEL` 与 `OBJECTIVE_SOURCE`。

---

### 步骤 2: 提炼 Objective（主 agent）

基于来源，提炼 1-3 个 O，要求：
- 一句话方向、鼓舞人心、不含指标
- 与战略/业务重点一致

示例：「让产品在目标用户中成为首选」「把增长引擎跑通并可持续」

使用 AskUserQuestion 与用户确认 O 的表述与数量。

---

### 步骤 3: 拆解为 Key Results（主 agent + 可选 subagent）

为每个 O 拆 2-4 个 KR，遵循：**可度量 + 基线 → 目标 + 验证方式**。

可选使用 Agent 工具派发 subagent 对复杂主题生成 KR 草案：

```
Tool: Agent
Parameters:
  subagent_type: "general-purpose"
  description: "OKR-KR草案"
  prompt: |
    你是目标管理专家。为以下 Objective 拆解 Key Results。
    O: {O}
    上下文: {产品现状/数据}
    要求：每个 O 2-4 个 KR；每个 KR 含 基线值→目标值、度量方式、信心指数(50%/70%)；避免把任务当 KR。
    输出 Markdown。
```

主 agent 整合并与用户确认。

---

### 步骤 4: 生成对齐地图与复盘节奏（主 agent）

- **对齐地图**：上层 O 与下层 KR 的支撑关系
- **复盘节奏**：双周打卡进度、季度复盘评分（0-1.0，0.7 为达标）
- **风险与依赖**：KR 之间的依赖、资源需求

---

### 步骤 5: 生成 OKR 文档（主 agent）

使用 Write 工具生成 `docs/03-增长迭代/OKR目标管理.md`：

```markdown
# {产品/团队} OKR（{周期}）

## 一、Objective 与 Key Results
### O1: {方向性目标}
- KR1: {基线} → {目标}，度量: {方式}，信心: {50%/70%}
- KR2: ...

### O2: {方向性目标}
- KR1: ...

## 二、对齐地图
| 上层 O | 支撑的下层 KR |
|-------|--------------|
| {公司O} | {产品KR1, KR2} |

## 三、度量与基线
| KR | 当前基线 | 目标 | 数据源 | 负责人 |
|----|---------|------|-------|-------|
| {KR} | {值} | {值} | {源} | {人} |

## 四、复盘节奏
- 双周: 进度打卡
- 季度: 评分复盘（0-1.0，0.7 达标）

## 五、依赖与风险
- 依赖: {列表}
- 风险: {列表}

## 六、下一步建议
1. /pm-iteration - 将 KR 转为迭代待办
2. /pm-retro - 季度复盘
3. /pm-report - 跟踪 KR 进度
```

---

### 步骤 6: 推荐下一步（主 agent）

> ✅ OKR 已生成：`docs/03-增长迭代/OKR目标管理.md`
>
> 建议执行：
> 1. /pm-iteration - KR 转迭代待办
> 2. /pm-retro - 季度复盘
> 3. /pm-report - 进度跟踪

---

## 输出质量对比

**✅ Good 示例**：
- KR 可度量：「月活 12w → 20w，数据源 GA，信心 50%」
- O 不含指标：「让新用户首周留存显著提升」
- 有对齐与复盘

**❌ Bad 示例**：
- 把任务当 KR：「完成新版上线」
- O 写成指标堆：「DAU 提升 30%」
- 无基线与复盘

---

## 常见误区 / Red Flags — STOP

| 误区 | 正确做法 |
|------|---------|
| 把任务当 KR | KR 必须可度量、有基线目标 |
| O 写成指标堆 | O 是方向性定性目标 |
| KR 无基线 | 必须标注基线→目标 |
| 不做对齐 | 下层 KR 需支撑上层 O |
| 无复盘 | 必须定义打分与节奏 |

---

## 产出质量检查 / Verification Checklist

- [ ] 已明确 OKR 层级与目标来源
- [ ] O 方向性、不含指标、已确认
- [ ] 每个 O 有 2-4 个可度量 KR（基线→目标）
- [ ] 已生成对齐地图与复盘节奏
- [ ] 输出文档已生成到 `docs/03-增长迭代/`
- [ ] 已推荐 2-3 个后续 skill

> ⚠️ 任何一项未通过 → 补全后再标记完成。

---
