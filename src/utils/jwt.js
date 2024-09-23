import jwt from "jsonwebtoken";
import { config } from "../config/config.js";

const { JWT_SECRET } = config;

/* const PRIVATE_KEY = "s3cr3t"; */

export function generateToken(user){
    const payload ={
        email: user.email,
        role: user.role,
    };
    
    return jwt.sign(payload, JWT_SECRET, {
        expiresIn: "5m",
    })
}

export function verifyToken(token) {
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        
        return decoded;
    } catch (error) {
    throw new Error("token no valido");
    }
}