import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

import useFetch from '@/hooks/useFetch';
import { getSubjects } from '@/db/apiSubjects';
import { fetchSubtopics } from '@/db/apiSubtopic';
import { addQuestion } from '@/db/apiQuestion';
import MarkdownEditor from '../submit-experience-form/MarkdownEditor';

export default function AddQuestion() {
  const [form, setForm] = useState({
    subjectId: '',
    subtopicId: '',
    question: '',
    answer: '',
  });

  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const { data: subjects, fn: fnSubjects } = useFetch(getSubjects);
  const { data: subtopics, fn: fnSubtopics } = useFetch(fetchSubtopics);

  // Fetch subjects once
  useEffect(() => {
    fnSubjects();
  }, []);

  // Fetch subtopics when subject changes
  useEffect(() => {
    if (form.subjectId) {
      fnSubtopics({ subjectId: form.subjectId });
      setForm((prev) => ({ ...prev, subtopicId: '' }));
    }
  }, [form.subjectId]);

  // Auto-clear alerts
  useEffect(() => {
    if (successMsg || errorMsg) {
      const timer = setTimeout(() => {
        setSuccessMsg('');
        setErrorMsg('');
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
      await addQuestion({
        subjectId: form.subjectId,
        subtopicId: form.subtopicId,
        question: form.question,
        answer: form.answer,
      });
      setSuccessMsg('Question has been successfully added.');
      setForm({ subjectId: '', subtopicId: '', question: '', answer: '' });
    } catch (err) {
      setErrorMsg(err.message || 'Something went wrong!');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-full sm:max-w-2xl mx-auto mt-6 sm:mt-10 px-4 sm:px-6">
      <Card className="shadow-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
        <CardHeader>
          <CardTitle className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100 text-center">
            Add New Question
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form className="space-y-4 sm:space-y-6" onSubmit={handleSubmit}>
            {/* Subject & Subtopic Dropdowns */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
              {/* Subject Dropdown */}
              <div className="flex-1">
                <label className="block mb-1 font-medium">Subject</label>
                <select
                  name="subjectId"
                  value={form.subjectId}
                  onChange={handleChange}
                  required
                  className="w-full p-2 sm:p-3 border rounded-lg 
             bg-gray-50 text-gray-900 
             dark:bg-gray-800 dark:text-gray-100 
             focus:ring-2 focus:ring-yellow-400 transition">
                  <option value="">Select Subject</option>
                  {Array.isArray(subjects) &&
                    subjects.map(({ id, name }) => (
                      <option key={id} value={id}>
                        {name}
                      </option>
                    ))}
                </select>
              </div>

              {/* Subtopic Dropdown */}
              <div className="flex-1">
                <label className="block mb-1 font-medium">Subtopic</label>
                <select
                  name="subtopicId"
                  value={form.subtopicId}
                  onChange={handleChange}
                  required
                  className="w-full p-2 sm:p-3 border rounded-lg 
             bg-gray-50 text-gray-900 
             dark:bg-gray-800 dark:text-gray-100 
             focus:ring-2 focus:ring-yellow-400 transition">
                  <option value="">Select Subtopic</option>
                  {Array.isArray(subtopics) &&
                    subtopics.map(({ id, name }) => (
                      <option key={id} value={id}>
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
              label="Question *"
              placeholder="Write the question here..."
            />

            {/* Answer */}
            <MarkdownEditor
              value={form.answer}
              onChange={(val) => setForm((prev) => ({ ...prev, answer: val }))}
              label="Answer *"
              placeholder="Write the answer here..."
            />

            {/* Alerts */}
            {successMsg && (
              <Alert className="bg-green-50 border-green-500">
                <AlertTitle>✅ Success</AlertTitle>
                <AlertDescription>{successMsg}</AlertDescription>
              </Alert>
            )}
            {errorMsg && (
              <Alert className="bg-red-50 border-red-500">
                <AlertTitle>❌ Error</AlertTitle>
                <AlertDescription>{errorMsg}</AlertDescription>
              </Alert>
            )}

            {/* Submit */}
            <Button
              type="submit"
              disabled={submitting}
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-4 py-2 rounded-lg">
              {submitting ? 'Adding Question...' : 'Add Question'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
