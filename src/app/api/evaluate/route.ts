import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: NextRequest) {
    console.log("control at backend");
    const { idea } = await req.json();
    const perspectives = [
        "Upper-Class Investors",
        "Middle-Class Professionals",
        "Lower-Class Laborers",
        "Government Employees",
        "Freelancers",
        "Retailers",
        "Farmers",
        "Students",
        "Blue-Collar Workers",
        "Homemakers",
    ];

    const results = await Promise.all(
        perspectives.map(async (perspective) => {
            try {
                const response = await axios.post(
                    'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyCpwo9aX3v079x1WDqrAQgtlDvPc3mInHM',
                    {
                        contents: [{
                            parts: [{
                                text: `Would a ${perspective} pay for a solution like: ${idea}? Answer only "yes" or "no".`
                            }]
                        }]
                    },
                    {
                        headers: { 'Content-Type': 'application/json' }
                    }
                );

                const answer = response.data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim().toLowerCase();
                return answer === 'yes';
            } catch (error: any) {
                console.error(`Error analyzing perspective (${perspective}):`, error.response?.data || error.message);
                return false; // Default to false on error
            }
        })
    );


    const positiveCount = results.filter(Boolean).length;
    const isGoodIdea = positiveCount >= 5 ? 'Good Idea' : 'Not a Strong Idea';

    console.log("control left backend");
    return NextResponse.json({
        result: `${isGoodIdea} (${positiveCount}/10 perspectives positive)`
    });
}