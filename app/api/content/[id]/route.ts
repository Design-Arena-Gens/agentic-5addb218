import { NextRequest, NextResponse } from 'next/server';
import { contentDB } from '@/lib/storage';

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const index = contentDB.findIndex(c => c.id === id);

    if (index === -1) {
      return NextResponse.json({ error: 'Content not found' }, { status: 404 });
    }

    contentDB.splice(index, 1);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting content:', error);
    return NextResponse.json({ error: 'Failed to delete content' }, { status: 500 });
  }
}
