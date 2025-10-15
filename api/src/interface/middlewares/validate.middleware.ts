import { Request, Response, NextFunction } from "express";

export const validateRegister = (req: Request, res: Response, next: NextFunction) => {
  const { type, email, password } = req.body;
  if (!type || !email || !password) {
    return res.status(400).json({ message: "type, email and password are required" });
  }
  if (!["aseguradora", "productor"].includes(type)) {
    return res.status(400).json({ message: "Invalid user type" });
  }
  next();
};
