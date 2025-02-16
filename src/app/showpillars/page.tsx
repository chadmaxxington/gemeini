"use client";

import axios from 'axios';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ShowPillars() {
    const router = useRouter();
    const [idea, setIdea] = useState('');
    const [resultOne, setResultOne] = useState('');
    const [resultTwo, setResultTwo] = useState('');

    useEffect(() => {
        const evaluateIdea = async () => {
            // setLoading(true);
            try {
                const res = await fetch('/api/evaluate', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ idea }),
                });
                const data = await res.json();
                setResultTwo(data.result);
            } catch (error) {
                // console.log("error at evalute", error)
                setResultTwo('Error evaluating idea');
            }
        };
        const handleFetchAndAnalyze = async () => {
            try {
                // Step 1: Fetch the updated business idea
                const ideaResponse = await axios.get('/api/updatedidea');
                const updatedIdea = ideaResponse.data?.refinedIdea ?? ideaResponse.data?.idea;

                if (!updatedIdea) {
                    setResultOne("No business idea found.");
                    return;
                }
                setIdea(updatedIdea);

                // Step 2: Send the idea to the backend for analysis
                const analysisResponse = await axios.post('/api/showpillars', { idea: updatedIdea });

                setResultOne(analysisResponse.data?.analysis ?? "No analysis received.");
                const formattedAnalysis = analysisResponse.data?.analysis?.replace(/\d+\s/g, '\n$&') || 'No analysis received.';
                setResultOne(formattedAnalysis);
            } catch (error: any) {
                console.error("Error during fetch or analysis:", error.response?.data || error.message);
                setResultOne("Failed to fetch or analyze the idea.");
            }
        };

        handleFetchAndAnalyze();
        setTimeout(evaluateIdea, 2000);
    }, []);

    const handlePushIdea = async () => {
        try {
            const { data } = await axios.post('/api/updatedidea', {
                idea: idea,
            });
            console.log('Idea pushed:', data);
            router.push('/execution');
        } catch (error: any) {
            console.error('Failed to push idea:', error.response?.data?.error || error.message);
        }
    };

    return (
        <div className="p-6 space-y-4">
            <div className="p-4 border rounded-lg bg-gray-100">
                <h2 className="text-lg font-semibold">Business Idea</h2>
                <p>{idea}</p>
            </div>
            <div className="p-4 border rounded-lg bg-gray-100">
                <h2 className="text-lg font-semibold">AI Analysis</h2>
                <pre className="whitespace-pre-wrap mt-2 mb-6">{resultTwo}</pre>
                <pre className="whitespace-pre-wrap">{resultOne}</pre>
            </div>
            {resultOne && (
                <div className='flex gap-2'>
                    <button
                        onClick={() => { router.push('/generate'); }}
                        className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
                    >
                        Make a Stronger Idea
                    </button>
                    <button
                        onClick={handlePushIdea}
                        className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
                    >
                        Get Execution steps
                    </button>
                </div>
            )}
        </div>
    );
}
