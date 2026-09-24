# Behavioral Evaluation P0 Retry Implementation Plan

> **For agentic workers:** Execute locally in this session. Do not create a branch, worktree, or delegate. Track blocked outcomes as evidence, never as a pass.

**Goal:** Identify the formal-run timeout, run the six agreed scenarios in paired isolated sessions if viable, and leave a reproducible, safely cleaned evaluation record.

**Architecture:** Separate fixture setup, CLI transport, and review. The test runner receives only scenario prompt plus test files; skill discovery differs by arm, while model, sandbox, environment, timeouts, and fixtures are fixed. Runtime caches and any auth environment remain outside tracked evidence; raw JSONL/final response/file inventories are harvested before cleanup.

**Tech Stack:** Codex CLI `exec --json`, Python standard library harness, Node.js report tests. Reuse project scenarios and reporter; do not add a new evaluation dependency without an observed need.

---

## Chunk 1: Diagnose before running a matrix

- [ ] Reproduce smoke and formal prompt using the same isolated `HOME`/`CODEX_HOME`, model, and sandbox; vary only prompt or sandbox to isolate timeout cause.
- [ ] Capture JSONL, stderr, timing, process exit, and actual model identity without printing bearer credentials. Set finite timeout and cost ceiling.
- [ ] If formal run cannot complete, stop the matrix; document precise boundary rather than fabricate responses.

## Chunk 2: Controlled behavior runs

- [ ] Prove empty-home control lacks Super-PM; prove project skill arm sees only installed local skills. For workflow-only case, expose only `validate-idea`.
- [ ] Run six scenario IDs in fresh control and skill sessions, preserving exact user prompts and fixture contents; no expected checks in target input.
- [ ] Save raw JSONL, last response, before/after file inventories, timeout/error metadata. Check audit case made no network calls.
- [ ] Self-review each check against transcript/file evidence; label self-review as such, not independent PASS. No visual screenshot requirement for text-only cases.

## Chunk 3: Close

- [ ] Fix reproducibility defects found in the harness/reporting with failing-first tests. Run `npm test` and inspect records manually.
- [ ] Remove test roots, fake homes, private config, and caches; retain only compact evidence and report. Check no secret leaked to Git.
- [ ] Commit and push tested changes on current branch with `konglong <konglong@com>`. Verify clean status.

## Outcome (2026-09-24)

- Original first scenario completed in 260 seconds; the prior 120-second timeout was inadequate for a 4,930-token control response. Short Chinese and bounded replies succeeded, and formal Chinese/English requests were slow.
- All six fresh pairs completed under a 360-second cap. Raw transcripts and before/after inventories were retained under `evals/results/2026-09-24-six-scenario-baseline/`.
- Self-review found three scenario failures. New-idea routing and RICE placeholder numerics were corrected with failing-first static guards and successful fresh behavioral retests; discussion-only route remains a frozen-scenario ambiguity/failure.
- No independent reviewer has inspected the records; `PASS` remains zero. Temporary caches and private test environments are to be removed after the final check.
