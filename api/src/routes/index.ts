import { Router } from "express";
import { usuariosRouter } from "./user.routes.js";

export const router = Router();

router.use("/usuarios", usuariosRouter);
