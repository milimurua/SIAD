import { Router } from "express";
import * as InsuredController from "../controllers/insuredController";
import { authenticateToken } from "../middlewares/auth.middleware";

const router = Router();

router.use(authenticateToken);

// Rutas de asegurados
router.post("/", InsuredController.createInsured);
router.get("/", InsuredController.getInsureds);
router.get("/:id", InsuredController.getInsuredById);
router.put("/:id", InsuredController.updateInsured);

// Ruta especial para obtener asegurados por DN
router.get("/dni/:dni", InsuredController.getInsuredByDni);

export default router;
