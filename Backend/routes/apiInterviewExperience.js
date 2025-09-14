import express from "express";
import {
  addInterviewExperience,
  fetchUnpublishedInterviewExperiences,
  deleteExperience,
  approveExperience,
  fetchPublicInterviewExperiences,
} from "../controllers/interviewexperienceController.js";
import { cacheMiddleware } from "../middleware/cache.js";

const router = express.Router();

// Public interview experiences (cache for 30 min)
router.get(
  "/public",
  cacheMiddleware({ key: "interview:public", ttl: 1800 }),
  fetchPublicInterviewExperiences
);

// Unpublished interview experiences (cache for 5 min)
router.get(
  "/unpublished",
  cacheMiddleware({ key: "interview:unpublished", ttl: 300 }),
  fetchUnpublishedInterviewExperiences
);

// Add new interview experience
router.post("/add", addInterviewExperience);

// Approve (makes it public + invalidates)
router.put("/approve/:id", approveExperience);

// Delete interview experience
router.delete("/:id", deleteExperience);

export default router;
