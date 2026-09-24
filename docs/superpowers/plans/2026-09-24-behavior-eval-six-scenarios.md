# Six-Scenario Behavioral Evaluation Implementation Plan

> **For agentic workers:** Execute in the current session; user forbids new branches/worktrees, and this task does not delegate to subagents. Checkboxes track evidence, not assumed success.

**Goal:** Run six real Super-PM agent scenarios with an honestly isolated with-skill / without-skill comparison when feasible, preserve raw evidence, and report limitations.

**Architecture:** Keep the target agent runner separate from the scenario manifest and the reviewer. Each fresh run gets a new directory and session; the runner receives only the scenario prompt/context, never expected checks. The reviewer reads raw JSONL, final response, and a before/after file inventory. Never call self-review an independent review.

**Tech Stack:** Codex CLI `exec --json`, Node.js report tool, isolated local directories. No branch or worktree.

---

## Chunk 1: Feasibility and harness

### Task 1: Prove isolation before counting outcomes

**Files:** Runtime-only `tmp/superpm-eval-20260924/` (ignored).

- [ ] Identify authenticated CLI and skill loading without printing secrets.
- [ ] Smoke-test a fresh minimal CODEX_HOME and a no-skill directory, with finite timeout and read-only sandbox. Capture exit code and raw JSONL.
- [ ] If auth or skill isolation fails, stop the invalid control; explicitly disclose limitation. Do not silently use normal user home as the baseline.

### Task 2: Freeze scenarios and run boundaries

**Files:** Read `evals/scenarios.json`; runtime evidence in `tmp/superpm-eval-20260924/`.

- [ ] Run these IDs: `new-idea-specific`, `explicit-brainstorm-optout`, `discussion-only`, `workflow-entry-only`, `rice-without-data`, `evidence-audit-unsupported-claims`.
- [ ] In each arm, create a separate session and isolated test root. Full-skill arm exposes only the tested checkout skills; workflow-entry arm exposes only `validate-idea` and must not inherit global Super-PM.
- [ ] Save exact input, raw transcript JSONL, final message, CLI exit status, and file inventories. No expectation/check text in the target prompt.
- [ ] Stop on unexpected network use, destructive writes, uncontrolled cost, or cross-arm contamination. Audit scenario explicitly prohibits browsing.

## Chunk 2: Review and close

### Task 3: Grade observed behavior, not repository structure

**Files:** `evals/README.md`, `scripts/eval-report.cjs` only if the protocol needs a correctness fix; persistent anonymized summary under `evals/results/` only if supported by raw evidence.

- [ ] Inspect each check against transcript and file inventory; record PASS/FAIL/NOT RUN and evidence. Keep independent-human and self-review labels distinct.
- [ ] If material visual artifacts are made, inspect screenshots; if no UI/image is generated, mark screenshot N/A rather than invent one.
- [ ] Run `npm test` for any tracked code changes. Verify generated report agrees with source records.
- [ ] Remove temporary directories/processes after harvesting necessary evidence, verify disk reclaimed and `git status`; never delete pre-existing user files.
- [ ] Commit and push validated tracked changes on the current branch using `konglong <konglong@com>`; record failure honestly if remote rejects.

## Outcome (2026-09-24)

- Skill discovery isolation proved with both `HOME` and `CODEX_HOME` separation, and a symlinked project skill in the skill arm. Raw probes are in `evals/results/2026-09-24-six-scenario-attempt/`.
- The first official control run timed out twice before any final message; stop condition triggered. All six cases remain unscored and the skill arm was not run.
- Reporting now requires explicit review type; self-reviewed successes cannot be `PASS`. Static tests passed. Temporary runtime files were removed after evidence was harvested.
