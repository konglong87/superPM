# Routing and Evidence Audit Implementation Plan

> **For agentic workers:** Execute on the existing main branch. No new branch/worktree/subagents were authorized. Commit and push each independently tested chunk.

**Goal:** Make Super-PM respect scoped user intent and reuse relevant information, then add a narrow evidence-audit skill distinct from PRD review.

**Architecture:** One short precedence contract governs routing, writing, and user interaction. Entry skills retain standalone essentials and reference the shared contract in a full install. `pm-evidence-audit` is a standalone, read-first tool skill with a small optional rubric reference; it audits claims rather than editing the source document. Tests validate metadata, routing invariants and package counts, while real Agent outcomes remain `NOT RUN` until independent transcripts are collected.

**Tech Stack:** Markdown skills, Node.js built-in tests, `npx skills` isolated install, existing selfcheck, CI archive smoke.

---

## Chunk 1: Intent-aware routing

**Files:** `skills/_shared/workflow-contract.md`, `skills/start-super-pm/{SKILL.md,routing-card.md}`, `skills/SKILL.md`, `skills/01-demand-insight/{pm-demand,pm-brainstorm}/SKILL.md`, `tests/routing-policy.test.cjs`, `README.md`.

- [x] Write failing tests for scoped requests, explicit skip, no-write, relevant-artifact reuse and no unconditional directory creation before consent.
- [x] Replace “1% must call” and blanket MANDATORY language with explicit precedence; preserve evidence and safety gates.
- [x] Ensure selected entry skills ask only missing essential information, respect a discussion-only request, and do not create files before the user asks for deliverables.
- [x] Run tests and an isolated installed-skill content smoke; commit and push.

## Chunk 2: `pm-evidence-audit`

**Files:** `skills/00-tools/pm-evidence-audit/{SKILL.md,references/rubric.md}`, `skills/INDEX.md`, package/plugin/README/llms metadata, `evals/scenarios.json`, tests and selfcheck expected index.

- [x] Add failing tests for the skill's boundary, evidence states, unknown/contradictory source treatment, no-web behavior and source-to-claim traceability.
- [x] Create a standalone skill: input claims/document, verify primary evidence when allowed, output an auditable claim matrix and next verification action. Do not fabricate sources or overwrite source material by default.
- [x] Update discoverability and counts from 55 to 56; add at least one unrun behavioral scenario, not a fabricated pass.
- [x] Validate standalone copy installation and skill metadata; run all tests; commit/push.

## Chunk 3: Acceptance and cleanup

- [x] Remove stale unsupported “80%” claims and reconcile local documentation.
- [x] Run npm tests, skill validator, isolated install and archive extraction; verify CI for current HEAD.
- [x] Remove temporary install copies and logs. Record actual acceptance; report independent Agent scenarios as NOT RUN unless real transcripts exist.

**Boundary:** This plan does not claim a with-skill/without-skill Agent comparison, because no independent Agent session has been run. Do not reduce the 11 long skills solely by line count; use failures from later real evaluations.

## Acceptance record — September 24, 2026

- Red phase: routing policy tests failed on forced activation, all-steps-MANDATORY behavior, unsolicited directory creation and unsupported 80% claim. After the scoped changes, `npm test` passed 44/44; entry skill validators passed.
- `pm-evidence-audit` passed its validator and an isolated `npx skills add . --skill pm-evidence-audit --copy` installation. Its bundled `references/rubric.md` was present. `npx skills add . --list` found 56 skills.
- Committed ZIP passed `unzip -t`; from an unrelated directory, its selfcheck reported 56/56 installed skills and zero metadata errors. GitHub Actions runs for `1f44a4d` and `0fc202e` completed successfully. Generated install/archive artifacts were removed afterward.
- `npm run eval:report`: **PASS 0 / NOT RUN 20**. There was no independent with-skill/without-skill Agent run, so routing or evidence-audit response quality is not certified by the static, packaging, or metadata tests. Do not claim those 20 scenarios passed. Longer skill refactors and `pm-uat` remain deferred until real behavioral failures justify them.
