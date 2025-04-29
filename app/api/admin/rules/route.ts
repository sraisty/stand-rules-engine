import { NextRequest } from 'next/server';

// In-memory ruleset (placeholder for a real database or persistent store)
// TODO - this is a hack
export let dynamicRules: any[] = [];

export async function GET() {
  return Response.json({ rules: dynamicRules });
}

export async function POST(req: NextRequest) {
  try {
    const rule = await req.json();
    dynamicRules.push(rule);
    return Response.json({ message: 'Rule added', rule });
  } catch (err) {
    return Response.json({ error: 'Invalid rule format' }, { status: 400 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const updatedRule = await req.json();
    const index = dynamicRules.findIndex(r => r.id === updatedRule.id);
    if (index === -1) {
      return Response.json({ error: 'Rule not found' }, { status: 404 });
    }
    dynamicRules[index] = updatedRule;
    return Response.json({ message: 'Rule updated', rule: updatedRule });
  } catch (err) {
    return Response.json({ error: 'Invalid rule format' }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    const index = dynamicRules.findIndex(r => r.id === id);
    if (index === -1) {
      return Response.json({ error: 'Rule not found' }, { status: 404 });
    }
    const removed = dynamicRules.splice(index, 1);
    return Response.json({ message: 'Rule deleted', rule: removed[0] });
  } catch (err) {
    return Response.json({ error: 'Invalid request' }, { status: 400 });
  }
}
