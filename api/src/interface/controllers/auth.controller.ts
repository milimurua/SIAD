import { Request, Response } from "express";

export const getUsuarios = (_req: Request, res: Response) => {
  res.json([{ id: 1, nombre: "Usuario de prueba" }]);
};
