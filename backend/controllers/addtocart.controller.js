import { AddToCart } from "../Models/AddToCart.Schema.js";
import { User } from "../Models/Auth.Schema.js";


// adding items to cart
export const addToCart = async (req, res) => {

    try {
        const { description, image, price, rating, quantity, foodItemId } = req.body;
        const userId = req.userId;

        // Validate user existence
        const findUser = await User.findById(userId)
        if (!findUser) {
            return res.status(401).json({ error: 'please log in first' });
        }

        const findExistingCatItem = await AddToCart.findOne({userId,foodItemId})
        console.log(findExistingCatItem)

        if(findExistingCatItem){
             return res.status(400).json({error : 'product already in the cart'})
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



// deleting items from carts



export const deleteCartItems = async (req,res) => {
     const { id } = req.body

    try {
     const deleteItem = await AddToCart.findOneAndDelete(id)

     res.status(200).json({success:'cart item deleted successfuly', id:deleteItem._id})   

    } catch (error) {
        res.status(400).json({error:'internal server error'})
    }


}



// clear cart 

// Clear all cart items for a user
export const clearCart = async (req, res) => {
    try {
        const userId = req.userId;
        
        // Delete all cart items for this user
        await AddToCart.deleteMany({ userId });
        
        res.status(200).json({ success: 'Cart cleared successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error', message: error.message });
        console.log(error.message);
    }
}