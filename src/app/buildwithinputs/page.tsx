"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function IdeaRefiner() {
  const router = useRouter();
  const [userInput, setUserInput] = useState('');
  const [currentIdea, setCurrentIdea] = useState('');
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchIdea = async () => {
      try {
        const { data } = await axios.get('/api/updatedidea');
        setCurrentIdea(data.idea || 'No idea found');
      } catch (error: any) {
        console.error('Failed to get idea:', error.response?.data?.error || error.message);
      }
    };
    fetchIdea();
  }, []);

  const refineIdea = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/buildwithinputs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userInput, currentIdea }),
      });
      const data = await res.json();
      setFeedback(data.refinedIdea);
    } catch {
      setFeedback('Error refining idea');
    } finally {
      setLoading(false);
    }
  };

  const handlePushIdea = async () => {
    try {
      const { data } = await axios.post('/api/updatedidea', { idea: feedback });
      console.log('Idea pushed:', data);
      router.push('/showpillars');
    } catch (error: any) {
      console.error('Failed to push idea:', error.response?.data?.error || error.message);
    }
  };

  return (
    <div className="flex flex-col items-center p-6 bg-white">
      <h1 className="text-2xl font-bold mb-4 w-full">Business Idea Refinement</h1>
      <textarea
        value={currentIdea}
        className="border p-2 w-full h-40 mb-4 bg-gray-100 cursor-not-allowed"
      />
      <textarea
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder="Provide your input"
        className="border p-2 w-full mb-4"
      />
      <button
        onClick={refineIdea}
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-400 text-white w-full h-10 rounded-xl"
      >
        {loading ? 'Refining...' : 'Refine Idea'}
      </button>
      {feedback && (
        <div className="mt-4 p-4 border rounded bg-gray-100">
          <strong>Refined Idea:</strong>
          <p>{feedback}</p>
        </div>
      )}

      {feedback && (
        <button
          onClick={handlePushIdea}
          className="w-full py-3 bg-blue-600 hover:bg-blue-400 text-white rounded-lg transition duration-300"
        >
          Final the idea
        </button>
      )}
    </div>
  );
}
