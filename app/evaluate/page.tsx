'use client';
import sample from '@/shared/sample-full-risk-input.json'

import { Pane } from '@/components/Pane';
import { useState } from 'react';

export default function EvaluatePage() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit() {
    setError(null);
    try {
      const res = await fetch('/api/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: input
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Unknown error');
      }

      const json = await res.json();
      setResult(json);
    } catch (err: any) {
      setResult(null);
      setError(err.message);
    }
  }
  const handleSample = ()=>{
    setInput(JSON.stringify(sample, null, 2));
  }

  const handleReset = () => {
    setInput('');
    setResult(null);
    setError(null);
  }

  return (
    <div className="w-full h-dvh gap-4 flex flex-col p-4">
    <h1 className="text-2xl font-bold">Evaluate Property Observation</h1>
    <div className="w-full h-dvh  mx-auto space-y-4 flex-row flex gap-4  rounded-lg ">
   
      <Pane title='Enter Property Observation JSON'>
        <div className="flex h-full flex-col gap-8 ">
          <textarea
            className="w-full h-full p-2 border rounded font-mono text-sm bg-white"
            placeholder="Paste full JSON here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <div className="flex flex-row gap-4 max-h-40 ">
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-500"
              disabled={!input}
            >
              Evaluate
            </button>
            <button
              onClick={handleSample}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Use Sample
            </button>
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Reset
            </button>
      
          </div>
        </div>
      {error && <p className="text-red-600 font-medium">❌ {error}</p>}
      </Pane>
      <Pane title='Evaluation Result'>
      {result && (
        <div className="p-4 h-full border rounded bg-gray-100 overflow-auto text-sm">
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
      </Pane>
    </div>
    </div>
  );
} 