'use client';

import { useEffect, useState } from 'react';
import { useApiRequest } from '@/hooks/useApiRequest';
import RuleSampleSelector from './RuleSampleSelector';

export default function AdminPage() {
  const {
    request: fetchRules,
    response: rulesResponse,
    loading,
    error,
  } = useApiRequest<{ rules: any[] }>();

  const { request: addRuleRequest } = useApiRequest();
  const { request: deleteRuleRequest } = useApiRequest();

  const [ruleJson, setRuleJson] = useState('');
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    const run = async () => {
      await fetchRules('/api/admin/rules');
    };
    run();
  }, []);

  async function handleDeleteRule(id: string) {
    await deleteRuleRequest('/api/admin/rules', {
      method: 'DELETE',
      body: { id },
    });
    fetchRules('/api/admin/rules');
  }

  async function handleSubmitRule() {
    setSubmitError(null);
    try {
      const parsed = JSON.parse(ruleJson);
      await addRuleRequest('/api/admin/rules', {
        method: 'POST',
        body: parsed,
      });
      setRuleJson('');
      fetchRules('/api/admin/rules');
    } catch (err) {
      console.error(err);
      setSubmitError('Invalid JSON or submission failed');
    }
  }

  const handleDeleteAllRules = async () => {
    if (confirm('Are you sure you want to delete all rules? This action cannot be undone.')) {
      await deleteRuleRequest('/api/admin/rules', { 
        method: 'DELETE',
        body: { all: true },
      });
      fetchRules('/api/admin/rules');
    }
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Administer Rules</h1>

      {/* Rule Input Form */}
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">Add Rule (Paste JSON)</h2>
        <textarea
          className="w-full p-2 border rounded font-mono text-sm min-h-[200px]"
          placeholder='Paste rule JSON here...'
          value={ruleJson}
          onChange={(e) => setRuleJson(e.target.value)}
        />
        <div className="flex flex-row gap-4">
        <button
          onClick={handleSubmitRule}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          ➕ Submit Rule
        </button>
        {/* <button
          onClick={handleDeleteAllRules}
          className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
        >
          Reset (erase all rules)
        </button> */}
        </div>
        <RuleSampleSelector onSelect={(json) => setRuleJson(json)} />
        {submitError && <p className="text-red-600">{submitError}</p>}
      </div>

      {/* Rule List */}
      <div>
        <h2 className="text-lg font-semibold mt-6 mb-2">Current Rules</h2>
        {loading && !rulesResponse && <p>Loading rules...</p>}
        {rulesResponse?.rules?.length === 0 && <p>No rules found.</p>}
        <ul className="space-y-4">
          {rulesResponse?.rules?.map((rule) => (
            <li
              key={rule.id}
              className="p-4 border rounded bg-gray-100 flex justify-between items-start"
            >
              <div>
                <h3 className="font-semibold">{rule.name || rule.id}</h3>
                <p className="text-sm text-gray-700">{rule.description}</p>
              </div>
              <button
                onClick={() => handleDeleteRule(rule.id)}
                className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
