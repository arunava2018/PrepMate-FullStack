import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog } from "@headlessui/react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { updateQuestion } from "@/db/apiQuestion";
import { X, Save, FileText, MessageSquare, Loader2 } from "lucide-react";

export default function UpdateQuestionModal({ isOpen, onClose, question }) {
  const [formData, setFormData] = useState({
    question_text: "",
    answer_text: "",
  });
  const [saving, setSaving] = useState(false);
  const [questionId, setquestionId] =  useState(null);

  // Sync form when question changes
  useEffect(() => {
    if (question) {
      setquestionId(question.id);
      setFormData({
        question_text: question.question_text || "",
        answer_text: question.answer_text || "",
      });
    }
  }, [question]);

  if (!isOpen || !question) return null;

  const handleSave = async () => {
    try {
      setSaving(true);
      await updateQuestion({questionId, question_text: formData.question_text, answer_text: formData.answer_text   });
      onClose();
    } catch (err) {
      console.error("Error updating question:", err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onClose={onClose} className="relative z-50">
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />

          {/* Modal Container */}
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="w-full max-w-2xl max-h-[90vh] bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden flex flex-col"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/10 px-6 py-4 border-b border-yellow-200 dark:border-yellow-800/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-yellow-500 rounded-xl flex items-center justify-center shadow-lg">
                      <FileText className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <Dialog.Title className="text-xl font-bold text-gray-800 dark:text-gray-100">
                        Edit Question
                      </Dialog.Title>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Update question content and answer
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={onClose}
                    className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 overflow-y-auto flex-1">
                <form 
                  className="space-y-6" 
                  onSubmit={(e) => { 
                    e.preventDefault(); 
                    handleSave(); 
                  }}
                >
                  {/* Question Input */}
                  <div className="space-y-2">
                    <label 
                      htmlFor="questionText" 
                      className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      <MessageSquare className="w-4 h-4 text-yellow-600" />
                      Question Text
                    </label>
                    <Input
                      id="questionText"
                      value={formData.question_text}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          question_text: e.target.value,
                        }))
                      }
                      className="w-full h-12 border-2 border-gray-200 dark:border-gray-700 rounded-xl px-4 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all"
                      placeholder="Enter your question here..."
                      required
                      aria-required="true"
                    />
                  </div>

                  {/* Answer Textarea */}
                  <div className="space-y-2">
                    <label 
                      htmlFor="answerText" 
                      className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      <FileText className="w-4 h-4 text-yellow-600" />
                      Answer Text
                    </label>
                    <Textarea
                      id="answerText"
                      value={formData.answer_text}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          answer_text: e.target.value,
                        }))
                      }
                      className="w-full min-h-32 border-2 border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all resize-y"
                      placeholder="Enter the answer here..."
                      rows={6}
                      required
                      aria-required="true"
                    />
                  </div>

                  {/* Character Count */}
                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                    <span>Question: {formData.question_text.length} characters</span>
                    <span>Answer: {formData.answer_text.length} characters</span>
                  </div>

                  {/* Actions */}
                  <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <Button
                      type="button"
                      onClick={onClose}
                      variant="outline"
                      className="px-6 cursor-pointer py-2 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl transition-all"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={saving || !formData.question_text.trim() || !formData.answer_text.trim()}
                      className="px-6 py-2 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center gap-2"
                    >
                      {saving ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4" />
                          Save Changes
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  );
}
