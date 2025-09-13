import express from "express";
import {
  addInterviewExperience,
  fetchUnpublishedInterviewExperiences,
  deleteExperience,
  approveExperience,
  fetchPublicInterviewExperiences,
} from "../controllers/interviewexperienceController.js";
import { authMiddleware as requireAuth } from "../middleware/authMiddleware.js";
import { requireAdmin } from "../middleware/adminMiddleware.js";

const router = express.Router();

// Authenticated user: fetch all published interview experiences
router.get("/public", requireAuth, fetchPublicInterviewExperiences);

// Authenticated user: add a new interview experience
router.post("/add", requireAuth, addInterviewExperience);

// Admin-only: fetch unpublished interview experiences
router.get("/unpublished", requireAuth, requireAdmin, fetchUnpublishedInterviewExperiences);

// Admin-only: approve an interview experience
router.put("/approve/:id", requireAuth, requireAdmin, approveExperience);

// Admin-only: delete an interview experience
router.delete("/:id", requireAuth, requireAdmin, deleteExperience);

export default router;
