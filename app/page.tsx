"use client"

import React, { useState } from 'react'
import { FcTodoList } from "react-icons/fc";
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const page = () => {
  const router = useRouter()
  const [task , setTask]= useState("")
  const [desc, setDesc] = useState("")
  const [mainTask, setMainTask] = useState<Task[]>([])

  type Task ={
    task:string,
    desc:string
  }
  const handelSubmit=(e:any)=>{
    e.preventDefault()

    setMainTask([...mainTask, {task, desc}])

    setTask("")
    setDesc("")
  }

  const handleLogout = async () => {
    try {
      await axios.get('/api/logout')
      toast.success('🥺 Logged Out, See you again!')
      router.push('/login')
    } catch (err) {
      console.error('Logout failed:', err)
      toast.error('❌ Failed to logout')
    }
  }

  let renderTask;

if (mainTask.length > 0) {
  renderTask = mainTask.map((t, index) => {
    return (
      <div
        key={index}
        className='px-2 py-4 border-2 border-zinc-600 rounded-xl min-h-40 mb-2'
      >
        <h4 className='text-2xl font-bold text-zinc-100'>{t.task}</h4>
        <p className='text-sm text-zinc-300 font-semibold'>{t.desc}</p>
      </div>
    );
  });
} else {
  renderTask = <h2 className='text-yellow-500 text-3xl font-bold'>🙅 No task to show!</h2>;
}

  
 

  return (
    <div className='px-4 py-2'>
      <div className='flex justify-between items-center'>
        <div className='flex flex-row'>
          <FcTodoList className='text-4xl font-bold' /> 
          <h1 className='text-3xl px-4 font-bold text-blue-500 mb-1'>To do list</h1>
        </div>
        <button className='px-6 py-1.5 bg-red-600 rounded-xl 
        font-medium text-xl hover:bg-red-700'
        onClick={handleLogout}
        >Logout</button>
      </div>
      {/* <hr className='bg-zinc-800 rounded-xl border-0 h-0.5' /> */}

      <div className='px-4 py-2 mt-4 mb-4 flex flex-col justify-center items-center'>
      <form className='px-4 py-8 border-2 border-zinc-800 bg-[#111111] rounded-lg'>
       <div className='flex flex-col gap-1'>
        <label htmlFor="task" className='mt-2 ml-2 text-zinc-300'>Enter your task here: </label>
        <input type="text" className='text-base font-extralight border-2 lg:min-w-[20rem]
         px-4 py-2 rounded-lg text-zinc-300 border-zinc-600 focus:outline-blue-500 focus:text-zinc-100'
         placeholder='Task...'
         value={task}
         onChange={(e)=>{
          setTask(e.target.value)
         }}
         />
       </div>
         <br />

       <div className='flex flex-col gap-1'>
        <label htmlFor="desc" className='ml-2 text-zinc-300'>Enter task description here: </label>
        <textarea
         id='desc'
         className='text-base font-extralight border-2 focus:text-zinc-100
         px-4 py-2 rounded-lg text-zinc-300 focus:outline-blue-500 lg:min-w-[20rem]
         resize-none overflow-y-auto min-h-[100px] border-zinc-600'
         placeholder='Task description...'
         value={desc}
         onChange={(e)=>{
          setDesc(e.target.value)
         }}
         />
       </div>
         <br />

        <div className='flex justify-center'>
          <button className='text-zinc-400 border-2  border-zinc-500 px-8 py-2 font-semibold
          rounded-lg hover:border-zinc-800 hover:bg-zinc-100
        hover:text-zinc-950 place-items-center'
          onClick={handelSubmit}
          >Add Task</button>
        </div>
      </form>
      </div>
      {/* <hr className='bg-zinc-800 rounded-xl border-0 h-0.5' /> */}

      {/* to show the notes */}
      {mainTask.length>0 ? 
      <div className='px-2 py-4 mt-8 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-6 gap-3'>
        {renderTask}
      </div>:
      <div className='px-2 py-4 mt-8 flex items-center justify-center'>
        {renderTask}
      </div>
      }

    </div>
  )
}

export default page