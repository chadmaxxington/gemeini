"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function MarketTrendsPredictor() {
  const [businessIdea, setBusinessIdea] = useState('');
  const [marketTrends, setMarketTrends] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const generateMarketTrends = async () => {
      setLoading(true);
      try {
        const ideaResponse = await axios.get('/api/updatedidea');
        const updatedIdea = ideaResponse.data?.refinedIdea ?? ideaResponse.data?.idea;

        if (!updatedIdea) {
          setBusinessIdea("No business idea found.");
          return;
        }
        setBusinessIdea(updatedIdea);

        // Step 2: Send the idea to the backend for analysis
        const setMarketTrends = await axios.post('/api/predictor', { idea: businessIdea });
      } catch {
        setError('Failed to fetch the updated idea');
      } finally {
        setLoading(false);
      }
    };
    generateMarketTrends();
  }, []);

  const generateMarketTrends = async () => {
    setLoading(true);
    try {
      const ideaResponse = await axios.get('/api/updatedidea');
      const updatedIdea = ideaResponse.data?.refinedIdea ?? ideaResponse.data?.idea;

      if (!updatedIdea) {
        setBusinessIdea("No business idea found.");
        return;
      }
      setBusinessIdea(updatedIdea);

      // Step 2: Send the idea to the backend for analysis
      const setMarketTrends = await axios.post('/api/predictor', { idea: businessIdea });
    } catch {
      setError('Failed to fetch the updated idea');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold mb-4 w-full">Market Trends Predictor</h1>
      <div className="p-4 border rounded-lg w-full bg-gray-100">
        <pre className="whitespace-pre-wrap">{businessIdea}</pre>
      </div>
      <button
        onClick={generateMarketTrends}
        disabled={loading}
        className="bg-blue-500 text-white px-4 mt-4 w-full h-10 py-2 rounded-lg"
      >
        {loading ? 'Analyzing Market Trends...' : 'Get Market Trends'}
      </button>
      {marketTrends && (
        <div className="mt-4 p-4 border rounded bg-gray-100">
          <strong>Market Trends Analysis:</strong>
          <pre className="whitespace-pree-wrap">{marketTrends}</pre>
        </div>
      )}
    </div>
  );
}
