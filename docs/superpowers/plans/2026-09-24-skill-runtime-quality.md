# Skill Runtime Quality Implementation Plan

> **For agentic workers:** Follow this plan on the existing main branch. No subagents, branch, or worktree are authorized. Work in independently testable chunks and push each passing chunk.

**Goal:** Make workflow installation dependencies explicit and make skill diagnostics work from an unrelated project directory; establish a reusable behavioral evaluation corpus without misreporting static tests as model E2E tests.

**Architecture:** `workflow-contract.json` defines steps and the new-idea gate. A small generator writes self-contained prerequisite instructions into each workflow skill; tests detect drift. Ordinary skills no longer attempt a silent update check. An actual selfcheck shell script anchors paths to its own file, while the upgrade skill uses an explicit package-root preflight. Behavioral scenarios live outside skill runtime and are scored only from real recorded runs.

**Tech Stack:** Markdown, Node.js built-in test runner and generator, Bash for the optional selfcheck, isolated `npx skills` install smoke.

---

## Chunk 1: Dependency-closed workflow installation

**Files:** `skills/_shared/workflow-contract.json`, `scripts/sync-workflow-deps.cjs`, six `skills/workflows/*/SKILL.md`, `tests/dependencies.test.cjs`, README/INDEX.

- [ ] Write a failing test proving each workflow names all required skills and distinguishes the optional new-idea brainstorm gate.
- [ ] Generate a preflight block from the contract, including an exact multi-skill `npx skills add` command and a no-CLI fallback. Stop before starting a chain when a dependency is missing; never claim a single entry install includes other skills.
- [ ] Run the generator in check mode and `npm test`.
- [ ] In an isolated HOME, install a single workflow and then its complete bundle; inspect actual installed skill folders and invoke the preflight logic.
- [ ] Commit and push after verification.

## Chunk 2: Reliable diagnostics from any CWD

**Files:** 44 affected `SKILL.md` files, `skills/check-update.sh`, `skills/00-tools/pm-selfcheck/{SKILL.md,scripts/selfcheck.sh}`, `skills/super-pm-upgrade/SKILL.md`, `skills/SKILL.md`, tests.

- [ ] Write a failing regression that runs from a foreign CWD and demonstrates `BASH_SOURCE[0]` in a pasted Markdown shell block resolves to empty/`.`.
- [ ] Remove silent check-update invocations from ordinary skills; keep update checks explicit. Do not remove unrelated preamble logic.
- [ ] Move selfcheck scanning into an actual script, anchored to its own path, with a clear full-pack requirement and nonzero failure on missing root.
- [ ] Make the upgrade preflight identify the installed package rather than the user's product repo; avoid implicit `git` operations in the wrong directory.
- [ ] Run selfcheck from a foreign CWD against full-pack and isolated single-skill installations, plus `npm test` and archive smoke.
- [ ] Commit and push after verification.

## Chunk 3: Behavioral evaluation baseline

**Files:** `evals/scenarios.json`, `evals/README.md`, `scripts/eval-report.cjs`, `tests/evals.test.cjs`, package scripts and CI.

- [ ] Define 15–20 realistic routing/handoff/no-fabrication scenarios with expected actions and forbidden actions.
- [ ] Create a report tool that scores actual recorded agent runs; missing runs must show `not run`, never pass.
- [ ] Validate schema/report logic on a tiny example, remove temporary output, and document how to gather real independent runs.
- [ ] Run full tests, isolated installation and package smoke; review diff, clean transient artifacts, commit/push and confirm CI.

## Acceptance boundary

Automated checks prove installation structure, command generation, and script behavior. They cannot prove LLM routing quality. Do not report behavioral scenarios as passed until independent transcripts and artifacts have been collected and reviewed.
