import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: NextRequest) {
  const { userInput, currentIdea } = await req.json();

  try {
    const response = await axios.post(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyCpwo9aX3v079x1WDqrAQgtlDvPc3mInHM',
      {
        contents: [{
          parts: [{
            text: `Refine this business idea based on user input: 
            User input: "${userInput}" 
            Current idea: "${currentIdea}" 
            Provide a more feasible and appealing version in a paragraph without special characters.`
          }]
        }]
      },
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );

    const data = response.data;
    console.log("Response from Gemini:", data);

    // Extracting the refined idea from the response
    const refinedIdea = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "No refined idea received.";

    return NextResponse.json({ refinedIdea });

  } catch (error: any) {
    console.error("Error calling Gemini API:", error.response?.data || error.message);
    return NextResponse.json(
      { error: error.response?.data?.message || "Failed to get a response from Gemini API" },
      { status: error.response?.status || 500 }
    );
  }
}
