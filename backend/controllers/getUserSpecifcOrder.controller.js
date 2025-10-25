import { PostPayment } from "../Models/PostPayment.Schema.js"
export const getUserSpecificOrders = async (req,res) => {
    const id = req.userId
    try {
        const getOrders = await PostPayment.find({userId:id})
        console.log(getOrders)
        res.status(200).json({success:getOrders})
        
    } catch (error) {
        console.log(error)
    }

}