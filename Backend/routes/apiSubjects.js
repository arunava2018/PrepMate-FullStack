import express from 'express';
import {
  addSubject,
  getSubjectById,
  getSubjects,
} from '../controllers/subjectController.js';
import { authMiddleware as requireAuth } from '../middleware/authMiddleware.js';
import { requireAdmin } from '../middleware/adminMiddleware.js';
import { cacheMiddleware } from '../middleware/cache.js';

const router = express.Router();

// Cache subjects list for 30 minutes
router.get(
  '/',
  cacheMiddleware({ key: 'subjects:all', ttl: 1800 }),
  getSubjects
);
// router.get("/", async (req, res) => {
//   res.json({ message: "✅ subjects route working" });
// });

// Cache each subject by ID
router.get(
  '/:id',
  cacheMiddleware({
    key: (req) => `subjects:${req.params.id}`,
    ttl: 600, // 10 minutes
  }),
  getSubjectById
);

// Add subject (invalidate cache inside controller)
router.post('/addsubject', requireAuth, requireAdmin, addSubject);

export default router;
