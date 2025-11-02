import { NextRequest, NextResponse } from 'next/server';
import { settingsDB } from '@/lib/storage';

export async function GET() {
  try {
    return NextResponse.json({ settings: settingsDB });
  } catch (error) {
    console.error('Error fetching settings:', error);
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const newSettings = await request.json();

    // Update settings (in production, save to database)
    Object.assign(settingsDB, newSettings);

    return NextResponse.json({ success: true, settings: settingsDB });
  } catch (error) {
    console.error('Error saving settings:', error);
    return NextResponse.json({ error: 'Failed to save settings' }, { status: 500 });
  }
}
