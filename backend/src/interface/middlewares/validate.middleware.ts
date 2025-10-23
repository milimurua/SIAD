import { Request, Response, NextFunction } from "express";

export const validateRegister = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { type, email, password, name } = req.body;

    // Campos obligatorios
    if (!type || !email || !password) {
      return res.status(400).json({
        error: "Missing fields",
        message: "Los campos type, email y password son obligatorios",
      });
    }

    // Tipos válidos
    const validTypes = ["insurance", "producer"];
    if (!validTypes.includes(type)) {
      return res.status(400).json({
        error: "Invalid user type",
        message: "El campo 'type' debe ser 'insurance' o 'producer'",
      });
    }

    // Campo adicional requerido para aseguradoras
    if (type === "insurance" && !name) {
      return res.status(400).json({
        error: "Missing name",
        message: "El campo 'name' es obligatorio para usuarios de tipo 'insurance'",
      });
    }

    next();
  } catch (err) {
    console.error("Error en validateRegister:", err);
    res.status(500).json({
      error: "Internal validation error",
      message: "Ocurrió un error al validar los datos de registro",
    });
  }
};
