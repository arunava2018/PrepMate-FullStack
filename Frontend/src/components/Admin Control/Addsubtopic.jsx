import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import useFetch from "@/hooks/useFetch";
import { getSubjects } from "@/db/apiSubjects";
import { addSubtopic } from "@/db/apiSubtopic";

function Addsubtopic() {
  const [form, setForm] = useState({ subject: "", name: "" });
  const [successMsg, setSuccessMsg] = useState("");

  const { data, loading, error, fn: fnSubjects } = useFetch(getSubjects);
  const { fn: fnSubtopic } = useFetch(addSubtopic);

  useEffect(() => {
    fnSubjects();
  }, [form]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fnSubtopic(form);
    if (res) {
      setSuccessMsg(`Subtopic "${res.name}" has been successfully added.`);
      setForm({ name: "" });
    }
  };

  // Auto-dismiss alerts after 2.5s
  useEffect(() => {
    if (successMsg || error) {
      const timer = setTimeout(() => setSuccessMsg(""), 2500);
      return () => clearTimeout(timer);
    }
  }, [successMsg, error]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-2xl mx-auto mt-10"
    >
      <Card className="shadow-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100 text-center">
            Add New Subtopic
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Subject Name */}
            <div>
              <label className="block mb-2 font-medium text-gray-800 dark:text-gray-200">
                Subject Name
              </label>
              <select
                name="subject"
                value={form.subject}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-lg bg-gray-50 dark:bg-gray-900 dark:text-gray-100"
              >
                <option value="">Select Subject</option>
                {(data || []).map(({ id, name }) => (
                  <option key={id} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </div>

            {/* Subtopic Name */}
            <div>
              <label className="block mb-2 font-medium text-gray-800 dark:text-gray-200">
                Add Subtopic
              </label>
              <Input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter subtopic..."
                required
              />
            </div>

            {/* Animated Alerts */}
            <AnimatePresence>
              {successMsg && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <Alert className="bg-green-50 border-green-500 dark:bg-green-900/20">
                    <AlertTitle className="text-green-700 dark:text-green-400">
                      ✅ Success
                    </AlertTitle>
                    <AlertDescription className="text-green-600 dark:text-green-300">
                      {successMsg}
                    </AlertDescription>
                  </Alert>
                </motion.div>
              )}

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <Alert className="bg-red-50 border-red-500 dark:bg-red-900/20">
                    <AlertTitle className="text-red-700 dark:text-red-400">
                      ❌ Error
                    </AlertTitle>
                    <AlertDescription className="text-red-600 dark:text-red-300">
                      {error.message}
                    </AlertDescription>
                  </Alert>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
            >
              {loading ? "Saving..." : "Add Subtopic"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default Addsubtopic;
