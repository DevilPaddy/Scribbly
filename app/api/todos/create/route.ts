import { connect } from '@/lib/connectDB';
import ToDo from '@/models/todo';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

connect();

export async function POST(req: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get('authToken')?.value;

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
    const userId = decoded.userId;

    if (!userId) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 403 });
    }

    const { task, description = '' } = await req.json();

    if (!task || task.trim() === '') {
      return NextResponse.json({ error: 'Task is required' }, { status: 400 });
    }

    const newToDo = await ToDo.create({
      task: task.trim(),
      description,
      userId,
      completed: false,
    });

    return NextResponse.json({ success: true, todo: newToDo });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
