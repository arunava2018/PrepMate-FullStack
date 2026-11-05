import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BookOpen,
  Database,
  FilePlus2,
  FilePenLine,
  ListPlus,
  NotebookPen,
  ShieldCheck,
  Trash2,
} from 'lucide-react';
import { Card } from '@/components/ui/card';

const actions = [
  {
    title: 'Add subject',
    description: 'Create a subject and add its description.',
    path: '/admin/addSubject',
    icon: BookOpen,
  },
  {
    title: 'Add subtopic',
    description: 'Organize a subject into focused topics.',
    path: '/admin/addSubtopic',
    icon: ListPlus,
  },
  {
    title: 'Add question',
    description: 'Write a question and answer for a subtopic.',
    path: '/admin/addQuestion',
    icon: FilePlus2,
  },
  {
    title: 'Update question',
    description: 'Edit an existing question or answer.',
    path: '/admin/updateQuestion',
    icon: FilePenLine,
  },
  {
    title: 'Delete question',
    description: 'Remove a question from the question bank.',
    path: '/admin/deleteQuestion',
    icon: Trash2,
    destructive: true,
  },
  {
    title: 'Approve interview experiences',
    description: 'Review interview accounts submitted by learners.',
    path: '/admin/approveExperiences',
    icon: NotebookPen,
  },
  {
    title: 'AI content curator',
    description: 'Generate suggested questions and review them before saving.',
    path: '/admin/aiAgent',
    icon: Database,
  },
];

export default function AdminDashboard() {
  return (
    <div className="mx-auto w-full max-w-[1200px] px-5 py-8 text-[#1f1b16] dark:text-[#efe9de] sm:px-6 md:px-8 md:py-10">
      <header className="mb-8">
        <div className="mb-3 inline-flex items-center gap-2 text-sm text-[#5e554a] dark:text-[#aaa398]">
          <ShieldCheck size={16} strokeWidth={1.7} aria-hidden="true" />
          Content administration
        </div>
        <h1 className="text-3xl font-medium leading-tight tracking-tight">Manage PrepMate content</h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-[#5e554a] dark:text-[#aaa398]">
          Organize subjects and questions, and review interview experiences shared by learners.
        </p>
      </header>

      <aside className="mb-8 flex items-start gap-3 rounded-xl border border-black/10 bg-[#fdfbf7] p-4 dark:border-white/10 dark:bg-[#1c1a18] sm:items-center sm:p-5">
        <BookOpen size={18} className="mt-0.5 shrink-0 text-[#5e554a] dark:text-[#aaa398] sm:mt-0" aria-hidden="true" />
        <p className="text-sm leading-6 text-[#5e554a] dark:text-[#aaa398]">
          <span className="font-medium text-[#1f1b16] dark:text-[#efe9de]">Suggested order:</span> Add a subject, organize it with subtopics, then add questions.
        </p>
      </aside>

      <section aria-labelledby="admin-actions-heading">
        <div className="mb-4 flex items-baseline justify-between gap-4">
          <h2 id="admin-actions-heading" className="text-xl font-medium">Available actions</h2>
          <span className="text-sm tabular-nums text-[#776f65] dark:text-[#8a847a]">{actions.length} tools</span>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {actions.map(({ title, description, path, icon: Icon, destructive }) => (
            <Link
              key={path}
              to={path}
              className="group block rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring">
              <Card className="flex min-h-[132px] h-full flex-row items-start gap-4 rounded-xl border-black/10 bg-[#fdfbf7] p-5 shadow-none transition-colors hover:bg-[#f2eee6] dark:border-white/10 dark:bg-[#1c1a18] dark:hover:bg-[#262421]">
                <span className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-black/10 dark:border-white/10 ${destructive ? 'text-[#a33a32] dark:text-[#e58a82]' : 'text-[#5e554a] dark:text-[#aaa398]'}`}>
                  <Icon size={17} strokeWidth={1.6} aria-hidden="true" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-start justify-between gap-3">
                    <span className="text-[15px] font-medium leading-5 text-[#1f1b16] dark:text-[#efe9de]">{title}</span>
                    <ArrowRight size={16} className="mt-0.5 shrink-0 text-[#776f65] transition-transform group-hover:translate-x-0.5 dark:text-[#8a847a]" aria-hidden="true" />
                  </span>
                  <span className="mt-2 block text-sm leading-5 text-[#5e554a] dark:text-[#aaa398]">{description}</span>
                </span>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
