import { Router } from "express";
import authRoutes from "./auth.routes";
import sinisterRoutes from "./sinister.routes";
import insuredRoutes from "./insured.routes";

const router = Router();
router.use("/auth", authRoutes);
router.use("/sinister", sinisterRoutes);
router.use("/insured", insuredRoutes)

export default router;