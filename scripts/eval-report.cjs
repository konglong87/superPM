#!/usr/bin/env node
// Report independently reviewed agent runs. This tool does not call or grade an LLM.
const fs = require('node:fs');
const path = require('node:path');

function scoreScenarios(scenarios, runs, baseDir) {
  if (new Set(scenarios.map(s => s.id)).size !== scenarios.length) throw new Error('Duplicate scenario IDs');
  const byId = new Map();
  for (const run of runs) {
    if (!scenarios.some(s => s.id === run.scenarioId)) throw new Error(`Unknown scenario: ${run.scenarioId}`);
    if (byId.has(run.scenarioId)) throw new Error(`Duplicate run: ${run.scenarioId}`);
    byId.set(run.scenarioId, run);
  }
  return scenarios.map(scenario => {
    const run = byId.get(scenario.id);
    if (!run) return { id: scenario.id, category: scenario.category, status: 'NOT RUN', note: 'No independent transcript reviewed' };
    const file = run.transcriptPath && path.resolve(baseDir, run.transcriptPath);
    const checks = run.observations || [];
    const reviewed = typeof run.reviewer === 'string' && run.reviewer.trim().length > 0 &&
      ['independent', 'self'].includes(run.reviewType);
    const validChecks = checks.length === scenario.checks.length &&
      scenario.checks.every(check => checks.some(item => item.check === check &&
        typeof item.passed === 'boolean' && typeof item.evidence === 'string' && item.evidence.trim())) &&
      checks.every(item => scenario.checks.includes(item.check));
    if (!reviewed || !file || !fs.existsSync(file) || !validChecks) {
      return { id: scenario.id, category: scenario.category, status: 'INVALID', note: 'Missing review type, reviewer, transcript, or check evidence' };
    }
    const failed = checks.filter(item => !item.passed).map(item => item.check);
    return {
      id: scenario.id,
      category: scenario.category,
      status: failed.length ? 'FAIL' : run.reviewType === 'self' ? 'SELF-REVIEW' : 'PASS',
      note: failed.length ? `Failed (${run.reviewType}): ${failed.join(', ')}` :
        `Reviewed by ${run.reviewer} (${run.reviewType})`
    };
  });
}

function renderReport(scored) {
  const counts = Object.fromEntries(['PASS', 'FAIL', 'SELF-REVIEW', 'INVALID', 'NOT RUN']
    .map(status => [status, scored.filter(item => item.status === status).length]));
  const lines = [
    '# Super-PM behavioral evaluation',
    '',
    `Total ${scored.length} | PASS ${counts.PASS} | FAIL ${counts.FAIL} | SELF-REVIEW ${counts['SELF-REVIEW']} | INVALID ${counts.INVALID} | NOT RUN ${counts['NOT RUN']}`,
    '',
    'Only independently reviewed transcripts with evidence for every check can pass. Self-review is reported separately and static repository tests do not count as agent runs.',
    '',
    '| Scenario | Category | Result | Note |',
    '|---|---|---|---|',
    ...scored.map(item => `| ${item.id} | ${item.category} | ${item.status} | ${item.note.replace(/\|/g, '\\|')} |`),
    ''
  ];
  return lines.join('\n');
}

function readRuns(file) {
  if (!file) return [];
  return fs.readFileSync(file, 'utf8').split(/\r?\n/).filter(Boolean).map((line, index) => {
    try { return JSON.parse(line); } catch { throw new Error(`Invalid JSONL at line ${index + 1}`); }
  });
}

if (require.main === module) {
  try {
    const args = process.argv.slice(2);
    const option = key => { const i = args.indexOf(key); return i < 0 ? null : args[i + 1]; };
    const root = path.resolve(__dirname, '..');
    const scenarios = JSON.parse(fs.readFileSync(path.join(root, 'evals/scenarios.json'), 'utf8'));
    const runsPath = option('--runs');
    const scored = scoreScenarios(scenarios, readRuns(runsPath), runsPath ? path.dirname(path.resolve(runsPath)) : root);
    const report = renderReport(scored);
    const output = option('--out');
    if (output) fs.writeFileSync(output, report);
    else process.stdout.write(report);
    if (args.includes('--strict') && scored.some(item => item.status !== 'PASS')) process.exitCode = 1;
  } catch (error) {
    console.error(error.message);
    process.exitCode = 2;
  }
}
module.exports = { scoreScenarios, renderReport };
