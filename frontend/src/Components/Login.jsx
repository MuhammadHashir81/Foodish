// login is getting rendering on navbar component
import { useState } from 'react'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { RxCrossCircled } from "react-icons/rx";
import { MdOutlineMail } from "react-icons/md";
import { TbLockPassword } from "react-icons/tb";

const Login = ({ loginOpen, setLoginOpen }) => {

    const handleLoginClose = () => setLoginOpen(false);

    const loginStyle = {
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
            open={loginOpen}
            onClose={handleLoginClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={loginStyle} className=''>
                <div className='flex  '>

                    <h3 className='text-4xl  flex-1 font-bold font-gray-800 text-center font-primary'>Login</h3>
                    <RxCrossCircled size={30} onClick={handleLoginClose} className='cursor-pointer' />

                </div>
                <div className='flex flex-col gap-2 mt-5'>

                    <label htmlFor="email" className='  font-primary font-semibold'>Email</label>
                    <div className='flex items-center bg-gray-200 px-3 py-3 rounded-sm gap-3'>
                        <MdOutlineMail className=' '/>
                        <input type="email" placeholder='example@gmail.com' className='font-primary  outline-none px-1  rounded-sm w-full' id='email' />
                    </div>

                    <label htmlFor="password" className='font-primary font-semibold'>Password</label>

                    <div className='flex items-center bg-gray-200 px-3 py-3 rounded-sm gap-3'>
                        <TbLockPassword className=''/>
                    <input type="password" placeholder='********' className='font-primary   bg-gray-200 outline-none  rounded-sm' id='password' />
                    </div>
                    <button className='bg-teal-300 w-full py-2 rounded-md px-1 cursor-pointer hover:bg-teal-400 mt-5 font-primary font-semibold'>login</button>
                    <span className='text-center'>or</span>
                    <p className='text-center'>Don't have an account?<span  className='text-blue-500 underline cursor-pointer'>signup</span></p>
                </div>
            </Box>
        </Modal>
    )
}

export default Login