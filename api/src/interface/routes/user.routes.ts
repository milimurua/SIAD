import { Router } from "express";
import { authenticateJWT } from "../middlewares/auth.middleware";
import { authorizeRole } from "../middlewares/authorize.middleware";

const router = Router();

router.get(
  "/profile",
  authenticateJWT,
  authorizeRole(["insurance", "safeProducer"]),
  (req, res) => res.json({ user: (req as any).user })
);

export default router;