// route.ts - Handles backend logic for generating execution steps, including legal documentation
import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: Request) {
    try {
        const { idea } = await req.json();

        // Call Google Gemini model for execution steps using axios
        const response = await axios.post(
            'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyCpwo9aX3v079x1WDqrAQgtlDvPc3mInHM',
            {
                contents: [{
                    parts: [{
                        text: `Generate 7 execution steps for the business idea: ${idea}. Ensure one step covers legal documentation requirements in India. Response should not have any special characters.`
                    }]
                }]
            },
            {
                headers: { 'Content-Type': 'application/json' }
            }
        );

        // Correctly access the nested response
        const steps = response.data?.candidates?.[0]?.content?.parts?.[0]?.text ?? 'No steps generated';

        return NextResponse.json({ steps });
    } catch (error: any) {
        console.error('Error generating execution steps:', error.response?.data ?? error.message);
        return NextResponse.json({ error: 'Failed to generate execution steps' }, { status: 500 });
    }
}
