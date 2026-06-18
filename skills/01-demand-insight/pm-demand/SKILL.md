---
name: pm-demand
version: 2.4.0
description: |
  Use when:
    已完成 /pm-brainstorm 后，需要系统化收集需求、验证产品想法真伪、分析用户痛点
    用户明确要求"需求调研""需求验证""验证痛点""分析用户痛点"
    用户明确选择跳过 brainstorm，直接进入需求调研
  Do NOT auto-select when:
    用户用自然语言说"我想做一个XX""帮我规划XX产品""帮我设计一下需求"
    → 这些必须先路由到 start-super-pm → pm-brainstorm
  Direct slash-command use is allowed:
    用户显式输入 /pm-demand 时可直接进入，但必须通过前置门禁
allowed-tools:
  - Read
  - Write
  - AskUserQuestion
  - Agent
  - Bash
  - WebSearch
  - mcp__exa__web_search_exa
  - mcp__exa__web_fetch_exa
---

## Preamble (run first)

```bash
bash "$(dirname "${BASH_SOURCE[0]}")"/check-update.sh 2>/dev/null || true
# 创建需求调研目录
mkdir -p docs/01-需求调研

# 检查是否已有需求调研报告
if [ -f "docs/01-需求调研/需求调研报告.md" ]; then
  echo "⚠️  检测到已有需求调研报告"
  echo ""
  echo "您可以选择："
  echo "A) 查看现有报告"
  echo "B) 重新调研（会覆盖现有报告）"
  echo "C) 补充调研（在现有基础上补充）"
fi
```

---

## 前置门禁

无论从哪个入口进入，都必须执行前置文档检查：

1. 检查 `docs/01-需求调研/` 中是否有创意方案库（pm-brainstorm 的输出文档）
2. 如果有 → 读取文档，判断是否与当前用户描述的产品相关
   - 相关 → 前置已满足，继续执行
   - 不相关 → 停止，建议先执行 `/pm-brainstorm`
3. 如果没有 → 检查用户是否明确说"跳过 brainstorm / 直接需求调研 / 已完成头脑风暴"
   - 明确跳过 → 继续执行
   - 否则 → 停止，建议先执行 `/pm-brainstorm`

不得在门禁不满足时生成需求调研报告。

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

## 执行流程

所有步骤均为 [MANDATORY]，不得跳过任何步骤。完成当前步骤之前不得进入下一步骤。

### 步骤 1 [MANDATORY]: 收集产品基础信息

**关键原则**：
- 使用 AskUserQuestion **逐个询问**
- 每个问题清晰、聚焦
- 等待用户回答后再问下一个

---

**问题 1: 产品名称**

使用 AskUserQuestion 询问：

> 请问您的产品名称是什么？
>
> 💡 提示：例如"每日优鲜"、"小红书"、"微信"

用户输入后，记录到变量 `PRODUCT_NAME`

---

**问题 2: 目标用户**

> 目标用户是谁？
>
> A) C端用户（个人消费者）
> B) B端用户（企业客户）
> C) 双边市场（平台模式）
> D) 其他（请手动输入）
>
> 💡 提示：选择后请进一步细化，如"25-35岁一线城市女性"、"中小型餐饮老板"

用户回答后，记录到变量 `TARGET_USER`

---

**问题 3: 核心业务目标**

> 您希望达成的核心业务目标是什么？
>
> A) 提升收入（如GMV、付费转化）
> B) 提升用户规模（如DAU、MAU）
> C) 提升用户留存（如复购率、日活）
> D) 降低成本（如人力、运营成本）
> E) 其他（请手动输入）
>
> 💡 提示：目标应该可量化，如"3个月内GMV达到100万"

用户回答后，记录到变量 `BUSINESS_GOAL`

---

**问题 4: 核心痛点（关键验证）**

> **关键问题**：用户现在面临的最大痛点是什么？
>
> A) 效率低下（耗时太长、步骤太多）
> B) 体验糟糕（难用、不友好）
> C) 成本过高（太贵、负担重）
> D) 无法解决（现有方案无法满足需求）
> E) 其他（请手动输入）
>
> 💡 提示：思考"用户为什么需要这个产品，而不是用竞品或维持现状？"

用户回答后，AI 立即进行痛点强度判断：

**痛点验证逻辑**：

如果用户选择 A/B/C/D：
```markdown
✅ 痛点强度：⭐⭐⭐⭐⭐（强痛点）
💡 理由：用户有明确的痛点，愿意为解决方案付费/花时间

继续收集更多信息...
```

如果用户选择 E（其他）且描述模糊：
```markdown
⚠️ 痛点强度：⭐⭐（弱痛点）
💡 建议：痛点不够清晰，可能是伪需求

您可以选择：
A) 继续调研（我需要更深入挖掘痛点）
B) 重新思考产品定位
C) 暂停，我需要更多信息

是否继续？
```

记录到变量 `USER_PAIN_POINT` 和 `PAIN_INTENSITY`

---

**问题 5: 行业赛道**

> 您的产品属于哪个行业赛道？
>
> A) 电商零售（生鲜、服装、综合电商等）
> B) 社交娱乐（社交、游戏、内容社区等）
> C) 企业服务（SaaS、工具、B2B服务等）
> D) 金融科技（支付、理财、保险等）
> E) 其他（请手动输入）
>
> 💡 提示：明确的赛道有助于后续市场分析

记录到变量 `INDUSTRY`

---

### 步骤 2: 收集初步需求清单

使用 AskUserQuestion 询问：

> 现在请列出您想到的核心需求（每个需求一行）
>
> 例如：
> - 快速下单
> - 订单追踪
> - 会员体系
>
> 💡 提示：输入"完成"结束需求录入

用户逐行输入需求，AI 收集到列表 `REQUIREMENT_LIST`

---

### 步骤 3: 需求真伪验证（快速模式）

对每个需求快速验证（只验证明显的问题）：

AI 对每个需求提问：

> 需求"{需求名称}"是真需求吗？
>
> 判断标准：
> - 用户愿意为此付费或花时间吗？
> - 这个需求解决了实际痛点吗？
>
> A) 是真需求 ✅
> B) 可能是伪需求 ⚠️（请说明原因）
> C) 不确定，需要进一步验证

记录验证结果到 `VERIFIED_REQUIREMENTS`

---

### 步骤 3.5: Subagent 并行市场验证（v2.0 新增）

在需求验证完成后，派发 subagent 并行进行市场验证，为主观判断提供数据支撑。

使用 Agent 工具并行派发：

**Subagent 1 - 竞品验证**：
```json
{
  "type": "general-purpose",
  "prompt": "你是一个市场调研专家。请验证以下产品需求的竞品情况。\n\n产品名称: {PRODUCT_NAME}\n行业赛道: {INDUSTRY}\n核心痛点: {USER_PAIN_POINT}\n需求清单: {VERIFIED_REQUIREMENTS}\n\n搜索工具优先级（必须遵守）：\n1. 首选 AnySearch：先定位 anysearch_cli.py（检查 ~/.claude/skills/anysearch/scripts/ ~/.opencode/skills/anysearch/scripts/ ~/.openclaw/skills/anysearch/scripts/ ~/.cursor/skills/anysearch/scripts/ ~/.anysearch/scripts/ 或 which anysearch_cli.py），找到后 Bash 调用 python3 <路径> search \"查询词\" --max_results 5\n2. AnySearch 不可用 → 降级到 mcp__exa__web_search_exa\n3. Exa 不可用 → 降级到 WebSearch，并在输出中标注「⚠️ 降级模式」\n4. 使用 WebSearch 时在报告中标注「⚠️ 降级模式」\n\n搜索要求：\n1. 搜索该产品领域的竞品信息\n2. 搜索哪些竞品已经解决了类似痛点\n3. 提取竞品关键功能、用户规模、市场表现\n\n输出 JSON 格式：\n{\"dimension\":\"竞品验证\",\"findings\":[{\"competitor\":\"竞品名\",\"features\":\"功能描述\",\"market_position\":\"市场表现\"}]}"
}
```

**Subagent 2 - 用户声音验证**：
```json
{
  "type": "general-purpose",
  "prompt": "你是一个用户研究员。请验证以下产品需求在用户侧的真实性。\n\n产品名称: {PRODUCT_NAME}\n目标用户: {TARGET_USER}\n核心痛点: {USER_PAIN_POINT}\n\n搜索工具优先级（必须遵守）：\n1. 首选 AnySearch：先定位 anysearch_cli.py（检查 ~/.claude/skills/anysearch/scripts/ ~/.opencode/skills/anysearch/scripts/ ~/.openclaw/skills/anysearch/scripts/ ~/.cursor/skills/anysearch/scripts/ ~/.anysearch/scripts/ 或 which anysearch_cli.py），找到后 Bash 调用 python3 <路径> search \"查询词\" --max_results 5\n2. AnySearch 不可用 → 降级到 mcp__exa__web_search_exa\n3. Exa 不可用 → 降级到 WebSearch，并在输出中标注「⚠️ 降级模式」\n4. 使用 WebSearch 时在报告中标注「⚠️ 降级模式」\n\n搜索要求：\n1. 搜索目标用户群体对相关痛点的讨论\n2. 搜索：site:zhihu.com OR site:xiaohongshu.com {核心痛点}\n3. 分析用户真实反馈，验证痛点真实性\n\n输出 JSON 格式：\n{\"dimension\":\"用户声音\",\"findings\":[{\"source\":\"来源\",\"quote\":\"用户原话\",\"pain_point\":\"对应痛点\"}]}"
}
```

**Subagent 3 - 市场规模验证**：
```json
{
  "type": "general-purpose",
  "prompt": "你是一个行业分析师。请评估以下产品的市场机会。\n\n产品名称: {PRODUCT_NAME}\n行业赛道: {INDUSTRY}\n\n搜索工具优先级（必须遵守）：\n1. 首选 AnySearch：先定位 anysearch_cli.py（检查 ~/.claude/skills/anysearch/scripts/ ~/.opencode/skills/anysearch/scripts/ ~/.openclaw/skills/anysearch/scripts/ ~/.cursor/skills/anysearch/scripts/ ~/.anysearch/scripts/ 或 which anysearch_cli.py），找到后 Bash 调用 python3 <路径> search \"查询词\" --max_results 5 --domain finance --sub_domain finance.cn_stock\n2. AnySearch 不可用 → 降级到 mcp__exa__web_search_exa\n3. Exa 不可用 → 降级到 WebSearch，并在输出中标注「⚠️ 降级模式」\n4. 使用 WebSearch 时在报告中标注「⚠️ 降级模式」\n\n搜索要求：\n1. 搜索该行业市场规模数据\n2. 搜索：{INDUSTRY} 市场规模 2026\n3. 分析市场增长潜力\n\n输出 JSON 格式：\n{\"dimension\":\"市场规模\",\"findings\":[{\"metric\":\"指标\",\"value\":\"数据值\",\"source\":\"来源\"}]}"
}
```

**等待所有 subagent 完成**，将结构化结果整合到需求调研报告中。

**优化说明**：
- 优化前（v1）：主 agent 串行搜索，搜索结果占用上下文
- 优化后（v2）：subagent 并行搜索，主 agent 只处理结构化结果
- 效率提升：搜索耗时从 ~3 分钟降至 ~1 分钟，Token 节省约 70%

---

### 步骤 4: 生成需求调研报告

使用 Write 工具创建 `docs/01-需求调研/需求调研报告.md`：

```markdown
# 需求调研报告

## 一、产品基础信息

- **产品名称**: {PRODUCT_NAME}
- **目标用户**: {TARGET_USER}
- **核心目标**: {BUSINESS_GOAL}
- **行业赛道**: {INDUSTRY}
- **生成时间**: {当前时间}
- **调研工具**: super-pm

---

## 二、核心痛点

**用户痛点**: {USER_PAIN_POINT}

**痛点强度**: {PAIN_INTENSITY} 星级

**验证状态**: ✅ 已验证真实需求

**验证理由**: 用户有明确痛点，愿意为解决方案付费/花时间

---

## 三、初步需求清单

| 序号 | 需求名称 | 验证状态 | 备注 |
|------|----------|----------|------|
| 1 | {需求1} | ✅ 真需求 | - |
| 2 | {需求2} | ✅ 真需求 | - |
| 3 | {需求3} | ⚠️ 需验证 | {原因} |
| ... | ... | ... | ... |

---

## 四、下一步建议

建议执行：

1. **/pm-brainstorm** - 头脑风暴，探索更多可能性（推荐）
2. **/pm-clarify** - 需求细化，明确每个需求的细节
3. **/pm-market** - 市场分析，了解行业与竞品

---

**项目状态**: 需求调研完成
**生成时间**: {时间戳}
**生成工具**: super-pm
```

---

### 步骤 5: 输出完成提示

使用 AskUserQuestion 提供下一步选项：

> ✅ 需求调研完成！
>
> 📄 报告已生成：`docs/01-需求调研/需求调研报告.md`
>
> 🎯 建议下一步：
>
> A) 执行 /pm-brainstorm - 头脑风暴，探索更多可能性（推荐）
> B) 执行 /pm-clarify - 需求细化，明确细节
> C) 执行 /pm-market - 市场分析，了解行业与竞品
> D) 查看需求调研报告

---

## 兜底机制

### 场景 1: 用户中途取消

如果用户中途取消，保存已收集的信息：

```bash
# 创建临时保存文件
echo "产品名称: $PRODUCT_NAME" > docs/01-需求调研/.需求调研草稿.md
echo "目标用户: $TARGET_USER" >> docs/01-需求调研/.需求调研草稿.md
```

提示用户：
> ⚠️ 调研已暂停
>
> 已收集的信息已保存到 `docs/01-需求调研/.需求调研草稿.md`
>
> 您可以随时执行 `/pm-demand` 继续

---

### 场景 2: 已有需求调研报告

如果检测到已有报告：

```bash
if [ -f "docs/01-需求调研/需求调研报告.md" ]; then
  echo "⚠️ 检测到已有需求调研报告"
fi
```

提供选项：
- 查看现有报告
- 重新调研（覆盖）
- 补充调研（追加）

---

## 注意事项

1. **风险前置**：问题4（痛点验证）是核心，必须认真对待
2. **一次一问**：使用 AskUserQuestion 逐个询问，避免用户负担过重
3. **痛点强度判断**：AI 需要根据用户回答判断痛点强度
4. **Markdown 存储**：生成的报告人类可读可编辑
5. **推荐下一步**：完成后推荐 2-3 个相关 skill

---

## 输出质量对比

**✅ Good 示例**：
```
- 有数据引用：「根据 Q4 数据，留存率从 35% 降至 28%」
- 有验证来源：「数据来源：Google Analytics, 2025-12-01」
- 有明确建议：「建议将新手引导步骤从 5 步减少至 3 步」
```

**❌ Bad 示例**：
```
- 模糊结论：「数据表明留存率有所下降」
- 无来源：「根据经验，这个功能很重要」
- 没有行动建议：「留存是个问题」
```

---

## 常见误区 / Red Flags — STOP

出现以下情况立即停止并回溯：

| 误区 | 正确做法 |
|------|---------|
| 使用"应该"、"大概"、"看起来"做结论 | 必须基于实际数据和验证 |
| 未运行检查就声称已完成 | 先验证，再陈述 |
| 因时间紧迫跳过关键步骤 | 没有例外，时间紧更要严格 |
| "这次应该没问题"的想法 | 每次都要重新验证 |

---

## 产出质量检查 / Verification Checklist

- [ ] 前置依赖已满足（输入文档/数据已收集）
- [ ] 核心步骤已全部执行
- [ ] 输出文档已生成到 `docs/` 目录
- [ ] 每个判断都有数据/证据支撑
- [ ] 已推荐 2-3 个后续 skill

> ⚠️ 任何一项未通过 → 补全后再标记完成。

---
