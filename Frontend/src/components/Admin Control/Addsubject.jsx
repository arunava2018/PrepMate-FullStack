import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import useFetch from "@/hooks/useFetch";
import { addSubject } from "@/db/apiSubjects";

import {
  Server,
  Database,
  Network,
  Workflow,
  Cpu,
  Code2,
  Terminal,
  Lock,
  Cloud,
  GitBranch,
} from "lucide-react";
import Loader from "@/components/Loader";

// Subject related icons
const subjectIcons = [
  { label: "Operating Systems", value: "Server", Icon: Server },
  { label: "DBMS", value: "Database", Icon: Database },
  { label: "Computer Networks", value: "Network", Icon: Network },
  { label: "Algorithms", value: "Workflow", Icon: Workflow },
  { label: "Computer Architecture", value: "Cpu", Icon: Cpu },
  { label: "Programming Languages", value: "Code2", Icon: Code2 },
  { label: "Software Engineering", value: "Terminal", Icon: Terminal },
  { label: "Cyber Security", value: "Lock", Icon: Lock },
  { label: "Cloud Computing", value: "Cloud", Icon: Cloud },
  { label: "Version Control (Git)", value: "GitBranch", Icon: GitBranch },
  { label: "Object-Oriented Programming (OOP)", value: "Code2", Icon: Code2 },
];

export default function AddSubject() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    icon: "",
  });
  const [successMsg, setSuccessMsg] = useState("");

  const { loading, error, fn: saveSubject } = useFetch(addSubject);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await saveSubject(form);
    if (res?.saved) {
      setSuccessMsg(`"${res.subject.name}" has been successfully added.`);
      setForm({ name: "", description: "", icon: "" });
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
            Add New Subject
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Subject Name */}
            <div>
              <label className="block mb-2 font-medium text-gray-800 dark:text-gray-200">
                Subject Name
              </label>
              <Input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter subject name..."
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block mb-2 font-medium text-gray-800 dark:text-gray-200">
                Description
              </label>
              <Textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Enter subject description..."
                rows="4"
                required
              />
            </div>

            {/* Icon Selector with Preview */}
            <div>
              <label className="block mb-2 font-medium text-gray-800 dark:text-gray-200">
                Choose Icon
              </label>
              <div className="flex flex-col gap-2">
                <select
                  name="icon"
                  value={form.icon}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border rounded-lg bg-gray-50 dark:bg-gray-900 dark:text-gray-100"
                >
                  <option value="">Select Icon</option>
                  {subjectIcons.map(({ label, value }) => (
                    <option key={value} value={value}>
                      {label} ({value})
                    </option>
                  ))}
                </select>

                {/* Preview Selected Icon */}
                {form.icon && (
                  <div className="flex items-center gap-2 mt-2">
                    {(() => {
                      const SelectedIcon =
                        subjectIcons.find((i) => i.value === form.icon)?.Icon ||
                        null;
                      return SelectedIcon ? (
                        <SelectedIcon className="w-6 h-6 text-yellow-500" />
                      ) : null;
                    })()}
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      Preview: {form.icon}
                    </span>
                  </div>
                )}
              </div>
            </div>

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

            {error && (
              <Alert className="bg-red-50 border-red-500 dark:bg-red-900/20">
                <AlertTitle className="text-red-700 dark:text-red-400">
                  ❌ Error
                </AlertTitle>
                <AlertDescription className="text-red-600 dark:text-red-300">
                  {error.message}
                </AlertDescription>
              </Alert>
            )}

            {/* Submit */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
            >
              {loading ? "Saving..." : "Add Subject"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
