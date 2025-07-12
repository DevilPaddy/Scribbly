"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import Navbar from "@/components/navbar";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/api/user");
        setUser(res.data.user);
      } catch {
        toast.error("⚠️ Not logged in.");
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.get("/api/logout");
      toast.success("❌ Logout, 🥺 See you soon!");
      router.push("/login");
    } catch {
      toast.error("Logout failed");
    }
  };

  if (loading) return <div className="text-white p-4">Loading...</div>;
  if (!user) return <div className="text-red-500 p-4">No user found.</div>;

  return (
    <div className="min-h-screen bg-[#0f0f0f]">
      <Navbar/>
      <div className="flex flex-col items-center text-white p-4">
        <img
          src="/image.png"
          alt="Profile"
          className="w-24 h-24 rounded-full border-2 border-gray-500 bg-zinc-600 mb-4"
        />

        <div className="bg-white/5 border border-white/20 p-4 rounded-lg w-full max-w-md text-sm sm:text-base">
          <p className="mb-2">
            <span className="text-gray-400">👤 Username:</span> {user.username}
          </p>
          <p className="mb-2">
            <span className="text-gray-400">📧 Email:</span> {user.email}
          </p>
          <p>
            <span className="text-gray-400">🕓 Joined:</span>{" "}
            {new Date(user.createdAt).toLocaleString()}
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="mt-6 px-4 py-2 text-sm sm:text-base font-semibold rounded-lg bg-red-600 hover:bg-red-800"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
