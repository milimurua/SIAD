import { Request, Response } from "express";
import { AuthService } from "../../application/auth/AuthService";
import { generateToken, verifyRefreshToken } from "../../infrastructure/security/jwt";

const authService = new AuthService();

// Registro 
export const register = async (req: Request, res: Response) => {
  try {
    const result = await authService.register(req.body);
    res.status(201).json(result);
  } catch (e: any) {
    res.status(400).json({ message: e.message });
  }
};

// Login 
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const result = await authService.login(email, password);
    res.json(result);
  } catch (e: any) {
    res.status(401).json({ message: e.message });
  }
};

// Refresh token 
export const refreshToken = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(400).json({ message: "Refresh token required" });
    }

    const decoded = verifyRefreshToken(refreshToken);

    const { accessToken, refreshToken: newRefreshToken } = generateToken({
      id: decoded.id,
      email: decoded.email,
      type: decoded.type,
    });

    res.status(200).json({
      message: "Token successfully renewed",
      accessToken,
      refreshToken: newRefreshToken,
    });
  } catch (error) {
    console.error("Error in refreshToken:", error);
    res.status(403).json({ message: "Refresh token invalid or expired" });
  }
};