import express from "express";
import cors from "cors";
import path from "path";

// Importar rutas y middlewares
import routes from "./interface/routes";
import { errorHandler } from "./interface/middlewares/error.middleware";

const app = express();

// --- Middleware base ---
app.use(cors());
app.use(express.json());

// --- Rutas API ---
app.use("/api", routes);

// --- Servir el frontend (React, Vue, etc.) ---
const frontendPath = path.join(__dirname, "../../frontend/dist");
app.use(express.static(frontendPath));

// Para cualquier otra ruta, devolver el index.html del frontend
app.get("*", (_req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

// --- Middleware global de errores ---
app.use(errorHandler);

export default app;
