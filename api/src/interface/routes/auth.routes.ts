import { Router } from "express";
import { getUsuarios } from "../controllers/auth.controller";

export const usuariosRouter = Router();

usuariosRouter.get("/", getUsuarios);
