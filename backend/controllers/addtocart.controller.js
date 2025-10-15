import { AddToCart } from "../Models/AddToCart.Schema.js";
import { User } from "../Models/Auth.Schema.js";

export const addToCart = async (req, res) => {

    try {
        const { description, image, price, rating, quantity } = req.body;
        const userId = req.userId;

        // Validate user existence
        const findUser = await User.findById(userId)
        if (!findUser) {
            return res.status(401).json({ error: 'please log in first' });
        }
        // Create new cart item
        const newCartItem = await AddToCart.create({
            userId,
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
        console.log('hashir')
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
        console.log(cartItemId, quantity);
        
        const userId = req.userId;

        // Validate user existence
        const findUser = await User.findById(userId)

        if (!findUser) {
            return res.status(401).json({ error: 'please log in first' });
        }
        const cartItem = await AddToCart.findByIdAndUpdate(cartItemId, { quantity }, { new: true })
        res.status(200).json({ success: 'cart item updated', cartItem })
        console.log(cartItem)
        console.log('hashir')

        console.log('hashir')


    } catch (error) {
        res.status(500).json({ error: 'Server error', error: error.message });
        console.log("internal server error",error.message)

    }
}