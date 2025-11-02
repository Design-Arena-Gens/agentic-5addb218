import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { enabled } = await request.json();

    // In production, save to database and update scheduler
    console.log(`Auto-post ${enabled ? 'enabled' : 'disabled'}`);

    return NextResponse.json({ success: true, enabled });
  } catch (error) {
    console.error('Error updating auto-post:', error);
    return NextResponse.json({ error: 'Failed to update auto-post' }, { status: 500 });
  }
}
