export function matchRule(observation: any, rule: any): boolean {
  return Object.entries(rule.conditions).every(([path, expected]) => {
    const value = getNestedValue(observation, path)

    if (expected && typeof expected === 'object' && !Array.isArray(expected)) {
      const ops = expected as Record<string, any>

      if ('lt' in ops) return value < ops.lt
      if ('lte' in ops) return value <= ops.lte
      if ('gt' in ops) return value > ops.gt
      if ('gte' in ops) return value >= ops.gte
      if ('neq' in ops) return value !== ops.neq
    }
    if (Array.isArray(expected)) {
      return expected.includes(value)
    }
    return value === expected
  })
}

function getNestedValue(obj: any, path: string): any {
  return path.split('.').reduce((acc, key) => acc?.[key], obj)
}
