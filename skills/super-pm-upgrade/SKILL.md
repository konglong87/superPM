---
name: super-pm-upgrade
description: |
  Use when: 用户要求检查 super-pm 更新、升级完整 Git 安装或回退
  Do NOT use when: 正在执行普通 PM 任务、仅需安装健康检查或用户没有要求升级
allowed-tools:
  - Read
  - Bash
  - AskUserQuestion
---

# 安全升级 super-pm

**绝不在用户的业务项目仓库中运行升级用 Git 命令。** 从已加载的本 SKILL.md 找到同目录的 `scripts/package-root.sh`，执行它获取技能包 Git 根目录。此脚本使用自身真实位置定位，不依赖当前工作目录。

```bash
PACK_ROOT="$(bash "<当前 super-pm-upgrade skill 的绝对目录>/scripts/package-root.sh")" || exit 2
printf 'super-pm package: %s\n' "$PACK_ROOT"
```

如果该命令失败，当前为复制安装或非 Git 安装；**停止 Git 升级流程**，根据安装方式使用 `npx skills update` 或平台自己的更新机制。不要退回 `git pull` 用户当前项目。

## 检查（只读，网络 fetch 除外）

每次调用 Bash 工具时重新设置绝对的 `PACK_ROOT`，或显式将命令的工作目录设为该包。以下所有 `git` 命令必须带 `-C "$PACK_ROOT"`：

```bash
PACK_ROOT="$(bash "<当前 skill 绝对目录>/scripts/package-root.sh")" || exit 2
git -C "$PACK_ROOT" status --short
git -C "$PACK_ROOT" branch --show-current
cat "$PACK_ROOT/VERSION"
git -C "$PACK_ROOT" fetch origin main --tags
git -C "$PACK_ROOT" log -1 --oneline HEAD
git -C "$PACK_ROOT" log -1 --oneline origin/main
```

比较当前 HEAD 与 `origin/main`。有未提交改动、非快进、未处在预期分支或远程不可用时停止并说明，不自动 stash、重置、切换分支或覆盖文件。用户仅要求“检查”时到此为止。

## 执行升级（需要用户明确确认）

告知用户目标提交、当前版本和影响后确认。确认前不运行以下命令：

```bash
PACK_ROOT="$(bash "<当前 skill 绝对目录>/scripts/package-root.sh")" || exit 2
OLD_COMMIT="$(git -C "$PACK_ROOT" rev-parse HEAD)"
test -z "$(git -C "$PACK_ROOT" status --porcelain)" || exit 1
git -C "$PACK_ROOT" merge --ff-only origin/main || exit 1
printf 'previous=%s\ncurrent=%s\n' "$OLD_COMMIT" "$(git -C "$PACK_ROOT" rev-parse HEAD)"
cat "$PACK_ROOT/VERSION"
```

只用快进合并，不创建新分支或 worktree。验证版本与实际技能清单，再报告升级结果；没有验证时不能说成功。记录 `OLD_COMMIT` 以便用户决定是否回退，但**不自动回退**。回退需要再次确认，并确保技能包工作区干净；不得改动业务项目。

## 交互与兜底

如环境无 AskUserQuestion，普通聊天一次只问一个问题并等待回答。用户拒绝升级时停止。复制安装、权限不足、网络失败或无法快进时解释原因和安全的手动路径，不静默忽略错误。
