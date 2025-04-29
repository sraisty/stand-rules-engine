import { PropertyObservation } from '@/lib/schemas/propertyObservation';
import { dynamicRules } from '@/app/api/admin/rules/route'; // Temporary hack for in-memory rules
import { matchRule } from '@/lib/engine/dynamicRuleMatcher';

interface Finding {
  ruleId: string;
  description: string;
  riskWeight: number;
  critical: boolean;
  mitigations: any[];
}

// --- Individual Static Risk Evaluators ---

export function evaluateRoofRisk(observation: PropertyObservation): Finding[] {
  const findings: Finding[] = [];

  if (
    (observation.location.fireSeverity === 'High' || observation.location.fireSeverity === 'Extreme') &&
    observation.structure.roof.class === 'C'
  ) {
    findings.push({
      ruleId: 'roof-fire-risk',
      description: 'Roof Class C is unacceptable in High Fire Severity zone.',
      riskWeight: 7,
      critical: true,
      mitigations: [
        { name: 'Replace with Class A fire-rated roof', type: 'full', mitigationValue: 7 }
      ]
    });
  }

  return findings;
}

export function evaluateVegetationRisk(observation: PropertyObservation): Finding[] {
  const findings: Finding[] = [];

  observation.vegetation.plants.forEach((plant, index) => {
    if (plant.type === 'Tree' && plant.distanceToStructure < 30 && !plant.fireResistant) {
      findings.push({
        ruleId: `vegetation-risk-${index}`,
        description: 'Non-fire-resistant tree within 30ft of structure.',
        riskWeight: 5,
        critical: false,
        mitigations: [
          { name: 'Remove tree', type: 'full', mitigationValue: 5 },
          { name: 'Prune tree and apply fire retardant', type: 'bridge', mitigationValue: 3 }
        ]
      });
    }
  });

  return findings;
}

export function evaluateDeckRisk(observation: PropertyObservation): Finding[] {
  const findings: Finding[] = [];

  if (observation.structure.decks?.present && !observation.structure.decks.fireResistant) {
    findings.push({
      ruleId: 'deck-fire-risk',
      description: 'Non-fire-resistant deck material present.',
      riskWeight: 4,
      critical: false,
      mitigations: [
        { name: 'Replace deck with fire-resistant material', type: 'full', mitigationValue: 4 }
      ]
    });
  }

  return findings;
}

export function evaluateDroughtVegetationRisk(observation: PropertyObservation): Finding[] {
  const findings: Finding[] = [];

  if (observation.regionalContext?.droughtIndex && observation.regionalContext.droughtIndex >= 3) {
    if (observation.vegetation.defensibleSpaceFeet && observation.vegetation.defensibleSpaceFeet < 100) {
      findings.push({
        ruleId: 'drought-vegetation-risk',
        description: 'Defensible space inadequate during drought conditions.',
        riskWeight: 6,
        critical: false,
        mitigations: [
          { name: 'Expand defensible space to 100ft or more', type: 'bridge', mitigationValue: 4 }
        ]
      });
    }
  }

  return findings;
}

export function evaluateEavesRisk(observation: PropertyObservation): Finding[] {
  const findings: Finding[] = [];

  if (observation.structure.eaves?.vented && !observation.structure.eaves?.emberResistant) {
    findings.push({
      ruleId: 'eaves-ember-risk',
      description: 'Vented eaves without ember protection.',
      riskWeight: 5,
      critical: true,
      mitigations: [
        { name: 'Install ember-resistant vents or retrofit eaves', type: 'full', mitigationValue: 5 }
      ]
    });
  }

  return findings;
}

export function evaluateImmediateDefensibleSpace(observation: PropertyObservation): Finding[] {
  const findings: Finding[] = [];

  if (observation.vegetation.defensibleSpaceImmediateFeet && observation.vegetation.defensibleSpaceImmediateFeet < 5) {
    findings.push({
      ruleId: 'immediate-defensible-space-risk',
      description: 'Less than 5ft non-combustible surface around home.',
      riskWeight: 6,
      critical: true,
      mitigations: [
        { name: 'Clear 5ft non-combustible zone around structure', type: 'full', mitigationValue: 6 }
      ]
    });
  }

  return findings;
}

export function evaluateHydrantRisk(observation: PropertyObservation): Finding[] {
  const findings: Finding[] = [];

  if (!observation.waterResources?.fireHydrant?.available) {
    findings.push({
      ruleId: 'hydrant-absent-risk',
      description: 'No accessible fire hydrant nearby.',
      riskWeight: 5,
      critical: true,
      mitigations: [
        { name: 'Install private water storage or improve hydrant access', type: 'bridge', mitigationValue: 5 }
      ]
    });
  }

  return findings;
}

export function evaluateUtilityLinesRisk(observation: PropertyObservation): Finding[] {
  const findings: Finding[] = [];

  if (observation.utilities?.linesUnderground === false) {
    findings.push({
      ruleId: 'overhead-utility-risk',
      description: 'Overhead electric lines present, increased fire ignition risk.',
      riskWeight: 4,
      critical: false,
      mitigations: [
        { name: 'Work with utility provider to harden lines or clear vegetation', type: 'bridge', mitigationValue: 3 }
      ]
    });
  }

  return findings;
}

// --- Master Function ---

export function applyRiskRules(observation: PropertyObservation): Finding[] {
  const findings: Finding[] = [];

  // // Static Rul
  // findings.push(...evaluateRoofRisk(observation));
  // findings.push(...evaluateVegetationRisk(observation));
  // findings.push(...evaluateDeckRisk(observation));
  // findings.push(...evaluateDroughtVegetationRisk(observation));
  // findings.push(...evaluateEavesRisk(observation));
  // findings.push(...evaluateImmediateDefensibleSpace(observation));
  // findings.push(...evaluateHydrantRisk(observation));
  // findings.push(...evaluateUtilityLinesRisk(observation));

  // Dynamic Rules
  for (const rule of dynamicRules) {
    if (matchRule(observation, rule)) {
      findings.push({
        ruleId: rule.id,
        description: rule.description,
        riskWeight: rule.riskWeight,
        critical: rule.critical,
        mitigations: rule.mitigations,
      });
    }
  }

  return findings;
}