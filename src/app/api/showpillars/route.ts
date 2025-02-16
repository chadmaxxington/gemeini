// /api/showpillars/route.ts
import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { idea } = body;

        if (!idea) {
            return NextResponse.json({ error: 'No idea provided.' }, { status: 400 });
        }

        // Step 3: Get business pillars from AI
        const aiResponse = await axios.post(
            'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyCpwo9aX3v079x1WDqrAQgtlDvPc3mInHM',
            {
                contents: [{
                    parts: [{
                        text: `Analyze this business idea from these aspects: 
                1. Viability: Is this idea practical and implementable? 
                2. Growth Potential: Can this idea scale to a larger market? 
                3. Initial Capital Requirement: What approximate funding is needed to start? 
                4. Market Adaptability: Can this idea pivot if market trends change? 
                
                Business Idea: "${idea}"
                Provide concise answers for each aspect without using any special characters`
                    }]
                }]
            },
            { headers: { 'Content-Type': 'application/json' } }
        );

        const aiData = aiResponse.data;
        const analysis = aiData?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "No analysis received.";

        // Step 4: Return the idea and analysis
        return NextResponse.json({
            businessIdea: idea,
            analysis,
        });

    } catch (error: any) {
        console.error("Error at showpillars backend:", error.response?.data || error.message);
        return NextResponse.json(
            { error: error.response?.data?.message || "Failed to process request" },
            { status: error.response?.status || 500 }
        );
    }
}
