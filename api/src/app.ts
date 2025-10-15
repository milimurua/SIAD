import express from "express";
import cors from "cors";
import path from "path";

const app = express();
app.use(cors());
app.use(express.json());


app.use(express.static(path.join(__dirname, "../../frontend/dist")));
app.get("*", (_req, res) => {
  res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
});

export default app;
