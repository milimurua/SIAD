import { Router } from "express";
import { getUsuarios } from "../controllers/user.controller.js";

export const usuariosRouter = Router();

usuariosRouter.get("/", getUsuarios);
