import express from 'express';
import {
  addSubtopic,
  fetchSubtopics,
} from '../controllers/subtopicController.js';
import { cacheMiddleware } from '../middleware/cache.js';

const router = express.Router();

// Add new subtopic (invalidate cache inside controller)
router.post('/addsubtopic', addSubtopic);

// Fetch subtopics for a subject (cache 5 minutes)
router.get(
  '/:subjectId',
  cacheMiddleware({
    key: (req) => `subtopics:${req.params.subjectId}`,
    ttl: 300,
  }),
  fetchSubtopics
);

export default router;
