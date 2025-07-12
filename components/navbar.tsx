"use client";

import Link from "next/link";
import { CgProfile } from "react-icons/cg";

export default function Navbar() {
  return (
    <div className="w-full px-2 md:px-6 py-2 flex justify-between items-center 
      border-b border-white/20 bg-[#0f0f0f] shadow-sm backdrop-blur-sm z-50">
      
      <Link href="/home">
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
          <span className="text-[#91ff00]">Scri</span>bbly
        </h1>
      </Link>

      <Link href="/profile" className="h-10 w-10 flex items-center justify-center rounded-full hover:scale-105 transition duration-200 cursor-pointer">
        <CgProfile size={28} className="text-white" />
      </Link>
    </div>
  );
}
