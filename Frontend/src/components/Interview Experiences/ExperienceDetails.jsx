import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Briefcase, Github, Linkedin, Share2, ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';
import { fetchExperienceById } from '@/db/apiInterviewExperience';
import MarkdownRenderer from '@/components/MarkdownRenderer';

const offerLabels = {
  full_time: 'Full time',
  internship_ppo: 'Internship + PPO',
  internship: 'Internship',
};

export default function ExperienceDetails() {
  const { experienceId } = useParams();
  const [experience, setExperience] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;

    async function loadExperience() {
      setLoading(true);
      setError(null);
      setExperience(null);
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
  }, [experienceId]);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied');
    } catch {
      toast.error('Could not copy the link. You can copy it from the address bar.');
    }
  };

  if (loading) {
    return (
      <div className="mx-auto w-full max-w-4xl px-5 py-10 sm:px-6 sm:py-12 md:px-8" role="status" aria-label="Loading interview account">
        <div className="h-4 w-36 rounded bg-[#efe9df] dark:bg-[#262421]" />
        <div className="mt-8 h-8 w-2/3 rounded bg-[#efe9df] dark:bg-[#262421]" />
        <div className="mt-3 h-5 w-1/3 rounded bg-[#efe9df] dark:bg-[#262421]" />
        <div className="mt-8 h-16 rounded-lg border border-black/10 dark:border-white/10" />
        <div className="mt-6 space-y-3 rounded-xl border border-black/10 p-6 dark:border-white/10">
          <div className="h-4 w-full rounded bg-[#efe9df] dark:bg-[#262421]" />
          <div className="h-4 w-5/6 rounded bg-[#efe9df] dark:bg-[#262421]" />
          <div className="h-4 w-2/3 rounded bg-[#efe9df] dark:bg-[#262421]" />
        </div>
      </div>
    );
  }

  if (!experience) {
    return (
      <section className="mx-auto w-full max-w-4xl px-5 py-12 text-[#1f1b16] dark:text-[#efe9de] sm:px-6 sm:py-16 md:px-8">
        <Link to="/view-interview-experiences" className="inline-flex items-center gap-2 text-sm text-[#5e554a] hover:text-[#1f1b16] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring dark:text-[#aaa398] dark:hover:text-[#efe9de]">
          <ArrowLeft size={16} aria-hidden="true" /> Interview experiences
        </Link>
        <div className="mt-8 max-w-xl border-t border-black/10 pt-6 dark:border-white/10" role="alert">
          <h1 className="text-2xl font-medium">{error ? 'Could not load this account' : 'Interview account not found'}</h1>
          <p className="mt-2 text-sm leading-6 text-[#5e554a] dark:text-[#aaa398]">
            {error ? 'Try again in a moment, or return to the shared accounts.' : 'This account may have been removed or is no longer available.'}
          </p>
        </div>
      </section>
    );
  }

  const {
    role,
    content,
    users,
    linkedin_url: linkedinUrl,
    github_url: githubUrl,
    company_name: companyName,
    offer_type: offerType,
    opportunity_type: opportunityType,
    created_at: createdAt,
    is_anonymous: isAnonymous,
  } = experience;
  const authorName = isAnonymous ? 'Anonymous' : users?.full_name || 'Community member';
  const initials = authorName.split(/\s+/).map((part) => part[0]).join('').slice(0, 2).toUpperCase();
  const sharedDate = createdAt
    ? new Date(createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
    : null;

  return (
    <article className="mx-auto w-full max-w-4xl px-5 py-8 text-[#1f1b16] dark:text-[#efe9de] sm:px-6 sm:py-10 md:px-8">
      <Link to="/view-interview-experiences" className="inline-flex items-center gap-2 rounded-sm text-sm text-[#5e554a] transition-colors hover:text-[#1f1b16] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring dark:text-[#aaa398] dark:hover:text-[#efe9de]">
        <ArrowLeft size={16} aria-hidden="true" /> Interview experiences
      </Link>

      <header className="mt-6 border-b border-black/10 pb-6 dark:border-white/10">
        <p className="mb-3 text-sm text-[#5e554a] dark:text-[#aaa398]">Interview account</p>
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div>
            {companyName && <p className="text-sm font-medium text-[#2459a6] dark:text-[#a8c7f3]">{companyName}</p>}
            <h1 className="mt-1 text-3xl font-medium leading-tight tracking-tight sm:text-4xl">{role || 'Interview experience'}</h1>
            <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm text-[#5e554a] dark:text-[#aaa398]">
              {offerType && <span>{offerLabels[offerType] || offerType}</span>}
              {opportunityType && <span>{opportunityType.toLowerCase().includes('off') ? 'Off campus' : 'On campus'}</span>}
            </div>
          </div>
          <button type="button" onClick={handleShare} className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-md border border-black/10 px-3 text-sm font-medium text-[#5e554a] transition-colors hover:bg-[#efe9df] hover:text-[#1f1b16] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring dark:border-white/10 dark:text-[#aaa398] dark:hover:bg-[#262421] dark:hover:text-[#efe9de]">
            <Share2 size={16} aria-hidden="true" /> Share
          </button>
        </div>
      </header>

      <div className="flex flex-col gap-3 border-b border-black/10 py-5 dark:border-white/10 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-center gap-3">
          <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-black/10 bg-[#f2eee6] text-sm font-medium text-[#5e554a] dark:border-white/10 dark:bg-[#262421] dark:text-[#c2baae]" aria-hidden="true">
            {isAnonymous ? <ShieldCheck size={17} strokeWidth={1.6} /> : initials}
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium">{authorName}</p>
            {sharedDate && <p className="mt-0.5 text-xs text-[#776f65] dark:text-[#8a847a]">Shared {sharedDate}</p>}
          </div>
        </div>
        <div className="flex items-center gap-3">
          {!isAnonymous && linkedinUrl && (
            <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" aria-label={`${authorName} on LinkedIn`} className="rounded-sm text-[#5e554a] hover:text-[#2459a6] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring dark:text-[#aaa398] dark:hover:text-[#a8c7f3]">
              <Linkedin size={17} strokeWidth={1.6} aria-hidden="true" />
            </a>
          )}
          {!isAnonymous && githubUrl && (
            <a href={githubUrl} target="_blank" rel="noopener noreferrer" aria-label={`${authorName} on GitHub`} className="rounded-sm text-[#5e554a] hover:text-[#2459a6] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring dark:text-[#aaa398] dark:hover:text-[#a8c7f3]">
              <Github size={17} strokeWidth={1.6} aria-hidden="true" />
            </a>
          )}
        </div>
      </div>

      <section className="mt-6 rounded-xl border border-black/10 bg-[#fdfbf7] p-5 dark:border-white/10 dark:bg-[#1c1a18] sm:p-7" aria-label="Interview notes">
        <div className="mb-5 flex items-center gap-2 border-b border-black/10 pb-4 dark:border-white/10">
          <Briefcase size={16} strokeWidth={1.6} className="text-[#5e554a] dark:text-[#aaa398]" aria-hidden="true" />
          <h2 className="text-sm font-medium">Interview notes</h2>
        </div>
        {content ? (
          <MarkdownRenderer content={content} />
        ) : (
          <p className="text-sm leading-6 text-[#5e554a] dark:text-[#aaa398]">No interview notes were included with this account.</p>
        )}
      </section>
    </article>
  );
}
