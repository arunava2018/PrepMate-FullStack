import express from "express";
import { addSubtopic, fetchSubtopics } from "../controllers/subtopicController.js";
import { authMiddleware as requireAuth } from "../middleware/authMiddleware.js";
import { requireAdmin } from "../middleware/adminMiddleware.js";
const router = express.Router();
router.post("/addsubtopic", requireAuth, requireAdmin, addSubtopic);
router.get("/:subject", fetchSubtopics);
export default router;
