import jwt from "jsonwebtoken";

import dotenv from "dotenv";
dotenv.config();

export const env = {
    jwtSecret: process.env.JWT_SECRET || "default_secret",
}

export const generateToken = (payload: object) => jwt.sign(payload, env.jwtSecret, { expiresIn: "15m" });
export const verifyToken = (token: string) => jwt.verify(token, env.jwtSecret);
