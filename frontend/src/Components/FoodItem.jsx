import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { increment } from "./slices/cartSlice";
import { useSelector } from "react-redux";
import { addToCartFunc } from "./slices/cartSlice";
import { getCartItemsFunc } from "./slices/cartSlice";
import { updateCartItemQuantityFunc } from "./slices/cartSlice";
import { set } from "mongoose";
const FoodItem = ({ allfoods }) => {
  const [isAddToCart, setIsAddToCart] = useState(true)
  const [itemQuantity, setSingleItemQuantity] = useState(1);
  const { cartItems } = useSelector(state => state.getCartItems);
  console.log(cartItems)
  // Find if this item is in cart
  const cartItem = cartItems.find(item => item.description === allfoods.description);
  const isInCart = !!cartItem;
  const currentQuantity = cartItem ? cartItem.quantity : 1;

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

  const handleIncrement = () => {
    const newQuantity = currentQuantity + 1;
    dispatch(updateCartItemQuantityFunc({
      cartItemId: cartItem._id,
      quantity: newQuantity
    }));
    dispatch(getCartItemsFunc());
  }

  const handleDecrement = () => {
    if (itemQuantity > 1) {
      const newQuantity = currentQuantity - 1;
      dispatch(updateCartItemQuantityFunc({
        cartItemId: cartItem._id,
        quantity: newQuantity
      }));
      dispatch(getCartItemsFunc());
    }
  }
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
                    onClick={() => handleDecrement(allfoods._id, itemQuantity)}
                    className={`cursor-pointer `}
                  />

                  <span className="">{itemQuantity}</span>

                  <FaPlus
                    onClick={() => handleIncrement(allfoods._id, itemQuantity)}

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









