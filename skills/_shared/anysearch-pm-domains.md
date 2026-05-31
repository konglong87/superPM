# AnySearch 垂直域 PM 场景预置配置

> 每个 PM 技能应根据自身场景，优先使用对应垂直域以获得高质量结构化数据。
> 通用域搜索（无 `--domain` 参数）适用于舆情监控、用户调研等无特定垂直域的场景。

## PM 核心场景域映射

### 01 - 需求洞察 (Demand Insight)

| 技能 | 推荐域 combinaton | 说明 |
|------|-----------------|------|
| pm-demand | `business.company` + `finance.cn_stock` | 竞品公司信息、上市公司财务数据辅助需求验证 |
| pm-brainstorm | `code.doc` (灵感火花:技术趋势) + `academic.search` | 新技术方案搜索、学术前沿灵感 |
| pm-clarify | 通用搜索 | 需求细化以用户交互为主，外部搜索为辅 |
| pm-market | `finance.cn_stock` + `finance.news` + `business.company` | 市场规模、行业新闻、公司信息 |
| pm-priority | 无需垂直域 | 优先级排序为内部分析 |
| pm-mvp | `code.doc` + `code.snippet` | MVP 技术可行性验证 |
| pm-pool | 无需垂直域 | 需求池管理为内部操作 |
| pm-journey | 通用搜索 | 用户旅程依赖通用搜索 |
| pm-search | `finance.*` + `business.company` + `legal.*` | 根据搜索类型动态选择（详见 pm-search skill） |

### 02 - 方案设计 (Solution Design)

| 技能 | 推荐域组合 | 说明 |
|------|----------|------|
| pm-docs | `code.doc` | 技术文档参考 |
| pm-proto | `code.doc` + `code.snippet` | 原型设计时可搜索组件库、交互模式 |
| pm-tech | `code.snippet` + `code.doc` + `ip.global` | 技术选型代码搜索、专利查重 |
| pm-feature | `code.doc` | 功能设计时搜索同类实现 |
| pm-data | `code.doc` | 数据指标设计参考 |
| pm-position | `business.company` + `finance.news` | 竞品定位分析 |
| pm-user-story | 通用搜索 | 用户故事以产品内部为主 |

### 03 - 增长迭代 (Growth & Iteration)

| 技能 | 推荐域组合 | 说明 |
|------|----------|------|
| pm-aarrr | `ecommerce.catalog` + `business.company` | 电商产品搜索、竞品增长对标 |
| pm-growth | `business.jobs` + `finance.news` | 行业增长案例、招聘趋势反映行业热度 |
| pm-report | 通用搜索 | 报告以内部数据为主 |
| pm-abtest | `academic.search` | A/B 测试方法论学术参考 |
| pm-iteration | 无需垂直域 | 迭代计划为内部规划 |
| pm-retro | 无需垂直域 | 回顾会议为内部复盘 |
| pm-roadmap | 无需垂直域 | 路线图规划为内部决策 |
| pm-feedback | 通用搜索 | 用户反馈分析以输入数据为主 |

### 04 - 风控管理 (Risk Management)

| 技能 | 推荐域组合 | 说明 |
|------|----------|------|
| pm-agile | 无需垂直域 | 敏捷管理为流程操作 |
| pm-cross | 无需垂直域 | 跨部门协作为内部协调 |
| pm-risk | `legal.statute` + `legal.case` + `finance.news` | 法规风险、诉讼案例、行业风险事件 |
| pm-release | `code.doc` + `code.snippet` | 发布检查清单技术参考 |
| pm-change | `legal.statute` | 变更管理合规检查 |

### 05 - 产品战略 (Product Strategy)

| 技能 | 推荐域组合 | 说明 |
|------|----------|------|
| pm-business-model | `business.company` + `finance.us_stock` + `finance.cn_stock` | 对标公司商业模式、财务数据 |
| pm-decision | `business.company` + `finance.news` + `ip.global` | 决策支持：公司信息、行业新闻、专利布局 |
| pm-funnel | `ecommerce.catalog` | 转化漏斗可参考电商产品数据 |
| pm-portfolio | `finance.cn_stock` + `finance.us_stock` + `business.company` | 产品组合对标上市公司财报 |
| pm-resource | `business.jobs` + `business.company` | 资源规划：行业薪酬、团队规模对标 |

---

## 行业 PM 专项域映射

### SaaS / 企业服务 PM

| 场景 | 域 | sub_domain | query 示例 |
|------|---|-----------|-----------|
| 技术选型 | code | code.doc | `react:state management` |
| 代码实现参考 | code | code.snippet | `oauth2 middleware go` |
| 竞品公司信息 | business | business.company | `钉钉` |
| 行业薪酬对标 | business | business.jobs | `senior backend engineer` |
| 专利查重 | ip | ip.global | `ta="machine learning" AND pa="Google"` |

### 电商 / 零售 PM

| 场景 | 域 | sub_domain | query 示例 |
|------|---|-----------|-----------|
| 产品目录研究 | ecommerce | ecommerce.catalog | `wireless earbuds noise cancelling` |
| 上市公司对标 | finance | finance.cn_stock | `京东` |
| 美股对标 | finance | finance.us_stock | `AMZN` |
| 行业新闻 | finance | finance.news | `ecommerce` |

### 金融科技 PM

| 场景 | 域 | sub_domain | query 示例 |
|------|---|-----------|-----------|
| A 股数据 | finance | finance.cn_stock | `600519` |
| 美股数据 | finance | finance.us_stock | `JPM` |
| 外汇行情 | finance | finance.forex | `EUR_USD` |
| 金融新闻 | finance | finance.news | `crypto` |
| 监管法规 | legal | legal.statute | `证券法` |

### 游戏 PM

| 场景 | 域 | sub_domain | query 示例 |
|------|---|-----------|-----------|
| 游戏价格/评价 | gaming | gaming.store | `原神` |
| 电竞数据 | gaming | gaming.esports | `Faker#KR1` |

### 医疗健康 PM

| 场景 | 域 | sub_domain | query 示例 |
|------|---|-----------|-----------|
| 医学文献 | health | health.literature | `糖尿病 治疗方案` |
| 心理学研究 | health | health.psychology | `cognitive behavioral therapy` |
| 生物医学论文 | academic | academic.biomedical | `CRISPR gene editing` |
| 药品专利 | ip | ip.global | `ta="antibody" AND pa="Moderna"` |

### 教育科技 PM

| 场景 | 域 | sub_domain | query 示例 |
|------|---|-----------|-----------|
| 学术研究 | academic | academic.search | `adaptive learning algorithms` |
| 生物医学教育 | academic | academic.biomedical | `medical education simulation` |

### 旅游出行 PM

| 场景 | 域 | sub_domain | query 示例 |
|------|---|-----------|-----------|
| 目的地攻略 | travel | travel.guide | `巴厘岛 潜水` |
| 航班状态 | travel | travel.flight_status | `flight:CA1234` |
| 天气查询 | geo | geo.weather | `Tokyo` |
| 目的地 POI | geo | geo.map | `Eiffel Tower` |

### 能源 / 环保 PM

| 场景 | 域 | sub_domain | query 示例 |
|------|---|-----------|-----------|
| 大宗商品价格 | energy | energy.price | `WTICO_USD` |
| 欧洲电价 | energy | energy.eu | `price Germany 2026-01-15` |
| 澳洲电网 | energy | energy.au | `NEM power NSW` |
| 美国能源数据 | energy | energy.us | `natural gas prices` |
| 农业数据 | environment | environment.agriculture | `wheat production` |

### 房地产 / 本地生活 PM

| 场景 | 域 | sub_domain | query 示例 |
|------|---|-----------|-----------|
| 地址坐标转换 | geo | geo.geocode | `北京市海淀区中关村` |
| 周边 POI | geo | geo.map | `nearby:116.397,39.908 咖啡` |
| 步行指数 | geo/home | geo.walkability / home.walkability | `40.7128,-74.0060,Manhattan` |

### 影视 / 音乐 PM

| 场景 | 域 | sub_domain | query 示例 |
|------|---|-----------|-----------|
| 影视资源 | film | film.torrent | `Inception` |
| 音乐资源 | music | music.torrent | `The Beatles Abbey Road` |

---

## Subagent Prompt 域选择模板

在需要子代理执行搜索的 prompt 中，按此模板追加域选择指令：

```markdown
【AnySearch 垂直域选择】
根据当前任务场景，使用以下垂直域（参考 pm 垂直域预置配置）：
- 默认域组合: {根据上表选择}
- 搜索命令: python3 <anysearch_cli路径> search "查询词" --max_results 5 --domain {domain} --sub_domain {sub_domain}
- 拿不准时: 先用通用搜索（无 --domain），根据结果质量决定是否加垂直域
- 多个垂直域查询: 使用 batch_search 并行搜索
```

---

## 版本历史

| 版本 | 日期 | 说明 |
|------|------|------|
| 1.0.0 | 2026-05-31 | 初始版本，覆盖 17 个垂直域，37 个 PM 技能 × 11 个行业 PM 专项场景 |

> **维护原则**: AnySearch 新增垂直域时，在本文件中添加对应 PM 场景映射即可，无需修改各 skill 文件。