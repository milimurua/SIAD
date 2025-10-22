import { Request, Response, NextFunction } from "express";

export const validateRegister = (req: Request, res: Response, next: NextFunction) => {
  const { type, email, password, name } = req.body;
  
  if (!type || !email || !password) {
    return res.status(400).json({ message: "type, email and password are required" });
  }
  
  if (!["insurance", "producer"].includes(type)) {
    return res.status(400).json({ message: "Invalid user type. Must be 'insurance' or 'producer'" });
  }
  
  if (type === "insurance" && !name) {
    return res.status(400).json({ message: "name is required for insurance type" });
  }
  
  next();
};
