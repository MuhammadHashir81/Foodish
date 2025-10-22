import React from 'react'
import { useSelector } from 'react-redux'
import { FaStar } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getCartItemsFunc } from "./slices/cartSlice"
import { BiPackage } from "react-icons/bi";
import { IoBagCheckOutline } from "react-icons/io5";


const Cart = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getCartItemsFunc())



    }, [])

    const { cartItems } = useSelector((state) => state.cart)

    const subtotal = cartItems.reduce((sum,item)=> {
        return sum + (item.price * item.quantity )
    },0)

    console.log(subtotal)
    console.log(cartItems)


    return (

        <div className='px-10 flex '>

            <div className="  w-[70%] h-fit my-10 ">

                <h1 className='text-5xl font-bold font-primary'>Food Cart</h1>


                {/* Image */}

                {

                    cartItems.map((item) => (
                        <>
                            <div className=" w-[65%] h-fit  flex justify-center mt-10 bg-white shadow-md rounded-md">

                                <div className='relative'>

                                    <img
                                        src={item.image}
                                        alt={name}
                                        className="w-[500px] h-full object-cover rounded-md"
                                    />
                                    <span className="absolute top-2 right-2 bg-teal-500 text-white text-sm px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                                        <FaStar /> <span className='font-primary '>  {item.rating}</span>
                                    </span>

                                </div>

                                {/* Content */}
                                <div className="p-5">
                                    <p className="text-gray-600  mt-2 font-primary  font-semibold text-lg">{item.description}</p>

                                    <div className="my-4">
                                        <div className='flex items-center gap-1'>
                                            <h6 className='text-gray-800 font-semibold text-lg'>subtotal:</h6>
                                            <p className="text-lg font-bold text-teal-600 ">  ${item.price}</p>
                                        </div>

                                        <h5 className='font-semibold font-primary text-lg text-gray-800'>Quantity : {item.quantity}</h5>
                                    </div>
                                </div>
                            </div>


                        </>
                    ))
                }


                {/* checkout session */}



            </div>
                {/* order summary */}
            <div className='my-10 sticky top-4 shadow-sm bg-white px-10 h-fit py-5 rounded-md'>
                <div className='flex items-center gap-3'>
                    <BiPackage/>    
                    <h3 className='text-3xl font-bold text-gray-800'>Order Summary</h3>
                </div>



                <div className='   py-2 my-4 '>
                    <div className=''>

                       <div className='flex justify-between'>

                    <h3 className='text-lg font-semibold font-primary font-gray-800'>subtotal  </h3>
                    <h3>${subtotal}</h3>
                       </div>
                    <hr className='text-gray-300 my-3'/>

                    <div className='flex flex-col gap-3 mt-7'>

                    <button className=' flex items-center justify-center gap-2 font-semibold text-gray-800 cursor-pointer rounded-md text-md  bg-teal-300 w-full py-2 '> <IoBagCheckOutline />  checkout</button>
                    <button className='font-semibold text-md text-gray-800 cursor-pointer rounded-md  w-full outline-1 outline-gray-400 py-2'>continue to shopping </button>
                    </div>

                    

                    </div>



                </div>
            </div>
        </div>
    )
}

export default Cart


