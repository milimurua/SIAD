import express from "express";
import cors from "cors";
import path from "path";

// Importar rutas y middlewares
import routes from "./interface/routes";
import { errorHandler } from "./interface/middlewares/error.middleware";

const app = express();

app.use(cors());
app.use(express.json());

// Rutas
app.use("/api", routes);

// Frontend
const frontendPath = path.join(__dirname, "../../frontend/dist");
app.use(express.static(frontendPath));

// Para cualquier otra ruta, devolver el index.html del frontend
app.get("*", (_req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

app.use(errorHandler);

export default app;
