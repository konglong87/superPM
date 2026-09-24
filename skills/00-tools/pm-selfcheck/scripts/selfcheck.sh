#!/usr/bin/env bash
# Diagnose this pack from the installed script location, not the user's CWD.
set -uo pipefail
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd -P)"
SKILL_DIR="$(cd "$SCRIPT_DIR/.." && pwd -P)"
PARENT_DIR="$(cd "$SCRIPT_DIR/../../.." && pwd -P)"
EXPECTED="$SKILL_DIR/expected-skills.txt"

if [[ ! -f "$EXPECTED" ]]; then
  echo "pm-selfcheck: expected skill index missing; installation incomplete (未完整安装)" >&2
  exit 2
fi

if [[ -f "$PARENT_DIR/VERSION" && -f "$PARENT_DIR/SKILL.md" ]]; then
  MODE="repository"
  VERSION="$(cat "$PARENT_DIR/VERSION")"
  ROOT="$PARENT_DIR"
else
  MODE="flat"
  VERSION="unknown (copied skills)"
  ROOT="$(cd "$SKILL_DIR/.." && pwd -P)"
fi

EXPECTED_COUNT=0
FOUND_COUNT=0
MISSING=0
BAD_META=0
OVERSIZED=0

while IFS= read -r name; do
  [[ -z "$name" ]] && continue
  EXPECTED_COUNT=$((EXPECTED_COUNT + 1))
  if [[ "$MODE" == "repository" ]]; then
    file="$(find "$ROOT" -name SKILL.md -type f -print | while IFS= read -r candidate; do
      if grep -q "^name: $name$" "$candidate"; then printf '%s\n' "$candidate"; break; fi
    done | head -n 1)"
  else
    file="$ROOT/$name/SKILL.md"
    [[ -f "$file" ]] || file=""
  fi
  if [[ -z "$file" ]]; then
    printf 'MISSING %s\n' "$name"
    MISSING=$((MISSING + 1))
    continue
  fi
  FOUND_COUNT=$((FOUND_COUNT + 1))
  if ! grep -q '^name:' "$file" || ! grep -q '^description:' "$file" || ! grep -q '^allowed-tools:' "$file"; then
    printf 'BAD_METADATA %s\n' "$name"
    BAD_META=$((BAD_META + 1))
  fi
  lines=$(wc -l < "$file" | tr -d ' ')
  if (( lines > 600 )); then
    printf 'OVERSIZED %s %s lines\n' "$name" "$lines"
    OVERSIZED=$((OVERSIZED + 1))
  fi
done < "$EXPECTED"

printf 'super-pm %s | mode=%s | skills=%s/%s | oversized=%s | bad_metadata=%s\n' \
  "$VERSION" "$MODE" "$FOUND_COUNT" "$EXPECTED_COUNT" "$OVERSIZED" "$BAD_META"
if (( MISSING > 0 )); then
  echo "pm-selfcheck: installation incomplete (未完整安装); install the missing skills or the full pack" >&2
  exit 2
fi
if (( BAD_META > 0 )); then exit 1; fi
