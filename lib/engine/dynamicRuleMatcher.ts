export function matchRule(observation: any, rule: any): boolean {
  return Object.entries(rule.conditions).every(([path, expected]) => {
    const value = getNestedValue(observation, path);

    if (typeof expected === 'object' && expected !== null && 'lt' in expected) {
      return value < expected.lt;
    }
    if (Array.isArray(expected)) {
      return expected.includes(value);
    }
    return value === expected;
  });
}

function getNestedValue(obj: any, path: string): any {
  return path.split('.').reduce((acc, key) => acc?.[key], obj);
}
