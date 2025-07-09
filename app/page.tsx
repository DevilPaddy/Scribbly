"use client"

import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import Typewriter from 'typewriter-effect'
import { LuNotebookPen, LuListTodo, LuTabletSmartphone, LuMonitorSmartphone} from "react-icons/lu";
import { BsRobot } from "react-icons/bs";
import { MdOutlineDarkMode  } from "react-icons/md";

export default function landingPage() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  })

  return (
    <div>
      {/* navbar */}
      <div className="nav-bar px-2 md:px-6 py-4 flex justify-between items-center mb-8">
        <div className="md:p-1">
          <h1 className="text-2xl md:text-3xl font-[600] intel-tight">
            <span className="text-[#91ff00]">Scri</span>bbly
          </h1>
        </div>

        <div className="md:p-1 cursor-pointer">
          <a href='https://www.anujbelsare.tech/about' className="md:px-4 md:py-2 px-3 py-1.5 text-[#ffffff] text-sm md:font-medium md:text-xl
          md:border-2 border-[1.6px] rounded-full border-[#363f49] hover:bg-zinc-700">Contact Us</a>
        </div>
      </div>

      {/* hero section */}
      <div className="mt-20 w-full p-4 flex justify-center items-center md:text-pretty sm:text-balance">
        <div className="max-w-[75%]">
          <h2 className="text-6xl md:text-8xl font-extrabold text-[#ffffff] inter-tight tracking-tight">
            <span className="text-[#91ff00]">Scribbly</span>, your Smart Notebook & Task Buddy
          </h2>
        </div>
      </div>

      {/* hero section buttons */}
      <div className="flex gap-4 items-center justify-center mt-18">
        <div className='cursor-pointer'>
          <a href='/signup' className="md:px-14 md:py-4 px-8 py-3 text-black
          text-lg font-semibold md:text-2xl border-2 rounded-full
          border-[#91ff00ca] bg-[#91ff00] hover:bg-[#e2ffbe] hover:border-[#e2ffbe]">Signup</a>
        </div>

        <div className='cursor-pointer'>
          <a href='/login' className="md:px-14 md:py-4 px-8 py-3 text-[#91ff00]
          text-lg font-semibold md:text-2xl border-2 rounded-full
          border-[#91ff00] hover:bg-[#231f1f]">Login</a>
        </div>
      </div>

      {/* animated heading section */}
      <div className="w-full mt-26 min-h-[100px]">
        <div ref={ref} className="flex justify-center">
          {inView && (
            <motion.h3
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="text-4xl md:text-6xl font-[500] text-center"
            >
              <Typewriter
                options={{
                  delay: 45,
                  cursor: '|',
                }}
                onInit={(typewriter) => {
                  typewriter
                    .typeString("Scribbly comes loaded with powerful features")
                    .start()
                }}
              />
            </motion.h3>
          )}
        </div>
      </div>

      {/* features.. */}
      <div className='w-full grid grid-cols-1 md:grid-cols-3 p-12 gap-4 md:gap-12'>
        
        <div className='card px-4 py-4 border-2 border-[#363f49]
          min-h-68 rounded-2xl hover:scale-105 hover:transition-transform'>
          <div className='rounded-full p-2 flex justify-center items-center'>
            <LuNotebookPen size={80} className='stroke-1 text-[#91ff00]'/></div>
          <h4 className='text-3xl font-medium mt-3'>Rich Text Notes</h4>
          <p className='text-lg md:font-medium mt-3 text-zinc-400'>Format your thoughts with bold, italics, lists & more perfect for class notes, quick ideas, or journaling.</p>
        </div>

        <div className='card px-4 py-4 border-2 border-[#363f49]
          min-h-68 rounded-2xl hover:scale-105 hover:transition-transform'>
          <div className='rounded-full p-2 flex justify-center items-center'>
            <LuListTodo size={80} className='stroke-1 text-[#91ff00]'/></div>
          <h4 className='text-3xl font-medium mt-3'>Smart To-Do Lists</h4>
          <p className='text-lg md:font-medium mt-3 text-zinc-400'>Create, organize, and check off your tasks with a clean, clutter-free interface.</p>
        </div>

        <div className='card px-4 py-4 border-2 border-[#363f49]
          min-h-68 rounded-2xl hover:scale-105 hover:transition-transform'>
          <div className='rounded-full p-2 flex justify-center items-center'>
            <LuMonitorSmartphone  size={80} className='stroke-1 text-[#91ff00]'/></div>
          <h4 className='text-3xl font-medium mt-3'>Responsive Design</h4>
          <p className='text-lg md:font-medium mt-3 text-zinc-400'>Scribbly works flawlessly across mobile, tablet, and desktop — stay productive anywhere.</p>
        </div>

        <div className='card px-4 py-4 border-2 border-[#363f49]
          min-h-68 rounded-2xl hover:scale-105 hover:transition-transform'>
          <div className='rounded-full p-2 flex justify-center items-center'>
            <LuTabletSmartphone  size={80} className='stroke-1 text-[#91ff00]'/></div>
          <h4 className='text-3xl font-medium mt-3'>Minimal & Clean UI</h4>
          <p className='text-lg md:font-medium mt-3 text-zinc-400'>Focus on what matters most with a distraction-free, modern layout.</p>
        </div>

        <div className='card px-4 py-4 border-2 border-[#363f49]
          min-h-68 rounded-2xl hover:scale-105 hover:transition-transform'>
          <div className='rounded-full p-2 flex justify-center items-center'>
            <MdOutlineDarkMode  size={80} className='stroke-0 text-[#91ff00]'/></div>
          <h4 className='text-3xl font-medium mt-3'>Dark Mode Ready</h4>
          <p className='text-lg md:font-medium mt-3 text-zinc-400'>Reduce eye strain and match your vibe with beautiful dark theme support.</p>
        </div>

        <div className='card px-4 py-4 border-2 border-[#363f49]
          min-h-68 rounded-2xl hover:scale-105 hover:transition-transform'>
          <div className='rounded-full p-2 flex justify-center items-center'>
            <BsRobot  size={80} className='stroke-0 text-[#91ff00]'/></div>
          <h4 className='text-3xl font-medium mt-3'>AI Summarizer (Upcoming)</h4>
          <p className='text-lg md:font-medium mt-3 text-zinc-400'>Let Scribbly summarize long notes into short bullets using smart AI.</p>
        </div>
      </div>

      {/* footer */}
      <div className='w-full bg-[#181c22] px-8 py-2'>
        <h1 className="text-2xl md:text-3xl font-[600] intel-tight">
            <span className="text-[#91ff00]">Scri</span>bbly
        </h1>
        <p className='text-sm md:text-lg  text-zinc-300'>Fast. Minimal. Beautifully yours.</p>
        <div className='flex items-center justify-center mt-2'>
          <p className='text-zinc-500 text-lg md:text-xl font-medium'>Made with 💖 by <a href="https://www.anujbelsare.tech/about">Anuj</a></p>
        </div>
      </div>
    </div>
  )
}
