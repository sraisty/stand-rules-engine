import {PropertyObservation} from '@/lib/schemas/propertyObservation'
import {PropertyMetadata} from '@/lib/schemas/fullPropertyInput'
import {applyRiskRules} from './riskRules'

export async function evaluateObservation(
  metadata: PropertyMetadata,
  observation: PropertyObservation
) {
  const riskFindings = applyRiskRules(observation)
  const totalRiskScore = riskFindings.reduce((sum, finding) => sum + finding.riskWeight, 0)

  const insurability = riskFindings.some(f => f.critical)
    ? 'no'
    : totalRiskScore > 5
      ? 'conditionally'
      : 'yes'

  return {
    propertyId: metadata.propertyId,
    observationId: metadata.observationId ?? 'unknown',
    evaluatedAt: new Date().toISOString(),
    rulesetVersion: 'v1',
    totalRiskScore,
    insurability,
    vulnerabilities: riskFindings,
  }
}
