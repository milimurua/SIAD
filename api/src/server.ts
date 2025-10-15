import app from "./app";
import "./infrastructure/db/db";

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
