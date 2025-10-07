import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import { RxCrossCircled } from "react-icons/rx";
import Login from './Login';
import Signup from './Signup';

const Navbar = () => {


  const [open, setOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);




  //login modal functions

  const handleLoginOpen = () => setLoginOpen(true);


  // signup modal functions
  const handleOpen = () => setOpen(true);
 

  return (
    <nav className='px-10 flex justify-between items-center shadow-md h-24'>
      <h1 className='text-4xl font-semibold text-gray-800  mt-5 cursor-pointer'> Foodish</h1>
      <div className='flex gap-5'>

        <button onClick={handleLoginOpen} className='font-primary  rounded-md px-8 py-1 border-1 cursor-pointer'>login</button>
        <button onClick={handleOpen} className='bg-teal-300 rounded-md px-8 font-primary py-1 cursor-pointer hover:bg-teal-400  '>signup for free delivery</button>
      </div>
      <div>
        <p className='font-semibold font-secondary'>Get free home delivery</p>
      </div>


      <Login loginOpen={loginOpen} setLoginOpen={setLoginOpen} />
      
      <Signup open={open} setOpen={setOpen}/>


    </nav>
  )
}

export default Navbar


















