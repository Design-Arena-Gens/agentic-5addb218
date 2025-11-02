import { NextRequest, NextResponse } from 'next/server';
import { scheduledPostsDB } from '@/lib/storage';

export async function GET(request: NextRequest) {
  try {
    // Return all scheduled posts, sorted by scheduled time
    const sortedPosts = [...scheduledPostsDB].sort((a, b) =>
      new Date(a.scheduledTime).getTime() - new Date(b.scheduledTime).getTime()
    );

    return NextResponse.json({ posts: sortedPosts });
  } catch (error) {
    console.error('Error fetching scheduled posts:', error);
    return NextResponse.json({ posts: [], error: 'Failed to fetch scheduled posts' }, { status: 500 });
  }
}
