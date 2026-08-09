'use client';

import { useState } from 'react';

export default function Home() {
  const [crop, setCrop] = useState('');
  const [location, setLocation] = useState('');
  const [advice, setAdvice] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    setAdvice('');

    try {
      const res = await fetch('/api/advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ crop, location }),
      });

      const data = await res.json();

if (!res.ok) {
  throw new Error(data.error || 'Something went wrong. Try again.');
}

setAdvice(data.advice);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-green-50 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-md p-8">
        <h1 className="text-2xl font-bold text-green-800 mb-1">
          🌾 Crop & Weather Advisor
        </h1>
        <p className="text-gray-500 mb-6">
          Get simple, personalized farming advice based on your crop and location.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Crop Name
            </label>
            <input
              type="text"
              value={crop}
              onChange={(e) => setCrop(e.target.value)}
              placeholder="e.g. Wheat, Rice, Tomato"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location (City/Village name)
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Nagpur, India"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white font-medium py-2 rounded-lg hover:bg-green-700 disabled:opacity-50 transition"
          >
            {loading ? 'Getting Advice...' : 'Get Advice'}
          </button>
        </form>

        {error && <p className="text-red-600 mt-4">{error}</p>}

        {advice && (
          <div className="mt-6 bg-green-100 rounded-xl p-4 whitespace-pre-line text-gray-800">
            {advice}
          </div>
        )}
      </div>
    </main>
  );
}