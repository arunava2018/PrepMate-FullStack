import express from "express";
import {
  addQuestion,
  fetchQuestions,
  updateQuestion,
  deleteQuestion,
} from "../controllers/questionController.js";
import { authMiddleware as requireAuth } from "../middleware/authMiddleware.js";
import { requireAdmin } from "../middleware/adminMiddleware.js";
const router = express.Router();
// Create a new question (Admin only)
router.post("/addquestion", requireAuth, requireAdmin, addQuestion);
// Get all questions for a subtopic
router.get("/:subtopicId", fetchQuestions);
// Update a question (Admin only)
router.put("/:questionId", requireAuth, requireAdmin, updateQuestion);
// Delete a question (Admin only)
router.delete("/:questionId", requireAuth, requireAdmin, deleteQuestion);
export default router;
