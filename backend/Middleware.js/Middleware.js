import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const token = req.cookies.userJWT; // Assuming token is sent in the Authorization header
    if (!token) {
        return res.status(401).json({ message: "Access denied please login first" });
    }
    try {
        const data =  jwt.verify(token, process.env.JWT_SECRET_KEY); 
        req.userId = data.id; // Attach user data to request object
        next()
        
    } catch (error) {
        res.status(400).json({ error: error.message });
        console.log(error.message)
        
    }

   
}
