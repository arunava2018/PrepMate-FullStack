import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import useFetch from "@/hooks/useFetch";
import { getSubjects } from "@/db/apiSubjects";
import { fetchSubtopics } from "@/db/apiSubtopic";
import { addQuestion } from "@/db/apiQuestion";
import MarkdownEditor from "../submit-experience-form/MarkdownEditor";

export default function AddQuestion() {
  const [form, setForm] = useState({
    subject: "",
    subtopic: "",
    question: "",
    answer: "",
  });

  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [submitting, setSubmitting] = useState(false); 
  const { data: subjects, loading, fn: fnSubjects } = useFetch(getSubjects);
  const { data: subtopicData, fn: fnSubtopic } = useFetch(fetchSubtopics);

  useEffect(() => {
    fnSubjects();
  }, []);

  useEffect(() => {
    if (form.subject) {
      fnSubtopic({ subject: form.subject });
      setForm((prev) => ({ ...prev, subtopic: "" }));
    }
  }, [form.subject]);

  useEffect(() => {
    if (successMsg || errorMsg) {
      const timer = setTimeout(() => {
        setSuccessMsg("");
        setErrorMsg("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [successMsg, errorMsg]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true); 
      await addQuestion(form);
      setSuccessMsg("Question has been successfully added.");
      setForm({ subject: "", subtopic: "", question: "", answer: "" });
    } catch (err) {
      setErrorMsg(err.message || "Something went wrong!");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-full sm:max-w-2xl mx-auto mt-6 sm:mt-10 px-4 sm:px-6"
    >
      <Card className="shadow-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
        <CardHeader>
          <CardTitle className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100 text-center">
            Add New Question
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form className="space-y-4 sm:space-y-6" onSubmit={handleSubmit}>
            {/* Subject & Subtopic */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
              {/* Subject Dropdown */}
              <div className="flex-1">
                <label className="block mb-1 font-medium text-gray-800 dark:text-gray-200 text-sm sm:text-base">
                  Subject Name
                </label>
                <select
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  required
                  className="w-full p-2 sm:p-3 text-sm sm:text-base border rounded-lg bg-gray-50 dark:bg-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-yellow-400 transition"
                >
                  <option value="">Select Subject</option>
                  {(subjects || []).map(({ id, name }) => (
                    <option key={id} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Subtopic Dropdown */}
              <div className="flex-1">
                <label className="block mb-1 font-medium text-gray-800 dark:text-gray-200 text-sm sm:text-base">
                  Subtopic
                </label>
                <select
                  name="subtopic"
                  value={form.subtopic}
                  onChange={handleChange}
                  required
                  className="w-full p-2 sm:p-3 text-sm sm:text-base border rounded-lg bg-gray-50 dark:bg-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-yellow-400 transition"
                >
                  <option value="">Select Subtopic</option>
                  {(subtopicData || []).map(({ id, name }) => (
                    <option key={id} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Question */}
            <MarkdownEditor
              value={form.question}
              onChange={(val) =>
                setForm((prev) => ({ ...prev, question: val }))
              }
              error={!form.question && errorMsg ? "Question is required" : ""}
              label="Question *"
              placeholder={`Write the question here...\n\nExample:\nWhat is a deadlock? Explain with an example.`}
            />

            {/* Answer */}
            <MarkdownEditor
              value={form.answer}
              onChange={(val) => setForm((prev) => ({ ...prev, answer: val }))}
              error={!form.answer && errorMsg ? "Answer is required" : ""}
              label="Answer *"
              placeholder={`Write the answer here...\n\nExample:\nA **deadlock** occurs when...`}
            />

            {/* Alerts */}
            {successMsg && (
              <Alert className="bg-green-50 border-green-500 dark:bg-green-900/20">
                <AlertTitle className="text-green-700 dark:text-green-400">
                  ✅ Success
                </AlertTitle>
                <AlertDescription className="text-green-600 dark:text-green-300">
                  {successMsg}
                </AlertDescription>
              </Alert>
            )}
            {errorMsg && (
              <Alert className="bg-red-50 border-red-500 dark:bg-red-900/20">
                <AlertTitle className="text-red-700 dark:text-red-400">
                  ❌ Error
                </AlertTitle>
                <AlertDescription className="text-red-600 dark:text-red-300">
                  {errorMsg}
                </AlertDescription>
              </Alert>
            )}

            {/* Submit */}
            <Button
              type="submit"
              disabled={submitting}
              className="w-full cursor-pointer bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-4 py-2 rounded-lg shadow-md transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {submitting && (
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              )}
              {submitting ? "Adding Question..." : "Add Question"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
