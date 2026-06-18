---
name: pm-brand-motion
description: |
  Use when: 需要为品牌设计动效方向、制作 logo 动画 demo、定义品牌动效性格、从静态 logo 到动态展示的过渡
  Do NOT use when: 需要专业级动效交付（应交给设计师）、已有成品动效无需方向验证、仅需要文字描述不需要 demo
allowed-tools:
  - Agent
  - Read
  - Write
  - AskUserQuestion
  - Bash
---

## Preamble (run first)

```bash
bash "$(dirname "${BASH_SOURCE[0]}")"/check-update.sh 2>/dev/null || true
# 读取技能包版本号
SKILL_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" 2>/dev/null && pwd)" || true
if [ -f "$SKILL_ROOT/VERSION" ]; then echo "📦 super-pm $(cat "$SKILL_ROOT/VERSION")"; fi
# 检查方案设计目录
mkdir -p docs/02-方案设计

# 检查前置文档
echo "📊 正在检查前置文档..."

if [ -f "docs/02-方案设计/原型设计方案.md" ]; then
  echo "✅ 原型设计方案 - 已找到"
else
  echo "⏳ 原型设计方案 - 未找到"
fi

if [ -f "docs/02-方案设计/产品定位方案.md" ]; then
  echo "✅ 产品定位方案 - 已找到"
else
  echo "⏳ 产品定位方案 - 未找到"
fi

# 检查 logo 文件
echo ""
echo "🎨 正在检查 logo 文件..."
for ext in svg png jpg webp; do
  if ls logo.*.$ext 2>/dev/null | head -1 > /dev/null 2>&1; then
    echo "✅ logo 文件 (.$ext) - 已找到"
  fi
done
echo "⏳ 如果没有 logo 文件，将在步骤中引导您提供"
```

---

## 前置门禁

**必需文档**（至少满足一项）：
- 原型设计方案（`docs/02-方案设计/原型设计方案.md`）
- 产品定位方案（`docs/02-方案设计/产品定位方案.md`）

**可选文档**：
- 需求调研报告
- MVP方案

**Logo 文件**（至少满足一项）：
- SVG 格式 logo（优先）
- PNG/JPG/WebP 格式 logo 图片

如果必需文档均不存在：

```markdown
⚠️ 未找到前置文档

品牌动效设计需要了解产品的视觉定位和品牌性格。

您可以选择：
A) 执行 /pm-position 生成产品定位方案
B) 执行 /pm-proto 生成原型设计方案
C) 手动输入品牌信息（快速模式）

是否继续？
```

---

## 执行流程

### 步骤 1: 确定动效范围

使用 AskUserQuestion 询问：

> 您需要设计哪种类型的品牌动效？
>
> A) Logo 开场动画（splash / 品牌展示页）
> B) 加载状态动画（loading / 等待提示）
> C) 交互微动效（hover / 点击反馈）
> D) 页面过渡动画（转场 / 切换）
> E) 其他（请手动输入）
>
> 💡 提示：
> - 新品牌首发 → 推荐开场动画
> - 已上线产品 → 推荐交互微动效
> - 需要全面规划 → 可以多选，先做开场动画

记录到变量 `MOTION_SCOPE`

---

### 步骤 2: 读取前置数据

根据动效范围读取相应文档：

**从产品定位方案提取**：
- 品牌性格描述
- 目标用户画像
- 品牌视觉风格

**从原型设计方案提取**：
- 设计规范建议（色彩、字体）
- 页面布局结构
- 交互流程

**读取 Logo 文件**：
- 优先读取 SVG 格式（可直接用于动画）
- 如果只有图片格式，使用 Read 工具查看图片，理解 logo 的视觉结构

**读取失败处理**：

如果 logo 文件不存在：

```markdown
⚠️ 未找到 logo 文件

品牌动效需要基于 logo 进行设计。

您可以选择：
A) 提供 logo 文件路径（我将读取分析）
B) 描述 logo 的视觉结构（文字描述模式）
C) 先完成动效方案文档，后续再制作 demo

是否继续？
```

---

### 步骤 3: 定义品牌动效性格

#### 3.1 确定性格词

使用 AskUserQuestion 询问：

> 品牌的动效性格是什么？请选择最符合的 3 个词：
>
> A) 精准·专业·可靠（克制稳定，适合金融/企业/医疗）
> B) 活力·大胆·进取（有力冲击，适合运动/科技/创业）
> C) 温暖·友好·亲切（柔和包容，适合教育/社交/生活）
> D) 优雅·精致·高端（流畅从容，适合奢侈品/设计/艺术）
> E) 其他组合（请手动输入，如"沉稳·厚重·权威"）
>
> 💡 提示：
> - 性格词决定动效的节奏、力度和编排方式
> - 可以从 logo 的视觉语言推导：几何感 → 精准，有机感 → 温暖，极简 → 优雅
> - 如果有产品定位方案，优先参考其中的品牌性格描述

记录到变量 `BRAND_PERSONALITY`

#### 3.2 性格词 → 动效风格映射

根据性格词组合，映射到动效风格参数：

| 性格词组合 | 动效风格 | 时间感 | 缓入缓出 | 编排节奏 |
|-----------|---------|--------|---------|---------|
| 精准·专业·可靠 | 克制、稳定 | 中速 1000-1500ms | 微弱，几乎无 overshoot | 依次展开，不跳跃 |
| 活力·大胆·进取 | 有力、冲击 | 快速 600-900ms | 明显 overshoot + 回弹 | 爆发式，多部件同时 |
| 温暖·友好·亲切 | 柔和、包容 | 中慢 1200-1800ms | 轻微 overshoot | 渐次浮现，像打招呼 |
| 优雅·精致·高端 | 流畅、从容 | 慢速 1500-2500ms | 极轻微，丝滑过渡 | 逐层展开，有仪式感 |
| 轻快·灵动·创意 | 跳跃、惊喜 | 快速 500-800ms | bounce 回弹 | 交错出现，有节奏感 |
| 沉稳·厚重·权威 | 缓慢、坚定 | 慢速 1800-3000ms | 几乎无 overshoot | 从中心向外扩散 |

如果用户选择了"其他组合"，AI 根据性格词的含义自行推导动效参数。

---

### 步骤 4: 规划编排方案

#### 4.1 识别 logo 部件

基于 logo 分析，识别语义部件：

> 🎨 根据您的 logo，我识别出以下动效部件：
>
> | 部件 | 类型 | 动效角色 | 说明 |
> |------|------|---------|------|
> | {部件名} | mark/wordmark/装饰 | 主角/配角/点缀 | {描述} |
>
> 是否需要调整部件划分？
>
> A) 部件划分合理，继续编排
> B) 需要合并/拆分部件
> C) 其他调整（请手动输入）

#### 4.2 选择编排模式

使用 AskUserQuestion 询问：

> 品牌动效的编排模式是什么？
>
> A) 逐层浮现 — 部件从底层到顶层依次出现（适合优雅/高端）
> B) 中心绽放 — 从中心点向外扩散（适合沉稳/权威）
> C) 笔迹描绘 — 像用笔画出来（适合有手写/书法元素）
> D) 弹跳入场 — 部件弹跳进入画面（适合活力/年轻）
> E) 拼图组装 — 部件从不同方向飞入拼合（适合科技/创意）
> F) 渐显定格 — 从模糊到清晰，最终定格（适合专业/可靠）
> G) 其他（请手动输入）
>
> 💡 提示：
> - 编排模式应与性格词匹配
> - {根据性格词推荐最合适的模式}

记录到变量 `CHOREOGRAPHY_MODE`

#### 4.3 规划时间分配

基于性格词映射的时间参数，规划三段式时间分配：

**通用原则**：预备(20%) → 动作(50%) → 收尾(30%)

> 🕐 基于您的品牌性格"{性格词}"，建议时间分配：
>
> | 阶段 | 占比 | 时长 |
> |------|------|------|
> | 预备 | 20% | ~{计算值}ms |
> | 动作 | 50% | ~{计算值}ms |
> | 收尾 | 30% | ~{计算值}ms |
> | **总计** | 100% | **{总时长}ms** |
>
> 部件编排顺序：
> 1. {主角部件}（0ms 开始，{时间}ms 完成）
> 2. {配角部件}（{偏移}ms 开始，{时间}ms 完成）
> 3. {点缀部件}（{偏移}ms 开始，{时间}ms 完成）
>
> 是否需要调整？
>
> A) 时间分配合理，开始制作 demo
> B) 调整总时长
> C) 调整编排顺序
> D) 其他调整

---

### 步骤 5: 生成方向性 demo HTML

#### 5.1 准备 SVG 内容

**如果用户提供了 SVG 文件**：
- 使用 Read 工具读取 SVG 内容
- 在 SVG 中为每个部件添加语义 id（`mark`、`wordmark`、`dot` 等）
- 确保每个动效部件是独立的 `<g>` 或 `<path>` 元素

**如果用户只有图片格式 logo**：
- 使用 Read 工具查看图片
- AI 根据图片视觉结构，手写简化版 SVG
- 简化版 SVG 只保留核心形状，不追求像素级还原
- 在文档中注明"SVG 为简化方向版，设计师需基于原始 logo 精修"

**如果用户没有 logo 文件**：
- 根据前置文档中的品牌描述，生成概念性 SVG
- 在文档中注明"SVG 为概念示意，需替换为实际 logo"

#### 5.2 编写 demo HTML

使用 Write 工具生成 `docs/02-方案设计/品牌动效demo.html`。

**⚠️ 视觉品质硬性规则（踩坑总结，必须遵守）**：

生成 demo HTML 时必须遵守以下规则，详细说明见下方"Demo HTML 视觉品质硬性规则"章节：

1. **绝对居中** — html/body 设 width/height 100%，body 用 flex 居中，所有子元素 align-items center
2. **SVG 视觉重心居中** — 手绘 SVG 时形状围绕 viewBox 中心分布
3. **文字用 HTML 而非 SVG** — wordmark/tagline 用 `<span>`，不用 SVG `<text>`
4. **Mark 尺寸 ≥ 120px** — 太小缺乏冲击力
5. **主角动画 ≥ 3 阶段 keyframes** — 入场→overshoot→settle，体现 bounce-back
6. **配色有对比度** — 渐变填充（≥2色），背景光晕 ≥500px + blur ≥100px
7. **造型精致** — mark 用流畅曲线而非直线拼接，眼睛有高光，装饰有细节，边缘有微光
8. **间距有层次** — mark→wordmark 20-24px，wordmark→tagline 10-12px，递减

**demo HTML 基本结构**：

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{产品名称} 品牌动效 Demo</title>
<style>
  :root {
    --spm-duration: {总时长}ms;
    --spm-speed: 1; /* 速度倍率，1=正常，0.5=慢放，2=快放 */
    --spm-accent: {主色};
    --spm-accent2: {辅色};
    --spm-bg: {背景色};
    --spm-text: {文字色};
    --spm-text2: {辅助文字色};
  }

  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body { width: 100%; height: 100%; }

  body {
    background: var(--spm-bg);
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    position: relative;
  }

  /* 背景光晕 — 至少 500px + blur 100px */
  .bg-glow { ... }

  /* 主舞台 — flex column + align-items center */
  #logo-root {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 1;
  }

  /* 动画通过 .animate class 触发，初始状态隐藏 */
  #mark, #wordmark, #tagline, #line { opacity: 0; }

  /* .animate 类激活时才播放动画 */
  .animate #mark {
    animation: mark-in calc(var(--spm-duration) / var(--spm-speed)) cubic-bezier(0.16, 1, 0.3, 1) both;
  }
  @keyframes mark-in {
    0% { opacity: 0; transform: translateY(30px) scale(0.8); }
    50% { opacity: 1; transform: translateY(-4px) scale(1.03); }
    75% { transform: translateY(1px) scale(0.99); }
    100% { opacity: 1; transform: translateY(0) scale(1); }
  }

  .animate #wordmark {
    animation: wordmark-in calc(1000ms / var(--spm-speed)) cubic-bezier(0.25, 0.1, 0.25, 1) both;
    animation-delay: calc({偏移}ms / var(--spm-speed));
    margin-top: 24px;
  }
  @keyframes wordmark-in {
    0% { opacity: 0; transform: translateY(18px); }
    100% { opacity: 1; transform: translateY(0); }
  }

  .animate #tagline { ... margin-top: 12px; }
  .animate #line { ... margin-top: 20px; }

  /* 控制面板 — fixed + left 50% + translateX(-50%) */
  #controls {
    position: fixed;
    bottom: 24px;
    left: 50%;
    transform: translateX(-50%);
    ...
  }

  /* 无障碍 */
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      opacity: 1 !important;
      transform: none !important;
    }
  }
</style>
</head>
<body>
  <div class="bg-glow bg-glow--1"></div>
  <div class="bg-glow bg-glow--2"></div>

  <div id="logo-root">
    <!-- Mark — SVG，视觉重心居中于 viewBox -->
    <div id="mark">
      <svg width="140" height="140" viewBox="0 0 140 140" fill="none">
        <!-- 渐变填充（至少2色） -->
        <!-- 身体用 C 曲线，圆润饱满 -->
        <!-- 眼睛有高光点 -->
        <!-- 脊线用小三角 -->
        <!-- 边缘微光 -->
      </svg>
    </div>

    <!-- Wordmark — HTML span，不用 SVG text -->
    <div id="wordmark">
      <span style="font-family: ...; font-size: 38px; ...">
        <span style="color: var(--spm-accent);">super</span>
        <span style="color: var(--spm-text);">PM</span>
      </span>
    </div>

    <!-- Tagline — HTML span，text-align: center -->
    <div id="tagline">
      <span style="text-align: center; display: block; ...">产品经理技能包</span>
    </div>

    <div id="line"></div>
  </div>

  <div id="controls">
    <button onclick="replay()">▶ 重播</button>
    <label>速度 <input type="range" ...></label>
    <span id="speed-label">1x</span>
  </div>

  <script>
    // 重播：移除动画 class → reflow → 重新添加，触发 CSS 动画重播
    function replay() {
      const root = document.getElementById('logo-root');
      root.classList.remove('animate');
      void root.offsetWidth; // 强制 reflow
      root.classList.add('animate');
      // 背景光晕同理
      document.querySelectorAll('.bg-glow').forEach(el => {
        el.classList.remove('animate');
        void el.offsetWidth;
        el.classList.add('animate');
      });
    }
    // 速度：通过 CSS 变量缩放所有动画时长
    function setSpeed(val) {
      document.documentElement.style.setProperty('--spm-speed', val);
      document.getElementById('speed-label').textContent = val + 'x';
    }
  </script>
</body>
</html>
```

**关键规则**：
- CSS 变量使用 `--spm-*` 前缀（super-pm 前缀）
- `@keyframes` 内的 `animation-timing-function` 必须写 literal `cubic-bezier(...)`，不能用 `var()`（Chromium 会静默降级为 linear）
- 动画只使用 `transform` 和 `opacity`（性能最优）
- 必须包含 `prefers-reduced-motion` 处理
- demo 标题注明"方向验证 Demo"
- 动画通过 `.animate` class 触发（初始状态 opacity:0，加 class 后播放），replay 用 class toggle（移除→reflow→添加）
- 速度通过 `--spm-speed` CSS 变量 + `calc(duration / speed)` 控制，不用 JS `getAnimations().playbackRate`
- **不依赖任何外部工具或脚本**（pixel2motion、Playwright、headless Chrome 等），demo 是纯 HTML + CSS + 内联 JS

#### 5.3 Demo 定位说明

在生成 demo 后，明确告知用户：

> ✅ 方向性 demo 已生成！
>
> 📄 文件路径：`docs/02-方案设计/品牌动效demo.html`
> 🌐 查看方式：浏览器直接打开该文件
>
> ⚠️ **重要说明**：
> - 此 demo 是**方向验证**，非最终交付品
> - SVG 可能是简化版，设计师需基于原始 logo 精修
> - 缓动曲线、编排细节需要设计师专业调校
> - demo 的价值是让团队对动效方向达成共识

---

### 步骤 6: 输出品牌动效方案文档

使用 Write 工具创建 `docs/02-方案设计/品牌动效方案.md`：

```markdown
# {产品名称} 品牌动效方案

## 文档信息

- **产品名称**: {从前置文档提取}
- **动效范围**: {开场动画/加载状态/交互微动效/页面过渡}
- **创建时间**: {当前时间}
- **设计工具**: super-pm

---

## 一、动效定位

### 1.1 品牌性格词

{3个性格词}

### 1.2 动效风格

{性格词映射的动效风格描述}

| 参数 | 值 |
|------|-----|
| 总时长 | {时长}ms |
| 缓出曲线 | {cubic-bezier值} |
| 缓入缓出曲线 | {cubic-bezier值} |
| overshoot程度 | {描述} |
| 编排节奏 | {描述} |

### 1.3 使用场景

{场景描述}

---

## 二、编排方案

### 2.1 部件识别

| 部件 | 类型 | 动效角色 | 说明 |
|------|------|---------|------|
| {部件1} | mark | 主角 | {描述} |
| {部件2} | wordmark | 配角 | {描述} |
| {部件3} | 装饰 | 点缀 | {描述} |

### 2.2 编排模式

{编排模式名称和描述}

### 2.3 时间分配

| 阶段 | 占比 | 时长 |
|------|------|------|
| 预备 | 20% | ~{值}ms |
| 动作 | 50% | ~{值}ms |
| 收尾 | 30% | ~{值}ms |
| **总计** | 100% | **{值}ms** |

### 2.4 部件编排顺序

1. {主角}（0ms 开始，{值}ms 完成）
2. {配角}（{偏移}ms 开始，{值}ms 完成）
3. {点缀}（{偏移}ms 开始，{值}ms 完成）

---

## 三、动效原则

基于 Disney 12 动画原则，本方案重点应用：

- **{原则1}**：{具体应用说明}
- **{原则2}**：{具体应用说明}
- **{原则3}**：{具体应用说明}

（其他原则根据性格词选择性应用）

---

## 四、方向性 Demo

- **demo 文件**: `docs/02-方案设计/品牌动效demo.html`
- **demo 定位**: 方向验证，非最终交付品
- **查看方式**: 浏览器直接打开

### 4.1 demo 与成品的差距

| 维度 | 当前 demo | 设计师交付品 |
|------|----------|-------------|
| SVG 精度 | 简化方向版 | 原始 logo 精确矢量 |
| 缓动曲线 | 通用曲线 | 精确调校 |
| 编排细节 | 基础编排 | 专业级编排 |
| 自交叉处理 | 不处理 | 专业技法处理 |

---

## 五、设计师精修指引

### 5.1 精修方向

- {基于 demo 指出需要精修的具体点}
- {缓动曲线需要从通用值调校到品牌专属值}
- {编排衔接需要更流畅的过渡}

### 5.2 推荐工具

- After Effects + Lottie（专业动效 + Web 导出）
- Principle（快速动效原型）
- Figma Motion（设计工具内动效）
- SVG 动画专业工具

### 5.3 精修重点

1. 缓动曲线精确调校（从通用值到品牌专属值）
2. 部件间衔接细节（消除机械感）
3. 自交叉路径处理（如有书法/∞形元素）
4. 最终帧必须与静态 logo 完全一致
5. loading 循环动画需无缝衔接（首帧 = 尾帧）

---

## 六、下一步建议

1. **/pm-tech** - 评估动效技术实现可行性（推荐）
2. **/pm-data** - 定义动效相关数据指标
3. **/pm-proto** - 将动效融入原型设计

---

**文档状态**: 品牌动效方案完成
**生成时间**: {时间戳}
**生成工具**: super-pm
```

---

### 步骤 7: 输出完成提示

使用 AskUserQuestion 提供下一步选项：

> ✅ 品牌动效方案已生成！
>
> 📄 方案文档：`docs/02-方案设计/品牌动效方案.md`
> 🎬 Demo 文件：`docs/02-方案设计/品牌动效demo.html`
>
> 🎯 建议下一步：
>
> A) 执行 /pm-tech - 技术对接（推荐）
> B) 执行 /pm-data - 数据指标设计
> C) 执行 /pm-proto - 融入原型设计
> D) 浏览器打开 demo 查看效果

---

## 兜底机制

### 场景 1: 前置文档不存在

```markdown
⚠️ 未找到前置文档

品牌动效设计需要了解产品的品牌定位。

您可以选择：
A) 执行 /pm-position 生成产品定位方案
B) 执行 /pm-proto 生成原型设计方案
C) 手动输入品牌信息（快速模式）

是否继续？
```

### 场景 2: 没有 logo 文件

```markdown
⚠️ 未找到 logo 文件

品牌动效 demo 需要基于 logo 制作。

您可以选择：
A) 提供 logo 文件路径
B) 描述 logo 视觉结构（文字模式）
C) 先完成方案文档，后续再制作 demo

是否继续？
```

### 场景 3: 用户不确定动效方向

引导用户思考：

> 🤔 不确定动效方向？
>
> 我可以帮您：
> A) 根据品牌性格自动推荐编排模式
> B) 展示不同编排模式的效果对比
> C) 参考同类产品的动效风格
> D) 从 logo 视觉语言推导动效性格

---

## 注意事项

1. **方向验证而非交付**：demo 是方向性的，明确标注"非最终交付品"
2. **性格词驱动**：所有动效参数从性格词推导，不凭空发明
3. **部件语义化**：SVG 每个部件有独立 id，方便设计师后续精修
4. **性能优先**：动画只使用 transform 和 opacity
5. **无障碍必须**：prefers-reduced-motion 处理不可省略
6. **keyframes 缓动必须 literal**：`@keyframes` 内不能用 CSS 变量做 timing-function
7. **不依赖外部工具**：demo 是纯 HTML + CSS + 内联 JS，不依赖 pixel2motion、Playwright、headless Chrome 或任何外部脚本。动画控制用 CSS class toggle + CSS 变量，不用 JS DOM 重建或 `getAnimations().playbackRate`

---

## Demo HTML 视觉品质硬性规则（踩坑总结，必须遵守）

以下规则来自实际测试踩坑，**违反任何一条 = demo 不合格**：

### 居中规则

1. **html, body 必须设 `width: 100%; height: 100%`** — 否则 flex 居中不生效，内容偏移
2. **body 用 `display: flex; align-items: center; justify-content: center`** — 这是唯一可靠的居中方式
3. **SVG 内文字用 `text-anchor="middle"` + `x="50%"`** — SVG `<text>` 默认左对齐，不居中
4. **HTML 文字用 `text-align: center; display: block`** — inline 元素不居中
5. **控制面板用 `position: fixed; left: 50%; transform: translateX(-50%)`** — fixed 元素不参与 flex 居中

### SVG 视觉重心规则

6. **SVG 内容的视觉重心必须在 viewBox 中心附近** — 手绘 SVG 时，所有形状围绕 viewBox 中心 (50%, 50%) 分布。如果恐龙身体偏右，尾巴必须向左延伸来平衡视觉重心。**viewBox 内视觉偏移 = 不合格**

### 文字渲染规则

7. **品牌文字用 HTML `<span>` 渲染，不用 SVG `<text>`** — SVG `<text>` 在不同系统上字体渲染不一致、对齐不可控。HTML `<span>` 跨平台一致且排版可控。**用 SVG `<text>` 做品牌文字 = 不合格**

### 尺寸规则

8. **Mark SVG 尺寸至少 120px** — 太小的 mark 在屏幕上缺乏冲击力，无法传达品牌感。**mark 小于 100px = 不合格**

### 动画层次规则

9. **主角动画必须包含至少 3 个关键帧阶段** — 简单的 opacity 0→1 + translateY 浮现太机械。必须包含入场 → overshoot → settle 三个阶段（如 `scale(0.8) → scale(1.03) → scale(0.99) → scale(1)`），体现 bounce-back 呼吸感。**只有 2 个关键帧的简单浮现 = 不合格**

10. **部件间必须有编排偏移（150-250ms）** — 所有部件同时开始动画是机械感的第一来源。mark → wordmark → tagline 依次出现，偏移递增。**所有部件 animation-delay 相同 = 不合格**

### 配色规则

11. **深色背景上，mark 和 wordmark 必须足够亮** — 深色背景（如 #0c0c14）上，主色至少 #4f8cff 级别的亮度。整体偏暗沉闷 = 看不清 = 不合格

12. **SVG 填充用渐变（至少 2 色），不用单色** — 单色填充缺乏丰富度。使用 `<linearGradient>` 从主色到辅色渐变。**SVG 用单色 fill = 不合格**

13. **背景光晕至少 500px + blur 100px** — 光晕太小或 blur 太轻，氛围感不足。光晕从中心扩散，营造品牌氛围。**光晕小于 400px 或 blur 小于 80px = 不合格**

### 造型规则（适用于所有 mark）

14. **Mark 用流畅曲线（圆润饱满），不用直线拼接（粗糙几何）** — 贝塞尔曲线必须用 `C` 命令画流畅弧线，不能用 `L` 命令画直线拼接。**mark 身体有直线段 = 不合格**

15. **眼睛/焦点必须有高光点** — 如果 mark 有眼睛或视觉焦点，白色大圆 + 黑色瞳孔 + 白色小高光点（opacity 0.6），让焦点生动。**只有黑白两层的平面眼睛 = 不合格**

16. **装饰细节用特征性形状，不用通用弧线** — 恐龙脊线用小三角 `<path>`（如 `M72 50 L74 44 L76 50`），火焰用尖角，水滴用弧形。装饰形状应匹配 mark 的语义特征。**装饰用通用弧线 = 不合格**

17. **边缘有微光高光** — mark 轮廓加一条 `stroke="#fff" opacity="0.15"` 的描边，增加精致感。**无边缘高光 = 不合格**

### 间距规则

18. **mark → wordmark 间距 20-24px，wordmark → tagline 10-12px，tagline → 装饰线 18-20px** — 间距递减体现信息层次（主角 > 配角 > 点缀）。**间距混乱或全部相同 = 不合格**

### 总时长规则

19. **总时长必须匹配性格词** — "精准·专业·可靠"需要从容节奏（1200-1500ms），"活力·大胆·进取"需要快速节奏（500-800ms）。**总时长与性格词矛盾 = 不合格**

---

## 输出文件

- 品牌动效方案 → `docs/02-方案设计/品牌动效方案.md`
- 方向性 demo → `docs/02-方案设计/品牌动效demo.html`

---

## 输出质量对比

**✅ Good 示例**：
```
- 性格词明确：「精准·专业·可靠 → 克制稳定风格，总时长 1000ms」
- 编排有逻辑：「mark 先动（主角），wordmark 后动（配角），偏移 150ms」
- demo 可感知方向：「浏览器打开能看到动效节奏和编排顺序」
- 明确标注定位：「方向验证 demo，设计师需精修缓动曲线和衔接细节」
```

**❌ Bad 示例**：
```
- 性格词模糊：「动效要好看、有感觉」
- 编排无逻辑：「所有部件同时出现」
- demo 无法感知方向：「只有闪烁，看不出编排意图」
- 混淆定位：「demo 就是最终交付品」
```

---

## 常见误区 / Red Flags — STOP

出现以下情况立即停止并回溯：

| 误区 | 正确做法 |
|------|---------|
| html/body 没设 width/height 100% | 必须设 `width: 100%; height: 100%`，否则 flex 居中不生效 |
| 内容不居中（偏左/偏上） | body 用 `display: flex; align-items: center; justify-content: center` |
| SVG 内文字左对齐 | 用 `text-anchor="middle"` + `x="50%"` |
| 品牌文字用 SVG `<text>` | 用 HTML `<span>`，跨平台一致 |
| mark SVG 小于 100px | 至少 120px，否则缺乏冲击力 |
| 主角动画只有 2 个关键帧 | 必须至少 3 阶段（入场→overshoot→settle），体现 bounce-back |
| 所有部件 animation-delay 相同 | 必须有编排偏移（150-250ms），mark→wordmark→tagline 依次 |
| SVG 用单色 fill | 用 `<linearGradient>` 渐变填充（至少 2 色） |
| 背景光晕太小（<400px） | 至少 500px + blur 100px |
| 深色背景上内容看不清 | 主色至少 #4f8cff 级别亮度 |
| Mark 身体有直线段 | 用 C 曲线画圆润弧线，不用 L 直线拼接 |
| 眼睛/焦点只有黑白两层 | 加白色高光点（opacity 0.6） |
| 装饰用通用弧线 | 用特征性形状（恐龙→三角，火焰→尖角，水滴→弧形） |
| 无边缘高光 | 加 `stroke="#fff" opacity="0.15"` 描边 |
| 间距混乱或全部相同 | mark→wordmark 20-24px，wordmark→tagline 10-12px，tagline→line 18-20px |
| 总时长与性格词矛盾 | "精准·专业·可靠"→1000-1500ms，"活力·大胆·进取"→600-900ms |
| `@keyframes` 内使用 `var()` 做 timing-function | 必须写 literal cubic-bezier |
| 省略 prefers-reduced-motion | 无障碍处理不可省略 |
| 把 demo 当成品交付 | 明确标注"方向验证，非最终交付" |
| 动画使用 layout 属性（width/height/margin） | 只用 transform + opacity |
| 依赖 pixel2motion 脚本或工具 | demo 必须纯 HTML+CSS+内联JS，不依赖任何外部工具 |
| replay 用 cloneNode/replaceChild 或 JS DOM 重建 | 用 CSS class toggle（移除→reflow→添加） |
| 速度用 JS `getAnimations().playbackRate` | 用 CSS 变量 `--spm-speed` + `calc(duration/speed)` |

---

## 产出质量检查 / Verification Checklist

**流程检查**：
- [ ] 前置依赖已满足（定位方案或原型方案已读取）
- [ ] 性格词已确定并映射到动效参数
- [ ] 编排方案已规划（部件、模式、时间）
- [ ] 方案文档已生成到 `docs/02-方案设计/`
- [ ] demo 和文档都标注了"方向验证"定位
- [ ] 已推荐 2-3 个后续 skill

**Demo 视觉品质检查（浏览器打开后逐项确认）**：
- [ ] 内容完全居中（不偏左/偏上）
- [ ] mark SVG ≥ 120px，视觉有冲击力
- [ ] 品牌文字用 HTML `<span>`（不是 SVG `<text>`）
- [ ] 主角动画有 3+ 关键帧阶段（入场→overshoot→settle）
- [ ] 部件间有编排偏移（150-250ms）
- [ ] SVG 填充用渐变（不是单色）
- [ ] 背景光晕 ≥ 500px + blur ≥ 100px
- [ ] 深色背景上内容清晰可辨
- [ ] Mark 造型圆润（C 曲线，无直线段）
- [ ] 眼睛/焦点有高光点
- [ ] 装饰用特征性形状（匹配 mark 语义）
- [ ] 边缘有微光高光描边
- [ ] 间距有层次（递减）
- [ ] 总时长匹配性格词
- [ ] prefers-reduced-motion 已处理
- [ ] `@keyframes` 内 timing-function 是 literal cubic-bezier
- [ ] 不依赖任何外部工具（pixel2motion、Playwright 等）
- [ ] replay 用 CSS class toggle，不用 cloneNode/JS DOM 重建
- [ ] 速度用 CSS 变量 `--spm-speed`，不用 JS `getAnimations().playbackRate`

> ⚠️ 任何一项未通过 → 补全后再标记完成。
