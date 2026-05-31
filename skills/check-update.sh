#!/bin/bash
# skills/check-update.sh - super-pm 静默检查更新
# 在所有 SKILL.md 的 Preamble 中调用
# 每个会话只检查一次（使用 /tmp 标记），无更新时零输出

FLAG="/tmp/super-pm-update-checked"

# 本轮会话已检查过，跳过
if [ -f "$FLAG" ]; then
  exit 0
fi

# 定位技能包根目录（兼容软链接和绝对路径）
SKILL_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" 2>/dev/null && pwd)" || exit 0
VERSION_FILE="$SKILL_DIR/VERSION"

# 读取当前版本
CURRENT_VERSION=$(cat "$VERSION_FILE" 2>/dev/null) || exit 0

# 定位 git 仓库根目录
cd "$SKILL_DIR" 2>/dev/null || exit 0
GIT_ROOT=$(git rev-parse --show-toplevel 2>/dev/null) || exit 0

# 静默拉取 tags（5秒超时，防止网络卡顿阻塞会话启动）
FETCH_DONE=0
FETCH_PID=""
( git fetch --tags --quiet 2>/dev/null ) & FETCH_PID=$!
if [ -n "$FETCH_PID" ]; then
  for _ in 1 2 3 4 5; do
    if ! kill -0 "$FETCH_PID" 2>/dev/null; then
      FETCH_DONE=1
      break
    fi
    sleep 1
  done
  if [ "$FETCH_DONE" -eq 0 ]; then
    kill "$FETCH_PID" 2>/dev/null
  fi
  wait "$FETCH_PID" 2>/dev/null
fi

# 获取最新版本 tag
LATEST_TAG=$(git tag -l 'v*' --sort=-v:refname 2>/dev/null | head -n 1)

if [ -n "$LATEST_TAG" ] && [ "$CURRENT_VERSION" != "$LATEST_TAG" ]; then
  echo ""
  echo "📦 super-pm 有更新！"
  echo "   当前: $CURRENT_VERSION  →  最新: $LATEST_TAG"
  echo "   执行 /super-pm-upgrade 升级"
  echo ""
fi

touch "$FLAG"