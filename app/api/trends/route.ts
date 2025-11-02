import { NextRequest, NextResponse } from 'next/server';
import { trendsDB } from '@/lib/storage';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const language = searchParams.get('language') || 'all';
    const region = searchParams.get('region') || 'global';
    const category = searchParams.get('category') || 'all';

    // Fetch trends from multiple sources
    const trends = await fetchTrendsFromSources(language, region, category);

    // Merge with existing trends
    trends.forEach(trend => {
      if (!trendsDB.find(t => t.title === trend.title)) {
        trendsDB.push(trend);
      }
    });

    // Filter trends
    let filteredTrends = trendsDB;
    if (language !== 'all') {
      filteredTrends = filteredTrends.filter(t => t.language === language);
    }
    if (category !== 'all') {
      filteredTrends = filteredTrends.filter(t => t.category === category);
    }

    // Sort by score and timestamp
    filteredTrends.sort((a, b) => b.score - a.score);

    return NextResponse.json({ trends: filteredTrends.slice(0, 50) });
  } catch (error) {
    console.error('Error fetching trends:', error);
    return NextResponse.json({ trends: [], error: 'Failed to fetch trends' }, { status: 500 });
  }
}

async function fetchTrendsFromSources(language: string, region: string, category: string) {
  const trends: any[] = [];

  // Simulate Google Trends
  const googleTrends = [
    { title: 'Artificial Intelligence Breakthrough', source: 'Google Trends', score: 95, category: 'technology', language: 'en' },
    { title: 'Climate Summit 2025', source: 'Google Trends', score: 88, category: 'environment', language: 'en' },
    { title: 'New Space Mission Launch', source: 'Google Trends', score: 92, category: 'technology', language: 'en' },
    { title: 'Olympic Games Highlights', source: 'Google Trends', score: 87, category: 'sports', language: 'en' },
  ];

  // Simulate Twitter/X Trends
  const twitterTrends = [
    { title: 'Breaking Tech News', source: 'Twitter', score: 90, category: 'technology', language: 'en' },
    { title: 'Viral Entertainment Moment', source: 'Twitter', score: 85, category: 'entertainment', language: 'en' },
    { title: 'Sports Championship Final', source: 'Twitter', score: 82, category: 'sports', language: 'en' },
  ];

  // Simulate Reddit Hot Topics
  const redditTrends = [
    { title: 'Gaming Industry Update', source: 'Reddit', score: 78, category: 'entertainment', language: 'en' },
    { title: 'Health & Wellness Tips', source: 'Reddit', score: 75, category: 'health', language: 'en' },
    { title: 'Business Innovation', source: 'Reddit', score: 80, category: 'business', language: 'en' },
  ];

  // Urdu trends
  if (language === 'ur' || language === 'all') {
    const urduTrends = [
      { title: 'پاکستان میں ٹیکنالوجی کی ترقی', source: 'Google Trends', score: 86, category: 'technology', language: 'ur' },
      { title: 'کرکٹ میچ کی تازہ ترین خبریں', source: 'Twitter', score: 91, category: 'sports', language: 'ur' },
    ];
    trends.push(...urduTrends);
  }

  trends.push(...googleTrends, ...twitterTrends, ...redditTrends);

  // Add metadata
  return trends.map(trend => ({
    ...trend,
    id: `trend_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    timestamp: new Date().toISOString(),
    approved: null
  }));
}
