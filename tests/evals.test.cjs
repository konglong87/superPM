const assert = require('node:assert/strict');
const { test } = require('node:test');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { scoreScenarios, renderReport } = require('../scripts/eval-report.cjs');

const root = path.resolve(__dirname, '..');
const scenarios = JSON.parse(fs.readFileSync(path.join(root, 'evals/scenarios.json'), 'utf8'));

test('scenario corpus covers routing, evidence, user intent and missing dependencies', () => {
  assert.ok(scenarios.length >= 18);
  assert.equal(new Set(scenarios.map(s => s.id)).size, scenarios.length);
  const categories = new Set(scenarios.map(s => s.category));
  for (const category of ['routing', 'evidence', 'dependency', 'interaction', 'handoff']) {
    assert.ok(categories.has(category), `missing category ${category}`);
  }
  for (const scenario of scenarios) {
    assert.ok(scenario.prompt && scenario.expectedRoute && scenario.checks.length);
  }
});

test('without independent runs all scenarios are NOT RUN, not passed', () => {
  const scored = scoreScenarios(scenarios, [], root);
  assert.equal(scored.filter(item => item.status === 'NOT RUN').length, scenarios.length);
  assert.equal(scored.filter(item => item.status === 'PASS').length, 0);
  assert.match(renderReport(scored), /NOT RUN/);
});

test('a PASS requires transcript and reviewed evidence for every check', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'superpm-evals-test-'));
  try {
    const transcript = path.join(dir, 'transcript.md');
    fs.writeFileSync(transcript, 'user and agent transcript');
    const scenario = scenarios[0];
    const run = {
      scenarioId: scenario.id,
      reviewer: 'independent-reviewer',
      transcriptPath: transcript,
      observations: scenario.checks.map(check => ({ check, passed: true, evidence: 'Observed in transcript' }))
    };
    assert.equal(scoreScenarios([scenario], [run], root)[0].status, 'PASS');
    run.observations[0].passed = false;
    assert.equal(scoreScenarios([scenario], [run], root)[0].status, 'FAIL');
    run.observations[0].passed = true;
    run.transcriptPath = path.join(dir, 'missing.md');
    assert.equal(scoreScenarios([scenario], [run], root)[0].status, 'INVALID');
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});
