#!/usr/bin/env bash
# super-pm 版本号同步脚本
# VERSION 文件为唯一版本号源头，此脚本同步到 plugin.json、marketplace.json 并创建 git tag
# 用法: ./bump-version.sh <新版本号>
#   如: ./bump-version.sh 2.5.0

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
VERSION_FILE="${SCRIPT_DIR}/skills/VERSION"

if [ -z "${1:-}" ]; then
  echo "❌ 请指定新版本号"
  echo "用法: ./bump-version.sh <新版本号>"
  echo "示例: ./bump-version.sh 2.5.0"
  exit 1
fi

NEW_VERSION="$1"
# 去掉可能的 v 前缀
NEW_VERSION="${NEW_VERSION#v}"
TAG="v${NEW_VERSION}"

# 检查 tag 是否已存在
if git tag -l "$TAG" | grep -q "$TAG"; then
  echo "❌ tag ${TAG} 已存在"
  echo "   如需覆盖，先执行: git tag -d ${TAG} && git push origin :refs/tags/${TAG}"
  exit 1
fi

# 写入 VERSION 文件（唯一版本号源头）
printf "v%s" "$NEW_VERSION" > "$VERSION_FILE"

# 同步到 plugin.json
sed -i '' "s/\"version\": \"[0-9.]*\"/\"version\": \"${NEW_VERSION}\"/" "${SCRIPT_DIR}/.claude-plugin/plugin.json"

# 同步到 marketplace.json
sed -i '' "s/\"version\": \"[0-9.]*\"/\"version\": \"${NEW_VERSION}\"/" "${SCRIPT_DIR}/.claude-plugin/marketplace.json"

echo "✅ 版本号已同步至 v${NEW_VERSION}"
echo ""
echo "   VERSION 文件:        v${NEW_VERSION}"
echo "   plugin.json:         ${NEW_VERSION}"
echo "   marketplace.json:    ${NEW_VERSION}"
echo ""
echo "💡 下一步:"
echo "   1. git add -A && git commit -m 'chore: bump version to v${NEW_VERSION}'"
echo "   2. git tag ${TAG}"
echo "   3. git push origin main --tags"
