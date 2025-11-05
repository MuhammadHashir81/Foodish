// login is getting rendering on navbar component
import { useState } from 'react'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { RxCrossCircled } from "react-icons/rx";
import { MdOutlineMail, MdPassword } from "react-icons/md";
import { TbLockPassword } from "react-icons/tb";
import { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, loginWithGoogle } from './slices/authSlice';
import { useNavigate } from 'react-router-dom'
import { ProgressSpinner } from 'primereact/progressspinner';
import { GoogleLogin } from '@react-oauth/google';




const Login = ({ loginOpen, setLoginOpen }) => {
    const { isLoading } = useSelector((state) => state.login)
    const navigate = useNavigate()
    const [loginCredentials, setLoginCredentials] = useState({
        email: '',
        password: ''
    })

    const handleLoginClose = () => setLoginOpen(false);
    const dispatch = useDispatch()

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


    // handle google login 

    
    const handleGoogleLogin = (credentialResponse)=>{
        console.log(credentialResponse)
        const token = credentialResponse.credential
        dispatch(loginWithGoogle({token}))
        
    }


    // handle login 

    const handleValueChange = (e) => {
        const { name, value } = e.target
        setLoginCredentials((prev) => ({
            ...prev,
            [name]: value
        }))
    }


    // hadle sumbit 

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(loginUser(loginCredentials))

    }
    return (
        <>
            <Toaster />
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
                    <form onSubmit={handleSubmit} className='flex flex-col gap-2 mt-5'>

                        <label htmlFor="email" className='  font-primary font-semibold'>Email</label>
                        <div className='flex items-center bg-gray-200 px-3 py-3 rounded-sm gap-3'>
                            <MdOutlineMail className=' ' />
                            <input
                                type="email"
                                placeholder='example@gmail.com'
                                className='font-primary  outline-none px-1  rounded-sm w-full' id='email'
                                name='email'
                                value={loginCredentials.email}
                                onChange={handleValueChange}
                            />
                        </div>

                        <label htmlFor="password" className='font-primary font-semibold'>Password</label>

                        <div className='flex items-center bg-gray-200 px-3 py-3 rounded-sm gap-3'>
                            <TbLockPassword className='' />
                            <input
                                type="password"
                                placeholder='********'
                                className='font-primary   bg-gray-200 outline-none  rounded-sm' id='password'
                                name='password'
                                value={loginCredentials.password}
                                onChange={handleValueChange}
                            />
                        </div>

                        <button
                            disabled={isLoading}
                            className="bg-teal-300 w-full py-3 rounded-md px-1 cursor-pointer hover:bg-teal-400 mt-5 font-primary font-semibold relative flex justify-center"
                        >
                            <span className=" flex itemsc-center w-fit gap-2">
                                login
                                {isLoading ? (
                                    <ProgressSpinner
                                        style={{ width: '20px', height: '20px' }}
                                        strokeWidth="8"
                                        animationDuration=".5s"
                                    />
                                ) : null}
                            </span>
                        </button>
                        <GoogleLogin
                            onSuccess={handleGoogleLogin}
                            onError={() => {
                                console.log('Login Failed');
                            }}
                        />
                                

                        <span className='text-center'>or</span>
                        <p className='text-center'>Don't have an account?<span className='text-blue-500 underline cursor-pointer'>signup</span></p>
                    </form>
                </Box>
            </Modal>
        </>
    )
}

export default Login