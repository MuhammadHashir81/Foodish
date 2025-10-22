import { AddToCart } from "../Models/AddToCart.Schema.js";
import { User } from "../Models/Auth.Schema.js";

export const addToCart = async (req, res) => {

    try {
        const { description, image, price, rating, quantity, foodItemId } = req.body;
        console.log("foodItemId", foodItemId, "rating", rating)
        const userId = req.userId;

        // Validate user existence
        const findUser = await User.findById(userId)
        if (!findUser) {
            return res.status(401).json({ error: 'please log in first' });
        }
        // Create new cart item
        const newCartItem = await AddToCart.create({
            userId,
            foodItemId,
            description,
            image,
            price,
            rating,
            quantity
        });
        res.status(201).json({ success: 'Item added to cart', cartItem: newCartItem });


    } catch (error) {

        res.status(500).json({ error: 'Server error', error: error.message });
        console.log(error.message)
    }
}


// get cart items for a user
export const getCartItems = async (req, res) => {
    try {
        const userId = req.userId;
        const cartItems = await AddToCart.find({ userId })
        res.status(200).json({ cartItems })
    } catch (error) {
        res.status(500).json({ error: 'Server error', error: error });
        console.log(error)

    }

}



// update item quantity


export const updateCartItemQuantity = async (req, res) => {
    try {
        const { cartItemId, quantity } = req.body;
        console.log("this is quantity", cartItemId, quantity);

        const userId = req.userId;

        // Validate user existence
        const findUser = await User.findById(userId)

        if (!findUser) {
            return res.status(401).json({ error: 'please log in first' });
        }
        const itemQuantity = await AddToCart.findOneAndUpdate(
            { foodItemId: cartItemId, userId },  // Search by foodItemId AND userId for security
            { quantity },
            { new: true }
        )
        res.status(200).json({ success: 'cart item updated', itemQuantity })
        console.log("this is result", itemQuantity)

        console.log('hashir')


    } catch (error) {
        res.status(500).json({ error: 'Server error', error: error.message });
        console.log("internal server error", error.message)

    }
}