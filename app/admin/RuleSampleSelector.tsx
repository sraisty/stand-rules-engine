'use client';

interface RuleSampleSelectorProps {
  onSelect: (json: string) => void;
}

const ruleSamples = {
  eaves: {
    id: 'eaves-ember-risk',
    name: 'Vented Eaves Without Ember Protection',
    description: 'Vented eaves must have ember-resistant features in fire-prone zones.',
    conditions: {
      'structure.eaves.vented': true,
      'structure.eaves.emberResistant': false
    },
    riskWeight: 5,
    critical: true,
    mitigations: [
      {
        name: 'Install ember-resistant vents or retrofit eaves',
        type: 'full',
        mitigationValue: 5
      }
    ]
  },
  tree: {
    id: 'non-fire-resistant-tree-close',
    name: 'Tree Too Close to Structure',
    description: 'Tree within 30ft that is not fire-resistant increases ignition risk.',
    conditions: {
      'vegetation.plants[*].type': 'Tree',
      'vegetation.plants[*].distanceToStructure': { lt: 30 },
      'vegetation.plants[*].fireResistant': false
    },
    riskWeight: 4,
    critical: false,
    mitigations: [
      {
        name: 'Remove or replace tree with fire-resistant species',
        type: 'full',
        mitigationValue: 4
      },
      {
        name: 'Prune tree and apply fire retardant',
        type: 'bridge',
        mitigationValue: 2
      }
    ]
  },
  hydrant: {
    id: 'no-fire-hydrant',
    name: 'No Accessible Fire Hydrant',
    description: 'Property does not have an accessible fire hydrant nearby.',
    conditions: {
      'waterResources.fireHydrant.available': false
    },
    riskWeight: 5,
    critical: true,
    mitigations: [
      {
        name: 'Install private water storage or improve hydrant access',
        type: 'bridge',
        mitigationValue: 5
      }
    ]
  },
  utility: {
    id: 'overhead-utility-lines',
    name: 'Overhead Electrical Lines',
    description: 'Overhead lines increase fire ignition risk near wildland areas.',
    conditions: {
      'utilities.linesUnderground': false
    },
    riskWeight: 3,
    critical: false,
    mitigations: [
      {
        name: 'Clear vegetation under lines or upgrade to insulated conductors',
        type: 'bridge',
        mitigationValue: 3
      }
    ]
  }
};

export default function RuleSampleSelector({ onSelect }: RuleSampleSelectorProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-2">
      <button
        onClick={() => onSelect(JSON.stringify(ruleSamples.eaves, null, 2))}
        className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400 text-sm"
      >
        Load An Eaves Rule
      </button>
      {/* <button
        onClick={() => onSelect(JSON.stringify(ruleSamples.tree, null, 2))}
        className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400 text-sm"
      >
        Load A Vegatition Rule
      </button> */}
      <button
        onClick={() => onSelect(JSON.stringify(ruleSamples.hydrant, null, 2))}
        className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400 text-sm"
      >
        Load A Hydrant Rule
      </button>
      <button
        onClick={() => onSelect(JSON.stringify(ruleSamples.utility, null, 2))}
        className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400 text-sm"
      >
        ⚡ Load A Utility Rule
      </button>
    </div>
  );
}
