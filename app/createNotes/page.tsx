"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";


export default function CreateNotes() {
  const [title, setTitle] = useState("");
  const [para, setPara] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<number | null>(null);

  useEffect(() => {
    if (!title && !para) return;

    const timeout = setTimeout(() => {
      handleSave(true);
    }, 2000);

    return () => clearTimeout(timeout);
  }, [title, para]);

  const handleSave = async (isAuto = false) => {
    try {
      setIsSaving(true);
      const res = await axios.post("/api/notes/create", { title, para });

      if (res.status === 200 || res.status === 201) {
        setLastSaved(Date.now());
        if (!isAuto) toast.success("✅ Note saved!");
      }
    } catch (err) {
      toast.error("❌ Failed to save note");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setTitle("");
    setPara("");
    toast("🗑️ Draft cleared");
  };

  return (
    <div className="h-screen w-full bg-[#0f0f0f] text-white flex flex-col">
      <div className="flex-1 px-4 md:px-8 py-4">
        <div className="w-full h-[90%] md:h-full border-2 rounded-2xl p-6 border-[#363f49] flex flex-col">
          <form className="flex flex-col gap-4 flex-1">
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-transparent text-xl font-bold focus:outline-none border-b border-zinc-600 pb-2 placeholder:text-zinc-400"
            />

            <textarea
              name="para"
              placeholder="Start writing your note..."
              value={para}
              onChange={(e) => setPara(e.target.value)}
              className="bg-transparent text-base focus:outline-none resize-none flex-1 placeholder:text-zinc-400"
            />
          </form>

          <div className="flex justify-center md:justify-end items-center gap-4 mt-4">
            <button
              type="button"
              onClick={handleCancel}
              className="text-red-400 border border-red-400 px-4 py-1.5 rounded-lg hover:bg-red-900 transition"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={() => handleSave(false)}
              disabled={isSaving}
              className="text-green-400 border border-green-400 px-4 py-1.5 rounded-lg hover:bg-green-900 transition"
            >
              {isSaving ? "Saving..." : "Save"}
            </button>
          </div>

          {lastSaved && (
            <p className="text-sm text-right text-zinc-400 mt-2">
              Last saved at: {new Date(lastSaved).toLocaleTimeString()}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
