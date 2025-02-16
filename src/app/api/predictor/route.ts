
import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: NextRequest) {
    console.log("Control at backend pitchdeck");
    try {
        const body = await req.json();
        console.log("Control at backend pitchdeck", body);
        const { businessIdea } = body;

        if (!businessIdea) {
            return NextResponse.json({ error: 'No idea provided.' }, { status: 400 });
        }

        const geminiResponse = await axios.post(
            'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyCpwo9aX3v079x1WDqrAQgtlDvPc3mInHM',
            {
                contents: [{
                    parts: [{
                        text: `Provide a analysis of market trends and identify key areas where adaptation is essential to maintain competitiveness. Avoid using special characters in the response business idea: ${businessIdea}`,
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