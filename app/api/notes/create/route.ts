import { connect } from '@/lib/connectDB';
import Notes from '@/models/notes';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import Jwt from 'jsonwebtoken';

connect();

export async function POST(req: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get('authToken')?.value;

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { noteId, title, para } = await req.json();

    const decoded = Jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
    const userId = decoded.userId;

    if (!userId) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 403 });
    }

    let note;

    if (noteId) {
      // Update existing note...
      note = await Notes.findOneAndUpdate(
        { _id: noteId, userId },
        { title, para },
        { new: true }
      );
    } else {
      // Create a new note...
      note = await Notes.create({
        userId,
        title,
        para
      });
    }

    return NextResponse.json({ success: true, note });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
