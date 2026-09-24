# Super-PM Workflow Quality Implementation Plan

> **For agentic workers:** Execute the checked tasks in order. No worktree or new branch is authorized; do not delegate. Keep each patch independently testable.

**Goal:** Make routing, preview security, installation promises, and core workflow outcomes verifiable rather than merely documented.

**Architecture:** A small shared workflow contract defines precedence and artifact handoffs. Entry skills and command chains consume that contract, while dependency-free Node tests exercise the preview HTTP boundary and static workflow invariants. Browser acceptance checks the real rendered preview, including hostile Markdown. Avoid a runtime framework for Markdown skills.

**Tech Stack:** Markdown skills, Node.js built-in test runner and HTTP server, browser screenshot; no application package dependencies.

---

## Chunk 1: Preview safety and executable acceptance

### Task 1: Regression tests
**Files:** Create `tests/preview.test.cjs`; update `package.json`.
- [x] Spawn the real preview server with temporary docs and an adjacent private directory.
- [x] Assert normal documents load, traversal/prefix and symlink escape fail, and only allowed assets are served.
- [x] Verify these tests fail before the server fix; run with `npm test`.

### Task 2: Harden preview boundaries
**Files:** Modify `skills/pm-preview/scripts/preview-server.cjs`, `preview-helper.js`, and `preview-frame.html` as required.
- [x] Resolve and check real paths against the docs root using path components, not a string prefix.
- [x] Fail closed on Markdown sanitization failure; preserve safe Markdown links, tables, code and images.
- [x] Pin browser libraries and document the optional runtime/network needs.
- [x] Re-run automated tests and exercise the real browser with a harmless XSS marker and screenshot.

## Chunk 2: Workflow consistency and handoff

### Task 3: One contract, narrow correction
**Files:** Create `skills/_shared/workflow-contract.md`; modify `skills/start-super-pm/SKILL.md`, `commands/validate-idea/SKILL.md`, `commands/discover/SKILL.md` and any directly conflicting chain.
- [x] Define precedence for explicit user instruction, new idea, existing product, and missing artifacts.
- [x] Bring chain order into alignment without weakening individual skill gates.
- [x] Add tests for critical command sequences and referenced skills, not just word count.

### Task 4: Artifact evidence contract
**Files:** Shared contract plus narrowly selected demand/priority/docs skills.
- [x] Distinguish observed facts, assumptions, and decisions; link downstream artifacts to input evidence.
- [x] Avoid rewriting unrelated skill templates in bulk.

## Chunk 3: Release and docs

### Task 5: Docs and CI
**Files:** `README.md`, `README.en.md`, `.codex/INSTALL.md`, `.github/workflows/release-zip.yml`, `package.json`.
- [x] Correct the stale 37/5 claim and clarify optional Node/CDN dependency.
- [x] Add test + manifest/install smoke checks before packaging.
- [x] Perform a clean-path installation check and validate symlink targets in the archive.

### Task 6: Final real acceptance
- [x] Run unit/integration tests, installation smoke, and preview in browser with screenshots.
- [x] Remove transient test/session artifacts, review diff and status.
- [x] Commit using `konglong <konglong@com>` and push current branch after passing tests.

## Acceptance record (September 24, 2026)

- Red phase: real preview server returned HTTP 200 for same-prefix path escape, outside symlink and active HTML asset. Green phase: HTTP tests now reject all three, plus image symlink and malformed encoding.
- `npm test`: 17 tests passed (preview HTTP, manifest/link integrity and workflow order). These static routing tests do **not** prove an AI agent will follow the route in every conversation.
- `npx skills add . --list`: 55 discoverable entries. Selective `--copy --global --skill pm-preview` and `--skill validate-idea` into a temporary HOME succeeded.
- From the copied `pm-preview` script, ran a foreground server and opened it in the real browser. Screenshot/AX showed title, bold text, table, code and safe link. The hostile sample's `script` and `onerror` were removed; `window.__previewXss` stayed null. Appending text to the Markdown file appeared via WebSocket without page navigation.
- The `git archive` ZIP passed `unzip -t` and extracted vendor assets, module links and workflow command links resolved. After rebasing over the existing remote brainstorm change, both commits were pushed to `main` (head `7250d3a`). GitHub Actions run `35970831404` completed successfully for that SHA.
