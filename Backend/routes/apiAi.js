import express from 'express';
import { runAdminAgent } from '../controllers/adminAgentController.js';
import { addQuestionToDbTool } from '../utils/agentTools.js';

const router = express.Router();

// 🤖 Run Admin AI Agent (with Web Search & Function Calling)
router.post('/agent/run', runAdminAgent);

// 💾 Bulk save approved questions to DB
router.post('/agent/approve-and-save', async (req, res) => {
  try {
    const { subject_id, subtopic_id, questions } = req.body;

    if (!subject_id || !subtopic_id || !Array.isArray(questions)) {
      return res.status(400).json({ error: 'subject_id, subtopic_id, and questions array are required' });
    }

    const resultRaw = await addQuestionToDbTool({ subject_id, subtopic_id, questions });
    const result = JSON.parse(resultRaw);

    if (result.status === 'error') {
      return res.status(400).json({ error: result.message });
    }

    res.status(201).json({
      message: `Successfully inserted ${result.insertedCount} questions to database.`,
      result,
    });
  } catch (error) {
    console.error('Approve and save error:', error);
    res.status(500).json({ error: error.message || 'Failed to save questions' });
  }
});

export default router;
