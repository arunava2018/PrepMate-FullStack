// src/components/Subject/QuestionItem.jsx
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, CheckCircle, Circle } from "lucide-react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import hljs from "highlight.js";
import "highlight.js/styles/tomorrow-night-bright.css";
import "highlightjs-line-numbers.js";
import "@/styles/hljs-line-numbers.css";
import {
  markQuestionAsRead,
  unmarkQuestion,
  getProgress,
} from "@/db/apiProgress";
import { useState, useEffect } from "react";

const accordionVariants = {
  closed: {
    height: 0,
    opacity: 0,
    transition: { duration: 0.3, ease: "easeInOut" },
  },
  open: {
    height: "auto",
    opacity: 1,
    transition: { duration: 0.4, ease: "easeInOut" },
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

  // Re-run highlighting + line numbers when accordion opens
  useEffect(() => {
    if (open) {
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        hljs.highlightAll();
        document.querySelectorAll("pre code").forEach((block) => {
          try {
            hljs.lineNumbersBlock(block);
          } catch (e) {
            console.warn("Line numbers skipped:", e);
          }
        });
      }, 100);
    }
  }, [open, question.answer_text]);

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
    <motion.div className="bg-gray-50 dark:bg-gray-700 rounded-xl overflow-hidden shadow-sm">
      {/* Question Header */}
      <motion.button
        onClick={() => setOpen(!open)}
        className="w-full px-4 sm:px-5 py-3 sm:py-4 text-left flex items-center justify-between transition-colors duration-200"
      >
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
          transition={{ duration: 0.3 }}
        >
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
            className="overflow-hidden px-4 sm:px-5 pb-4 sm:pb-5"
          >
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 sm:p-5 shadow-sm">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[
                  rehypeRaw,
                  [
                    rehypeHighlight,
                    { detect: true, ignoreMissing: true },
                  ],
                ]}
                components={{
                  p: ({ node, ...props }) => (
                    <p
                      className="leading-relaxed text-gray-700 dark:text-gray-300 mb-3 sm:mb-4 text-sm sm:text-base"
                      {...props}
                    />
                  ),
                  strong: ({ node, ...props }) => (
                    <strong
                      className="font-semibold text-yellow-600 dark:text-yellow-400"
                      {...props}
                    />
                  ),
                  em: ({ node, ...props }) => (
                    <em
                      className="italic text-gray-600 dark:text-gray-400"
                      {...props}
                    />
                  ),
                  blockquote: ({ node, ...props }) => (
                    <blockquote
                      className="border-l-4 border-yellow-500 pl-3 sm:pl-4 italic text-gray-700 dark:text-gray-300 my-3 sm:my-4 bg-yellow-50 dark:bg-yellow-900/20 py-2 rounded-r-lg"
                      {...props}
                    />
                  ),
                  a: ({ node, ...props }) => (
                    <a
                      className="text-blue-600 dark:text-blue-400 underline hover:text-blue-800 dark:hover:text-blue-300 transition-colors break-words"
                      target="_blank"
                      rel="noopener noreferrer"
                      {...props}
                    />
                  ),
                  ul: ({ node, ...props }) => (
                    <ul
                      className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mb-3 sm:mb-4"
                      {...props}
                    />
                  ),
                  ol: ({ node, ...props }) => (
                    <ol
                      className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300 mb-3 sm:mb-4"
                      {...props}
                    />
                  ),
                  li: ({ node, ...props }) => (
                    <li className="ml-3 sm:ml-4" {...props} />
                  ),

                  // Fixed code renderer with proper highlighting
                  code: ({ inline, className, children, ...props }) => {
                    return inline ? (
                      <code
                        className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 rounded text-xs sm:text-sm font-mono text-pink-600 dark:text-pink-400 break-words"
                        {...props}
                      >
                        {children}
                      </code>
                    ) : (
                      <pre className="p-3 sm:p-4 bg-gray-900 dark:bg-gray-800 rounded-lg overflow-x-auto text-xs sm:text-sm my-3 sm:my-4">
                        <code className={className} {...props}>
                          {children}
                        </code>
                      </pre>
                    );
                  },

                  table: ({ node, ...props }) => (
                    <div className="overflow-x-auto my-3 sm:my-4">
                      <table
                        className="min-w-full border-collapse border border-gray-300 dark:border-gray-600 text-xs sm:text-sm"
                        {...props}
                      />
                    </div>
                  ),
                  thead: ({ node, ...props }) => (
                    <thead
                      className="bg-gray-100 dark:bg-gray-800/50 text-gray-800 dark:text-gray-200 font-semibold"
                      {...props}
                    />
                  ),
                  tbody: ({ node, ...props }) => (
                    <tbody
                      className="divide-y divide-gray-200 dark:divide-gray-600"
                      {...props}
                    />
                  ),
                  tr: ({ node, ...props }) => (
                    <tr
                      className="even:bg-gray-50 odd:bg-white dark:even:bg-gray-700/40 dark:odd:bg-gray-800/40"
                      {...props}
                    />
                  ),
                  th: ({ node, ...props }) => (
                    <th
                      className="px-3 sm:px-4 py-2 text-left border border-gray-300 dark:border-gray-600"
                      {...props}
                    />
                  ),
                  td: ({ node, ...props }) => (
                    <td
                      className="px-3 sm:px-4 py-2 border border-gray-300 dark:border-gray-600"
                      {...props}
                    />
                  ),
                  img: ({ node, ...props }) => (
                    <img
                      className="w-xl h-auto rounded-lg my-3 sm:my-4 mx-auto shadow-sm"
                      {...props}
                    />
                  ),
                }}
              >
                {question.answer_text}
              </ReactMarkdown>

              {/* Action buttons */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-3 sm:mt-4">
                {!isRead ? (
                  <motion.button
                    className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white text-sm sm:text-base px-3 py-1.5 rounded cursor-pointer"
                    onClick={handleMark}
                  >
                    <CheckCircle className="w-4 h-4" /> Mark as Read
                  </motion.button>
                ) : (
                  <motion.button
                    className="flex items-center gap-2 border border-gray-400 px-3 py-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer text-sm sm:text-base"
                    onClick={handleUnmark}
                  >
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
