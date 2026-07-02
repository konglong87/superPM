---
name: pm-aarrr
description: |
  Use when: 产品上线后需要分析用户增长、制定增长策略、诊断产品健康度、优化AARRR各环节
  Do NOT use when: 产品未上线、仅需单一指标分析无需全链路
allowed-tools:
  - Read
  - Write
  - AskUserQuestion
  - Agent
  - Bash
---

## Preamble (run first)

```bash
bash "$(dirname "${BASH_SOURCE[0]}")"/check-update.sh 2>/dev/null || true
# 读取技能包版本号
SKILL_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" 2>/dev/null && pwd)" || true
if [ -f "$SKILL_ROOT/VERSION" ]; then echo "📦 super-pm $(cat "$SKILL_ROOT/VERSION")"; fi
# 创建增长迭代目录
mkdir -p docs/03-增长迭代

# 检查数据指标文档
echo "📊 正在检查数据指标体系..."

if [ -f "docs/02-方案设计/数据指标体系.md" ]; then
  echo "✅ 数据指标体系 - 已找到"
else
  echo "⏳ 数据指标体系 - 未找到"
fi

echo ""
echo "🎯 AARRR模型介绍："
echo "A - Acquisition (获取用户)"
echo "A - Activation (激活用户)"
echo "R - Retention (提高留存)"
echo "R - Revenue (增加收入)"
echo "R - Referral (自传播)"
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

## 执行流程


### 步骤 1: 选择分析重点（主 agent - 用户交互）

使用 AskUserQuestion 询问：

> 🎯 AARRR增长分析 - 选择分析重点
>
> AARRR模型覆盖用户生命周期的5个环节。请选择您重点关注的环节：
>
> A) 全面分析（分析所有5个环节，并行执行，推荐）
> B) 获取分析（Acquisition - 用户从哪里来）
> C) 激活分析（Activation - 用户首次体验是否良好）
> D) 留存分析（Retention - 用户是否持续使用）
> E) 变现分析（Revenue - 如何赚钱）
> F) 传播分析（Referral - 用户是否愿意推荐）
> G) 瓶颈诊断（找到当前最大的增长瓶颈）
>
> 💡 提示：
> - 选择"A"可并行分析所有环节，效率提升 5x
> - 产品初期 → 关注获取和激活
> - 产品成长期 → 关注留存和变现
> - 产品成熟期 → 关注变现和传播

用户选择后，记录到变量 `AARRR_FOCUS`

---

### 步骤 2: 收集数据（主 agent）

#### 2.1 读取现有数据指标

尝试读取 `docs/02-方案设计/数据指标体系.md`

如果不存在，提示用户：
- A) 先执行 /pm-data 建立数据指标体系
- B) 手动输入当前的关键指标数据
- C) 使用行业基准数据进行分析

#### 2.2 构建数据输入

使用 AskUserQuestion 收集关键数据：

> 📊 数据收集
>
> 请提供以下关键指标（如不确定可输入"未知"）：
>
> **Acquisition (获取用户)**：
> - 新增用户数（近7天）：
> - 主要渠道：
> - 渠道转化率：
>
> **Activation (激活用户)**：
> - 注册转化率：
> - 首次关键行为完成率：
>
> **Retention (留存)**：
> - 次日留存率：
> - 7日留存率：
> - 30日留存率：
>
> **Revenue (变现)**：
> - 付费转化率：
> - ARPU (平均每用户收入)：
> - LTV (用户生命周期价值)：
>
> **Referral (传播)**：
> - 邀请率：
> - K因子 (病毒系数)：

将所有数据整理为结构化 JSON，准备传递给 subagent。

---

### 步骤 3: 并行派发 subagent 分析（核心优化）

**优化说明**：
- 主 agent 一次性派发 5 个 subagent
- 每个 subagent 负责 1 个 AARRR 环节的分析
- 分析细节不占用主 agent 上下文
- 所有环节并行执行

---

#### 3.1 构建 subagent 任务清单

**如果用户选择"全面分析"**：

准备 5 个并行 subagent 任务：

```json
[
  {
    "task_id": "acquisition_analysis",
    "stage": "Acquisition",
    "focus": "用户获取渠道、成本、效率",
    "input_data": {
      "新增用户数": "1000",
      "主要渠道": ["搜索", "社交媒体", "推荐"],
      "渠道转化率": "5%",
      "CAC": "50元"
    }
  },
  {
    "task_id": "activation_analysis",
    "stage": "Activation",
    "focus": "用户首次体验、核心功能触达",
    "input_data": {
      "注册转化率": "40%",
      "首次关键行为完成率": "30%",
      "onboarding完成率": "60%"
    }
  },
  {
    "task_id": "retention_analysis",
    "stage": "Retention",
    "focus": "用户留存、活跃度、召回",
    "input_data": {
      "次日留存率": "40%",
      "7日留存率": "20%",
      "30日留存率": "10%"
    }
  },
  {
    "task_id": "revenue_analysis",
    "stage": "Revenue",
    "focus": "变现能力、付费转化、收入增长",
    "input_data": {
      "付费转化率": "5%",
      "ARPU": "20元",
      "LTV": "200元"
    }
  },
  {
    "task_id": "referral_analysis",
    "stage": "Referral",
    "focus": "用户传播、病毒系数、推荐机制",
    "input_data": {
      "邀请率": "10%",
      "K因子": "0.8"
    }
  }
]
```

---

#### 3.2 使用 Agent 工具并行派发

**并行派发 5 个 subagent**（关键优化）：

```
# 同时启动 5 个 subagent
使用 Agent 工具，参数：

Agent 1: Acquisition 分析
  subagent_type: "general-purpose"
  description: "AARRR-Acquisition分析"
  prompt: |
    你是一个增长分析专家。请分析 Acquisition（获取用户）环节。

    **输入数据**：
    {acquisition 相关数据}

    **分析要求**：
    1. 评估当前获取效率（与行业基准对比）
    2. 识别主要渠道的表现
    3. 计算获客成本 (CAC)
    4. 发现增长机会和瓶颈
    5. 提出优化建议

    **输出格式**：
    ```json
    {
      "stage": "Acquisition",
      "current_performance": "当前表现评估",
      "benchmarks": "行业基准对比",
      "bottlenecks": ["瓶颈1", "瓶颈2"],
      "opportunities": ["机会1", "机会2"],
      "recommendations": ["建议1", "建议2", "建议3"],
      "priority_actions": ["优先行动1", "优先行动2"]
    }
    ```

Agent 2: Activation 分析
  subagent_type: "general-purpose"
  description: "AARRR-Activation分析"
  prompt: |
    你是一个用户体验专家。请分析 Activation（激活用户）环节。

    **输入数据**：
    {activation 相关数据}

    **分析要求**：
    1. 评估激活漏斗表现
    2. 识别首次体验的关键问题
    3. 分析核心功能触达率
    4. 发现激活障碍
    5. 提出优化建议

    **输出格式**：
    ```json
    {
      "stage": "Activation",
      "funnel_analysis": "漏斗分析",
      "key_issues": ["问题1", "问题2"],
      "activation_barriers": ["障碍1", "障碍2"],
      "recommendations": ["建议1", "建议2"],
      "quick_wins": ["快速见效点1", "快速见效点2"]
    }
    ```

Agent 3: Retention 分析
  subagent_type: "general-purpose"
  description: "AARRR-Retention分析"
  prompt: |
    你是一个留存分析专家。请分析 Retention（提高留存）环节。

    **输入数据**：
    {retention 相关数据}

    **分析要求**：
    1. 评估留存曲线健康度
    2. 识别流失关键节点
    3. 分析用户行为模式
    4. 发现留存驱动因素
    5. 提出优化建议

    **输出格式**：
    ```json
    {
      "stage": "Retention",
      "retention_health": "留存健康度评估",
      "churn_points": ["流失点1", "流失点2"],
      "retention_drivers": ["驱动因素1", "驱动因素2"],
      "recommendations": ["建议1", "建议2"],
      "engagement_tactics": ["策略1", "策略2"]
    }
    ```

Agent 4: Revenue 分析
  subagent_type: "general-purpose"
  description: "AARRR-Revenue分析"
  prompt: |
    你是一个变现专家。请分析 Revenue（增加收入）环节。

    **输入数据**：
    {revenue 相关数据}

    **分析要求**：
    1. 评估变现能力
    2. 分析付费转化路径
    3. 计算 LTV/CAC 比率
    4. 发现变现机会
    5. 提出优化建议

    **输出格式**：
    ```json
    {
      "stage": "Revenue",
      "monetization_health": "变现健康度",
      "ltv_cac_ratio": "LTV/CAC比率分析",
      "revenue_leaks": ["收入流失点1", "流失点2"],
      "monetization_opportunities": ["机会1", "机会2"],
      "recommendations": ["建议1", "建议2"]
    }
    ```

Agent 5: Referral 分析
  subagent_type: "general-purpose"
  description: "AARRR-Referral分析"
  prompt: |
    你是一个病毒传播专家。请分析 Referral（自传播）环节。

    **输入数据**：
    {referral 相关数据}

    **分析要求**：
    1. 评估病毒传播能力
    2. 分析 K 因子表现
    3. 识别传播驱动因素
    4. 发现传播障碍
    5. 提出优化建议

    **输出格式**：
    ```json
    {
      "stage": "Referral",
      "viral_health": "病毒传播健康度",
      "k_factor_analysis": "K因子分析",
      "referral_barriers": ["障碍1", "障碍2"],
      "viral_loops": ["病毒循环1", "循环2"],
      "recommendations": ["建议1", "建议2"]
    }
    ```
```

**主 agent 等待所有 subagent 完成**。

---

### 步骤 4: 收集结果并整合（主 agent）

**主 agent 收集所有 subagent 的返回结果**：

```json
{
  "analysis_results": [
    {
      "stage": "Acquisition",
      "bottlenecks": ["渠道转化率低", "CAC过高"],
      "recommendations": ["优化落地页", "增加社媒投放"]
    },
    {
      "stage": "Activation",
      "bottlenecks": ["onboarding流失严重"],
      "recommendations": ["简化注册流程", "增加引导"]
    },
    {
      "stage": "Retention",
      "bottlenecks": ["次日留存低于行业平均"],
      "recommendations": ["增加push推送", "优化新手任务"]
    },
    {
      "stage": "Revenue",
      "bottlenecks": ["付费转化率低"],
      "recommendations": ["增加免费试用", "优化付费引导"]
    },
    {
      "stage": "Referral",
      "bottlenecks": ["K因子<1, 无自增长"],
      "recommendations": ["增加邀请激励", "优化分享体验"]
    }
  ]
}
```

---

### 步骤 5: 综合分析与报告生成（主 agent）

**主 agent 进行跨环节综合分析**：

1. **识别最大瓶颈**（所有环节对比）
2. **发现连锁问题**（如 Activation 差导致 Retention 低）
3. **制定优先级策略**（先解决哪个瓶颈）

使用 Write 工具生成综合报告到 `docs/03-增长迭代/AARRR增长分析报告.md`：

```markdown
# AARRR增长分析报告

## 一、执行概况

**分析时间**: {时间}
**分析模式**: 全面分析（5个环节并行）
**数据来源**: 手动输入 / 数据指标体系 / 行业基准

---

## 二、各环节表现总览

| 环节 | 健康度 | 核心指标 | 与行业对比 |
|------|--------|---------|-----------|
| Acquisition | ⚠️ 中等 | 新增1000人/周，CAC 50元 | CAC偏高 |
| Activation | ❌ 较差 | 注册转化率40% | 低于行业平均(60%) |
| Retention | ⚠️ 中等 | 次日留存40% | 接近行业平均 |
| Revenue | ⚠️ 中等 | 付费转化率5% | 略低于行业平均 |
| Referral | ❌ 较差 | K因子0.8 | 低于自增长阈值(1.0) |

---

## 三、关键发现

### 3.1 最大瓶颈：Activation（激活）

**问题**：
- 注册转化率仅 40%，低于行业平均 60%
- Onboarding 完成率仅 60%
- 首次关键行为完成率仅 30%

**连锁影响**：
- Activation 差 → Retention 低
- 未激活用户难以留存和变现

**根本原因**：
- 注册流程过于复杂（5步 → 建议优化为3步）
- 缺少清晰的首次使用引导
- 核心功能未在首次体验中触达

### 3.2 次要瓶颈：Referral（传播）

**问题**：
- K因子 0.8，无法实现自增长
- 邀请率仅 10%

**机会**：
- 增加"激活-传播"闭环（激活用户立即触发邀请）
- 优化邀请激励机制

---

## 四、优化建议（优先级排序）

### P0 - 立即优化（影响最大）

**1. 优化注册流程**
- 减少注册步骤（5步 → 3步）
- 增加社交账号一键登录
- 预期效果：注册转化率 40% → 60%

**2. 简化 Onboarding**
- 突出核心功能，减少次要引导
- 增加"快速开始"路径
- 预期效果：Onboarding 完成率 60% → 80%

**3. 增加首次关键行为引导**
- 在首次体验中强制完成关键行为
- 提供即时反馈和奖励
- 预期效果：首次关键行为完成率 30% → 50%

### P1 - 近期优化

**4. 增加邀请激励机制**
- 双向激励（邀请人和被邀请人都有奖励）
- 在激活后立即提示邀请
- 预期效果：K因子 0.8 → 1.2

**5. 优化留存策略**
- 增加 Push 推送（针对未激活用户）
- 优化新手任务设计
- 预期效果：次日留存 40% → 50%

### P2 - 长期优化

**6. 降低获客成本**
- 优化落地页转化率
- 增加自然流量（SEO、内容营销）
- 预期效果：CAC 50元 → 35元

---

## 五、详细分析报告

### 5.1 Acquisition 分析

（从 subagent 结果中提取）

**当前表现**：
- 新增用户：1000人/周
- 主要渠道：搜索(40%)、社交媒体(35%)、推荐(25%)
- CAC：50元（行业平均：30-40元）

**瓶颈**：
- CAC 偏高，获客效率有待提升
- 搜索渠道转化率偏低

**建议**：
- 优化落地页设计和内容
- 增加 SEO 投入，获取自然流量
- 测试新的社媒渠道

### 5.2 Activation 分析

（从 subagent 结果中提取）

**当前表现**：
- 注册转化率：40%（行业平均：60%）
- Onboarding 完成率：60%
- 首次关键行为完成率：30%

**瓶颈**：
- 注册流程过于复杂
- Onboarding 引导不够清晰
- 核心功能未在首次触达

**建议**：
- 简化注册流程
- 优化 Onboarding 设计
- 强制引导首次关键行为

### 5.3 Retention 分析

（从 subagent 结果中提取）

**当前表现**：
- 次日留存：40%（行业平均：40-50%）
- 7日留存：20%
- 30日留存：10%

**瓶颈**：
- 次日留存接近及格线，有提升空间
- 7日留存偏低

**建议**：
- 增加 Push 推送
- 优化新手任务
- 设计"第X天"用户触达策略

### 5.4 Revenue 分析

（从 subagent 结果中提取）

**当前表现**：
- 付费转化率：5%（行业平均：5-10%）
- ARPU：20元
- LTV：200元
- LTV/CAC：4.0（健康 >3）

**瓶颈**：
- 付费转化率略低
- 变现路径不够清晰

**建议**：
- 增加免费试用
- 优化付费引导
- 设计阶梯式定价

### 5.5 Referral 分析

（从 subagent 结果中提取）

**当前表现**：
- 邀请率：10%
- K因子：0.8（自增长阈值：1.0）

**瓶颈**：
- K因子 <1，无法实现自增长
- 邀请激励不够

**建议**：
- 增加双向邀请激励
- 优化分享体验
- 在激活后立即触发邀请

---

## 六、下一步建议

建议执行：
1. /pm-growth - 制定详细的增长优化方案
2. /pm-abtest - 设计 A/B 测试验证优化效果
3. /pm-iteration - 将优化建议纳入迭代计划

---

**生成时间**: {时间}
**分析工具**: super-pm (Subagent 架构)
**分析模式**: 5环节并行分析
```

---

## 对比：优化前 vs 优化后

### 优化前（pm-aarrr v1）

```
主 agent 执行流程：
1. 询问用户（10 tokens）
2. 收集数据（100 tokens）
3. 分析 Acquisition（500 tokens 分析过程）
4. 分析 Activation（500 tokens）
5. 分析 Retention（500 tokens）
6. 分析 Revenue（500 tokens）
7. 分析 Referral（500 tokens）
8. 综合分析（200 tokens）
9. 生成报告（100 tokens）

总计：2910 tokens
耗时：串行执行，约 8-12 分钟
上下文占用：所有分析细节全量占用
```

### 优化后（pm-aarrr-v2）

```
主 agent 执行流程：
1. 询问用户（10 tokens）
2. 收集数据（100 tokens）
3. 派发 5 个 subagent（50 tokens）
   ├─ Subagent 1: Acquisition 分析（不占用主 agent）
   ├─ Subagent 2: Activation 分析（不占用主 agent）
   ├─ Subagent 3: Retention 分析（不占用主 agent）
   ├─ Subagent 4: Revenue 分析（不占用主 agent）
   └─ Subagent 5: Referral 分析（不占用主 agent）
4. 接收结果（250 tokens 结构化数据）
5. 综合分析（200 tokens）
6. 生成报告（100 tokens）

总计：710 tokens
耗时：并行执行，约 2-3 分钟
效率提升：76% token 节省，4x 速度提升
```

---

## 关键优化点

### 1. 并行执行
```
v1: A → A → R → R → R（串行，5个环节依次分析）
v2: A
    ├─ A
    ├─ R  （并行，5个环节同时分析）
    ├─ R
    └─ R
```

### 2. 上下文节省
- ✅ 各环节分析细节不占用主 agent 上下文
- ✅ 主 agent 只处理结构化分析结果
- ✅ Token 使用减少 76%

### 3. 综合能力增强
- ✅ 主 agent 聚焦跨环节综合分析
- ✅ 发现连锁问题和根本原因
- ✅ 制定优先级策略

---

## 异常处理

**如果某个 subagent 失败**：
1. 主 agent 检测到失败
2. 提供选项：
   - A) 重试失败的环节
   - B) 手动补充分析
   - C) 跳过该环节
3. 继续处理其他成功的环节

---

## 版本说明

**v2.0.0** - Subagent 架构重构
- 新增 Agent 工具支持
- 5个 AARRR 环节并行分析
- 主 agent 上下文优化 76%
- 效率提升 4x
- 增强综合分析能力

**v1.0.0** - 初始版本
- 基础 AARRR 分析功能
- 串行执行各环节分析

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
