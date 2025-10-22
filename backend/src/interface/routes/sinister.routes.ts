import { Router } from "express";
import * as SinisterController from "../controllers/sinisterController";
import { authenticateToken } from "../middlewares/auth.middleware";

const router = Router();

// Todas las rutas requieren autenticación
router.use(authenticateToken);

// Rutas de siniestros
router.post("/", SinisterController.createSinister);
router.get("/", SinisterController.getSinisters);
router.get("/statistics", SinisterController.getSinisterStatistics);
router.get("/:id", SinisterController.getSinisterById);
router.put("/:id", SinisterController.updateSinister);
router.delete("/:id", SinisterController.deleteSinister);

export default router;
