import express from "express";
import {
  addInterviewExperience,
  fetchUnpublishedInterviewExperiences,
  deleteExperience,
  approveExperience,
  fetchPublicInterviewExperiences,
  fetchUserInterviewExperiences,
  updateExperience,
  fetchExperienceById,
} from "../controllers/interviewexperienceController.js";
import { cacheMiddleware } from "../middleware/cache.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// -------- Public interview experiences (cache for 30 min) --------
router.get(
  "/public",
  cacheMiddleware({ key: "interview:public", ttl: 1800 }),
  fetchPublicInterviewExperiences
);

// -------- Unpublished interview experiences --------
// Admin → sees all unpublished
// User  → sees only their own unpublished
router.get(
  "/unpublished",
  authMiddleware,
  cacheMiddleware({ key: "interview:unpublished", ttl: 300 }),
  fetchUnpublishedInterviewExperiences
);

// -------- User-specific interview experiences (Published + In Review) --------
router.get("/user/:userId", fetchUserInterviewExperiences);

// -------- Single experience by ID --------
// Public → any authenticated user can view
// Private → only owner or admin
router.get("/:id", authMiddleware, fetchExperienceById); 

// -------- Add new interview experience --------
router.post("/add", authMiddleware, addInterviewExperience);

// -------- Update unpublished interview experience --------
router.put("/update/:id", authMiddleware, updateExperience);

// -------- Approve (makes it public + invalidates) --------
router.put("/approve/:id", authMiddleware, approveExperience);

// -------- Delete interview experience --------
router.delete("/:id", authMiddleware, deleteExperience);

export default router;
