import mongoose, { Schema, Document, models, model } from "mongoose";

export interface ToDoDocument extends Document {
  task: string;
  description: string;
  completed: boolean;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

const ToDoSchema = new Schema<ToDoDocument>(
  {
    task: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    completed: {
      type: Boolean,
      default: false,
    },
    userId: {
      type: String,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ToDo = models.ToDo || model<ToDoDocument>("ToDo", ToDoSchema);

export default ToDo;
