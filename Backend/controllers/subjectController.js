import { PrismaClient } from '@prisma/client';
import { cacheClient } from '../utils/cacheClient.js';

const prisma = new PrismaClient();

export const getSubjects = async (req, res) => {
  try {
    // 1. Fetch subjects
    const subjects = await prisma.subjects.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        icon: true,
        created_at: true,
      },
    });

    // 2. Fetch question counts grouped by subject_id
    const questionCounts = await prisma.questions.groupBy({
      by: ['subject_id'],
      _count: { id: true },
    });

    // 3. Merge counts into subjects
    const formatted = subjects.map((s) => {
      const match = questionCounts.find((qc) => qc.subject_id === s.id);
      return {
        ...s,
        question_count: match ? match._count.id : 0,
      };
    });

    res.json(formatted);
  } catch (err) {
    console.error('Error fetching subjects:', err);
    res.status(500).json({ error: 'Failed to fetch subjects' });
  }
};

export const getSubjectById = async (req, res) => {
  try {
    const subject = await prisma.subjects.findUnique({
      where: { id: req.params.id },
    });
    if (!subject) return res.status(404).json({ error: 'Subject not found' });
    res.json(subject);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch subject' });
  }
};

export const addSubject = async (req, res) => {
  try {
    const { name } = req.body;
    const subject = await prisma.subjects.create({ data: { name } });

    // Invalidate subject caches
    await cacheClient.del('subjects:all');

    res.status(201).json({ message: 'Subject added successfully', subject });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add subject' });
  }
};
