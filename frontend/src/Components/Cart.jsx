import React from 'react'
import { useSelector } from 'react-redux'
import { FaStar } from "react-icons/fa";

const Cart = () => {
    const cartItems = useSelector((state) => state.cartItems.addToCartItems)
    console.log(cartItems)
    return (
        <div className="max-w-sm  rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden mt-10  bg-white mx-10">


            {/* Image */}

            {
                cartItems.map((item) => (
                    <>
                        <div className="relative w-full h-56">
                            <img
                                src={item.image}
                                alt={name}
                                className="w-full h-full object-cover "
                            />
                            <span className="absolute top-2 right-2 bg-teal-500 text-white text-sm px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                                <FaStar /> {item.rating}
                            </span>
                        </div>

                        {/* Content */}
                        <div className="p-5">
                            <p className="text-gray-600  mt-2 font-primary font-semibold">{item.description}</p>

                            <div className="flex justify-between items-center mt-4">
                                <p className="text-lg font-bold text-teal-600">${item.price}</p>
                                <h5>Quantity : {item.quantity}</h5>
                            </div>
                        </div>

                    </>
                ))
            }

        </div>
    )
}

export default Cart