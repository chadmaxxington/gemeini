import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    console.log("control at backend");
    const body = await req.json();

    const response = await fetch(
        'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyCpwo9aX3v079x1WDqrAQgtlDvPc3mInHM', 
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{
                    parts: [
                        { text: body.systemPrompt },
                        { text: body.prompt }
                    ]
                }]
            }),
        }
    );

    const data = await response.json();
    console.log("response at backend", JSON.stringify(data, null, 2));

    // Extract the generated text from Gemini API response
    const generatedText = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? 'No content received';

    return NextResponse.json({
        message: generatedText
    });
}
