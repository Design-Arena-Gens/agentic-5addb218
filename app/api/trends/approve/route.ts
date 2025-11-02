import { NextRequest, NextResponse } from 'next/server';
import { approvedTrends } from '@/lib/storage';

export async function POST(request: NextRequest) {
  try {
    const { trendId, approved } = await request.json();

    if (!trendId) {
      return NextResponse.json({ error: 'Trend ID is required' }, { status: 400 });
    }

    approvedTrends[trendId] = approved;

    return NextResponse.json({ success: true, trendId, approved });
  } catch (error) {
    console.error('Error approving trend:', error);
    return NextResponse.json({ error: 'Failed to approve trend' }, { status: 500 });
  }
}
