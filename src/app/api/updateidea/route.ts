import { NextResponse } from 'next/server';

let businessIdea = '';

export async function POST(req: Request) {
    const { idea } = await req.json();
    if (!idea) {
        return NextResponse.json({ error: 'Idea is required' }, { status: 400 });
    }
    businessIdea = idea; // Store the idea
    return NextResponse.json({ message: 'Idea updated successfully', idea });
}

export async function GET() {
    if (!businessIdea) {
        return NextResponse.json({ error: 'No idea found' }, { status: 404 });
    }
    return NextResponse.json({ idea: businessIdea });
}
