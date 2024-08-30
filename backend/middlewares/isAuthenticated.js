import { json } from "express";
import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        // Check if the token exists
        if (!token) {
            return res.status(401).json({
                message: "User not Authenticated",
                success: false
            });
        }

        // Verify the token
        const decode = await jwt.verify(token, process.env.SECRET_KEY);

        if (!decode) {
            return res.status(401).json({
                message: "Invalid Token",
                success: false
            });
        }

        // Attach the user ID to the request object
        req.id = decode.userId;

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        console.log(error);
        // Return an error response if something went wrong
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
}

export default isAuthenticated;
