import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true }, 
    title: { type: String, default: "Untitled" },
    para: { type: String, default: "" } 
  },
  { timestamps: true }
);

export default mongoose.models.Note || mongoose.model("Note", NoteSchema);
