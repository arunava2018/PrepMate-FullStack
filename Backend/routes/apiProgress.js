import express from 'express';
import {
  getProgress,
  markQuestionAsRead,
  unmarkQuestion,
} from '../controllers/progressController.js';
import { authMiddleware as requireAuth } from '../middleware/authMiddleware.js';
const router = express.Router();
// Get progress for a subject
router.get('/:userId/:subjectId', requireAuth, getProgress);
// Mark question as read
router.post('/mark', requireAuth, markQuestionAsRead);
// Unmark question
router.post('/unmark', requireAuth, unmarkQuestion);

export default router;
