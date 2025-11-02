import { NextRequest, NextResponse } from 'next/server';
import { contentDB, scheduledPostsDB } from '@/lib/storage';

export async function POST(request: NextRequest) {
  try {
    const { contentId } = await request.json();

    if (!contentId) {
      return NextResponse.json({ error: 'Content ID is required' }, { status: 400 });
    }

    // Find the content
    const content = contentDB.find(c => c.id === contentId);
    if (!content) {
      return NextResponse.json({ error: 'Content not found' }, { status: 404 });
    }

    // Schedule for 2 hours from now (in production, use smart scheduling)
    const scheduledTime = new Date();
    scheduledTime.setHours(scheduledTime.getHours() + 2);

    const scheduledPost = {
      id: `post_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      contentId: content.id,
      text: content.text,
      imageUrl: content.imageUrl,
      platforms: content.platforms,
      scheduledTime: scheduledTime.toISOString(),
      status: 'scheduled' as const
    };

    scheduledPostsDB.push(scheduledPost);

    return NextResponse.json({ success: true, post: scheduledPost });
  } catch (error) {
    console.error('Error scheduling content:', error);
    return NextResponse.json({ error: 'Failed to schedule content' }, { status: 500 });
  }
}
