import { connect } from "@/lib/connectDB";
import Notes from "@/models/notes";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

export async function GET(
  req: NextRequest,
  { params }: { params: { noteId: string } }
) {
  await connect();
  const noteId = params.noteId;

  if (!mongoose.Types.ObjectId.isValid(noteId)) {
    return NextResponse.json({ error: "Invalid Note ID" }, { status: 400 });
  }

  try {
    const note = await Notes.findById(noteId);
    if (!note) {
      return NextResponse.json({ error: "Note not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, note }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { noteId: string } }
) {
  await connect();
  const noteId = params.noteId;

  if (!mongoose.Types.ObjectId.isValid(noteId)) {
    return NextResponse.json({ error: "Invalid Note ID" }, { status: 400 });
  }

  try {
    const { title, para } = await req.json();

    const updatedNote = await Notes.findByIdAndUpdate(
      noteId,
      { title, para },
      { new: true }
    );

    if (!updatedNote) {
      return NextResponse.json({ error: "Note not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, note: updatedNote }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { noteId: string } }
) {
  await connect();
  const noteId = params.noteId;

  if (!mongoose.Types.ObjectId.isValid(noteId)) {
    return NextResponse.json({ error: "Invalid Note ID" }, { status: 400 });
  }

  try {
    const deletedNote = await Notes.findByIdAndDelete(noteId);
    if (!deletedNote) {
      return NextResponse.json({ error: "Note not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, message: "Note deleted" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
