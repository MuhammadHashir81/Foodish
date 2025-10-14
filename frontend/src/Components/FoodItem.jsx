import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { increment } from "./slices/cartSlice";
import { useSelector } from "react-redux";
import { addToCartFunc } from "./slices/cartSlice";
import { getCartItemsFunc } from "./slices/cartSlice";
const FoodItem = ({ allfoods }) => {
  const [isAddToCart, setIsAddToCart] = useState(true)
  const [singleItemQuantity, setSingleItemQuantity] = useState(0)
  const dispatch = useDispatch()



useEffect(() => {
  dispatch(getCartItemsFunc())
  
}, [])


  const handleAddToCart = (allFoods) => {
    dispatch(increment())
    setIsAddToCart(false)
    dispatch(addToCartFunc(allFoods))
    dispatch(getCartItemsFunc())

  }

  // handle increment function

  return (
    <div className="max-w-sm bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden mt-10">
      {/* Image */}
      <div className="relative w-full h-56">
        <img
          src={allfoods.image}
          alt={name}
          className="w-full h-full object-cover "
        />
        <span className="absolute top-2 right-2 bg-teal-500 text-white text-sm px-3 py-1 rounded-full shadow-md flex items-center gap-1">
          <FaStar /> {allfoods.rating}
        </span>
      </div>

      {/* Content */}
      <div className="p-5">
        <p className="text-gray-600  mt-2 font-primary font-semibold">{allfoods.description}</p>

        <div className="flex justify-between items-center mt-4">
          <p className="text-lg font-bold text-teal-600">${allfoods.price}</p>
          {
            isAddToCart ?
              (


                <button onClick={() => handleAddToCart(allfoods)} className="bg-teal-500 text-white px-4 py-2 rounded-full hover:bg-teal-600 transition-all duration-200">
                  add to cart
                </button>
              ) : (
                <div className="bg-teal-300 flex items-center gap-5 rounded-full px-3 py-1">

                  <FaMinus
                    className={`cursor-pointer `}
                  />

                  <span className="">1</span>

                  <FaPlus
                    className="cursor-pointer text-gray-700"
                  />

                </div>

              )
          }

        </div>
      </div>
    </div>
  );
};

export default FoodItem;










