import React from 'react'
import { FaArrowRight } from "react-icons/fa6";

const Hero = () => {


  return (
    <div className='px-10 bg-teal-100 flex flex-col items-center justify-center h-[150px]'>
      <div className='flex  items-center justify-around w-1/2'>
        <div className='text-center'>

          <h2 className='text-3xl font-bold font-primary text-gray-800'>Free delivery </h2>
          <h2 className='text-3xl font-bold font-primary text-teal-500'>on your first order</h2>
        </div>
        <div>
          <button className='bg-teal-300 w-[120px] py-2 rounded-md px-1 cursor-pointer hover:bg-teal-400'>
            <span className='flex items-center justify-around '> view deals  <FaArrowRight /></span></button>
        </div>
      </div>
          <div>

    </div>
    </div>
  )
}

export default Hero