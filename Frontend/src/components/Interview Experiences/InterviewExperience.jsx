import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchPublicInterviewExperiences } from '@/db/apiInterviewExperience';
import useFetch from '@/hooks/useFetch';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import {
  ArrowRight,
  Building2,
  LayoutGrid,
  ListFilter,
  Plus,
  Search,
  X,
} from 'lucide-react';
import CompanyExperienceSection from './CompanyExperienceSection';
import ExperienceStats from './ExperienceStats';
import ExperienceCard from './ExperienceCard';
import AppBreadcrumbs from '@/components/AppBreadcrumbs';
import { Skeleton } from '@/components/ui/skeleton';

function ExperienceListSkeleton() {
  return <div className="mx-auto w-full max-w-6xl px-4 pb-14 pt-8 sm:px-6 sm:pt-10" role="status" aria-label="Loading interview experiences"><AppBreadcrumbs items={[{ label: 'Experiences' }]} /><div className="flex flex-col gap-4 border-b border-black/10 pb-7 dark:border-white/10"><Skeleton className="h-4 w-36"/><Skeleton className="h-9 w-2/3 max-w-xl"/><Skeleton className="h-5 w-full max-w-2xl"/></div><Skeleton className="mt-6 h-24 w-full rounded-xl"/><Skeleton className="mt-8 h-24 w-full rounded-xl"/><div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">{[0,1,2].map((item)=><Skeleton key={item} className="h-56 rounded-xl"/>)}</div></div>;
}

const offerTypeFilters = [
  { id: 'all', label: 'All offers' },
  { id: 'full_time', label: 'Full time' },
  { id: 'internship_ppo', label: 'Internship + PPO' },
  { id: 'internship', label: 'Internship' },
];

function InterviewExperience() {
  const {
    data: fetchedExperiences,
    loading,
    error,
    fn: fetchExperience,
  } = useFetch(fetchPublicInterviewExperiences);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOfferType, setSelectedOfferType] = useState('all');
  const [viewMode, setViewMode] = useState('grid');

  useEffect(() => {
    fetchExperience();
  }, []);

  const experiences = Array.isArray(fetchedExperiences) ? fetchedExperiences : [];
  const filteredExperiences = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return experiences.filter((experience) => {
      const matchesSearch =
        !query ||
        experience.company_name?.toLowerCase().includes(query) ||
        experience.role?.toLowerCase().includes(query) ||
        (!experience.is_anonymous && experience.users?.full_name?.toLowerCase().includes(query));
      const matchesOffer = selectedOfferType === 'all' || experience.offer_type === selectedOfferType;
      return matchesSearch && matchesOffer;
    });
  }, [experiences, searchQuery, selectedOfferType]);

  const groupedExperiences = useMemo(() => {
    return filteredExperiences.reduce((groups, experience) => {
      if (!experience.company_name) return groups;
      const key = experience.company_name.trim().toLowerCase();
      if (!groups[key]) groups[key] = { displayName: experience.company_name.trim(), experiences: [] };
      groups[key].experiences.push(experience);
      return groups;
    }, {});
  }, [filteredExperiences]);

  const totalCompanies = useMemo(
    () => new Set(experiences.map((experience) => experience.company_name?.trim().toLowerCase()).filter(Boolean)).size,
    [experiences]
  );

  if (loading) return <ExperienceListSkeleton />;

  if (error) {
    return (
      <section className="mx-auto my-10 max-w-5xl rounded-xl border border-black/10 bg-[#fdfbf7] p-6 text-[#1f1b16] dark:border-white/10 dark:bg-[#1c1a18] dark:text-[#efe9de]" role="alert">
        <h1 className="text-lg font-medium">Interview experiences</h1>
        <p className="mt-2 text-sm text-[#5e554a] dark:text-[#aaa398]">We couldn’t load the shared experiences. Try again in a moment.</p>
        <Button type="button" variant="outline" onClick={fetchExperience} className="mt-4">Try again</Button>
      </section>
    );
  }

  const hasFilters = Boolean(searchQuery) || selectedOfferType !== 'all';

  return (
    <div className="mx-auto w-full max-w-6xl px-4 pb-14 pt-8 text-[#1f1b16] dark:text-[#efe9de] sm:px-6 sm:pt-10">
      <AppBreadcrumbs items={[{ label: 'Experiences' }]} />
      <header className="flex flex-col gap-6 border-b border-black/10 pb-7 dark:border-white/10 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-[#2459a6] dark:text-[#a8c7f3]">PrepMate community</p>
          <h1 className="mt-2 text-3xl font-medium leading-tight tracking-tight sm:text-4xl">Learn from the interview room</h1>
          <p className="mt-3 max-w-xl text-sm leading-6 text-[#5e554a] dark:text-[#aaa398] sm:text-base">
            Read interview accounts shared by developers, or add your own experience for others to learn from.
          </p>
        </div>
        <Link to="/share-experience" className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-md bg-[#2459a6] px-4 text-sm font-medium text-white transition-colors hover:bg-[#1d4a8a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring">
          <Plus size={16} aria-hidden="true" /> Share an experience
        </Link>
      </header>

      <ExperienceStats experiences={experiences} totalCompanies={totalCompanies} />

      <section className="mt-8" aria-label="Search and filter experiences">
        <div className="flex flex-col gap-4 rounded-xl border border-black/10 bg-[#fdfbf7] p-4 dark:border-white/10 dark:bg-[#1c1a18] sm:p-5">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <label className="relative block w-full lg:max-w-sm">
              <span className="sr-only">Search company, role, or contributor</span>
              <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#776f65] dark:text-[#8a847a]" aria-hidden="true" />
              <Input
                type="search"
                placeholder="Search company or role"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                className="h-10 rounded-md border-black/10 bg-transparent pl-9 pr-9 text-[#1f1b16] placeholder:text-[#776f65] focus-visible:ring-[#2459a6] dark:border-white/10 dark:text-[#efe9de] dark:placeholder:text-[#8a847a]"
              />
              {searchQuery && (
                <button type="button" onClick={() => setSearchQuery('')} aria-label="Clear search" className="absolute right-2 top-1/2 inline-flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded text-[#776f65] hover:text-[#1f1b16] focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring dark:text-[#8a847a] dark:hover:text-[#efe9de]">
                  <X size={15} aria-hidden="true" />
                </button>
              )}
            </label>

            <div className="flex items-center gap-2 overflow-x-auto pb-1 lg:pb-0" role="group" aria-label="Filter by offer type">
              {offerTypeFilters.map((filter) => {
                const active = selectedOfferType === filter.id;
                return (
                  <button
                    key={filter.id}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setSelectedOfferType(filter.id)}
                    className={`shrink-0 rounded-md border px-3 py-2 text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring ${active ? 'border-[#2459a6] bg-[#2459a6] text-white dark:border-[#a8c7f3] dark:bg-[#a8c7f3] dark:text-[#17191d]' : 'border-black/10 text-[#5e554a] hover:bg-[#f2eee6] dark:border-white/10 dark:text-[#aaa398] dark:hover:bg-[#262421]'}`}
                  >
                    {filter.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-black/10 pt-3 dark:border-white/10">
            <p className="text-sm text-[#5e554a] dark:text-[#aaa398]" aria-live="polite">
              <span className="font-medium tabular-nums text-[#1f1b16] dark:text-[#efe9de]">{filteredExperiences.length}</span>{' '}
              {filteredExperiences.length === 1 ? 'experience' : 'experiences'}
              {hasFilters ? ' found' : ' shared'}
            </p>
            <div className="flex items-center gap-1 rounded-md border border-black/10 p-1 dark:border-white/10" role="group" aria-label="Display mode">
              <button type="button" aria-label="Show cards" aria-pressed={viewMode === 'grid'} onClick={() => setViewMode('grid')} className={`inline-flex h-8 items-center gap-2 rounded px-2 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring ${viewMode === 'grid' ? 'bg-[#efe9df] text-[#1f1b16] dark:bg-[#262421] dark:text-[#efe9de]' : 'text-[#776f65] hover:text-[#1f1b16] dark:text-[#8a847a] dark:hover:text-[#efe9de]'}`}>
                <LayoutGrid size={15} aria-hidden="true" /><span className="hidden sm:inline">Cards</span>
              </button>
              <button type="button" aria-label="Group by company" aria-pressed={viewMode === 'company'} onClick={() => setViewMode('company')} className={`inline-flex h-8 items-center gap-2 rounded px-2 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring ${viewMode === 'company' ? 'bg-[#efe9df] text-[#1f1b16] dark:bg-[#262421] dark:text-[#efe9de]' : 'text-[#776f65] hover:text-[#1f1b16] dark:text-[#8a847a] dark:hover:text-[#efe9de]'}`}>
                <Building2 size={15} aria-hidden="true" /><span className="hidden sm:inline">By company</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-6" aria-label="Interview experiences">
        {filteredExperiences.length > 0 ? (
          viewMode === 'grid' ? (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              {filteredExperiences.map((experience) => <ExperienceCard key={experience.id} experience={experience} />)}
            </div>
          ) : (
            <div className="space-y-3">
              {Object.entries(groupedExperiences).sort(([a], [b]) => a.localeCompare(b)).map(([key, group]) => (
                <CompanyExperienceSection key={key} company={group.displayName} experiences={group.experiences} />
              ))}
            </div>
          )
        ) : (
          <div className="rounded-xl border border-black/10 bg-[#fdfbf7] px-6 py-12 text-center dark:border-white/10 dark:bg-[#1c1a18]">
            <ListFilter size={20} className="mx-auto text-[#776f65] dark:text-[#8a847a]" aria-hidden="true" />
            <h2 className="mt-3 text-lg font-medium">{experiences.length ? 'No matching experiences' : 'No experiences shared yet'}</h2>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#5e554a] dark:text-[#aaa398]">
              {experiences.length ? 'Try another company, role, or offer type.' : 'When someone shares an interview account, it will appear here.'}
            </p>
            {hasFilters && (
              <button type="button" onClick={() => { setSearchQuery(''); setSelectedOfferType('all'); }} className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-[#2459a6] hover:underline dark:text-[#a8c7f3]">
                Clear filters <ArrowRight size={14} aria-hidden="true" />
              </button>
            )}
          </div>
        )}
      </section>
    </div>
  );
}

export default InterviewExperience;
