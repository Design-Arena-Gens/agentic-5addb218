import { NextResponse } from 'next/server';
import { contentDB, scheduledPostsDB } from '@/lib/storage';

export async function GET() {
  try {
    const totalPosts = scheduledPostsDB.filter(p => p.status === 'posted').length;
    const scheduledPosts = scheduledPostsDB.filter(p => p.status === 'scheduled').length;
    const activeTrends = contentDB.length;

    return NextResponse.json({
      totalPosts,
      scheduledPosts,
      activeTrends,
      platforms: 7
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json({
      totalPosts: 0,
      scheduledPosts: 0,
      activeTrends: 0,
      platforms: 7
    });
  }
}
