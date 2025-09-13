import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import apiAuth from "./routes/apiAuth.js";
import apiAdmin from "./routes/apiAdmin.js";
import apiSubject from "./routes/apiSubjects.js";
import apiSubtopic from "./routes/apiSubtopic.js";
import apiQuestion from "./routes/apiQuestion.js";
import apiInterviewexperience from "./routes/apiInterviewExperience.js";
import apiProgress from "./routes/apiProgress.js";
dotenv.config();
const app = express();
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(express.json());

// Routes
app.use("/auth", apiAuth);
app.use("/admin", apiAdmin);
app.use("/subjects", apiSubject);
app.use("/subtopics", apiSubtopic);
app.use("/questions", apiQuestion);
app.use("/interview", apiInterviewexperience);
app.use("/progress", apiProgress);

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
