import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { addToCartFunc } from "./slices/cartSlice";
import { getCartItemsFunc, quantityUpdate } from "./slices/cartSlice";
import AllFood from "./AllFood";
const FoodItem = ({ allfoods }) => {
  const [isAddToCart, setIsAddToCart] = useState(true)
  const [singleItemQuantity, setSingleItemQuantity] = useState(1)

  const dispatch = useDispatch()



  const handleAddToCart = async () => {
    setIsAddToCart(false)
    console.log("this is id of food", allfoods._id)

    await dispatch(addToCartFunc({ description: allfoods.description, image: allfoods.image, price: allfoods.price, rating: allfoods.rating, quantity: singleItemQuantity, foodItemId: allfoods._id }))
    dispatch(getCartItemsFunc())

  }



  // handle increment quantity
  const handleIncrementQuantity = (id) => {
    console.log(id)
    setSingleItemQuantity(singleItemQuantity + 1)
    dispatch(quantityUpdate({ cartItemId: id, quantity: singleItemQuantity }))

  }

  // handle increment quantity
  const handleDecrementQuantity = (id) => {
    setSingleItemQuantity(singleItemQuantity - 1)
    dispatch(quantityUpdate({ cartItemId: id, quantity: singleItemQuantity }))

  }


  return (
    <div className="max-w-sm bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden mt-10">
      {/* Image */}
      <div className="relative w-full max-h-fit">
        <img
          src={allfoods.image}
          alt={name}
          className="w-full  object-cover h-[200px]"
        />
        <span className="absolute top-2 right-2 bg-teal-500 text-white text-sm px-3 py-1 rounded-full shadow-md flex items-center gap-1">
          <FaStar /> {allfoods.rating}
        </span>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-gray-800 font-bold text-lg mb-2 line-clamp-2 min-h-[3.5rem]">
          {allfoods.description}
        </h3>

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
                    onClick={() => singleItemQuantity > 1 && handleDecrementQuantity(allfoods._id)}
                    className={`${singleItemQuantity > 1
                        ? 'cursor-pointer text-gray-700'
                        : 'cursor-not-allowed text-gray-400 opacity-50'
                      }`}
                  />

                  <span className="">{singleItemQuantity}</span>

                  <FaPlus
                    onClick={() => handleIncrementQuantity(allfoods._id)}
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







