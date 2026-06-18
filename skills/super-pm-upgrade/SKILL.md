---
name: super-pm-upgrade
description: |
  Use when: 需要检查super-pm更新、升级到新版本、回退到旧版本
  Do NOT use when: 正常使用skill无需版本管理、首次安装而非升级
allowed-tools:
  - Read
  - Write
  - Bash
  - AskUserQuestion
---

## Preamble (run first)

```bash
bash "$(dirname "${BASH_SOURCE[0]}")"/check-update.sh 2>/dev/null || true
# 读取技能包版本号
SKILL_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" 2>/dev/null && pwd)" || true
if [ -f "$SKILL_ROOT/VERSION" ]; then echo "📦 super-pm $(cat "$SKILL_ROOT/VERSION")"; fi
# 检测当前版本
if [ -f "VERSION" ]; then
  CURRENT_VERSION=$(cat VERSION)
  echo "📦 当前版本: $CURRENT_VERSION"
else
  echo "⚠️  未找到VERSION文件"
  CURRENT_VERSION="unknown"
fi

# 检测Git仓库
if [ -d ".git" ]; then
  echo "✅ Git仓库检测成功"
else
  echo "❌ 未检测到Git仓库，无法升级"
  exit 1
fi
```

---

## 执行流程

### 步骤 1: 检测当前版本

使用 Read 工具读取 `VERSION` 文件。

记录当前版本到变量 `CURRENT_VERSION`

---

### 步骤 2: 查询最新版本

使用 Bash 工具执行：

```bash
# 获取远程仓库最新版本标签
git fetch --tags

# 获取最新标签
LATEST_TAG=$(git tag --sort=-v:refname | head -n 1)

echo "🏷️  最新版本: $LATEST_TAG"
```

记录最新版本到变量 `LATEST_VERSION`

---

### 步骤 3: 对比版本

AI 对比 `CURRENT_VERSION` 和 `LATEST_VERSION`：

**如果当前版本 = 最新版本**：

> ✅ 您已在最新版本！
>
> 当前版本: {CURRENT_VERSION}
> 最新版本: {LATEST_VERSION}
>
> 无需升级。

结束流程。

---

**如果当前版本 < 最新版本**：

> 🎉 发现新版本！
>
> 当前版本: {CURRENT_VERSION}
> 最新版本: {LATEST_VERSION}
>
> 是否查看更新日志？

用户选择后，继续。

---

### 步骤 4: 查看更新日志

使用 Bash 工具：

```bash
# 查看最新版本的更新日志
git log --pretty=format:"- %s" $CURRENT_VERSION..$LATEST_TAG
```

显示更新内容：

> 📋 更新日志 ({LATEST_VERSION})：
>
> {更新内容}

询问用户：

> 是否升级到 {LATEST_VERSION}？
>
> A) 是的，立即升级（推荐）
> B) 查看完整变更日志后再决定
> C) 暂不升级

---

### 步骤 5: 执行升级

如果用户选择升级：

#### 5.1 备份当前版本

使用 Bash 工具：

```bash
# 创建备份分支
BACKUP_BRANCH="backup/$(date +%Y%m%d_%H%M%S)"
git checkout -b $BACKUP_BRANCH

echo "✅ 已创建备份分支: $BACKUP_BRANCH"
```

---

#### 5.2 切换到最新版本

```bash
# 切换到最新标签
git checkout $LATEST_TAG

# 验证VERSION文件
NEW_VERSION=$(cat VERSION)
echo "✅ 已切换到版本: $NEW_VERSION"
```

---

#### 5.3 验证升级

使用 Read 工具验证 `VERSION` 文件内容。

确认版本号已更新。

---

### 步骤 6: 输出完成提示

> ✅ 升级成功！
>
> 原版本: {CURRENT_VERSION}
> 新版本: {LATEST_VERSION}
>
> 备份分支: {BACKUP_BRANCH}
>
> 如需回退，执行：
> ```bash
> git checkout {BACKUP_BRANCH}
> ```

---

## 回退流程

### 步骤 1: 查看备份分支

如果用户需要回退：

使用 Bash 工具：

```bash
# 列出所有备份分支
git branch | grep "backup/"
```

显示备份分支列表：

> 📂 可回退的版本：
>
> A) backup/20260325_154500 (v1.0.0)
> B) backup/20260324_120000 (v0.9.0)
> ...

---

### 步骤 2: 选择回退版本

使用 AskUserQuestion：

> 选择要回退的版本：

用户选择后，执行回退：

```bash
# 切换到备份分支
git checkout {BACKUP_BRANCH}

# 验证版本
cat VERSION
```

---

### 步骤 3: 验证回退

确认版本号正确。

输出：

> ✅ 已回退到版本 {VERSION}

---

## 兜底机制

### 场景 1: 网络问题

如果无法获取远程版本：

```bash
git fetch --tags 2>&1
if [ $? -ne 0 ]; then
  echo "❌ 无法连接到远程仓库"
  echo "请检查网络连接或稍后重试"
fi
```

---

### 场景 2: 未提交的更改

如果有未提交的更改：

```bash
git status --porcelain
if [ $? -ne 0 ]; then
  echo "⚠️  检测到未提交的更改"
  echo ""
  echo "建议先提交或暂存更改后再升级"
  echo ""
  echo "您可以选择："
  echo "A) 暂存更改（git stash）"
  echo "B) 提交更改"
  echo "C) 放弃升级"
fi
```

---

### 场景 3: 版本号格式错误

如果VERSION文件格式不正确：

```bash
if ! [[ "$CURRENT_VERSION" =~ ^v[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
  echo "⚠️  VERSION文件格式不正确: $CURRENT_VERSION"
  echo "期望格式: v1.0.0"
fi
```

---

## 注意事项

1. **备份重要**：升级前自动创建备份分支
2. **网络依赖**：需要访问Git远程仓库
3. **版本号格式**：遵循语义化版本（v1.0.0）
4. **回退支持**：任何时候都可以回退到旧版本
5. **Git依赖**：需要Git仓库环境

---

## 版本历史

- **v1.0.0** (2026-03-25): 初始版本，包含需求洞察模块8个skill
- **v1.1.0** (计划中): 方案设计模块
- **v1.2.0** (计划中): 增长迭代模块
- **v2.0.0** (计划中): 完整27个skill

---

## 产出质量检查 / Verification Checklist

- [ ] 版本号已确认（当前版本 vs 目标版本）
- [ ] 升级脚本已验证
- [ ] 回退方案已准备
- [ ] VERSION 文件已更新

> ⚠️ 任何一项未通过 → 不要执行升级。

---

## 常见误区 / Red Flags — STOP

出现以下情况立即停止并回溯：

| 误区 | 正确做法 |
|------|---------|
| 使用"应该"、"大概"、"看起来"做结论 | 必须基于实际数据和验证 |
| 未运行检查就声称已完成 | 先验证，再陈述 |
| 跳过备份直接升级 | 先备份，再升级 |

---
