import { motion, AnimatePresence } from 'framer-motion';

function ProgressCard({ progress, completedQ, totalQ }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={progress}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        className="bg-card text-card-foreground rounded-2xl p-6 shadow-sm border border-border">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
            Learning Progress
          </h2>
          <motion.span
            className="text-sm font-medium text-primary"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}>
            {Math.round(progress)}% Complete
          </motion.span>
        </div>

        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-2 overflow-hidden">
          <motion.div
            className="bg-primary h-3 rounded-full"
            initial={{ width: '0%' }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
          />
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-400">
          {completedQ} of {totalQ} questions completed
        </p>
      </motion.div>
    </AnimatePresence>
  );
}

export default ProgressCard;
