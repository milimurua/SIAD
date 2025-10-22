import { Router } from "express";
import * as InsuredController from "../controllers/insuredController";
import { authenticateToken } from "../middlewares/auth.middleware";

const router = Router();

// Todas las rutas requieren autenticación
router.use(authenticateToken);

// Rutas de asegurados
router.post("/", InsuredController.createInsured);
router.get("/", InsuredController.getInsureds);
router.get("/:id", InsuredController.getInsuredById);
router.put("/:id", InsuredController.updateInsured);
router.delete("/:id", InsuredController.deleteInsured);

// Ruta especial para obtener siniestros por DNI
router.get("/insured/:dni", InsuredController.getSinistersByInsuredDni);

export default router;
