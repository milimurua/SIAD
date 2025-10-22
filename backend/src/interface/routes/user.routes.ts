import { Router } from "express";
import { authenticateToken } from "../middlewares/auth.middleware";
import { requirePermission, ROLE_PERMISSIONS } from "../middlewares/role.middleware";

const router = Router();

// Ruta para obtener información del usuario actual
router.get(
  "/profile",
  authenticateToken,
  (req, res) => res.json({ 
    user: req.user,
    permissions: req.user ? ROLE_PERMISSIONS[req.user.type] : null
  })
);

// Rutas protegidas para gestión de usuarios (solo administradores)
router.get(
  "/",
  authenticateToken,
  requirePermission("canManageUsers"),
  (req, res) => res.json({ message: "Lista de usuarios - Solo administradores" })
);

router.get(
  "/:id",
  authenticateToken,
  requirePermission("canManageUsers"),
  (req, res) => res.json({ message: `Usuario ${req.params.id} - Solo administradores` })
);

export default router;