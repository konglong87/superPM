# No-Side-Effect Preambles Implementation Plan

> **For agentic workers:** Work on the existing main branch. No new branch, worktree or delegated agent is authorized. Commit/push each passing chunk.

**Goal:** Ensure a discussion-only invocation of any Super-PM skill does not create output directories or overwrite artifacts before a deliverable is explicitly requested.

**Architecture:** Keep Preambles read-only. Each standalone skill carries a short write-time guard: confirm the destination and overwrite intent, then create the output parent directory immediately before writing. A repository test scans Preambles and checks representative code blocks in isolated directories. No new persistence layer or database is needed for this phase.

**Tech Stack:** Markdown skills, Node built-in tests, Bash smoke, isolated `npx skills --copy`, current CI archive.

---

## Chunk 1: Regression and policy

**Files:** `tests/no-side-effects.test.cjs`, `skills/_shared/artifact-policy.md`, 41 existing `skills/**/SKILL.md` with early `mkdir -p docs/`.

- [x] Write a failing test for side-effecting Preambles and run it red.
- [x] Remove early output directory creation without removing read-only checks or tool output.
- [x] Insert a concise standalone guard in each affected skill: no file write during discussion; on requested deliverable, confirm the destination and overwrite behavior, create only the necessary parent directory immediately before Write.
- [x] Run static and isolated shell smoke. Commit and push.

## Chunk 2: Acceptance and handoff

- [x] Run all tests, skill validation, isolated installation and real archive extraction; confirm CI for the pushed commit.
- [x] Clean generated fixtures/install copies; keep formal tests and plan. Verify Git is clean.
- [x] Record behavioral eval honestly: 20 Agent scenarios remain NOT RUN; no with/without model comparison is claimed. Artifact namespace and capability-matrix work remain separate phases.

**Boundary:** This addresses directory creation at activation. It does not automatically guarantee each Agent follows the write-time instruction or solve fixed-name cross-product artifact collision. Those need independent Agent runs and a separate migration design.

## Acceptance record — September 24, 2026

- Red phase: 41 Preambles created `docs/` directories even for discussion-only use. All now defer directory creation to a confirmed artifact Write; their standalone policy survives single-skill installation.
- Automated regression: `npm test` 47/47; all 41 modified skills passed metadata validation. In an isolated `npx skills add . --skill pm-priority --copy` installation, executing the installed Preamble from a clean temporary project returned 0 and created no files or `docs/` directory.
- Committed ZIP passed `unzip -t`; from an unrelated CWD its selfcheck reported 56/56 skills and zero metadata errors. GitHub Actions succeeded for `3ac45f5`. Temporary installation and archive copies will be removed before final delivery.
- Independent Agent behavioral scenarios remain `NOT RUN 20`; this does not certify that every model follows the new write-time guard. A separate design-only plan describes multi-product artifact namespacing, not an implemented migration.
