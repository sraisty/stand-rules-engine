'use client'
import sample from '@/shared/sample-full-risk-input.json'

import {Pane} from '@/components/Pane'
import {useState} from 'react'

export default function EvaluatePage() {
  const [input, setInput] = useState('')
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit() {
    setError(null)
    try {
      const res = await fetch('/api/evaluate', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: input,
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || 'Unknown error')
      }

      const json = await res.json()
      setResult(json)
    } catch (err: any) {
      setResult(null)
      setError(err.message)
    }
  }
  const handleSample = () => {
    setInput(JSON.stringify(sample, null, 2))
  }

  const handleReset = () => {
    setInput('')
    setResult(null)
    setError(null)
  }

  return (
    <div className="flex flex-col w-full gap-4 p-4 h-dvh">
      <h1 className="text-2xl font-bold">Evaluate Property Observation</h1>
      <div className="flex flex-row w-full gap-4 mx-auto space-y-4 rounded-lg h-dvh ">
        <Pane title="Enter Property Observation JSON">
          <div className="flex flex-col h-full gap-8 ">
            <textarea
              className="w-full h-full p-2 font-mono text-sm bg-white border rounded"
              placeholder="Paste full JSON here..."
              value={input}
              onChange={e => setInput(e.target.value)}
            />
            <div className="flex flex-row gap-4 max-h-40 ">
              <button
                onClick={handleSubmit}
                className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 disabled:bg-gray-500"
                disabled={!input}
              >
                Evaluate
              </button>
              <button
                onClick={handleSample}
                className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
              >
                Use Sample
              </button>
              <button
                onClick={handleReset}
                className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700"
              >
                Reset
              </button>
            </div>
          </div>
          {error && <p className="font-medium text-red-600">❌ {error}</p>}
        </Pane>
        <Pane title="Evaluation Result">
          {result && (
            <div className="h-full p-4 overflow-auto text-sm bg-gray-100 border rounded">
              <pre>{JSON.stringify(result, null, 2)}</pre>
            </div>
          )}
        </Pane>
      </div>
    </div>
  )
}
