"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "@/components/navbar";
import Link from "next/link";

export default function CreateNotes() {
  type Note = {
    _id: string;
    title: string;
    para: string;
  };

  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios.get("/api/notes", {
          withCredentials: true
        });
        setNotes(res.data.notes || []);
      } catch (error) {
        console.error("❌ Error fetching notes:", error);
      }
    };

    fetchNotes();
  }, []);

  const handleCreateNote = async () => {
    try {
      const res = await axios.post(
        "/api/notes/create",
        {
          title: "Untitled Note",
          para: ""
        },
        {
          withCredentials: true
        }
      );

      const newNote = res.data.note;
      setNotes((prev) => [newNote, ...prev]);
    } catch (error) {
      console.error("❌ Error creating note:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white">
      <Navbar />
      <div className="p-4">
        <div className="flex gap-2 min-w-full">
          {/* Menu section to create notes */}
          <div className="flex flex-col items-center border-r-2 border-r-zinc-700 pr-4 h-screen">
            <h2 className="text-xl md:text-2xl font-[500] text-[#ffffff]">Notes</h2>

            <button
              onClick={handleCreateNote}
              className="rounded-full border-2 border-zinc-700 bg-zinc-900 text-zinc-50 font-medium
              text-lg md:text-3xl p-2 w-[2rem] h-[2rem] flex justify-center items-center mt-3 hover:scale-110"
            >
              +
            </button>
          </div>

          {/* Notes list section */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-2 auto-rows-[10rem] px-2 md:min-w-[80%]">
            {notes.length === 0 ? (
              <p className="text-zinc-400">No notes found. Try creating one!</p>
            ) : (
              notes.map((note) => (
                <Link
                  key={note._id}
                  href={`/listNotes/${note._id}`}
                  className="border-2 border-[#292a2b] bg-[#161616] 
                    rounded-2xl p-4 hover:bg-[#1c1c1c] transition"
                >
                  <h3 className="text-xl font-semibold">{note.title}</h3>
                  <p className="text-sm text-zinc-400 truncate">
                    {note.para || "No content"}
                  </p>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
