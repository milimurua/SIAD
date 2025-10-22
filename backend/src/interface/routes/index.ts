import { Router } from "express";
import authRoutes from "./auth.routes";
import sinisterRoutes from "./sinister.routes";
import insuredRoutes from "./insured.routes";
import userRoutes from "./user.routes";

const router = Router();
router.use("/auth", authRoutes);
router.use("/sinister", sinisterRoutes);
router.use("/insured", insuredRoutes);
router.use("/user", userRoutes);

export default router;