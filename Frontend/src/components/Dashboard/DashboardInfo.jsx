import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { UrlState } from '@/context';

function DashboardInfo({ subjects = [], progressMap = {}, progressLoading = false }) {
  const { user } = UrlState();

  if (!user?.id) {
    return (
      <section className="mb-8 flex flex-col gap-5 rounded-xl border border-black/10 bg-[#fdfbf7] p-5 dark:border-white/10 dark:bg-[#1c1a18] sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div className="max-w-2xl">
          <h2 className="text-lg font-medium text-[#1f1b16] dark:text-[#efe9de]">Keep your practice in one place</h2>
          <p className="mt-2 text-sm leading-6 text-[#5e554a] dark:text-[#aaa398]">Sign in to track completed questions by subject and return to your study plan.</p>
        </div>
        <div className="flex shrink-0 items-center gap-4">
          <Link to="/auth/login" className="text-sm font-medium text-[#5e554a] underline-offset-4 hover:text-[#1f1b16] hover:underline dark:text-[#aaa398] dark:hover:text-[#efe9de]">Log in</Link>
          <Link to="/auth/signup" className="inline-flex h-10 items-center gap-2 rounded-lg bg-[#2459a6] px-4 text-sm font-medium text-white transition-colors hover:bg-[#1d4a8a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring">Create account <ArrowRight size={16} /></Link>
        </div>
      </section>
    );
  }

  const totalQuestions = subjects.reduce((sum, subject) => sum + (subject.question_count || 0), 0);
  const completedQuestions = Object.values(progressMap).reduce((sum, item) => sum + (item?.completedQ || 0), 0);
  const averageProgress = totalQuestions ? Math.round((completedQuestions / totalQuestions) * 100) : 0;
  const stats = [
    { label: 'Subjects', value: subjects.length },
    { label: 'Questions', value: totalQuestions.toLocaleString() },
    { label: 'Completed', value: completedQuestions.toLocaleString() },
    { label: 'Overall progress', value: `${averageProgress}%` },
  ];

  return (
    <section aria-label="Study summary" className="mb-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
      {stats.map((stat) => (
        <div key={stat.label} className="rounded-xl border border-black/10 bg-[#fdfbf7] p-4 dark:border-white/10 dark:bg-[#1c1a18] sm:p-5">
          <p className="text-sm text-[#5e554a] dark:text-[#aaa398]">{stat.label}</p>
          <p className="mt-3 text-3xl font-medium tabular-nums text-[#1f1b16] dark:text-[#efe9de]">
            {progressLoading && stat.label !== 'Subjects' ? <span className="text-muted-foreground">—</span> : stat.value}
          </p>
        </div>
      ))}
    </section>
  );
}

export default DashboardInfo;
