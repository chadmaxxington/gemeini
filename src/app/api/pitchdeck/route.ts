
import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: NextRequest) {
    console.log("Control at backend pitchdeck");
    try {
        const body = await req.json();
        const { businessIdea } = body;

        if (!businessIdea) {
            return NextResponse.json({ error: 'No idea provided.' }, { status: 400 });
        }

        const geminiResponse = await axios.post(
            'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyCpwo9aX3v079x1WDqrAQgtlDvPc3mInHM',
            {
                contents: [{
                    parts: [{
                        text: `Create a detailed pitch deck for: "${businessIdea}". Include problem, solution, market opportunity, business model, competitive advantage, and team overview. Response without special characters.`
                    }]
                }]
            },
            {
                headers: { 'Content-Type': 'application/json' }
            }
        );

        const pitchDeck = geminiResponse.data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ?? 'No response received';

        return NextResponse.json({ pitchDeck });
    } catch (error) {
        console.error('Error at backend:', error);
        return NextResponse.json({
            pitchDeck: 'Error generating pitch deck. Please check API status.'
        });
    }
}