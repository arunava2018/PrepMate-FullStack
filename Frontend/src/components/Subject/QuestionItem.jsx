// src/components/Subject/QuestionItem.jsx
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, CheckCircle, Circle } from 'lucide-react';
import {
  markQuestionAsRead,
  unmarkQuestion,
  getProgress,
} from '@/db/apiProgress';
import { useState } from 'react';
import MarkdownRenderer from '@/components/MarkdownRenderer';

const accordionVariants = {
  closed: {
    height: 0,
    opacity: 0,
    transition: { duration: 0.3, ease: 'easeInOut' },
  },
  open: {
    height: 'auto',
    opacity: 1,
    transition: { duration: 0.4, ease: 'easeInOut' },
  },
};

export default function QuestionItem({
  question,
  progressData,
  setProgressData,
  subjectId,
  user,
}) {
  const [open, setOpen] = useState(false);
  const isRead = progressData.completed_questions.includes(question.id);

  const handleMark = async () => {
    if (!user) return;
    const success = await markQuestionAsRead(user.id, subjectId, question.id);
    if (success) {
      const data = await getProgress(user.id, subjectId);
      setProgressData(data);
      setOpen(false);
    }
  };

  const handleUnmark = async () => {
    if (!user) return;
    const success = await unmarkQuestion(user.id, subjectId, question.id);
    if (success) {
      const data = await getProgress(user.id, subjectId);
      setProgressData(data);
    }
  };

  return (
    <motion.div className="bg-gray-50 dark:bg-gray-700 rounded-xl overflow-hidden shadow-sm dark:shadow-none">
      {/* Question Header */}
      <motion.button
        onClick={() => setOpen(!open)}
        className="w-full px-4 sm:px-5 py-3 sm:py-4 text-left flex items-center justify-between transition-colors duration-200">
        <div className="flex items-center gap-2 sm:gap-3">
          {isRead ? (
            <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
          ) : (
            <Circle className="w-5 h-5 text-gray-400 shrink-0" />
          )}
          <span className="font-medium text-gray-800 dark:text-gray-200 pr-2 sm:pr-4 text-sm sm:text-base leading-snug break-words">
            {question.question_text}
          </span>
        </div>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3 }}>
          <ChevronDown className="w-4 h-4 text-gray-500 dark:text-gray-400" />
        </motion.div>
      </motion.button>

      {/* Answer Accordion */}
      <AnimatePresence>
        {open && (
          <motion.div
            variants={accordionVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="overflow-hidden px-4 sm:px-5 pb-4 sm:pb-5">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 sm:p-5 shadow-sm dark:shadow-none">
              {/* Use shared MarkdownRenderer */}
              <MarkdownRenderer content={question.answer_text} />

              {/* Action buttons */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-3 sm:mt-4">
                {!isRead ? (
                  <motion.button
                    className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white text-sm sm:text-base px-3 py-1.5 rounded cursor-pointer"
                    onClick={handleMark}>
                    <CheckCircle className="w-4 h-4" /> Mark as Read
                  </motion.button>
                ) : (
                  <motion.button
                    className="flex items-center gap-2 border border-gray-400 px-3 py-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer text-sm sm:text-base"
                    onClick={handleUnmark}>
                    <CheckCircle className="w-4 h-4 text-green-500" /> Unmark
                  </motion.button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
