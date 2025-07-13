import { connect } from "@/lib/connectDB";
import ToDo from "@/models/todo";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";


function extractToDoIdFromUrl(req: NextRequest): string | null {
  const url = new URL(req.url);
  const parts = url.pathname.split("/");
  const todoId = parts[parts.length - 1];
  return todoId && mongoose.Types.ObjectId.isValid(todoId) ? todoId : null;
}


export async function GET(req: NextRequest) {
  await connect();

  const todoId = extractToDoIdFromUrl(req);
  if (!todoId) {
    return NextResponse.json({ error: "❌ Invalid ToDo ID" }, { status: 400 });
  }

  try {
    const todo = await ToDo.findById(todoId);
    if (!todo) {
      return NextResponse.json({ error: "❌ ToDo not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, todo }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


export async function PUT(req: NextRequest) {
  await connect();

  const todoId = extractToDoIdFromUrl(req);
  if (!todoId) {
    return NextResponse.json({ error: "❌ Invalid ToDo ID" }, { status: 400 });
  }

  try {
    const { task, description, completed } = await req.json();

    const updatedToDo = await ToDo.findByIdAndUpdate(
      todoId,
      { task, description, completed },
      { new: true }
    );

    if (!updatedToDo) {
      return NextResponse.json({ error: "❌ ToDo not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, todo: updatedToDo }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


export async function DELETE(req: NextRequest) {
  await connect();

  const todoId = extractToDoIdFromUrl(req);
  if (!todoId) {
    return NextResponse.json({ error: "❌ Invalid ToDo ID" }, { status: 400 });
  }

  try {
    const deleted = await ToDo.findByIdAndDelete(todoId);
    if (!deleted) {
      return NextResponse.json({ error: "❌ ToDo not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "✅ ToDo deleted" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
