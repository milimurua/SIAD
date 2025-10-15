import { Router } from "express";
import { usuariosRouter } from "./auth.routes";

const router = Router();

router.use("/users", usuariosRouter);

export default router;
