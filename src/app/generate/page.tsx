"use client";

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const fields = [
    "Agriculture & Farming", "Forestry", "Fishing", "Mining & Quarrying", "Manufacturing", "Construction & Real Estate Development",
    "Energy Production", "Transportation & Logistics", "Retail & Wholesale Trade", "Financial Services", "Tourism & Hospitality",
    "Education & Training Services", "Healthcare & Wellness", "Entertainment & Media", "Information Technology & Software Services",
    "Research & Development (R&D)", "Consulting Services", "Data Analytics & Market Research", "Creative Design & Marketing",
    "Government & Public Services", "Non-profit & NGOs", "Cultural & Recreational Services", "Green Technology (Cleantech)",
    "Smart Cities & IoT (Internet of Things)", "Space Technology", "Artificial Intelligence (AI)", "Blockchain & Cryptocurrency",
    "3D Printing & Additive Manufacturing", "Sharing Economy Platforms", "Circular Economy (Recycling & Upcycling)"
];

export default function FieldSelector() {
    const router = useRouter();

    const [input, setInput] = useState('');
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleFetch = async () => {
        setLoading(true);
        setError('');
        setResponse('');

        try {
            const res = await fetch('/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    systemPrompt: "You are a business expert. Provide a business idea in a paragraph without special characters.",
                    prompt: `Give a business idea in the following field: ${input}`,
                }),
            });

            if (!res.ok) throw new Error('Failed to fetch response');

            const data = await res.json();
            setResponse(data.message);
        } catch (error: any) {
            setError(error.message || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    const handlePushIdea = async () => {
        try {
            const { data } = await axios.post('/api/updatedidea', {
                idea: response,
            });
            console.log('Idea pushed:', data);
            router.push('/buildwithinputs');
        } catch (error: any) {
            console.error('Failed to push idea:', error.response?.data?.error || error.message);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-6xl">
                <h1 className="text-2xl font-semibold text-center mb-6">Select a Field</h1>

                <div className="grid grid-cols-3 gap-4 mb-6">
                    {fields.map((field) => (
                        <button
                            key={field}
                            onClick={() => setInput(field)}
                            className={`p-3 text-center rounded-lg border ${input === field ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-800'} hover:bg-blue-200 transition`}
                        >
                            {field}
                        </button>
                    ))}
                </div>

                {input && (
                    <div className="mb-4 text-lg font-medium text-center">Selected Field: {input}</div>
                )}

                <button
                    onClick={handleFetch}
                    disabled={!input || loading}
                    className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
                >
                    {loading ? 'Generating...' : 'Generate Response'}
                </button>

                {error && (
                    <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-lg">
                        <strong>Error:</strong> {error}
                    </div>
                )}

                {response && (
                    <div className="mt-6 p-4 bg-gray-100 rounded-lg text-gray-800 shadow-md">
                        <h2 className="font-semibold text-lg mb-2">Response:</h2>
                        <p>{response}</p>
                    </div>
                )}

                {response && (
                    <button
                        onClick={handlePushIdea}
                        className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
                    >
                        make the the idea more feasable & strong
                    </button>
                )}
            </div>
        </div>
    );
}
