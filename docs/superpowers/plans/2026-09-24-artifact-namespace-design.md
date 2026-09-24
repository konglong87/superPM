# Multi-Product Artifact Namespace — Design Only

**Status:** Proposed; no path migration or resolver implementation has been made.

## Problem and constraints

Many Super-PM skills read and write fixed paths such as `docs/01-需求调研/需求调研报告.md`. In a workspace containing several products or repeated studies, file existence alone cannot prove relevance. The previous no-side-effect change now requires destination/overwrite confirmation, but it does not prevent two products from targeting the same file.

Requirements: keep existing single-product workflows working; avoid a database or background state; preserve human-readable Markdown; support an isolated single-skill installation; never silently move, overwrite or merge user artifacts.

## Proposed contract

- **Artifact identity:** `(product_key, artifact_kind, revision)` is the conceptual identity. `product_key` is user-confirmed, not inferred from an unrelated filename or directory. `artifact_kind` is a stable constant (demand research, priority, MVP, PRD, etc.); display titles and paths may change without changing its meaning.
- **Default:** In an existing single-product project, retain the legacy `docs/<stage>/<name>.md` path until the user opts in. Do not add a manifest just to store a default.
- **Optional namespace:** For explicitly multi-product projects, write under `docs/products/<product_key>/<stage>/<name>.md`. Validate `product_key` as a safe single path segment and reject traversal/symlink escape. Revision may be a user-approved date or label only when multiple versions actually matter.
- **Resolution order:** If a product key is explicitly configured/confirmed, prefer that product's artifact. Otherwise use a legacy artifact only after confirming it is relevant to the current product. If both exist or multiple candidate products match, ask which one; never select by newest timestamp alone.
- **Write contract:** Confirm the exact path and overwrite/append/new-revision decision. Create only the selected parent directory immediately before Write. Keep the original unchanged when generating a new revision. The report must name the path actually used.
- **Portable install:** A shared resolver may assist a full installation, but every individually installed skill must retain a concise no-ambiguous-read/no-silent-overwrite fallback. Do not make a central script mandatory for basic conversation.

## Suggested implementation sequence

1. Inventory artifact kinds and paths in the three most used chains (`validate-idea`, `write-prd`, `analyze-growth`) and define a small shared mapping; do not rewrite all 207 references at once.
2. Add a pure path resolver and tests: single-product legacy, two-product isolation, ambiguous legacy input, unsafe keys, symlink escape, and overwrite confirmation. No database.
3. Migrate one chain behind explicit opt-in, verify read/write and the recursive `pm-preview` tree in a real browser with screenshots. Preserve read-only old paths for un-migrated skills.
4. Expand only after independent Agent transcripts show no cross-product artifact reuse. Record opt-in/migration instructions and rollback to legacy paths.

## Non-goals

Automatic historical migration, a global artifact database, silently changing all existing output paths, or claiming that an artifact's existence means its content is verified. This document is an architecture decision candidate, not a shipped feature.
