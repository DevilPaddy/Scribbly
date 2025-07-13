"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import Navbar from "@/components/navbar";
import { toast } from "react-hot-toast";

export default function ToDoDetailPage() {
  const { todoId } = useParams();
  const router = useRouter();

  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);
  const [createdAt, setCreatedAt] = useState("");
  const [updatedAt, setUpdatedAt] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchToDo = async () => {
      try {
        const res = await axios.get(`/api/todos/${todoId}`);
        const todo = res.data.todo;
        setTask(todo.task);
        setDescription(todo.description);
        setCompleted(todo.completed);
        setCreatedAt(todo.createdAt);
        setUpdatedAt(todo.updatedAt);
      } catch (err) {
        toast.error("Failed to load to-do");
        router.push("/createToDo");
      } finally {
        setLoading(false);
      }
    };

    fetchToDo();
  }, [todoId]);

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });

  const handleSave = async () => {
    try {
      await axios.put(`/api/todos/${todoId}`, {
        task,
        description,
        completed,
      });
      setUpdatedAt(new Date().toISOString());
      toast.success("✅ To-Do updated successfully");
    } catch (err) {
      toast.error("❌ Failed to update To-Do");
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this task?")) return;

    try {
      await axios.delete(`/api/todos/${todoId}`);
      toast.success("🗑️ To-Do deleted");
      router.push("/listToDo");
    } catch (err) {
      toast.error("❌ Failed to delete To-Do");
    }
  };

  if (loading) return <div className="text-white p-4">Loading...</div>;

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white">
      <Navbar />
      <div className="p-4 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">📝 Edit Task</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm mb-1 text-zinc-400">Task Title</label>
            <input
              type="text"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              className="w-full p-2 rounded-lg bg-zinc-800 border border-zinc-600 text-white"
              placeholder="Task title"
            />
          </div>

          <div>
            <label className="block text-sm mb-1 text-zinc-400">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 rounded-lg bg-zinc-800 border border-zinc-600 text-white min-h-[100px]"
              placeholder="Write details about the task..."
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={completed}
              onChange={() => setCompleted(!completed)}
              className="w-5 h-5 accent-green-500"
            />
            <span className="text-zinc-300">Mark as completed</span>
          </div>

          <div className="text-sm text-zinc-500">
            <p>📅 Created: {formatDate(createdAt)}</p>
            <p>🔄 Last Updated: {formatDate(updatedAt)}</p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="mt-4 bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg font-semibold text-zinc-900"
            >
              Save Changes
            </button>
            <button
              onClick={handleDelete}
              className="mt-4 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-semibold text-white"
            >
              Delete Task
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
