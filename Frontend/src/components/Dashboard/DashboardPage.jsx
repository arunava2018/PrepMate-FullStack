import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { getSubjects } from '@/db/apiSubjects';
import { getProgress } from '@/db/apiProgress';
import useFetch from '@/hooks/useFetch';
import { Skeleton } from '@/components/ui/skeleton';
import { getIcon } from '@/utils/iconmap';
import { UrlState } from '@/context';
import DashboardInfo from './DashboardInfo';

const slugify = (text) =>
  text
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '-')
    .replace(/[^a-zA-Z0-9-]/g, '')
    .trim();

function DashboardSkeleton() {
  return <div className="mx-auto w-full max-w-[1440px] px-5 py-8 sm:px-6 md:px-8" role="status" aria-label="Loading study plan"><Skeleton className="h-8 w-56"/><Skeleton className="mt-3 h-4 w-80 max-w-full"/><div className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4">{[0,1,2,3].map((item)=><Skeleton key={item} className="h-24 rounded-xl"/>)}</div><div className="mt-9 flex items-center justify-between"><Skeleton className="h-6 w-28"/><Skeleton className="h-4 w-20"/></div><div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">{[0,1,2].map((item)=><Skeleton key={item} className="h-52 rounded-xl"/>)}</div></div>;
}

const DashboardPage = () => {
  const { user } = UrlState();
  const {
    data: subjects,
    loading,
    error,
    fn: fetchSubjects,
  } = useFetch(getSubjects);
  const [progressMap, setProgressMap] = useState({});
  const [progressLoading, setProgressLoading] = useState(false);
  const isLoggedIn = !!user?.id;

  useEffect(() => {
    fetchSubjects();
  }, []);

  useEffect(() => {
    if (!isLoggedIn || !subjects?.length) {
      setProgressMap({});
      setProgressLoading(false);
      return;
    }

    let active = true;
    setProgressLoading(true);
    Promise.all(
      subjects.map(async (subject) => {
        try {
          const data = await getProgress(user.id, subject.id);
          return [subject.id, { progress: data?.progress || 0, completedQ: data?.completedQ || 0 }];
        } catch {
          return [subject.id, { progress: 0, completedQ: 0 }];
        }
      })
    ).then((entries) => {
      if (active) {
        setProgressMap(Object.fromEntries(entries));
        setProgressLoading(false);
      }
    });

    return () => { active = false; };
  }, [isLoggedIn, subjects, user?.id]);

  if (loading) return <DashboardSkeleton />;

  if (error) {
    return (
      <section className="mx-auto max-w-5xl px-6 py-12">
        <h1 className="text-3xl font-medium text-[#1f1b16] dark:text-[#efe9de]">Your study plan</h1>
        <p role="alert" className="mt-6 rounded-xl border border-destructive/20 bg-destructive/5 p-5 text-sm text-destructive">
          Couldn’t load subjects. {error.message}
        </p>
      </section>
    );
  }

  return (
    <div className="mx-auto w-full max-w-[1440px] px-5 py-8 text-[#1f1b16] dark:text-[#efe9de] sm:px-6 md:px-8">
      <header className="mb-8">
        <h1 className="text-3xl font-medium leading-tight tracking-tight">{isLoggedIn ? 'Your study plan' : 'Browse CS subjects'}</h1>
        <p className="mt-2 text-sm leading-6 text-[#5e554a] dark:text-[#aaa398]">
          {isLoggedIn ? 'Pick a subject and continue your interview preparation.' : 'Explore the subjects available for interview preparation.'}
        </p>
      </header>

      <DashboardInfo subjects={subjects || []} progressMap={progressMap} progressLoading={progressLoading} />

      <section aria-labelledby="subjects-heading">
        <div className="mb-4 flex items-baseline justify-between gap-4">
          <h2 id="subjects-heading" className="text-xl font-medium">Subjects</h2>
          <span className="text-sm tabular-nums text-[#776f65] dark:text-[#8a847a]">{subjects?.length || 0} available</span>
        </div>

        {subjects?.length ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {subjects.map((subject) => {
              const Icon = getIcon(subject.icon);
              const progress = progressMap[subject.id]?.progress || 0;
              const card = (
                <Card className="h-full min-h-[208px] gap-0 rounded-xl border-black/10 bg-[#fdfbf7] p-5 shadow-none transition-colors hover:bg-[#f2eee6] dark:border-white/10 dark:bg-[#1c1a18] dark:hover:bg-[#262421]">
                  <div className="flex items-start gap-3">
                    <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-black/10 text-[#5e554a] dark:border-white/10 dark:text-[#aaa398]">
                      <Icon size={18} strokeWidth={1.6} aria-hidden="true" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-base font-medium leading-6">{subject.name}</h3>
                      <p className="mt-1 line-clamp-2 min-h-10 text-sm leading-5 text-[#5e554a] dark:text-[#aaa398]">
                        {subject.description || 'Computer science practice questions'}
                      </p>
                    </div>
                    {isLoggedIn && <ArrowUpRight size={16} className="mt-1 shrink-0 text-[#776f65] dark:text-[#8a847a]" aria-hidden="true" />}
                  </div>

                  <div className="mt-auto pt-6">
                    <div className="mb-2 flex items-center justify-between text-xs text-[#776f65] dark:text-[#8a847a]">
                      <span>{subject.question_count || 0} questions</span>
                      {isLoggedIn && (
                        <span className="tabular-nums">
                          {progressLoading ? 'Loading progress' : `${Math.round(progress)}% complete`}
                        </span>
                      )}
                    </div>
                    {isLoggedIn && (
                      <div
                        role="progressbar"
                        aria-label={`${subject.name} progress`}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-valuenow={Math.round(progress)}
                        className="h-[3px] overflow-hidden rounded-full bg-black/10 dark:bg-white/10">
                        <span className="block h-full origin-left bg-[#386eb8] dark:bg-[#a8c7f3]" style={{ transform: `scaleX(${Math.min(100, Math.max(0, progress)) / 100})` }} />
                      </div>
                    )}
                  </div>
                </Card>
              );

              return isLoggedIn ? (
                <Link
                  key={subject.id}
                  to={`/subject/${slugify(subject.name)}/${subject.id}`}
                  aria-label={`Open ${subject.name} practice`}
                  className="block rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring">
                  {card}
                </Link>
              ) : <div key={subject.id}>{card}</div>;
            })}
          </div>
        ) : (
          <p className="rounded-xl border border-black/10 bg-[#fdfbf7] p-5 text-sm text-[#5e554a] dark:border-white/10 dark:bg-[#1c1a18] dark:text-[#aaa398]">
            No subjects are available yet.
          </p>
        )}
      </section>
    </div>
  );
};

export default DashboardPage;
