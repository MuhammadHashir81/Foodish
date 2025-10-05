import React from 'react'

const Foodish = () => {
  return (
    <div className='px-10 bg-teal-100 flex flex-col items-center justify-center h-[150px]'>
        <div className='flex  items-center justify-around w-1/2'> 
        <div className='text-center'>

        <h2 className='text-3xl font-bold font-primary text-gray-800'>Free delivery </h2>
        <h2 className='text-3xl font-bold font-primary text-teal-500'>on your first order</h2>
        </div>
        <div>
            <button className='bg-teal-300 px-4 py-2 rounded-md'>view deals</button>
        </div>
        </div>
        </div>
  )
}

export default Foodish