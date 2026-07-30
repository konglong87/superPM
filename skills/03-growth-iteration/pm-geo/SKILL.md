---
name: pm-geo
description: |
  Use when: 需要提升产品在 AI 搜索/生成式引擎（ChatGPT、Perplexity、AI Overviews、豆包、文心）中的可见性与被推荐率、做 GEO（Generative Engine Optimization）方案
  Do NOT use when: 仅做传统 SEO/关键词排名、产品尚未上线且无任何公开信息可优化
allowed-tools:
  - Agent
  - Read
  - Write
  - AskUserQuestion
  - Bash
  - WebSearch
  - mcp__exa__web_search_exa
  - mcp__exa__web_fetch_exa
---

## Preamble (run first)

```bash
bash "$(dirname "${BASH_SOURCE[0]}")/../../check-update.sh" 2>/dev/null || true
# 创建增长迭代目录
mkdir -p docs/03-增长迭代

echo "📡 GEO / AI 搜索优化工具"

# 检查前置文档
if [ -f "docs/02-方案设计/产品定位方案.md" ]; then
  echo "✅ 产品定位方案 - 已找到"
else
  echo "⏳ 产品定位方案 - 未找到（可选，缺失时将由本技能快速采集）"
fi
if [ -f "docs/01-需求调研/市场调研报告.md" ]; then
  echo "✅ 市场调研报告 - 已找到"
else
  echo "⏳ 市场调研报告 - 未找到（可选）"
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

- 用户说"让 AI 推荐我们的产品""GEO 优化""AI 搜索里搜不到我们""生成式引擎优化""提升在 ChatGPT/Perplexity 的曝光"
- 产品已上线或已有官网/内容资产，希望被 AI 搜索引擎在回答中准确提及与推荐
- 与 `pm-growth`（转化增长）区分：geo 管"被 AI 发现与推荐"，growth 管"看到之后的转化"

---

## 执行流程

### 步骤 1: 明确 GEO 目标查询（主 agent - 用户交互）

使用 AskUserQuestion 询问：

> 🎯 GEO 优化目标
>
> 你希望用户在 AI 搜索里用哪类问题能搜到/被推荐你们？
>
> A) 品类/场景问题（如"有什么好用的XX工具"）
> B) 对比/选型问题（如"XX 和 YY 哪个好"）
> C) 解决方案问题（如"怎么解决 XX 痛点"）
> D) 品牌/官网直接召回（搜品牌名能出现官网与简介）
> E) 全部覆盖（推荐，但耗时较长）
>
> 💡 提示：先聚焦 1-2 个高价值查询场景，比铺开更有效。

记录到变量 `GEO_TARGET`。

---

### 步骤 2: 现状可见性诊断（主 agent + subagent）

#### 2.1 采集产品基础信息

如果有产品定位方案 / 市场调研报告，读取并提取：产品名称、核心品类、目标用户、差异化卖点、官网 URL。

如果缺失，使用 AskUserQuestion 快速采集以上 5 项（一次一题）。

#### 2.2 模拟 AI 搜索召回测试

使用 Agent 工具派发 subagent，模拟在 ChatGPT / Perplexity / AI Overviews 中查询目标问题，记录当前是否提及本产品、提及时的描述是否准确：

```
Tool: Agent
Parameters:
  subagent_type: "general-purpose"
  description: "GEO现状召回诊断"
  prompt: |
    你是一个 GEO（生成式引擎优化）审计专家。请基于公开信息，模拟用户在主流 AI 搜索引擎中提问时的召回情况。

    **产品信息**：{产品名称} / {核心品类} / {官网URL} / {差异化卖点}
    **目标查询场景**：{GEO_TARGET}

    **任务**：
    1. 针对每个目标查询，判断当前主流 AI 引擎（ChatGPT、Perplexity、Google AI Overviews、豆包、文心一言）在回答中是否会提及该产品。
    2. 若提及，描述是否准确、是否给出官网/正确链接。
    3. 若未提及，分析最可能的原因（实体未被收录、内容信号弱、缺乏权威引用、品类归因错误等）。
    4. 给出 0-100 的可见性评分与 3 条最关键的缺口。

    返回结构化 JSON：
    ```json
    {
      "visibility_score": 0-100,
      "per_query": [{"query": "...", "mentioned": true/false, "accuracy": "准确/偏差/错误", "reason": "..."}],
      "top_gaps": ["缺口1", "缺口2", "缺口3"]
    }
    ```
```

主 agent 等待结果，向用户确认诊断是否吻合其感知。

---

### 步骤 3: 派发 subagent 做语料与竞品引用研究（核心优化）

**优化说明**：搜索与资料整理不占用主 agent 上下文，subagent 并行执行。

构建任务清单（搜索优先级：首选 AnySearch，失败降级 Exa MCP，最后 WebSearch；WebSearch 时标注「⚠️ 降级模式」）：

```json
[
  {
    "task_id": "entity_signal",
    "keywords": ["{产品名称} 官网", "{品类} 权威定义", "{差异化卖点} 评测"],
    "domains": ["官网", "维基/百科类", "行业媒体", "评测站"]
  },
  {
    "task_id": "competitor_citation",
    "keywords": ["{品类} 推荐 {竞品}", "{品类} 哪个好", "{竞品} 对比"],
    "domains": ["36kr.com", "huxiu.com", "zhihu.com", "producthunt.com"]
  }
]
```

使用 Agent 工具并行派发，prompt 结构参考 `pm-market` 的搜索专家模板（含 AnySearch 定位与调用方式）。

主 agent 收集结果。

---

### 步骤 4: 生成 GEO 优化方案（主 agent）

使用 Write 工具生成 `docs/03-增长迭代/GEO优化方案.md`：

```markdown
# {产品名称} GEO / AI 搜索优化方案

## 文档信息
- 产品名称: {产品名称}
- 方案版本: v1.0
- 生成日期: {当前时间}
- 生成工具: super-pm / pm-geo

---

## 一、现状诊断
- 可见性评分: {score}/100
- 目标查询召回情况:
  | 查询场景 | 是否被提及 | 描述准确度 | 主要原因 |
  |---------|-----------|-----------|---------|
  | {场景} | {是/否} | {准确/偏差} | {原因} |
- 最关键缺口: {gap1} / {gap2} / {gap3}

## 二、GEO 优化框架
### 2.1 实体建设（Entity）
- 统一品牌实体名称、一句话定位、关键属性（品类/地区/功能）
- 官网结构化数据（Entity / Organization / Product schema）
- 权威平台实体页（百科、黄页、行业库）一致性

### 2.2 内容信号（Content）
- 针对目标查询生产"可被引用"的内容资产（对比页、选型指南、解决方案文）
- 明确结论 + 数据 + 来源，便于 AI 直接抽取
- FAQ / 长尾问题覆盖

### 2.3 引用与权威（Citation）
- 争取被行业媒体、评测站、问答社区引用
- 在第三方内容中建立"品类→本产品"的稳定关联

### 2.4 技术底座（Technical）
- 站点可抓取、内容可被索引
- 结构化数据、清晰站点地图、稳定官网信息

## 三、行动清单（按优先级）
| 优先级 | 动作 | 负责方 | 预期效果 | 周期 |
|-------|------|-------|---------|------|
| P0 | {动作} | {方} | {效果} | {周期} |
| P1 | {动作} | {方} | {效果} | {周期} |

## 四、监测指标
- 目标查询 AI 召回率（提及占比）
- 描述准确度（准确/偏差/错误）
- 官网直接流量（品牌词）
- 第三方引用数

## 五、下一步建议
1. /pm-growth - 把被推荐流量转化为注册/付费
2. /pm-competitor - 持续监控竞品在 AI 搜索中的表现
3. /pm-report - 周期性复盘 GEO 指标
```

---

### 步骤 5: 推荐下一步（主 agent）

> ✅ GEO 优化方案已生成：`docs/03-增长迭代/GEO优化方案.md`
>
> 建议执行：
> 1. /pm-competitor - 监控竞品在 AI 搜索中的可见性
> 2. /pm-growth - 承接被推荐流量做转化
> 3. /pm-report - 周期性复盘 GEO 指标

---

## 搜索依赖说明

- **AnySearch**（首选）：中文检索质量优，支持垂直域。先定位脚本再调用：
  `python3 <anysearch_cli.py 路径> search "查询词" --max_results 5 --domain <域>`
  脚本候选路径：`~/.claude/skills/anysearch/scripts/` `~/.opencode/skills/anysearch/scripts/` `~/.cursor/skills/anysearch/scripts/` `~/.anysearch/scripts/`，或 `which anysearch_cli.py`
- **Exa MCP**（备选）：英文/语义检索。
- **WebSearch**（兜底）：标注「⚠️ 降级模式」。

---

## 输出质量对比

**✅ Good 示例**：
- 有具体查询场景：「针对"有什么好用的项目管理工具"，当前 ChatGPT 未提及本品，根因为实体未被收录」
- 有可落地动作：「在官网增加 Product schema，并生产"XX vs YY"对比页争取被引用」
- 有监测指标：「目标查询 AI 召回率从 0% 提升至 40%」

**❌ Bad 示例**：
- 泛泛而谈：「应该提升品牌曝光」
- 无查询场景：「做内容优化」
- 无监测：「GEO 很重要」

---

## 常见误区 / Red Flags — STOP

| 误区 | 正确做法 |
|------|---------|
| 把 GEO 等同于传统 SEO | GEO 面向生成式引擎的"引用与归因"，重实体/内容信号/权威引用 |
| 认为发稿即可被推荐 | 需可抓取、结构化、被第三方稳定引用 |
| 不做现状诊断直接出方案 | 先测召回，再开处方 |
| 无监测指标 | 必须定义召回率/准确度/引用数 |

---

## 产出质量检查 / Verification Checklist

- [ ] 已明确目标查询场景（GEO_TARGET）
- [ ] 已完成现状召回诊断（可见性评分 + 缺口）
- [ ] 已产出实体/内容/引用/技术四类优化动作
- [ ] 输出文档已生成到 `docs/03-增长迭代/`
- [ ] 已推荐 2-3 个后续 skill

> ⚠️ 任何一项未通过 → 补全后再标记完成。

---
