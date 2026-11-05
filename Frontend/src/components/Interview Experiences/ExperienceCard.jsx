import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Globe, School, ShieldCheck } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

const offerLabels = {
  full_time: 'Full time',
  internship_ppo: 'Internship + PPO',
  internship: 'Internship',
};

function ExperienceCard({ experience }) {
  const { id, role, company_name, offer_type, opportunity_type, users, is_anonymous } = experience;
  const userName = is_anonymous ? 'Anonymous candidate' : users?.full_name || 'Community member';
  const companyName = company_name?.trim() || 'Company not listed';
  const companyInitial = companyName.charAt(0).toUpperCase();
  const isOffCampus = opportunity_type?.toLowerCase().includes('off');

  return (
    <article className="flex h-full min-h-56 flex-col rounded-xl border border-black/10 bg-[#fdfbf7] p-5 transition-colors hover:bg-[#f7f4ee] dark:border-white/10 dark:bg-[#1c1a18] dark:hover:bg-[#211f1c]">
      <div className="flex items-start gap-3">
        <span aria-hidden="true" className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-black/10 bg-[#f2eee6] text-sm font-medium text-[#5e554a] dark:border-white/10 dark:bg-[#262421] dark:text-[#c2baae]">
          {companyInitial}
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-[#5e554a] dark:text-[#aaa398]">{companyName}</p>
          <h2 className="mt-1 line-clamp-2 text-lg font-medium leading-6 text-[#1f1b16] dark:text-[#efe9de]">
            {role || 'Interview experience'}
          </h2>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-black/10 pt-4 text-sm dark:border-white/10">
        {offer_type && <span className="inline-flex items-center gap-2 text-[#5e554a] dark:text-[#c2baae]"><span className="h-4 w-0.5 rounded-full bg-[#386eb8] dark:bg-[#a8c7f3]" aria-hidden="true" />{offerLabels[offer_type] || offer_type}</span>}
        {opportunity_type && (
          <span className="inline-flex items-center gap-1.5 text-[#776f65] dark:text-[#8a847a]">
            {isOffCampus ? <Globe size={14} aria-hidden="true" /> : <School size={14} aria-hidden="true" />}
            {isOffCampus ? 'Off campus' : 'On campus'}
          </span>
        )}
      </div>

      <div className="mt-auto flex items-center justify-between gap-3 border-t border-black/10 pt-4 dark:border-white/10">
        <div className="flex min-w-0 items-center gap-2">
          <Avatar className="h-7 w-7 shrink-0 border border-black/10 dark:border-white/10">
            {!is_anonymous && users?.profile_photo && <AvatarImage src={users.profile_photo} alt={userName} />}
            <AvatarFallback className="bg-[#efe9df] text-[#5e554a] dark:bg-[#262421] dark:text-[#c2baae]">
              {is_anonymous ? <ShieldCheck size={14} aria-label="Anonymous" /> : userName.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <span className="truncate text-sm text-[#5e554a] dark:text-[#aaa398]">{userName}</span>
        </div>
        <Link
          to={`/view-interview-experiences/${id}`}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-sm text-sm font-medium text-[#2459a6] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring dark:text-[#a8c7f3]"
        >
          Read account <ArrowRight size={15} aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}

export default ExperienceCard;
