import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

const verifierSource = fs.readFileSync(
  path.join(process.cwd(), 'scripts', 'verify-product-lifecycle.ts'),
  'utf8',
);

describe('product lifecycle verifier contract', () => {
  it('requires exact provenance columns and their database constraint', () => {
    for (const column of [
      'exactEvidenceAuthorizedAppId',
      'exactEvidenceGeneration',
      'exactEvidenceStateVersion',
    ]) {
      expect(verifierSource).toContain(`'${column}'`);
    }
    expect(verifierSource).toContain("'ProductSnapshot_exact_evidence_provenance_check'");
  });

  it('uses only current-installation exact evidence or linked coverage start time', () => {
    expect(verifierSource).toContain('run."startedAt" AS "evidenceAt"');
    expect(verifierSource).toContain('coverage."completedAt" = run."finishedAt"');
    expect(verifierSource).toContain('snapshot."exactEvidenceAuthorizedAppId" = installation."authorizedAppId"');
    expect(verifierSource).toContain('snapshot."exactEvidenceGeneration" = installation."generation"');
    expect(verifierSource).toContain('snapshot."exactEvidenceStateVersion" = installation."stateVersion"');
    expect(verifierSource).toContain('COALESCE(coverage."evidenceAt", \'-infinity\'::timestamp)');
  });

  it('reports availability-to-evidence continuity without making history a ready blocker', () => {
    expect(verifierSource).toContain('"finishedAt" - "previousEvidenceAt"');
    expect(verifierSource).toContain('> interval \'36 hours\' AS "violatesFreshness"');
    expect(verifierSource).toContain('coverageContinuitySampleCount');
    expect(verifierSource).toContain('coverageContinuityViolationCount');
    expect(verifierSource).toContain('latestCoverageContinuityGapSeconds');
    expect(verifierSource).toContain('maxCoverageContinuityGapSeconds');

    const readyExpression = verifierSource.match(/const ready =([\s\S]*?)return \{ valid: ready/)?.[1] ?? '';
    expect(readyExpression).not.toContain('coverageContinuityViolationCount');
  });
});
