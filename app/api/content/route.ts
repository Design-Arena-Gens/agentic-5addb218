import { NextRequest, NextResponse } from 'next/server';
import { contentDB } from '@/lib/storage';

export async function GET(request: NextRequest) {
  try {
    // Return all generated content, sorted by timestamp
    const sortedContent = [...contentDB].sort((a, b) =>
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );

    return NextResponse.json({ content: sortedContent });
  } catch (error) {
    console.error('Error fetching content:', error);
    return NextResponse.json({ content: [], error: 'Failed to fetch content' }, { status: 500 });
  }
}
