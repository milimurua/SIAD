import { Router } from "express";
import authRoutes from "./auth.routes";
import sinisterRoutes from "./sinister.routes";

const router = Router();
router.use("/auth", authRoutes);
router.use("/sinister", sinisterRoutes);

export default router;

