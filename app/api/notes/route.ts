import { connect } from '@/lib/connectDB';
import Notes from '@/models/notes';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import Jwt from 'jsonwebtoken';

connect();

export async function GET(req: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get('authToken')?.value;

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const decoded = Jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
    const userId = decoded.userId;

    if (!userId) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 403 });
    }
    const notes = await Notes.find({ userId }).sort({ updatedAt: -1 });

    return NextResponse.json({ success: true, notes });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
