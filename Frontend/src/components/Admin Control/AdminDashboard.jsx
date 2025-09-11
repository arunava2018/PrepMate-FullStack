import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UrlState } from "@/context";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { motion } from "framer-motion";
import {
  FilePlus,
  BookOpen,
  ListPlus,
  Shield,
  FileEdit,
  NotebookPen,
  FolderEdit,
  Trash2,
  Settings,
  Database,
} from "lucide-react";
import Loader from "@/components/Loader";
import path from "path";

export default function AdminDashboard() {
  const { user } = UrlState();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const cards = [
    {
      title: "Add Subject",
      desc: "Introduce a new subject with its description.",
      path: "/admin/addSubject",
      icon: <BookOpen className="w-6 h-6 text-blue-500 dark:text-blue-400" />,
      bgColor: "bg-blue-50 dark:bg-blue-900/10",
      borderColor: "hover:border-blue-200 dark:hover:border-blue-800",
    },
    {
      title: "Add Subtopic",
      desc: "Organize subjects by adding structured subtopics.",
      path: "/admin/addSubtopic",
      icon: <ListPlus className="w-6 h-6 text-green-500 dark:text-green-400" />,
      bgColor: "bg-green-50 dark:bg-green-900/10",
      borderColor: "hover:border-green-200 dark:hover:border-green-800",
    },
    {
      title: "Add Question",
      desc: "Create new questions with subject & subtopic mapping.",
      path: "/admin/addQuestion",
      icon: (
        <FilePlus className="w-6 h-6 text-yellow-500 dark:text-yellow-400" />
      ),
      bgColor: "bg-yellow-50 dark:bg-yellow-900/10",
      borderColor: "hover:border-yellow-200 dark:hover:border-yellow-800",
    },
    {
      title: "Update Question",
      desc: "Edit or modify existing questions.",
      path: "/admin/updateQuestion",
      icon: (
        <FileEdit className="w-6 h-6 text-purple-500 dark:text-purple-400" />
      ),
      bgColor: "bg-purple-50 dark:bg-purple-900/10",
      borderColor: "hover:border-purple-200 dark:hover:border-purple-800",
    },
    {
      title: "Delete Question",
      desc: "Remove questions from the database.",
      path: "/admin/deleteQuestion",
      icon: <Trash2 className="w-6 h-6 text-red-500 dark:text-red-400" />,
      bgColor: "bg-red-50 dark:bg-red-900/10",
      borderColor: "hover:border-red-300 dark:hover:border-red-800",
    },
    {
      title : "Approve Interview Experiences",
      desc: "Review and approve user-submitted interview experiences.",
      path: "/admin/approveExperiences",
      icon: <NotebookPen className="w-6 h-6 text-indigo-500 dark:text-indigo-400" />,
      bgColor: "bg-indigo-50 dark:bg-indigo-900/10",
      borderColor: "hover:border-indigo-200 dark:hover:border-indigo-800",  
    }
  ];

  const handleNavigate = (path) => {
    setLoading(true);
    navigate(path);
  };

  if (loading) return <Loader />;

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6">
      {/* Header */}
      <motion.div
        className="flex items-center gap-4 mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-3">
          <Shield className="w-8 h-8 text-red-500" />
          <h1 className="lg:text-3xl text-2xl font-bold text-gray-900 dark:text-gray-100">
            Hello, {user?.name || "Admin"}
          </h1>
        </div>
        <motion.span
          className="bg-gradient-to-r from-red-400 to-red-500 text-white text-[14px] md:text-[15px] px-2 py-1 rounded-full shadow-lg font-medium whitespace-nowrap relative transition-all duration-300 ease-in-out"
          whileHover={{
            scale: 1.05,
            boxShadow: "inset 0 0 12px rgba(255, 255, 255, 0.3)",
          }}
          transition={{ duration: 0.3 }}
          style={{
            boxShadow: "inset 0 0 6px rgba(255, 255, 255, 0.2)",
          }}
        >
          <span>Admin</span>
        </motion.span>
      </motion.div>

      {/* Compact Context Section */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800">
          <CardHeader className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-800/30">
                <Database className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="flex-1">
                <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">
                  Content Management System
                </CardTitle>
                <CardDescription className="text-gray-700 dark:text-gray-300 text-sm">
                  Your central hub for managing educational content database -
                  create, update, and organize subjects, subtopics, and
                  questions efficiently.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>
      </motion.div>

      {/* Section Title */}
      <motion.div
        className="mb-6"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
          <Settings className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          Administrative Actions
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mt-1 text-sm">
          Choose an action below to manage your content database
        </p>
      </motion.div>

      {/* Quick Start Guide */}
      <motion.div
        className="mb-8 p-6 bg-yellow-50 dark:bg-yellow-900/30 rounded-xl border-2 border-yellow-300 dark:border-yellow-600 shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        whileHover={{ scale: 1.02 }}
      >
        <div className="flex items-center justify-center gap-3">
          <div className="p-2 bg-yellow-200 dark:bg-yellow-800 rounded-full">
            <span className="text-xl">💡</span>
          </div>
          <p className="text-base font-bold text-gray-900 dark:text-gray-100 text-center">
            <span className="text-yellow-700 dark:text-yellow-300 font-extrabold">
              Quick Start Guide:
            </span>
            <br />
            <span className="text-gray-700 dark:text-gray-300">
              Begin by adding{" "}
              <span className="font-extrabold text-blue-600 dark:text-blue-400">
                Subjects
              </span>{" "}
              → then{" "}
              <span className="font-extrabold text-green-600 dark:text-green-400">
                Subtopics
              </span>{" "}
              → finally{" "}
              <span className="font-extrabold text-purple-600 dark:text-purple-400">
                Questions
              </span>{" "}
              for optimal organization
            </span>
          </p>
        </div>
      </motion.div>

      {/* Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {cards.map((card, idx) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.15 + 0.6, duration: 0.4 }}
            whileHover={{ scale: 1.02, y: -4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleNavigate(card.path)}
            className="cursor-pointer"
          >
            <Card
              className={`h-full shadow-md hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 ${card.borderColor}`}
            >
              <CardHeader className="p-6 flex flex-col gap-4">
                <motion.div
                  className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800 inline-block"
                  whileHover={{ rotate: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  {card.icon}
                </motion.div>
                <div>
                  <CardTitle className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    {card.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {card.desc}
                  </CardDescription>
                </div>
                <span className="mt-2 text-xs text-gray-500 dark:text-gray-400 font-medium">
                  Click to continue →
                </span>
              </CardHeader>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
