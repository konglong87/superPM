# PM-Skills 产品经理技能包「三平台全适配安装使用教程」
本教程针对产品经理常用的 **Claude Code、OpenClaw、WorkBuddy** 三大平台，分别提供保姆级安装、激活、使用全流程，无代码基础也能10分钟完成配置，直接上手全量43项产品专属技能。

---

## 一、三平台适配总览
| 平台 | 适配优势 | 推荐人群 | 技能兼容性 |
|------|----------|----------|------------|
| Claude Code | gstack原生适配平台，技能联动逻辑最完整，支持全量功能 | 有基础终端操作能力、常用Claude生态的产品经理 | 100%全功能兼容 |
| OpenClaw | 国内网络友好，完全兼容Claude技能规范，支持可视化+命令行双模式 | 国内职场产品经理，兼顾易用性与扩展性 | 99%功能兼容，联网搜索能力适配更友好 |
| WorkBuddy | 腾讯出品，纯可视化操作，无需命令行，企业级安全合规 | 零基础产品经理、企业内部团队协作场景 | 95%功能兼容，可视化操作更便捷 |

---

## 二、平台1：Claude Code 安装使用教程（原生适配·推荐）
### 1. 前置准备
- 已安装 Claude Code 客户端（≥0.15.0版本）
- 已安装 Git、Node.js ≥18 LTS（官网一键安装即可，无需额外配置）
- 终端具备基础读写权限
- 已开启 Claude Code 联网权限（用于市场调研、竞品分析等联网技能）

### 2. 详细安装步骤（2种方式，任选其一）
#### 方式一：一键全局安装（推荐·所有项目通用）
1. 打开终端（macOS用「终端」，Windows用WSL2），直接复制整条命令运行：
```bash
git clone https://github.com/pm-skills/pm-skills.git ~/.claude/skills/pm-skills && cd ~/.claude/skills/pm-skills && chmod +x ./setup && ./setup
```
2. 终端输出 `✅ PM-Skills 安装完成！共加载43个技能` 即为安装成功。

#### 方式二：项目级安装（仅当前项目生效·团队协作推荐）
1. 终端进入你的产品项目根目录，运行命令创建技能目录：
```bash
mkdir -p ./.claude/skills/pm-skills
```
2. 下载PM-Skills安装包，解压后将所有文件复制到上述目录
3. 终端进入目录，运行安装脚本：
```bash
cd ./.claude/skills/pm-skills && chmod +x ./setup && ./setup
```

### 3. 项目初始化与激活
1. 在你的产品项目根目录，新建 `PM-CLAUDE.md` 配置文件，复制以下模板填写：
```markdown
# 产品基础信息
产品名称：
产品定位：
目标用户：
业务目标：
行业赛道：
# 模式配置
product_mode: ToB # 可选ToB/ToC
user_mode: beginner # 可选beginner/expert
auto_trigger: true
# 技能激活
skills: pm-skills
web_search: true
```
2. 在项目根目录启动 Claude Code，技能包会自动加载激活。

### 4. 安装成功验证
在Claude Code对话窗口输入：
```
/pm-demand
```
弹出需求调研引导界面，无报错即为安装成功。

### 5. 常见问题排查
| 问题 | 解决方案 |
|------|----------|
| 提示「命令不存在」 | 检查安装路径是否正确，必须放在 `~/.claude/skills/` 或项目级 `./.claude/skills/` 目录 |
| 权限报错 | 给脚本加执行权限：`chmod +x ~/.claude/skills/pm-skills/bin/*` |
| 联网功能失效 | 检查Claude Code的联网权限是否开启，在设置中开启「允许网络访问」 |

---

## 三、平台2：OpenClaw 安装使用教程（国内网络友好·推荐）
### 1. 前置准备
- 已安装 OpenClaw 客户端（最新版）
- 已开启 OpenClaw 联网权限
- 可选：安装Git、Node.js ≥18 LTS（命令行安装用，可视化安装无需）

### 2. 详细安装步骤（3种方式，任选其一）
#### 方式一：ClawHub一键安装（推荐·零基础友好）
1. 打开OpenClaw主界面，在对话窗口输入：
```
/clawhub search pm-skills
```
2. 搜索到官方技能包后，输入安装命令：
```
/clawhub install pm-skills
```
3. 提示「安装成功，已加载43项技能」即为完成。

#### 方式二：手动本地安装（最稳妥·无网络限制）
1. 下载PM-Skills完整安装包，解压得到 `pm-skills` 文件夹
2. 打开OpenClaw的技能目录：
    - macOS/Linux：`~/.openclaw/skills/`
    - Windows：`C:\Users\你的用户名\.openclaw\skills\`
3. 将解压后的 `pm-skills` 文件夹完整复制到上述目录
4. 在OpenClaw对话窗口输入热加载命令：
```
/reload-skills
```
提示「技能重载完成」即为安装成功。

#### 方式三：命令行安装（进阶用户）
1. 安装skillhub工具：
```bash
npm install -g @openclaw/skillhub
```
2. 一键安装PM-Skills：
```bash
skillhub install pm-skills
```

### 3. 项目初始化与激活
1. 在你的产品项目根目录，新建 `SKILL.md` 配置文件，复制以下内容：
```markdown
# PM-Skills 产品经理技能包
## 描述
覆盖产品全生命周期的43项专属技能，适配产品经理需求调研、方案设计、增长迭代、风控全流程
## 使用方法
当用户进行产品相关工作时，自动调用对应技能，支持斜杠命令手动触发
## 配置
product_mode: ToB
user_mode: beginner
web_search: true
```
2. 在OpenClaw中打开该项目目录，技能包自动激活。

### 4. 安装成功验证
在OpenClaw对话窗口输入：
```
/pm-search-market
```
弹出市场调研参数引导，即为安装成功。

### 5. 常见问题排查
| 问题 | 解决方案 |
|------|----------|
| 技能不识别 | 检查文件夹名称是否为 `pm-skills`，目录是否正确，执行 `/reload-skills` 重载 |
| 联网功能失效 | 检查OpenClaw设置中「网络访问权限」是否开启，替换国内数据源 |
| 命令报错 | 执行 `openclaw skill check pm-skills` 校验技能完整性，重新安装损坏文件 |

---

## 四、平台3：WorkBuddy 安装使用教程（纯可视化·零基础友好）
### 1. 前置准备
- 已安装 WorkBuddy 客户端（最新版，腾讯官方出品）
- 已登录企业/个人账号，具备技能安装权限
- 已开启客户端联网权限

### 2. 详细安装步骤（3种方式，任选其一）
#### 方式一：技能中心一键安装（推荐·完全无需代码）
1. 打开WorkBuddy主界面，点击左侧菜单栏「技能中心」
2. 在顶部搜索框输入「PM-Skills 产品经理技能包」
3. 找到官方认证的技能包，点击右侧「安装」
4. 安装完成后，点击「启用」，技能包即可全局生效。

#### 方式二：本地ZIP包导入（企业内网/离线场景）
1. 下载PM-Skills官方ZIP安装包（无需解压）
2. 打开WorkBuddy，点击右上角头像→进入「设置」→「技能管理」
3. 点击右上角「导入本地技能」，选择下载好的ZIP包
4. 系统自动校验完成后，点击「确认安装」→「启用」即可。

#### 方式三：命令行批量安装（企业团队部署）
1. 安装WorkBuddy CLI工具：
```bash
npm install -g workbuddy-cli
```
2. 一键安装PM-Skills：
```bash
wb skill install pm-skills
```

### 3. 项目初始化与激活
1. 新建/打开你的产品项目，在项目根目录新建 `PM-CONFIG.json` 配置文件：
```json
{
  "product_name": "",
  "product_mode": "ToB",
  "user_mode": "beginner",
  "auto_trigger": true,
  "web_search": true,
  "enabled_skills": ["pm-skills"]
}
```
2. 在WorkBuddy中关联该项目，技能包会自动适配项目配置。

### 4. 安装成功验证
在WorkBuddy对话窗口输入：
```
列出当前已启用的所有技能
```
返回结果中包含「PM-Skills 产品经理技能包」及43项子技能，即为安装成功。

### 5. 常见问题排查
| 问题 | 解决方案 |
|------|----------|
| 导入失败 | 检查ZIP包是否完整，重新下载官方包，关闭杀毒软件后重试 |
| 技能不生效 | 进入「技能管理」确认技能已启用，重启WorkBuddy客户端 |
| 联网功能失效 | 进入「设置」→「权限管理」，开启「网络访问」「数据查询」权限 |
| 企业内网无法安装 | 联系企业IT管理员开放SkillHub访问权限，或使用本地ZIP导入 |

---

## 五、三平台通用使用规范与最佳实践
1.  **新手推荐**：优先使用 `beginner` 模式，开启 `auto_trigger` 自动触发，跟着引导一步步完成产品全流程工作
2.  **项目管理**：每个产品项目单独创建配置文件，技能包会自动适配项目属性，复用历史数据
3.  **数据安全**：敏感项目关闭自动联网，手动控制 `/pm-search-xxx` 系列技能的调用，避免内部数据泄露
4.  **团队协作**：将项目级配置文件纳入Git版本管理，确保团队所有成员使用统一的技能规范与配置
5.  **技能优先级**：核心流程严格按照「需求洞察→方案设计→增长迭代→风控兜底」的顺序执行，避免跳过前置环节导致需求跑偏