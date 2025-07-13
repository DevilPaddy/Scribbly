"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "@/components/navbar";
import Link from "next/link";

export default function CreateToDos() {
  type ToDo = {
    _id: string;
    task: string;
    completed: boolean;
  };

  const [todos, setToDos] = useState<ToDo[]>([]);

  useEffect(() => {
    const fetchToDos = async () => {
      try {
        const res = await axios.get("/api/todos", {
          withCredentials: true
        });
        setToDos(res.data.todos || []);
      } catch (error) {
        console.error("❌ Error fetching todos:", error);
      }
    };

    fetchToDos();
  }, []);

  const handleCreateToDo = async () => {
    try {
      const res = await axios.post(
        "/api/todos/create",
        {
          task: "New Task",
          completed: false
        },
        {
          withCredentials: true
        }
      );

      const newToDo = res.data.todo;
      setToDos((prev) => [newToDo, ...prev]);
    } catch (error) {
      console.error("❌ Error creating todo:", error);
    }
  };

  const toggleComplete = async (id: string, currentStatus: boolean) => {
    try {
      await axios.put(
        `/api/todos/${id}`,
        { completed: !currentStatus },
        { withCredentials: true }
      );
      setToDos((prev) =>
        prev.map((todo) =>
          todo._id === id ? { ...todo, completed: !currentStatus } : todo
        )
      );
    } catch (err) {
      console.error("❌ Error updating todo status:", err);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white">
      <Navbar />
      <div className="p-4">
        <div className="flex gap-2 min-w-full">
          <div className="flex flex-col items-center border-r-2 border-r-zinc-700 pr-4 h-screen">
            <h2 className="text-xl md:text-2xl font-[500] text-[#ffffff]">To-Do's</h2>

            <button
              onClick={handleCreateToDo}
              className="rounded-full border-2 border-zinc-700 bg-zinc-900 text-zinc-50 font-medium
              text-lg md:text-3xl p-2 w-[2rem] h-[2rem] flex justify-center items-center mt-3 hover:scale-110"
            >
              +
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-2 auto-rows-[8rem] px-2 md:min-w-[80%]">
            {todos.length === 0 ? (
              <p className="text-zinc-400">No tasks found. Try creating one!</p>
            ) : (
             todos.map((todo) => (
                <Link
                  href={`/listToDo/${todo._id}`}
                  key={todo._id}
                  className={`border-2 border-[#292a2b] bg-[#161616] 
                    rounded-2xl p-4 hover:bg-[#1c1c1c] transition 
                    flex items-start justify-between cursor-pointer`}
                >
                  <div>
                    <h3
                      className={`text-lg font-medium ${
                        todo.completed ? "line-through text-zinc-500" : "text-white"
                      }`}
                    >
                      {todo.task}
                    </h3>
                  </div>
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onClick={(e) => e.preventDefault()} 
                    onChange={() => toggleComplete(todo._id, todo.completed)}
                    className="mt-1 accent-green-500 cursor-pointer w-5 h-5"
                  />
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
