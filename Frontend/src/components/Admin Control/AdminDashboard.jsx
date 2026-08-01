import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UrlState } from '@/context';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { motion } from 'framer-motion';
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
} from 'lucide-react';
import Loader from '@/components/Loader';

export default function AdminDashboard() {
  const { user } = UrlState();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const cards = [
    {
      title: 'Add Subject',
      desc: 'Introduce a new subject with its description.',
      path: '/admin/addSubject',
      icon: <BookOpen className="w-6 h-6 text-primary" />,
    },
    {
      title: 'Add Subtopic',
      desc: 'Organize subjects by adding structured subtopics.',
      path: '/admin/addSubtopic',
      icon: <ListPlus className="w-6 h-6 text-primary" />,
    },
    {
      title: 'Add Question',
      desc: 'Create new questions with subject & subtopic mapping.',
      path: '/admin/addQuestion',
      icon: <FilePlus className="w-6 h-6 text-primary" />,
    },
    {
      title: 'Update Question',
      desc: 'Edit or modify existing questions.',
      path: '/admin/updateQuestion',
      icon: <FileEdit className="w-6 h-6 text-primary" />,
    },
    {
      title: 'Delete Question',
      desc: 'Remove questions from the database.',
      path: '/admin/deleteQuestion',
      icon: <Trash2 className="w-6 h-6 text-destructive" />,
    },
    {
      title: 'Approve Interview Experiences',
      desc: 'Review and approve user-submitted interview experiences.',
      path: '/admin/approveExperiences',
      icon: <NotebookPen className="w-6 h-6 text-primary" />,
    },
    {
      title: 'AI Content Curator Agent',
      desc: 'Autonomously search web & add top interview questions via AI Agent tools.',
      path: '/admin/aiAgent',
      icon: <Database className="w-6 h-6 text-purple-600" />,
    },
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
        transition={{ duration: 0.5 }}>
        <div className="flex items-center gap-3">
          <Shield className="w-8 h-8 text-primary" />
          <h1 className="lg:text-3xl text-2xl font-bold text-foreground">
            Hello, {user?.full_name || 'Admin'}
          </h1>
        </div>
        <motion.span
          className="bg-primary/10 text-primary border border-primary/20 text-[14px] md:text-[15px] px-3 py-1 rounded-full font-medium whitespace-nowrap relative"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}>
          <span>Admin</span>
        </motion.span>
      </motion.div>

      {/* Compact Context Section */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}>
        <Card className="bg-card border-border">
          <CardHeader className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Database className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <CardTitle className="text-lg font-semibold text-foreground mb-1">
                  Content Management System
                </CardTitle>
                <CardDescription className="text-muted-foreground text-sm">
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
        transition={{ delay: 0.4, duration: 0.5 }}>
        <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
          <Settings className="w-5 h-5 text-muted-foreground" />
          Administrative Actions
        </h2>
        <p className="text-muted-foreground mt-1 text-sm">
          Choose an action below to manage your content database
        </p>
      </motion.div>

      {/* Quick Start Guide */}
      <motion.div
        className="mb-8 p-6 bg-muted/30 rounded-xl border border-border shadow-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <div className="p-2 bg-primary/10 text-primary rounded-full">
            <span className="text-xl">💡</span>
          </div>
          <p className="text-sm font-medium text-foreground text-center sm:text-left">
            <span className="font-bold">Quick Start Guide: </span>
            Begin by adding <span className="text-primary font-semibold">Subjects</span> → then <span className="text-primary font-semibold">Subtopics</span> → finally <span className="text-primary font-semibold">Questions</span> for optimal organization.
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
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleNavigate(card.path)}
            className="cursor-pointer">
            <Card
              className={`h-full shadow-sm hover:shadow-md transition-all duration-300 bg-card border border-border hover:border-primary/50`}>
              <CardHeader className="p-6 flex flex-col gap-4">
                <motion.div
                  className="p-3 rounded-xl bg-primary/10 inline-block self-start"
                  whileHover={{ rotate: 5 }}
                  transition={{ duration: 0.2 }}>
                  {card.icon}
                </motion.div>
                <div>
                  <CardTitle className="text-lg font-semibold text-foreground mb-2">
                    {card.title}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground leading-relaxed">
                    {card.desc}
                  </CardDescription>
                </div>
              </CardHeader>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
