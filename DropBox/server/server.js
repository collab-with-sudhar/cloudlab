import express from "express";
import dotenv from "dotenv";
import dropboxRoutes from "./routes/dropboxRoutes.js";
import cors from "cors";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
console.log(process.env.DROPBOX_ACCESS_TOKEN)

app.use("/api/dropbox", dropboxRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
