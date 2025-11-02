import { Router } from "express";
import * as SinisterController from "../controllers/sinisterController";
import { authenticateToken } from "../middlewares/auth.middleware";

const router = Router();

router.use(authenticateToken);

// Rutas de siniestros
router.post("/", SinisterController.createSinister);
router.get("/", SinisterController.getSinisters);
router.get("/statistics", SinisterController.getSinisterStatistics);
router.get("/:id", SinisterController.getSinisterById);
router.get("/by-dni/:dni", SinisterController.getSinistersByDni);
router.put("/:id", SinisterController.updateSinister);

export default router;
