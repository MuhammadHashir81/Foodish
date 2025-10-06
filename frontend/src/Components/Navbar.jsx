import React from 'react'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { RxCrossCircled } from "react-icons/rx";



const Navbar = () => {

   
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 450,
    minHeight: 400,
    bgcolor: 'background.paper',
    p: 4,
    borderRadius: 2,
  };


  return (
    <nav className='px-10 flex justify-between items-center shadow-md h-24'>
      <h1 className='text-4xl font-semibold text-gray-800  mt-5 cursor-pointer'> Foodish</h1>
      <div className='flex gap-5'>
        <button  className='font-primary  rounded-md px-8 py-1 border-1 cursor-pointer'>login</button>
        <button onClick={handleOpen}   className='bg-teal-300 rounded-md px-8 font-primary py-1 cursor-pointer hover:bg-teal-400  '>signup for free delivery</button>
      </div>
      <div>
        <p className='font-semibold font-secondary'>Get free home delivery</p>
      </div>

      {/* start of modal */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className=''>
          <div className='flex  '>

          <h3 className='text-4xl  flex-1 font-bold font-gray-800 text-center font-primary'>Signup</h3>
          <RxCrossCircled size={30} onClick={handleClose} className='cursor-pointer'/>

          </div>
          <div className='flex flex-col gap-2 mt-5'>

          <label htmlFor="name" className='font-primary font-semibold'>Name</label>
          <input type="text"  className=' font-primary bg-gray-200 outline-none px-2 py-1 rounded-sm' id='name' placeholder='John Doe'/>
          <label htmlFor="email" className= '  font-primary font-semibold'>Email</label>
          <input type="email" placeholder='example@gmail.com'  className='font-primary bg-gray-200 outline-none px-2 py-1 rounded-sm' id='email'/>
          <label htmlFor="password" className='font-primary font-semibold'>Password</label>
          <input type="password" placeholder='********'  className='font-primary   bg-gray-200 outline-none px-2 py-1 rounded-sm' id='password'/>
          <button className='bg-teal-300 w-full py-2 rounded-md px-1 cursor-pointer hover:bg-teal-400 mt-5 font-primary font-semibold'>signup</button>
          <span className='text-center'>or</span>
          <p className='text-center'>Don't have an account?<span className='text-blue-500 underline cursor-pointer'>login </span></p>
          </div>
        </Box>
      </Modal>
      {/* end of modal */}

    </nav>
  )
}

export default Navbar


















