import { NextResponse } from 'next/server';
import { scheduledPostsDB } from '@/lib/storage';

export async function GET() {
  try {
    const stats = {
      totalPosts: scheduledPostsDB.filter(p => p.status === 'posted').length,
      totalImpressions: Math.floor(Math.random() * 50000) + 10000,
      totalEngagement: Math.floor(Math.random() * 5000) + 1000,
      avgEngagementRate: Math.random() * 5 + 2
    };

    const postsByPlatform = [
      { platform: 'Facebook', posts: Math.floor(Math.random() * 30) + 10, color: '#1877F2' },
      { platform: 'Instagram', posts: Math.floor(Math.random() * 40) + 15, color: '#E4405F' },
      { platform: 'Twitter', posts: Math.floor(Math.random() * 50) + 20, color: '#1DA1F2' },
      { platform: 'YouTube', posts: Math.floor(Math.random() * 20) + 5, color: '#FF0000' },
      { platform: 'Pinterest', posts: Math.floor(Math.random() * 25) + 8, color: '#E60023' },
      { platform: 'Threads', posts: Math.floor(Math.random() * 35) + 12, color: '#000000' },
    ];

    const weeklyActivity = [
      { day: 'Mon', posts: Math.floor(Math.random() * 15) + 5, engagement: Math.floor(Math.random() * 300) + 100 },
      { day: 'Tue', posts: Math.floor(Math.random() * 18) + 7, engagement: Math.floor(Math.random() * 350) + 150 },
      { day: 'Wed', posts: Math.floor(Math.random() * 20) + 8, engagement: Math.floor(Math.random() * 400) + 200 },
      { day: 'Thu', posts: Math.floor(Math.random() * 17) + 6, engagement: Math.floor(Math.random() * 320) + 130 },
      { day: 'Fri', posts: Math.floor(Math.random() * 22) + 10, engagement: Math.floor(Math.random() * 450) + 250 },
      { day: 'Sat', posts: Math.floor(Math.random() * 19) + 8, engagement: Math.floor(Math.random() * 370) + 180 },
      { day: 'Sun', posts: Math.floor(Math.random() * 16) + 6, engagement: Math.floor(Math.random() * 310) + 140 },
    ];

    const topTrends = [
      { trend: 'AI Technology', posts: 15, engagement: 1250 },
      { trend: 'Climate Change', posts: 12, engagement: 980 },
      { trend: 'Space Exploration', posts: 10, engagement: 875 },
      { trend: 'Health & Fitness', posts: 14, engagement: 1100 },
      { trend: 'Gaming News', posts: 11, engagement: 920 },
    ];

    return NextResponse.json({
      stats,
      postsByPlatform,
      weeklyActivity,
      topTrends
    });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return NextResponse.json({ error: 'Failed to fetch analytics' }, { status: 500 });
  }
}
