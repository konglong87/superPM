#!/usr/bin/env bash
# Only report the Git clone containing this installed skill, never the caller's CWD.
set -euo pipefail
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd -P)"
PACK_ROOT="$(cd "$SCRIPT_DIR/../../.." && pwd -P)"
if [[ ! -f "$PACK_ROOT/VERSION" || ! -f "$PACK_ROOT/skills/INDEX.md" ]]; then
  echo "super-pm-upgrade: not a full Git clone; use your skill manager to update copied skills" >&2
  exit 2
fi
if [[ "$(git -C "$PACK_ROOT" rev-parse --show-toplevel 2>/dev/null)" != "$PACK_ROOT" ]]; then
  echo "super-pm-upgrade: installed package is not its own Git repository" >&2
  exit 2
fi
printf '%s\n' "$PACK_ROOT"
