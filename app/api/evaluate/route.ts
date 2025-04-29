import { NextRequest } from 'next/server';
import { FullPropertyInputSchema } from '@/lib/schemas/fullPropertyInput';
import { evaluateObservation } from '@/lib/engine/evaluator'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = FullPropertyInputSchema.parse(body);

    const evaluation = await evaluateObservation(parsed.metadata, parsed.observation);

    return Response.json({ evaluation });
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Invalid input or evaluation failure." }, { status: 400 });
  }
}
