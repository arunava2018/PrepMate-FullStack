import { PrismaClient } from '@prisma/client';
import { cacheClient } from '../utils/cacheClient.js';

const prisma = new PrismaClient();

export const fetchSubtopics = async (req, res) => {
  try {
    const { subjectId } = req.params;
    const subtopics = await prisma.subtopics.findMany({
      where: { subject_id: subjectId },
    });
    res.json(subtopics);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch subtopics' });
  }
};

export const addSubtopic = async (req, res) => {
  try {
    const { subject_id, name } = req.body;

    const subtopic = await prisma.subtopics.create({
      data: { subject_id, name },
    });

    // Invalidate caches
    await Promise.all([
      cacheClient.del(`subtopics:${subject_id}`),
      cacheClient.del('subjects:all'), // subject list may depend on subtopic counts
    ]);

    res.status(201).json({ message: 'Subtopic added successfully', subtopic });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add subtopic' });
  }
};
