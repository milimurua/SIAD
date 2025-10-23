import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../../infrastructure/security/jwt";
import { JWTPayload } from "../../domain/roles";

// Extender la interfaz Request para incluir el usuario
declare global {
  namespace Express {
    interface Request {
      user?: JWTPayload;
    }
  }
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ 
      error: "Access token required",
      message: "Debe proporcionar un token de acceso válido"
    });
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ 
      error: "Invalid or expired token",
      message: "Token inválido o expirado"
    });
  }
};