import { ArrowRight, BookOpenCheck, MessagesSquare, SquareCheckBig } from 'lucide-react';
import { Link } from 'react-router-dom';

const points = [
  {
    number: '01',
    icon: BookOpenCheck,
    title: 'Practice by subject',
    description: 'Work through computer science questions grouped into subjects and subtopics.',
  },
  {
    number: '02',
    icon: SquareCheckBig,
    title: 'Keep track of what you have covered',
    description: 'Mark questions as complete and see your progress for each subject.',
  },
  {
    number: '03',
    icon: MessagesSquare,
    title: 'Learn from shared experiences',
    description: 'Read interview accounts from developers and share an account of your own.',
  },
];

export default function AboutUs() {
  return (
    <div className="text-[#1f1b16] dark:text-[#efe9de]">
      <header className="mx-auto w-full max-w-5xl px-5 pb-10 pt-14 sm:px-6 sm:pb-12 sm:pt-20 md:px-8">
        <p className="mb-4 text-sm text-[#5e554a] dark:text-[#aaa398]">About PrepMate</p>
        <h1 className="max-w-3xl text-3xl font-medium leading-tight tracking-tight sm:text-5xl">
          A steadier way to prepare for CS interviews
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-7 text-[#5e554a] dark:text-[#aaa398]">
          PrepMate brings subject-based computer science practice, progress tracking, and interview accounts shared by developers into one study space.
        </p>
      </header>

      <section className="mx-auto w-full max-w-5xl border-t border-black/10 px-5 py-8 dark:border-white/10 sm:px-6 md:px-8" aria-label="How PrepMate works">
        <ol className="divide-y divide-black/10 dark:divide-white/10">
          {points.map(({ number, icon: Icon, title, description }) => (
            <li key={number} className="grid gap-3 py-6 sm:grid-cols-[56px_1fr] sm:gap-5">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-black/10 text-[#5e554a] dark:border-white/10 dark:text-[#aaa398]">
                <Icon size={17} strokeWidth={1.6} aria-hidden="true" />
              </span>
              <div>
                <p className="text-xs tabular-nums text-[#776f65] dark:text-[#8a847a]">{number}</p>
                <h2 className="mt-1 text-lg font-medium leading-6">{title}</h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-[#5e554a] dark:text-[#aaa398]">{description}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="mx-auto flex w-full max-w-5xl flex-col gap-4 border-t border-black/10 px-5 py-10 dark:border-white/10 sm:flex-row sm:items-center sm:gap-6 sm:px-6 md:px-8">
        <Link to="/dashboard" className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-[#2459a6] px-4 text-sm font-medium text-white transition-colors hover:bg-[#1d4a8a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring dark:bg-[#a8c7f3] dark:text-[#111a27] dark:hover:bg-[#91b8ef]">
          Explore subjects <ArrowRight size={16} aria-hidden="true" />
        </Link>
        <Link to="/view-interview-experiences" className="inline-flex h-10 items-center justify-center rounded-md px-3 text-sm font-medium text-[#5e554a] transition-colors hover:bg-[#efe9df] hover:text-[#1f1b16] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring dark:text-[#aaa398] dark:hover:bg-[#262421] dark:hover:text-[#efe9de]">
          Read interview accounts
        </Link>
      </section>
    </div>
  );
}
