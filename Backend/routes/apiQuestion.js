import express from 'express';
import {
  addQuestion,
  fetchQuestions,
  updateQuestion,
  deleteQuestion,
} from '../controllers/questionController.js';

const router = express.Router();
router.get('/:subtopicId', fetchQuestions);
router.post('/add', addQuestion);
router.put('/:questionId', updateQuestion);
router.delete('/:questionId', deleteQuestion);

export default router;
