// src/components/Subject/SubtopicAccordion.jsx
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import QuestionItem from './QuestionItem';

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

export default function SubtopicAccordion({
  subtopic,
  index,
  questions,
  openSubtopic,
  setOpenSubtopic,
  progressData,
  setProgressData,
  subjectId,
  user,
}) {
  return (
    <motion.div className="bg-card text-card-foreground rounded-2xl shadow-sm border border-border overflow-hidden hover:shadow-md transition-all duration-300">
      {/* Accordion Header */}
      <motion.button
        onClick={() =>
          setOpenSubtopic(openSubtopic === subtopic.id ? null : subtopic.id)
        }
        className="w-full px-4 sm:px-6 py-4 sm:py-5 text-left flex items-center justify-between transition-colors duration-200">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary/10 dark:bg-primary/20 rounded-xl flex items-center justify-center text-primary font-bold text-sm">
            {index + 1}
          </div>
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-100 break-words">
            {subtopic.name}
          </h3>
        </div>
        <motion.div
          animate={{ rotate: openSubtopic === subtopic.id ? 180 : 0 }}
          transition={{ duration: 0.3 }}>
          <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        </motion.div>
      </motion.button>

      {/* Accordion Content */}
      <AnimatePresence>
        {openSubtopic === subtopic.id && (
          <motion.div
            variants={accordionVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="overflow-hidden px-3 sm:px-6 pb-4 sm:pb-6">
            {questions.length ? (
              <div className="space-y-3">
                {questions.map((q) => (
                  <QuestionItem
                    key={q.id}
                    question={q}
                    progressData={progressData}
                    setProgressData={setProgressData}
                    subjectId={subjectId}
                    user={user}
                  />
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground p-3 sm:p-4 text-center bg-muted rounded-lg border border-border/50">
                No questions available for this subtopic.
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
