import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useEffect, useState } from 'react';
import { RxCrossCircled } from "react-icons/rx";
import Login from './Login';
import Signup from './Signup';
import { FaCartArrowDown } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from './slices/authSlice';
import { FaAngleDown } from "react-icons/fa6";
import { FaRegUser } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import { FaRegCircleQuestion } from "react-icons/fa6";
import { getCartItemsFunc } from './slices/cartSlice';




const Navbar = () => {
  const userName = localStorage.getItem('userName')
  const dispatch = useDispatch()
  const {cartItems} = useSelector((state) => state.cart)
  console.log(cartItems.length)


  useEffect(() => {
    dispatch(getCartItemsFunc())
  }, [])
  



  const [open, setOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);


    

  const [isDropDown, setIsDropDown] = useState(false)



  // const [modalBoolean, setModalBoolean] = useState(true);



  //login modal functions

  const handleLoginOpen = () => {
    setLoginOpen(true);
  }


  // signup modal functions
  const handleOpen = () => {
    setOpen(true);
  };

  const handleLogout = () => {
    dispatch(logout())
  }

  // handleDropDown

  const handleDropDown = () => {
    setIsDropDown(!isDropDown)
  }

  return (
    <nav className='px-10  flex justify-between items-center shadow-md h-24'>
      <NavLink to='/'>
        <h1 className='text-4xl font-semibold text-gray-800  mt-5 cursor-pointer'> Foodish</h1>
      </NavLink>
      <div className='flex gap-5'>
        <div className='bg-red-500 gap-3 self-end'>

        </div>
        <div className={`flex gap-5 items-center ${userName ? 'hidden' : 'block'}`} >
          <button onClick={handleLoginOpen} className='font-primary  rounded-md px-8 py-1 border-1 cursor-pointer'>login</button>
          <button onClick={handleOpen} className='bg-teal-300 rounded-md px-8 font-primary py-1 cursor-pointer hover:bg-teal-400  '>signup for free delivery</button>
        </div>





      </div>
      <div className='flex items-center gap-4' >
        <div className={`relative ${userName ? 'block' : 'hidden'}`}>

          <div onClick={handleDropDown} className='flex items-center cursor-pointer gap-2 transition-all duration-300 ease-in-out  ' >
            <FaRegUser />
            <h5 className='font-primary text-xl'>{userName}</h5>
            <FaAngleDown />
          </div>

          <div
            className={` ${isDropDown ? 'block' : 'hidden'} absolute top-8 right-0 bg-white shadow-md flex flex-col gap-2 p-3 rounded-md font-primary text-gray-800   w-40  transition-all duration-300 ease-in-out`}>
            <NavLink to='/profile'> <span className='flex items-center gap-2'> <FaRegUser /> <p> profile </p></span></NavLink>
            <NavLink to='/help-center'> <span className='flex items-center gap-2 '> <FaRegCircleQuestion />  <p> help center </p></span></NavLink>
            <NavLink onClick={handleLogout}> <span className='flex items-center gap-2'> <IoIosLogOut /> <p> logout</p></span></NavLink>
          </div>
        </div>

          <NavLink to='/cart'>

            <div  className='bg-teal-100 flex px-4 py-1 gap-1 rounded-full cursor-pointer'>
              <span>{cartItems.length}</span>
              <FaCartArrowDown size={20} />
            </div>
          </NavLink>

      </div>


      <Login loginOpen={loginOpen} setLoginOpen={setLoginOpen} />

      <Signup open={open} setOpen={setOpen} setLoginOpen={setLoginOpen} />

    </nav>
  )
}

export default Navbar





