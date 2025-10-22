import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { JWTPayload } from "../../domain/types/roles";

dotenv.config();

export const env = {
    jwtSecret: process.env.JWT_SECRET || "default_secret",
}

export const generateToken = (payload: JWTPayload) => jwt.sign(payload, env.jwtSecret, { expiresIn: "15m" });
export const verifyToken = (token: string): JWTPayload => jwt.verify(token, env.jwtSecret) as JWTPayload;
