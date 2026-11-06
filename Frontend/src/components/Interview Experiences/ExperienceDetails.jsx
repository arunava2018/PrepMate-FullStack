import { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { ArrowLeft, Briefcase, CalendarDays, Globe, School, Share2, ShieldCheck, Linkedin, Github } from 'lucide-react';
import { toast } from 'sonner';
import { fetchExperienceById } from '@/db/apiInterviewExperience';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import AppBreadcrumbs from '@/components/AppBreadcrumbs';
import { Skeleton } from '@/components/ui/skeleton';

const offerLabels = { full_time: 'Full time', internship_ppo: 'Internship + PPO', internship: 'Internship' };

function ExperienceDetailsSkeleton() {
  return <div className="mx-auto w-full max-w-4xl px-5 py-8 sm:px-6 sm:py-10 md:px-8" role="status" aria-label="Loading interview account"><AppBreadcrumbs items={[{ label: 'Experiences', to: '/view-interview-experiences' }, { label: 'Loading account' }]} /><Skeleton className="mt-6 h-4 w-40"/><Skeleton className="mt-3 h-10 w-2/3 max-w-xl"/><Skeleton className="mt-4 h-7 w-56"/><div className="mt-7 flex items-center gap-3 border-y border-black/10 py-5 dark:border-white/10"><Skeleton className="h-10 w-10 rounded-full"/><div className="space-y-2"><Skeleton className="h-4 w-36"/><Skeleton className="h-3 w-28"/></div></div><div className="mt-6 space-y-4 rounded-xl border border-black/10 p-6 dark:border-white/10"><Skeleton className="h-5 w-40"/><Skeleton className="h-4 w-full"/><Skeleton className="h-4 w-11/12"/><Skeleton className="h-4 w-4/5"/><Skeleton className="h-32 w-full"/></div></div>;
}

export default function ExperienceDetails() {
  const { experienceId } = useParams();
  const location = useLocation();
  const [experience, setExperience] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    let active = true;
    async function loadExperience() {
      setLoading(true); setError(null); setExperience(null);
      try {
        const data = await fetchExperienceById(experienceId);
        if (active) setExperience(data);
      } catch (fetchError) {
        if (active) setError(fetchError);
      } finally {
        if (active) setLoading(false);
      }
    }
    loadExperience();
    return () => { active = false; };
  }, [experienceId, retryCount]);

  const handleShare = async () => {
    try { await navigator.clipboard.writeText(window.location.href); toast.success('Link copied'); }
    catch { toast.error('Could not copy the link. You can copy it from the address bar.'); }
  };

  if (loading) return <ExperienceDetailsSkeleton />;

  if (!experience) {
    const status = error?.status;
    const expired = status === 401;
    const unavailable = status === 404;
    const title = expired ? 'Your session may have expired' : unavailable ? 'This interview account is no longer available' : 'This account isn’t available';
    const description = expired ? 'Sign in again to continue. After login, you can return to this account.' : unavailable ? 'It may have been removed or the link may be outdated. Browse the shared accounts to find another.' : status === 403 ? 'This account is private or you don’t have access to it. You can browse the public experiences instead.' : 'There was a problem loading this account. You can try again or return to the shared accounts.';
    return <section className="mx-auto w-full max-w-4xl px-5 py-8 text-[#1f1b16] dark:text-[#efe9de] sm:px-6 sm:py-10 md:px-8"><AppBreadcrumbs items={[{ label: 'Experiences', to: '/view-interview-experiences' }, { label: 'Account unavailable' }]} /><div className="mt-8 max-w-xl border-t border-black/10 pt-6 dark:border-white/10" role="alert"><h1 className="text-2xl font-medium">{title}</h1><p className="mt-2 text-sm leading-6 text-[#5e554a] dark:text-[#aaa398]">{description}</p><div className="mt-5 flex flex-wrap gap-3">{expired ? <Link to="/auth/login" state={{ from: location }} className="inline-flex h-10 items-center rounded-md bg-[#2459a6] px-4 text-sm font-medium text-white hover:bg-[#1d4a8a] dark:bg-[#a8c7f3] dark:text-[#111a27]">Sign in to continue</Link> : !unavailable && status !== 403 ? <button type="button" onClick={() => setRetryCount((count) => count + 1)} className="inline-flex h-10 items-center rounded-md bg-[#2459a6] px-4 text-sm font-medium text-white hover:bg-[#1d4a8a] dark:bg-[#a8c7f3] dark:text-[#111a27]">Try again</button> : null}<Link to="/view-interview-experiences" className="inline-flex h-10 items-center gap-2 rounded-md border border-black/10 px-4 text-sm font-medium hover:bg-[#f2eee6] dark:border-white/10 dark:hover:bg-[#262421]"><ArrowLeft size={16}/> Browse experiences</Link></div></div></section>;
  }

  const { role, content, users, linkedin_url: linkedinUrl, github_url: githubUrl, company_name: companyName, offer_type: offerType, opportunity_type: opportunityType, created_at: createdAt, is_anonymous: isAnonymous } = experience;
  const authorName = isAnonymous ? 'Anonymous candidate' : users?.full_name || 'Community member';
  const initials = isAnonymous ? null : authorName.split(/\s+/).map((part) => part[0]).join('').slice(0, 2).toUpperCase();
  const sharedDate = createdAt ? new Date(createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }) : null;
  const opportunityLabel = opportunityType ? opportunityType.toLowerCase().includes('off') ? 'Off campus' : 'On campus' : null;
  const companyLabel = companyName?.trim() || 'Company not listed';

  return <article className="mx-auto w-full max-w-4xl px-5 py-8 text-[#1f1b16] dark:text-[#efe9de] sm:px-6 sm:py-10 md:px-8">
    <AppBreadcrumbs items={[{ label: 'Experiences', to: '/view-interview-experiences' }, { label: `${companyLabel} · ${role || 'Interview account'}` }]} />
    <header className="mt-6 border-b border-black/10 pb-6 dark:border-white/10"><p className="mb-2 text-sm text-[#5e554a] dark:text-[#aaa398]">Interview account</p><div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between"><div><p className="text-sm font-medium text-[#2459a6] dark:text-[#a8c7f3]">{companyLabel}</p><h1 className="mt-1 text-3xl font-medium leading-tight tracking-tight sm:text-4xl">{role || 'Interview experience'}</h1><div className="mt-4 flex flex-wrap items-center gap-2">{offerType && <span className="inline-flex rounded-full border border-[#2459a6]/20 bg-[#2459a6]/5 px-2.5 py-1 text-xs font-medium text-[#2459a6] dark:border-[#a8c7f3]/25 dark:bg-[#a8c7f3]/10 dark:text-[#a8c7f3]">{offerLabels[offerType] || offerType}</span>}{opportunityLabel && <span className="inline-flex items-center gap-1.5 rounded-full border border-black/10 px-2.5 py-1 text-xs text-[#5e554a] dark:border-white/10 dark:text-[#aaa398]">{opportunityLabel === 'Off campus' ? <Globe size={13}/> : <School size={13}/>} {opportunityLabel}</span>}{sharedDate && <span className="inline-flex items-center gap-1.5 px-1 py-1 text-xs text-[#776f65] dark:text-[#8a847a]"><CalendarDays size={14}/>{sharedDate}</span>}</div></div><button type="button" onClick={handleShare} className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-md border border-black/10 px-3 text-sm font-medium text-[#5e554a] hover:bg-[#efe9df] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring dark:border-white/10 dark:text-[#aaa398] dark:hover:bg-[#262421]"><Share2 size={16} aria-hidden="true"/> Share</button></div></header>
    <div className="flex flex-col gap-3 border-b border-black/10 py-5 dark:border-white/10 sm:flex-row sm:items-center sm:justify-between"><div className="flex min-w-0 items-center gap-3"><span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-black/10 bg-[#f2eee6] text-sm font-medium text-[#5e554a] dark:border-white/10 dark:bg-[#262421] dark:text-[#c2baae]" aria-hidden="true">{isAnonymous ? <ShieldCheck size={17} strokeWidth={1.6}/> : initials}</span><div className="min-w-0"><p className="truncate text-sm font-medium">{authorName}</p><p className="mt-0.5 text-xs text-[#776f65] dark:text-[#8a847a]">{isAnonymous ? 'Shared privately' : 'Community contributor'}</p></div></div>{!isAnonymous && (linkedinUrl || githubUrl) && <div className="flex items-center gap-3" aria-label="Contributor links">{linkedinUrl && <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" aria-label={`${authorName} on LinkedIn`} className="rounded-sm text-[#5e554a] hover:text-[#2459a6] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring dark:text-[#aaa398] dark:hover:text-[#a8c7f3]"><Linkedin size={17}/></a>}{githubUrl && <a href={githubUrl} target="_blank" rel="noopener noreferrer" aria-label={`${authorName} on GitHub`} className="rounded-sm text-[#5e554a] hover:text-[#2459a6] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring dark:text-[#aaa398] dark:hover:text-[#a8c7f3]"><Github size={17}/></a>}</div>}</div>
    <section className="mt-6 rounded-xl border border-black/10 bg-[#fdfbf7] p-5 dark:border-white/10 dark:bg-[#1c1a18] sm:p-8" aria-label="Interview notes"><div className="mb-5 flex items-center gap-2 border-b border-black/10 pb-4 dark:border-white/10"><Briefcase size={16} strokeWidth={1.6} className="text-[#5e554a] dark:text-[#aaa398]" aria-hidden="true"/><h2 className="text-sm font-medium">Interview notes</h2></div><div className="max-w-none text-[15px] leading-7 text-[#39342d] dark:text-[#d1c9bd]">{content ? <MarkdownRenderer content={content}/> : <p className="text-sm leading-6 text-[#5e554a] dark:text-[#aaa398]">No interview notes were included with this account.</p>}</div></section>
    <Link to="/view-interview-experiences" className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#2459a6] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring dark:text-[#a8c7f3]"><ArrowLeft size={16}/> Back to all experiences</Link>
  </article>;
}
