'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function ExecutionSteps() {
    const router = useRouter();
    const [businessIdea, setBusinessIdea] = useState<string>('');
    const [executionSteps, setExecutionSteps] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        const fetchUpdatedIdea = async () => {
            try {
                const response = await axios.get('/api/updatedidea');
                setBusinessIdea(response.data.idea);
            } catch {
                setError('Failed to fetch the updated idea');
            }
        };
        fetchUpdatedIdea();
    }, []);

    useEffect(() => {
        if (businessIdea) {
            const fetchExecutionSteps = async () => {
                setLoading(true);
                try {
                    const response = await axios.post('/api/execution', { idea: businessIdea });
                    setExecutionSteps(response.data.steps);
                } catch {
                    setError('Failed to generate execution steps');
                } finally {
                    setLoading(false);
                }
            };
            fetchExecutionSteps();
        }
    }, [businessIdea]);

    return (
        <div className="p-4">
            <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <h1 className="text-2xl font-bold mb-4">Business Execution Steps</h1>
            </div>
            {loading ? (
                <div className="bg-gray-100 p-4 rounded-lg">Loading...</div>
            ) : error ? (
                <div className="bg-gray-100 p-4 rounded-lg text-red-500">{error}</div>
            ) : (
                <div>
                    <div className="bg-gray-100 p-4 rounded-lg mb-4">
                        <h2 className="text-xl font-semibold">Business Idea:</h2>
                        <p>{businessIdea}</p>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-lg">
                        <h2 className="text-xl font-semibold mb-2">Execution Steps:</h2>
                        <p className="whitespace-pre-line">{executionSteps}</p>
                    </div>
                </div>
            )}
            {executionSteps && (
                <div className='flex gap-2 mt-5'>
                    <button
                        onClick={() => { router.push('/predictor'); }}
                        className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
                    >
                        See Market Trends
                    </button>
                    <button
                        onClick={() => { router.push('/pitchdeck'); }}
                        className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
                    >
                        AI Pitchdeck Generator
                    </button>
                    <button
                        onClick={() => { router.push('/networking'); }}
                        className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
                    >
                        Grow your network
                    </button>
                </div>
            )}
        </div>
    );
};
