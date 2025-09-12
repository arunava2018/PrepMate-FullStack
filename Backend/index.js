import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import prisma from "./config/prisma.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

(async () => {
  try {
    await prisma.$connect();
    console.log("✅ Connected to Neon DB via Prisma");
  } catch (e) {
    console.error("❌ DB connection error:", e);
  }
})();
