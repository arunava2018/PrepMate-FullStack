import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { CalendarDays, ChevronDown, Eye, FileText, Plus, Trash2 } from 'lucide-react';
import { fetchUserInterviewExperiences, deleteExperience } from '@/db/apiInterviewExperience';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '../ui/button';
import { Skeleton } from '@/components/ui/skeleton';

const surface = 'rounded-xl border border-black/10 bg-[#fdfbf7] dark:border-white/10 dark:bg-[#1c1a18]';

function formatDate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'Date unavailable';
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

export default function UserExperiences({ userId }) {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);
  const [error, setError] = useState('');

  const loadData = useCallback(async () => {
    if (!userId) {
      setExperiences([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError('');
    try {
      const data = await fetchUserInterviewExperiences(userId);
      setExperiences(Array.isArray(data) ? data : []);
    } catch {
      setError('We couldn’t load your interview accounts. Try again in a moment.');
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const groupedExperiences = useMemo(() => {
    const groups = new Map();
    experiences.forEach((experience) => {
      const company = experience.company_name?.trim() || 'Company not listed';
      const key = company.toLocaleLowerCase();
      if (!groups.has(key)) groups.set(key, { key, company, experiences: [] });
      groups.get(key).experiences.push(experience);
    });
    return [...groups.values()]
      .map((group) => ({
        ...group,
        experiences: [...group.experiences].sort((left, right) => {
          const leftTime = new Date(left.created_at).getTime() || 0;
          const rightTime = new Date(right.created_at).getTime() || 0;
          return rightTime - leftTime;
        }),
      }))
      .sort((left, right) => left.company.localeCompare(right.company));
  }, [experiences]);

  const handleDelete = async (id) => {
    setDeleting(id);
    setError('');
    try {
      await deleteExperience(id);
      setExperiences((current) => current.filter((experience) => experience.id !== id));
    } catch {
      setError('We couldn’t delete that account. Try again.');
    } finally {
      setDeleting(null);
    }
  };

  if (loading) {
    return (
      <section className={surface} aria-label="Loading interview experiences" aria-busy="true">
        <div className="border-b border-black/10 px-5 py-4 dark:border-white/10 sm:px-6">
          <Skeleton className="h-5 w-48 bg-[#efe9df] dark:bg-[#262421]" />
          <Skeleton className="mt-2 h-4 w-64 max-w-full bg-[#efe9df] dark:bg-[#262421]" />
        </div>
        <div className="divide-y divide-black/10 px-5 dark:divide-white/10 sm:px-6">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="flex items-center justify-between gap-4 py-5">
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-56 max-w-full bg-[#efe9df] dark:bg-[#262421]" />
                <Skeleton className="h-3 w-40 max-w-full bg-[#efe9df] dark:bg-[#262421]" />
              </div>
              <Skeleton className="h-8 w-24 bg-[#efe9df] dark:bg-[#262421]" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className={surface} aria-labelledby="experiences-title">
      <header className="flex flex-col gap-3 border-b border-black/10 px-5 py-4 dark:border-white/10 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <h2 id="experiences-title" className="text-base font-medium">Interview experiences</h2>
          <p className="mt-1 text-sm text-[#5e554a] dark:text-[#aaa398]">Your shared accounts, grouped by company</p>
        </div>
        <span className="text-sm tabular-nums text-[#776f65] dark:text-[#8a847a]">
          {experiences.length} {experiences.length === 1 ? 'account' : 'accounts'} across {groupedExperiences.length} {groupedExperiences.length === 1 ? 'company' : 'companies'}
        </span>
      </header>

      {error && (
        <div role="alert" className="mx-5 mt-4 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-[#a33a32]/20 bg-[#a33a32]/5 px-4 py-3 text-sm text-[#8f3029] dark:text-[#e58a82] sm:mx-6">
          <span>{error}</span>
          <button type="button" onClick={loadData} className="rounded-sm font-medium underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring">Reload experiences</button>
        </div>
      )}

      {experiences.length === 0 ? (
        <div className="px-5 py-10 text-center sm:px-6">
          <FileText size={19} className="mx-auto text-[#776f65] dark:text-[#8a847a]" aria-hidden="true" />
          <h3 className="mt-3 text-base font-medium">No experiences shared yet</h3>
          <p className="mx-auto mt-1 max-w-md text-sm leading-5 text-[#5e554a] dark:text-[#aaa398]">
            Add an interview account to keep your preparation notes and share what you learned.
          </p>
          <Link to="/share-experience" className="mt-4 inline-flex h-9 items-center gap-2 rounded-md bg-[#2459a6] px-3 text-sm font-medium text-white transition-colors hover:bg-[#1d4a8a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring">
            <Plus size={15} aria-hidden="true" /> Share an experience
          </Link>
        </div>
      ) : (
        <div className="space-y-2 p-4 sm:p-5">
          {groupedExperiences.map(({ key, company, experiences: companyExperiences }) => (
            <details key={key} className="group rounded-lg border border-black/10 bg-[#f7f4ee] dark:border-white/10 dark:bg-[#161513]">
              <summary className="flex min-h-12 cursor-pointer list-none items-center gap-3 rounded-lg px-4 py-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring [&::-webkit-details-marker]:hidden">
                <span className="min-w-0 flex-1 truncate text-sm font-medium text-[#1f1b16] dark:text-[#efe9de]">{company}</span>
                <span className="shrink-0 text-xs tabular-nums text-[#5e554a] dark:text-[#aaa398]">
                  {companyExperiences.length} {companyExperiences.length === 1 ? 'account' : 'accounts'}
                </span>
                <ChevronDown size={16} className="shrink-0 text-[#776f65] transition-transform duration-150 group-open:rotate-180 dark:text-[#8a847a]" aria-hidden="true" />
              </summary>

              <div className="divide-y divide-black/10 border-t border-black/10 px-4 dark:divide-white/10 dark:border-white/10">
                {companyExperiences.map((experience) => {
                  const pending = !experience.is_public;
                  const title = experience.role || 'Interview account';

                  return (
                    <article key={experience.id} className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-5">
                      <div className="min-w-0 flex-1">
                        <h3 className="flex items-start gap-2 text-sm font-medium leading-5 text-[#1f1b16] dark:text-[#efe9de]">
                          <FileText size={15} className="mt-0.5 shrink-0 text-[#5e554a] dark:text-[#aaa398]" aria-hidden="true" />
                          <span className="line-clamp-2">{title}</span>
                        </h3>
                        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 pl-6 text-xs text-[#5e554a] dark:text-[#aaa398]">
                          <span className={`inline-flex items-center gap-2 ${pending ? 'text-[#2459a6] dark:text-[#a8c7f3]' : 'text-[#39734f] dark:text-[#9bc5a6]'}`}>
                            <span className={`h-3.5 w-0.5 rounded-full ${pending ? 'bg-[#386eb8] dark:bg-[#a8c7f3]' : 'bg-[#5d916c] dark:bg-[#9bc5a6]'}`} aria-hidden="true" />
                            {pending ? 'In review' : 'Published'}
                          </span>
                          <span className="inline-flex items-center gap-1.5"><CalendarDays size={13} aria-hidden="true" />{formatDate(experience.created_at)}</span>
                        </div>
                      </div>

                      <div className="flex shrink-0 items-center gap-2 pl-6 sm:pl-0">
                        {pending ? (
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button type="button" variant="outline" size="sm" disabled={deleting === experience.id} className="h-8 gap-1.5 rounded-md border-[#a33a32]/25 px-2.5 text-[#8f3029] shadow-none hover:bg-[#a33a32]/5 dark:border-[#e58a82]/25 dark:text-[#e58a82] dark:hover:bg-[#e58a82]/5">
                                {deleting === experience.id ? <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-[#a33a32]/30 border-t-[#a33a32] dark:border-[#e58a82]/30 dark:border-t-[#e58a82]" aria-label="Deleting" /> : <Trash2 size={14} aria-hidden="true" />}
                                Delete
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent className="border-black/10 bg-[#fdfbf7] text-[#1f1b16] dark:border-white/10 dark:bg-[#1c1a18] dark:text-[#efe9de]">
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete interview account?</AlertDialogTitle>
                                <AlertDialogDescription className="text-[#5e554a] dark:text-[#aaa398]">
                                  This will permanently delete your {company} interview account.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel className="border-black/10 bg-transparent hover:bg-[#f2eee6] dark:border-white/10 dark:hover:bg-[#262421]">Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDelete(experience.id)} className="bg-[#a33a32] text-white hover:bg-[#8f3029]">Delete account</AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        ) : (
                          <Link to={`/view-interview-experiences/${experience.id}`} className="inline-flex h-8 items-center gap-1.5 rounded-md border border-black/10 px-2.5 text-sm font-medium text-[#2459a6] transition-colors hover:bg-[#f2eee6] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring dark:border-white/10 dark:text-[#a8c7f3] dark:hover:bg-[#262421]">
                            <Eye size={14} aria-hidden="true" /> View account
                          </Link>
                        )}
                      </div>
                    </article>
                  );
                })}
              </div>
            </details>
          ))}
        </div>
      )}

      {experiences.length > 0 && (
        <footer className="border-t border-black/10 px-5 py-4 text-right dark:border-white/10 sm:px-6">
          <Link to="/share-experience" className="inline-flex h-9 items-center gap-2 rounded-md bg-[#2459a6] px-3 text-sm font-medium text-white transition-colors hover:bg-[#1d4a8a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring">
            <Plus size={15} aria-hidden="true" /> Add experience
          </Link>
        </footer>
      )}
    </section>
  );
}
