"use client";

import Navbar from "@/components/navbar";
import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-[#0f0f0f] min-h-screen text-white">
      <Navbar />

      <div className="p-4">
        <h2 className="text-2xl font-semibold mb-6">🏡 Home</h2>

        <div  className="flex sm:flex-row items-center gap-4">
          <Link href="/listNotes" className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-6 w-40 text-center hover:bg-[#2a2a2a] transition">
            <h4 className="text-lg font-medium">📝 Notes</h4>
          </Link>

          <Link href="/listToDo" className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-6 w-40 text-center hover:bg-[#2a2a2a] transition">
            <h4 className="text-lg font-medium">✅ To do's</h4>
          </Link>
        </div>
      </div>
    </div>
  );
}
