import { Router } from "express";
import * as AuthController from "../controllers/auth.controller";
import { validateRegister } from "../middlewares/validate.middleware";

const router = Router();
router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.post("/register", validateRegister, AuthController.register);
router.post("/refresh", AuthController.refreshToken);

export default router;
