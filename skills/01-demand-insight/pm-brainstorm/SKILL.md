---
name: pm-brainstorm
description: |
  Use when:
    需要创意方案、探索产品方向、发散思维、本质问题分析
    用户说"我想做一个XX""帮我规划XX产品""帮我设计一下需求"
    用户给出新产品方向，但尚未完成本轮 brainstorm 交互确认
    新产品从0到1的第一步
  Do NOT use when:
    用户明确说"跳过 brainstorm / 直接需求调研 / 已完成头脑风暴"
    需求已明确且用户明确要求直接执行具体后续 skill
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
# 读取技能包版本号
SKILL_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" 2>/dev/null && pwd)" || true
if [ -f "$SKILL_ROOT/VERSION" ]; then echo "📦 super-pm $(cat "$SKILL_ROOT/VERSION")"; fi
# 创建需求调研目录
mkdir -p docs/01-需求调研

# 检查是否有需求调研报告（仅做状态告知，不做路由推荐）
if [ ! -f "docs/01-需求调研/需求调研报告.md" ]; then
  echo "⚠️  未找到需求调研报告，将进入快速模式收集基础信息"
fi
```

---

## 跨 Agent 交互规则

当流程要求与用户交互时：

1. 如果当前环境支持 AskUserQuestion，使用 AskUserQuestion（最佳体验）。
2. 如果当前环境不支持 AskUserQuestion，必须用普通聊天消息提出同样问题。
3. 一次只问一个问题。
4. 提问后必须停止当前回合，等待用户回答（STOP and WAIT）。
5. 不得在用户回答前生成文档、调用 /pm-demand、调用 /pm-docs、写入 docs。
6. 已有 docs 文件不能替代本轮用户回答。

---

## 执行流程

所有步骤均为 [MANDATORY]，不得跳过任何步骤。完成当前步骤之前不得进入下一步骤。

### 步骤 1 [MANDATORY]: 读取前置数据

**如果存在需求调研报告**：

使用 Read 工具读取 `docs/01-需求调研/需求调研报告.md` 作为参考。

⚠️ MUST ask user to confirm: "检测到已有需求调研报告，是否适用于当前产品？"

使用 AskUserQuestion 询问：
> 检测到已有需求调研报告，是否适用于当前产品？
>
> A) 适用 — 基于已有报告继续，但仍需确认关键信息是否准确
> B) 不适用 / 不确定 — 进入快速模式，重新收集基础信息

跨 Agent 兜底：如果当前环境不支持 AskUserQuestion，用普通聊天消息提出同样问题，然后 STOP and WAIT for user response。

- 用户确认适用 → 提取关键信息作为参考，但仍必须使用 AskUserQuestion 向用户逐个确认：产品名称是否准确？目标用户是否准确？核心痛点是否准确？每个确认后 STOP and WAIT。
- 用户确认不适用 / 不确定 → 进入快速模式，使用 AskUserQuestion 收集基础信息。

**如果没有需求调研报告**：

进入快速模式，使用 AskUserQuestion 收集基础信息：

⚠️ MUST ask user 3 questions ONE AT A TIME. NEVER ask all 3 at once.

> 📝 快速模式 - 请提供基础信息：
>
> 问题1：产品名称是什么？
> → STOP and WAIT for user response

> 问题2：目标用户是谁？
> → STOP and WAIT for user response

> 问题3：核心痛点是什么？
> → STOP and WAIT for user response

跨 Agent 兜底：如果当前环境不支持 AskUserQuestion，用普通聊天消息提出同样问题，然后 STOP and WAIT for user response。

---

### 步骤 2 [MANDATORY]: 确定发散方向

使用 AskUserQuestion 询问：

⚠️ MUST ask user to choose direction. NEVER assume or skip.

> 🎯 我要探索产品的哪个方向？
>
> A) 产品功能创新 - 探索核心功能、差异化特性
> B) 用户增长方案 - 如何获取、激活、留存用户
> C) 商业模式设计 - 如何变现、构建可持续商业模式
> D) 用户体验优化 - 如何提升易用性、满意度
> E) **灵感火花激发 - 我不知道做什么，需要AI帮我找灵感**（v2.1新增）
> F) 其他方向（请手动输入）

跨 Agent 兜底：如果当前环境不支持 AskUserQuestion，用普通聊天消息提出同样问题，然后 STOP and WAIT for user response。

用户选择后，记录到变量 `BRAINSTORM_DIRECTION`

---

#### 如果选择"灵感火花激发"（v2.1新增）：

**适用场景**：用户不知道做什么产品，需要AI主动激发灵感

**执行流程**：

**步骤 2.1: 灵感维度扫描 & Subagent 并行搜索（核心优化）**

AI 提示用户：

> 🔍 灵感火花激发引擎启动（Subagent 并行模式）
>
> 我将同时从4个维度搜索灵感源，请稍候...
> - 行业痛点 → Subagent 1
> - 技术趋势 → Subagent 2
> - 生活场景 → Subagent 3
> - 跨界灵感 → Subagent 4

**并行派发 4 个 subagent 搜索**：

使用 Agent 工具同时派发：

```
Subagent 1 - 行业痛点:
  type: "general-purpose"
  prompt: |
    搜索行业痛点和用户未被满足的需求。

    搜索要求：
    1. 搜索工具优先级：首选 AnySearch（先定位 anysearch_cli.py：检查 ~/.claude/skills/anysearch/scripts/ ~/.opencode/skills/anysearch/scripts/ ~/.openclaw/skills/anysearch/scripts/ ~/.cursor/skills/anysearch/scripts/ ~/.anysearch/scripts/ 或 which anysearch_cli.py，找到后 Bash 调用 python3 <路径> search "查询词" --max_results 5），失败降级到 Exa MCP（mcp__exa__web_search_exa），最后才用 WebSearch。使用 WebSearch 时标注降级模式
    2. 搜索：site:36kr.com OR site:huxiu.com 用户痛点 2026；site:zhihu.com 用户抱怨 不满
    3. 搜索：ProductHunt 用户差评 痛点
    4. 提取 5-8 个具体痛点，每个包含：痛点描述、受影响用户、严重程度

    输出 JSON 格式：
    {"dimension":"行业痛点","findings":[{"pain_point":"描述","users":"受影响用户","severity":"高/中/低"}]}

Subagent 2 - 技术趋势:
  type: "general-purpose"
  prompt: |
    搜索2026年最新技术趋势和AI应用场景。

    搜索要求：
    1. 搜索工具优先级：首选 AnySearch（先定位 anysearch_cli.py：检查 ~/.claude/skills/anysearch/scripts/ ~/.opencode/skills/anysearch/scripts/ ~/.openclaw/skills/anysearch/scripts/ ~/.cursor/skills/anysearch/scripts/ ~/.anysearch/scripts/ 或 which anysearch_cli.py，找到后 Bash 调用 python3 <路径> search "查询词" --max_results 5），失败降级到 Exa MCP（mcp__exa__web_search_exa），最后才用 WebSearch。使用 WebSearch 时标注降级模式
    2. 搜索：AI新技术 应用场景 2026 site:mittrchina.com OR site:ifanr.com
    3. 搜索：2026 技术趋势 创业机会
    4. 提取 5-8 个技术驱动的产品机会，每个包含：技术名称、应用场景、可行性

    输出 JSON 格式：
    {"dimension":"技术趋势","findings":[{"tech":"技术","scenario":"场景","feasibility":"高/中/低"}]}

Subagent 3 - 生活场景:
  type: "general-purpose"
  prompt: |
    搜索2026年效率工具和生活方式变化带来的产品机会。

    搜索要求：
    1. 搜索工具优先级：首选 AnySearch（先定位 anysearch_cli.py：检查 ~/.claude/skills/anysearch/scripts/ ~/.opencode/skills/anysearch/scripts/ ~/.openclaw/skills/anysearch/scripts/ ~/.cursor/skills/anysearch/scripts/ ~/.anysearch/scripts/ 或 which anysearch_cli.py，找到后 Bash 调用 python3 <路径> search "查询词" --max_results 5），失败降级到 Exa MCP（mcp__exa__web_search_exa），最后才用 WebSearch。使用 WebSearch 时标注降级模式
    2. 搜索：ProductHunt 2026 最佳产品 效率工具
    3. 搜索：2026 生活方式变化 新需求
    4. 提取 5-8 个生活场景相关的产品灵感，每个包含：场景描述、用户需求、已有方案

    输出 JSON 格式：
    {"dimension":"生活场景","findings":[{"scenario":"描述","need":"用户需求","existing":"已有方案"}]}

Subagent 4 - 跨界灵感:
  type: "general-purpose"
  prompt: |
    搜索其他行业的创新商业模式和成功案例。

    搜索要求：
    1. 搜索工具优先级：首选 AnySearch（先定位 anysearch_cli.py：检查 ~/.claude/skills/anysearch/scripts/ ~/.opencode/skills/anysearch/scripts/ ~/.openclaw/skills/anysearch/scripts/ ~/.cursor/skills/anysearch/scripts/ ~/.anysearch/scripts/ 或 which anysearch_cli.py，找到后 Bash 调用 python3 <路径> search "查询词" --max_results 5），失败降级到 Exa MCP（mcp__exa__web_search_exa），最后才用 WebSearch。使用 WebSearch 时标注降级模式
    2. 搜索：创新商业模式 成功案例 2026
    3. 搜索：跨界创新 行业颠覆 案例
    4. 提取 5-8 个可借鉴的跨界灵感，每个包含：来源行业、创新点、可迁移性

    输出 JSON 格式：
    {"dimension":"跨界灵感","findings":[{"industry":"来源行业","innovation":"创新点","transferable":"可迁移性"}]}
```

**等待所有 4 个 subagent 完成**，收集 JSON 结果。

---

**步骤 2.2: 生成10个灵感火花**

AI 整合 4 个 subagent 返回的结构化数据，生成10个灵感火花，每个包含：
- 产品概念（一句话）
- 用户痛点
- 技术可行性（高/中/低）
- 市场潜力（高/中/低）

输出示例：

| # | 产品概念 | 用户痛点 | 技术可行性 | 市场潜力 |
|---|----------|----------|------------|----------|
| 1 | AI会议纪要自动生成器 | 会议效率低，纪要撰写耗时 | 高（语音识别成熟） | 高（企业刚需） |
| 2 | 智能代码审查助手 | 代码质量难以把控 | 高（LLM理解代码） | 高（开发者需求） |
| 3 | 个人知识图谱构建工具 | 信息碎片化，难以体系化 | 中（需要知识图谱技术） | 中（知识分子需求） |
| 4 | ... | ... | ... | ... |

---

**步骤 2.3: 用户选择深入探索**

使用 AskUserQuestion 询问：

> 💡 已生成10个灵感火花，请选择您感兴趣的：
>
> A) 灵感#1: {根据结果动态填充}
> B) 灵感#2: {动态填充}
> C) 灵感#3: {动态填充}
> D) 查看更多灵感（滚动展示）
> E) 自定义方向（请手动输入）

用户选择后，进入**步骤 3: 逐步深入探索**，对该灵感进行详细发散。

---

**优化说明**（灵感火花部分）：
- 优化前：主 agent 串行执行4次搜索，搜索结果占用上下文约 8,000 tokens
- 优化后：4个 subagent 并行搜索，主 agent 只处理结构化 JSON，节省约 85% token
- 速度提升：从 ~4 分钟（串行搜索）→ ~1.5 分钟（并行 subagent）

---

### 步骤 2.5 [MANDATORY]: 选择头脑风暴模式（v2.0新增）

使用 AskUserQuestion 询问：

⚠️ MUST ask user to choose mode. NEVER assume or skip.

> 🧠 选择头脑风暴模式：
>
> A) 常规发散思维 - 基于行业经验和类比推理
> B) 第一性原理拆解 - 从基本事实推导，突破常规假设
> C) SCAMPER创新法 - 替代、组合、调整、修改、用途、消除、重排

跨 Agent 兜底：如果当前环境不支持 AskUserQuestion，用普通聊天消息提出同样问题，然后 STOP and WAIT for user response。

用户选择后，记录到变量 `BRAINSTORM_MODE`

---

### 步骤 3 [MANDATORY]: 逐步深入探索

**根据选择的模式，采用不同的探索路径**：

---

#### 如果选择"第一性原理拆解"（v2.0新增）：

**第一性原理核心**：
- 拆解到基本事实
- 从基本事实重新推导
- 突破常规假设和类比思维

---

**步骤 3.1: 拆解基本事实**

使用 AskUserQuestion 询问：

> 🔍 第一性原理拆解 - 步骤1
>
> 请列出与"{产品方向}"相关的基本事实（不证自明的真理）：
>
> 示例（配送速度）：
> - 用户期望：越快越好
> - 物理极限：光速、交通速度
> - 成本规律：速度越快成本越高
>
> 请逐个输入基本事实：

引导用户输入 3-5 个基本事实：
1. {基本事实1}
2. {基本事实2}
3. {基本事实3}

---

**步骤 3.2: 识别常规假设**

使用 AskUserQuestion 询问：

> 🎭 第一性原理拆解 - 步骤2
>
> 行业中的常规假设是什么？（可能存在认知偏差）
>
> 示例（配送速度）：
> - 假设1：30分钟送达是极限
> - 假设2：必须有自己的配送团队
> - 假设3：用户不愿意支付高价
>
> 请列出行业常规假设：

引导用户识别 3-5 个常规假设：
1. {常规假设1}
2. {常规假设2}
3. {常规假设3}

---

**步骤 3.3: 挑战假设，重新推导**

针对每个假设，使用 AskUserQuestion 询问：

> 💡 第一性原理拆解 - 步骤3
>
> 挑战假设："{常规假设}"
>
> A) 这个假设是真的吗？有反例吗？
> B) 如果打破这个假设，会怎样？
> C) 有其他方式实现同样的目标吗？
> D) 这个假设的根源是什么？
> E) 其他思考（请手动输入）

AI 分析：
- 找出假设的漏洞
- 提出突破性方案
- 结合基本事实重新推导

---

**步骤 3.4: 生成创新方案**

AI 根据第一性原理推导，生成突破性方案：

**示例输出（配送速度）**：

**常规方案**：
- 自建配送团队 → 成本高，难扩张
- 第三方物流 → 速度不可控
- 前置仓模式 → 成本高，覆盖范围小

**第一性原理方案**：
1. **众包配送**：突破"必须有自己团队"的假设
   - 利用闲散劳动力
   - 成本低，灵活性强

2. **预测备货**：突破"用户下单后才开始准备"的假设
   - 基于AI预测提前备货
   - 用户下单时已在配送途中

3. **社区微仓**：突破"集中式仓储"的假设
   - 分布式微仓
   - 5分钟送达成为可能

---

#### 如果选择"常规发散思维"：

**关键原则**：
- 一次只问一个问题
- 每个问题提供 3-5 个选项
- 最后一个选项永远是"其他（手动输入）"
- 根据用户选择，逐步深入
- 使用 AskUserQuestion 逐个询问
- 提问后必须 STOP and WAIT for user response
- 跨 Agent 兜底：如果当前环境不支持 AskUserQuestion，用普通聊天消息提出同样问题，然后 STOP and WAIT

---

#### 如果选择"产品功能创新"：

**问题 1**：

> 核心功能应该解决什么问题？
>
> A) 提升效率 - 让用户更快完成任务
> B) 降低门槛 - 让新用户更容易上手
> C) 增强体验 - 让过程更愉悦、更有趣
> D) 创造连接 - 让用户之间产生互动
> E) 其他（请手动输入）

---

**问题 2**：

> 如何实现差异化？
>
> A) 技术创新 - 使用新技术或独特算法
> B) 模式创新 - 创新的商业模式或运营方式
> C) 体验创新 - 更好的用户界面或交互
> D) 服务创新 - 更好的客户服务或售后支持
> E) 其他（请手动输入）

---

**问题 3**：

> 哪些功能是必须有的（MVP）？
>
> A) 核心功能 + 基础体验
> B) 核心功能 + 社交属性
> C) 核心功能 + 数据分析
> D) 核心功能 + 会员体系
> E) 其他（请手动输入）

---

#### 如果选择"用户增长方案"：

**问题 1**：

> 主要增长渠道是什么？
>
> A) 内容营销 - 通过内容吸引流量
> B) 社交传播 - 通过用户分享裂变
> C) 付费推广 - 广告投放、KOL合作
> D) 线下推广 - 地推、活动、展会
> E) 其他（请手动输入）

---

**问题 2**：

> 如何激活用户？
>
> A) 新手引导 - 清晰的Onboarding流程
> B) 激励机制 - 签到奖励、新手红包
> C) 社交驱动 - 好友邀请、团队协作
> D) 内容推荐 - 个性化内容推送
> E) 其他（请手动输入）

---

**问题 3**：

> 如何提升留存？
>
> A) 会员体系 - 等级、积分、特权
> B) 内容更新 - 持续提供新鲜内容
> C) 社区运营 - 用户互动、UGC激励
> D) 定期活动 - 限时活动、节日营销
> E) 其他（请手动输入）

---

#### 如果选择"商业模式设计"：

**问题 1**：

> 主要收入来源是什么？
>
> A) 直接付费 - 用户购买产品或服务
> B) 订阅制 - 按月/年收费（会员、SaaS）
> C) 广告收入 - 广告展示、信息流广告
> D) 交易佣金 - 平台抽成、手续费
> E) 其他（请手动输入）

---

**问题 2**：

> 定价策略是什么？
>
> A) 免费增值 - 基础免费，高级功能收费
> B) 分层定价 - 不同价格不同功能
> C) 按量付费 - 按使用量或时长收费
> D) 一次性付费 - 买断制
> E) 其他（请手动输入）

---

**问题 3**：

> 如何降低付费门槛？
>
> A) 免费试用 - 先试用后付费
> B) 阶梯优惠 - 长期订阅优惠
> C) 推荐奖励 - 邀请好友获得优惠
> D) 捆绑销售 - 与其他产品打包
> E) 其他（请手动输入）

---

#### 如果选择"用户体验优化"：

**问题 1**：

> 当前最大的体验问题是什么？
>
> A) 操作复杂 - 步骤太多、流程太长
> B) 视觉混乱 - 界面不清晰、信息过载
> C) 反馈不足 - 不知道操作结果
> D) 性能问题 - 加载慢、卡顿
> E) 其他（请手动输入）

---

**问题 2**：

> 如何简化操作流程？
>
> A) 智能推荐 - 减少用户决策
> B) 一键操作 - 减少步骤
> C) 语音交互 - 解放双手
> D) 自动填充 - 记忆用户习惯
> E) 其他（请手动输入）

---

**问题 3**：

> 如何增强用户满意度？
>
> A) 个性化定制 - 根据用户偏好调整
> B) 即时反馈 - 操作后立即响应
> C) 惊喜设计 - 意想不到的彩蛋或奖励
> D) 情感连接 - 温馨文案、节日祝福
> E) 其他（请手动输入）

---

### 步骤 4 [MANDATORY]: 汇总创意方案

AI 根据用户选择，汇总生成创意方案库。

---

### 步骤 5 [MANDATORY]: 生成创意方案库文档

使用 Write 工具创建 `docs/01-需求调研/创意方案库.md`：

```markdown
# 创意方案库

## 一、基础信息

- **产品名称**: {PRODUCT_NAME}
- **发散方向**: {BRAINSTORM_DIRECTION}
- **生成时间**: {当前时间}

---

## 二、核心创意方案

### 方向 1: {根据用户选择生成标题}

**核心思路**:
{根据用户回答生成的详细描述}

**具体方案**:
1. {方案细节1}
2. {方案细节2}
3. {方案细节3}

**预期效果**:
{预期的业务效果}

---

### 方向 2: {第二个方向}

**核心思路**:
{描述}

**具体方案**:
1. {细节}
2. {细节}

**预期效果**:
{效果}

---

## 三、创意评分

| 方案 | 可行性 | 创新性 | 用户价值 | 商业价值 | 总分 |
|------|--------|--------|----------|----------|------|
| 方案1 | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ | 16/20 |
| 方案2 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | 16/20 |

---

## 四、下一步建议

建议执行：

1. **/pm-clarify** - 需求细化，明确具体需求细节（推荐）
2. **/pm-market** - 市场分析，验证方案可行性
3. **/pm-priority** - 优先级排序，决定先做哪个

---

**项目状态**: 创意发散完成
**生成时间**: {时间戳}
**生成工具**: super-pm
```

---

### 步骤 6 [MANDATORY]: 输出完成提示

使用 AskUserQuestion 提供下一步选项：

> ✅ 头脑风暴完成！
>
> 📄 创意方案库已生成：`docs/01-需求调研/创意方案库.md`
>
> 🎯 建议下一步：
>
> A) 执行 /pm-clarify - 需求细化，明确细节（推荐）
> B) 执行 /pm-market - 市场分析，验证可行性
> C) 执行 /pm-priority - 优先级排序
> D) 查看创意方案库

跨 Agent 兜底：如果当前环境不支持 AskUserQuestion，用普通聊天消息提出同样问题，然后 STOP and WAIT for user response。

---

## 兜底机制

### 场景 1: 无需求调研报告

提供快速模式选项，允许手动输入基础信息。

### 场景 2: 用户选择"其他"

允许用户手动输入，AI 理解并继续探索。

---

## 注意事项

1. **一次一问**：严格遵循，避免信息过载
2. **3-5选项**：每个问题提供清晰选项
3. **最后一项"其他"**：允许用户自由输入
4. **逐步深入**：根据用户选择继续深入探索
5. **Markdown存储**：生成的方案库人类可读可编辑

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
