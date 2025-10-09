// signup is getting rendering on navbar component

import React from 'react'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { RxCrossCircled } from "react-icons/rx";
import { CiUser } from "react-icons/ci";
import { TbLockPassword } from "react-icons/tb";
import { MdOutlineMail } from "react-icons/md";

const Signup = ({ open, setOpen }) => {

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
        

           
           <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style} className=''>
                <div className='flex  '>

                    <h3 className='text-4xl  flex-1 font-bold font-gray-800 text-center font-primary'>Signup</h3>
                    <RxCrossCircled size={30} onClick={handleClose} className='cursor-pointer' />

                </div>
                <div className='flex flex-col gap-2 mt-5'>

                    <label htmlFor="name" className='font-primary font-semibold'>Name</label>

                    <div className='flex items-center bg-gray-200 px-3 py-3 rounded-sm gap-3'>
                    <CiUser />

                        <input type="text" className=' font-primary bg-gray-200 outline-none  rounded-sm w-full' id='name' placeholder='John Doe' />
                    </div>

                    <label htmlFor="email" className='  font-primary font-semibold'>Email</label>
                    <div className='flex items-center bg-gray-200 px-3 py-3 rounded-sm gap-3'>
                    <MdOutlineMail className=' ' />
                    
                    <input type="email" placeholder='example@gmail.com' className='font-primary bg-gray-200 outline-none  rounded-sm w-full' id='email' />
                    </div>
                    <label htmlFor="password" className='font-primary font-semibold'>Password</label>
                    <div className='flex items-center bg-gray-200 px-3 py-3 rounded-sm gap-3'>
                    <TbLockPassword className='' />
                    
                    <input type="password" placeholder='********' className='font-primary   bg-gray-200 outline-none  rounded-sm w-full' id='password' />
                    </div>
                    <button className='bg-teal-300 w-full py-2 rounded-md px-1 cursor-pointer hover:bg-teal-400 mt-5 font-primary font-semibold'>signup</button>
                    <span className='text-center'>or</span>
                    <p className='text-center'>Don't have an account?<span className='text-blue-500 underline cursor-pointer' >login</span></p>
                    </div>
                    </Box>
                    </Modal>
    )
}

export default Signup