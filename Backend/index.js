import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import apiAuth from "./routes/apiAuth.js"
import apiAdmin from "./routes/apiAdmin.js"
import apiSubject from "./routes/apiSubjects.js"
dotenv.config();
const app = express();

app.use(cors({origin:process.env.FRONTEND_URL, credentials:true}));
app.use(express.json());

const PORT = process.env.PORT || 5000;
// Routes
app.use("/auth", apiAuth);
app.use("/admin", apiAdmin);
app.use("/subject", apiSubject);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
