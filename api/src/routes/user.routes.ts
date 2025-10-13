import { Router } from "express";
import { getUsuarios } from "../controllers/user.controller";

export const usuariosRouter = Router();

usuariosRouter.get("/", getUsuarios);
