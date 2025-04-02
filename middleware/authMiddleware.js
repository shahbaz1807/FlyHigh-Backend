import jwt from "jsonwebtoken";
import profileModel from "../models/profileModel.js";
import dotenv from "dotenv";

dotenv.config()

const SECRET_KEY = process.env.SECRET_KEY

const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    try {
        console.log(SECRET_KEY);
        console.log("Verifying Token...");
        const decoded = jwt.verify(token, SECRET_KEY);
        console.log("Decoded Token:", decoded);
        
        // ✅ Check if user exists in DB
        const user = await profileModel.findOne({ email: decoded.email });

        if (!user) {
            return res.status(403).json({ message: "Access denied!" });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
};

export default authMiddleware;
