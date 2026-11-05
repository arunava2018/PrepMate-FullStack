import React from 'react';

function ExperienceStats({ experiences = [], totalCompanies = 0 }) {
  const fullTimeCount = experiences.filter((experience) => experience.offer_type === 'full_time').length;
  const internshipCount = experiences.filter(
    (experience) => experience.offer_type === 'internship' || experience.offer_type === 'internship_ppo'
  ).length;

  const stats = [
    { label: 'Shared accounts', value: experiences.length },
    { label: 'Companies', value: totalCompanies },
    { label: 'Full-time offers', value: fullTimeCount },
    { label: 'Internship paths', value: internshipCount },
  ];

  return (
    <dl className="mt-6 grid grid-cols-2 divide-x divide-y divide-black/10 overflow-hidden rounded-xl border border-black/10 bg-[#fdfbf7] dark:divide-white/10 dark:border-white/10 dark:bg-[#1c1a18] sm:grid-cols-4 sm:divide-y-0">
      {stats.map(({ label, value }) => (
        <div key={label} className="px-4 py-4 sm:px-5">
          <dt className="text-sm text-[#5e554a] dark:text-[#aaa398]">{label}</dt>
          <dd className="mt-1 text-2xl font-medium tabular-nums text-[#1f1b16] dark:text-[#efe9de]">{value}</dd>
        </div>
      ))}
    </dl>
  );
}

export default ExperienceStats;
