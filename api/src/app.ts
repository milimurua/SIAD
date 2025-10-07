import express, { Request, Response } from 'express';
import { router } from "./routes/index.js";

const app = express();

app.use(express.json());
app.use("/api", router);

app.get("/health", (_req, res) => res.json({ status: "ok" }));

export default app;
