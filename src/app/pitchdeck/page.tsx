"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function PitchDeckGenerator() {
    const [businessIdea, setBusinessIdea] = useState('');
    const [pitchDeck, setPitchDeck] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUpdatedIdea = async () => {
            try {
                const { data } = await axios.get('/api/updatedidea');
                setBusinessIdea(data?.refinedIdea ?? data?.idea ?? "No business idea found.");
            } catch {
                setError('Failed to fetch the updated idea');
            }
        };
        fetchUpdatedIdea();
    }, []);

    const generatePitchDeck = async () => {
        setLoading(true);
        setError('');
        try {
            const res = await fetch('/api/pitchdeck', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ businessIdea }),
            });
            if (!res.ok) throw new Error('Server error');
            const data = await res.json();
            setPitchDeck(data.pitchDeck.split(/\n\n/).filter(Boolean));
        } catch {
            setError('Failed to fetch pitch deck. Check Ollama server.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center p-6">
            <h1 className="text-2xl font-bold mb-4 w-full">AI Pitch Deck Generator</h1>
            <div className="p-4 border rounded-lg bg-gray-100">
                <pre className="whitespace-pre-wrap">{businessIdea}</pre>
            </div>
            <button
                onClick={generatePitchDeck}
                disabled={loading}
                className="bg-blue-500 mt-4 hover:bg-blue-400 text-white px-4 w-full h-10 py-2 rounded-lg"
            >
                {loading ? 'Generating...' : 'Create Pitch Deck'}
            </button>
            {error && <div className="text-red-500 mt-2">{error}</div>}
            {pitchDeck.length > 0 && (
                <div className="mt-4 mb-4 space-y-4 w-full">
                    {pitchDeck.map((slide, index) => (
                        <div key={index} className="p-4 w-full border rounded-lg bg-gray-50 shadow-md">
                            <h2 className="font-semibold text-xl">Slide {index + 1}</h2>
                            <p className="whitespace-pre-wrap text-lg text-gray-800">{slide}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
