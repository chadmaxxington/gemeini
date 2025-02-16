import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
    const { idea } = await req.json();
    if (!idea) {
        return NextResponse.json({ error: 'Idea is required' }, { status: 400 });
    }
    
    // Store idea in a cookie
    cookies().set('businessIdea', idea, {
        path: '/',
        httpOnly: true,  // Prevents access via JavaScript
        maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return NextResponse.json({ message: 'Idea updated successfully', idea });
}

export async function GET() {
    const storedIdea = cookies().get('businessIdea')?.value;

    if (!storedIdea) {
        return NextResponse.json({ error: 'No idea found' }, { status: 404 });
    }

    return NextResponse.json({ idea: storedIdea });
}
