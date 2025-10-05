import React from 'react'
import { Button } from 'primereact/button';

const Navbar = () => {
  return (
    <nav className='px-10 flex justify-between items-center shadow-md h-24'>
       <h1 className='text-4xl font-semibold text-gray-800  mt-5 cursor-pointer'> Foodish</h1>
       <div className='flex gap-5'>
       <button className='font-primary  rounded-md px-8 py-1 border-1 cursor-pointer'>login</button>
       <button className='bg-teal-300 rounded-md px-8 font-primary py-1 cursor-pointer hover:bg-teal-400  '>signup for free delivery</button>
       </div>
       <div>
        <p className='font-semibold font-secondary'>Get free home delivery</p>
       </div>

    </nav>
  )
}

export default Navbar