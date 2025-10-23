import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import dotenv from "dotenv";
import { JWTPayload } from "../../domain/roles";

dotenv.config();

export const env = {
  jwtSecret: process.env.JWT_SECRET || "default_secret",
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET || "default_refresh_secret",
  accessTokenExpiresIn: process.env.JWT_EXPIRES_IN || "2h",
  refreshTokenExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d",
};

export const generateToken = (payload: JWTPayload) => {
  const accessToken = jwt.sign(payload, env.jwtSecret, { expiresIn: "2h" });

  const refreshToken = jwt.sign(payload, env.jwtRefreshSecret, { expiresIn: "7d" });

  return { accessToken, refreshToken };
};

export const verifyToken = (token: string): JWTPayload => {
  return jwt.verify(token, env.jwtSecret) as JWTPayload;
};

export const verifyRefreshToken = (token: string): JWTPayload => {
  return jwt.verify(token, env.jwtRefreshSecret) as JWTPayload;
};
