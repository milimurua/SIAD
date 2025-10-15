import { Request, Response, NextFunction } from "express";

export const authorizeRole = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    if (!roles.includes(user.type))
      return res.status(403).json({ message: "Access denied: insufficient permissions" });

    next();
  };
};
