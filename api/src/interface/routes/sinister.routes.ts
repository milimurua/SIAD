import { Router } from "express";
import * as SinisterController from "../controllers/sinisterController";
import { authenticateJWT } from "../middlewares/auth.middleware";
import { authorizeRole } from "../middlewares/authorize.middleware";

const router = Router();

// Solo aseguradoras pueden registrar denuncias
router.post(
  "/",
  authenticateJWT,
  authorizeRole(["insurance"]),
  SinisterController.createSinister
);

// Solo aseguradoras pueden ver sus denuncias
router.get(
  "/",
  authenticateJWT,
  authorizeRole(["insurance"]),
  SinisterController.getSinisters
);

export default router;
