import React from 'react';
import { CalendarDays, GraduationCap, Mail, UserRound } from 'lucide-react';
import { UrlState } from '@/context';
import UserExperiences from '@/components/Users Profile/UserExperinces.jsx';

function ProfileInfo() {
  const { user } = UrlState();
  const initials = user?.full_name
    ?.split(' ')
    .filter(Boolean)
    .map((part) => part[0])
    .join('') || 'U';

  const fields = [
    { label: 'Name', value: user?.full_name, Icon: UserRound },
    { label: 'Email', value: user?.email, Icon: Mail },
    { label: 'College', value: user?.college_name, Icon: GraduationCap },
    { label: 'Graduation year', value: user?.passout_year, Icon: CalendarDays },
  ];

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 text-[#1f1b16] dark:text-[#efe9de] sm:px-6 md:py-10">
      <header className="mb-7 flex items-center gap-4 border-b border-black/10 pb-6 dark:border-white/10 sm:mb-8 sm:pb-7">
        <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-lg border border-black/10 bg-[#fdfbf7] text-lg font-medium text-[#5e554a] dark:border-white/10 dark:bg-[#1c1a18] dark:text-[#c2baae]" aria-label={`${user?.full_name || 'User'} initials`}>
          <span className="absolute bottom-2 left-0 top-2 w-0.5 rounded-r bg-[#386eb8] dark:bg-[#a8c7f3]" aria-hidden="true" />
          {initials}
        </div>
        <div className="min-w-0">
          <p className="text-sm font-medium text-[#2459a6] dark:text-[#a8c7f3]">Account</p>
          <h1 className="mt-1 text-2xl font-medium leading-tight tracking-tight sm:text-3xl">Your profile</h1>
          <p className="mt-1 text-sm leading-5 text-[#5e554a] dark:text-[#aaa398]">Account details and interview accounts you have shared</p>
        </div>
      </header>

      <section className="rounded-xl border border-black/10 bg-[#fdfbf7] dark:border-white/10 dark:bg-[#1c1a18]" aria-labelledby="profile-details-title">
        <div className="border-b border-black/10 px-5 py-4 dark:border-white/10 sm:px-6">
          <h2 id="profile-details-title" className="text-base font-medium">Profile details</h2>
          <p className="mt-1 text-sm text-[#5e554a] dark:text-[#aaa398]">Information associated with your account</p>
        </div>
        <dl className="grid gap-x-6 px-5 sm:grid-cols-2 sm:px-6 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)_minmax(0,1.3fr)_minmax(0,.85fr)]">
          {fields.map(({ label, value, Icon }) => (
            <div key={label} className="min-w-0 border-b border-black/10 py-4 last:border-b-0 dark:border-white/10 sm:[&:nth-last-child(-n+2)]:border-b-0 xl:border-b-0">
              <dt className="flex items-center gap-2 text-sm text-[#5e554a] dark:text-[#aaa398]">
                <Icon size={16} strokeWidth={1.7} aria-hidden="true" />
                {label}
              </dt>
              <dd className="mt-2 break-words pl-6 text-sm font-medium text-[#1f1b16] dark:text-[#efe9de]">
                {value || <span className="font-normal text-[#776f65] dark:text-[#8a847a]">Not added</span>}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-6" aria-label="Your interview experiences">
        <UserExperiences userId={user?.id} />
      </section>
    </div>
  );
}

export default ProfileInfo;
