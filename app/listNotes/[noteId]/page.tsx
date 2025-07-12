"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export default function NoteDetail() {
  const router = useRouter();
  const params = useParams();
  const noteId = params?.noteId as string;

  const [note, setNote] = useState<any>(null);
  const [title, setTitle] = useState("");
  const [para, setPara] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!noteId) return;

    const fetchNote = async () => {
      try {
        const res = await axios.get(`/api/notes/${noteId}`);
        setNote(res.data.note);
        setTitle(res.data.note.title);
        setPara(res.data.note.para);
        setLoading(false);
      } catch (err: any) {
        console.error("❌ Error fetching note:", err);
        setError("Failed to fetch note.");
        setLoading(false);
      }
    };

    fetchNote();
  }, [noteId]);


  useEffect(() => {
    const timeout = setTimeout(() => {
      if (note && noteId) handleSave();
    }, 2000);
    return () => clearTimeout(timeout);
  }, [title, para]);

  const handleSave = async () => {
    if (!noteId) {
      console.warn("⛔ Cannot save. Note not created yet.");
      return;
    }
    setSaving(true);
    try {
      await axios.put(`/api/notes/${noteId}`, { title, para });
    //   toast.success("✅ Saved!");
    } catch (err) {
      console.error("❌ Error updating note:", err);
      toast.error("Failed to save.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await axios.delete(`/api/notes/${noteId}`);
      toast.success("🗑️ Deleted");
      router.push("/listNotes");
    } catch (err) {
      console.error("❌ Error deleting note:", err);
      toast.error("Failed to delete.");
      setDeleting(false);
    }
  };

  if (loading) return <div className="text-white p-4">Loading...</div>;
  if (error) return <div className="text-red-500 p-4">{error}</div>;
  if (!note) return <div className="text-gray-500 p-4">Note not found.</div>;

  return (
    <div className="bg-[#0f0f0f] text-white min-h-screen p-4 flex flex-col">
   
      <div className="flex justify-between items-start flex-wrap gap-2 mb-3">
        <input
          className="bg-[#0f0f0f] text-white text-xl font-semibold flex-1 min-w-[50%] placeholder-gray-500 outline-none"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />
        <div className="text-right text-gray-400 text-xs sm:text-sm whitespace-nowrap">
          <div>🕓 Created: {new Date(note.createdAt).toLocaleString()} </div>
          <div>💾 Updated: {new Date(note.updatedAt).toLocaleString()} </div>
        </div>
      </div>

   
      <textarea
        className="bg-[#0f0f0f] text-white w-full flex-1 resize-none placeholder-gray-500 outline-none text-base mb-24"
        value={para}
        onChange={(e) => setPara(e.target.value)}
        placeholder="Write your note..."
        style={{ minHeight: "40vh", maxHeight: "60vh" }}
      />

     
      <div className="fixed bottom-3 right-3 left-3 flex justify-end gap-2 bg-[#0f0f0f] p-2 z-10">
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-green-600 hover:bg-green-700 text-sm px-4 py-1 rounded disabled:opacity-60"
        >
          {saving ? "Saving..." : "💾 Save"}
        </button>
        <button
          onClick={handleDelete}
          disabled={deleting}
          className="bg-red-600 hover:bg-red-700 text-sm px-4 py-1 rounded disabled:opacity-60"
        >
          {deleting ? "Deleting..." : "🗑️ Delete"}
        </button>
      </div>
    </div>
  );
}
