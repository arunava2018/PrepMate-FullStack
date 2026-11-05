import { useEffect, useState } from 'react';
import { ArrowRight, Building2, ChevronDown, LoaderCircle, RefreshCw, UserRound } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { fetchUnpublishedInterviewExperiences } from '@/db/apiInterviewExperience';
import AdminPageShell from '../AdminPageShell';
import ApprovalModal from './ApprovalModal';

export default function ApproveExperiences() {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [expandedCompany, setExpandedCompany] = useState(null);
  const [selectedExperience, setSelectedExperience] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError('');
    try {
      const result = await fetchUnpublishedInterviewExperiences();
      setExperiences(Array.isArray(result) ? result : []);
    } catch (cause) {
      setError(cause.message || 'Could not load pending experiences');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const groupedExperiences = experiences.reduce((groups, experience) => {
    const company = experience.company_name || 'Other companies';
    if (!groups[company]) groups[company] = [];
    groups[company].push(experience);
    return groups;
  }, {});

  return (
    <AdminPageShell title="Review interview experiences" description="Review submissions before they appear in the interview experience library" wide>
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-black/10 bg-[#fdfbf7] px-5 py-4 dark:border-white/10 dark:bg-[#1c1a18]">
          <div className="flex items-baseline gap-3">
            <span className="text-2xl font-medium tabular-nums">{experiences.length}</span>
            <span className="text-sm text-[#5e554a] dark:text-[#aaa398]">pending submissions across {Object.keys(groupedExperiences).length} companies</span>
          </div>
          <Button type="button" variant="outline" onClick={fetchData} disabled={loading} className="h-9 gap-2 rounded-md shadow-none">
            {loading ? <LoaderCircle size={15} className="animate-spin" /> : <RefreshCw size={15} />}
            Refresh
          </Button>
        </div>

        {error && <p role="alert" className="rounded-lg border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive">{error}</p>}

        {loading && experiences.length === 0 && <p role="status" className="py-4 text-sm text-[#5e554a] dark:text-[#aaa398]">Loading pending submissions</p>}

        {!loading && experiences.length === 0 && !error && (
          <p className="rounded-xl border border-black/10 bg-[#fdfbf7] p-5 text-sm text-[#5e554a] dark:border-white/10 dark:bg-[#1c1a18] dark:text-[#aaa398]">There are no pending experiences to review.</p>
        )}

        {Object.entries(groupedExperiences).map(([company, companyExperiences]) => {
          const isOpen = expandedCompany === company;
          const listId = `company-${company.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
          return (
            <Card key={company} className="gap-0 overflow-hidden rounded-xl border-black/10 bg-[#fdfbf7] py-0 shadow-none dark:border-white/10 dark:bg-[#1c1a18]">
              <h2>
                <button type="button" aria-expanded={isOpen} aria-controls={listId} onClick={() => setExpandedCompany(isOpen ? null : company)} className="flex min-h-14 w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-[#f2eee6] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-ring dark:hover:bg-[#262421]">
                  <span className="flex min-w-0 items-center gap-3">
                    <Building2 size={17} className="shrink-0 text-[#5e554a] dark:text-[#aaa398]" />
                    <span className="truncate text-sm font-medium">{company}</span>
                  </span>
                  <span className="flex shrink-0 items-center gap-3 text-xs tabular-nums text-[#776f65] dark:text-[#8a847a]">
                    {companyExperiences.length} pending
                    <ChevronDown size={16} className={`transition-transform duration-150 ${isOpen ? 'rotate-180' : ''}`} />
                  </span>
                </button>
              </h2>
              {isOpen && (
                <ul id={listId} className="divide-y divide-black/10 border-t border-black/10 dark:divide-white/10 dark:border-white/10">
                  {companyExperiences.map((experience) => (
                    <li key={experience.id} className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                      <span className="inline-flex items-center gap-2 text-sm text-[#5e554a] dark:text-[#aaa398]">
                        <UserRound size={16} />
                        {experience.is_anonymous ? 'Anonymous learner' : experience.users?.full_name || 'Unknown user'}
                      </span>
                      <Button type="button" variant="outline" onClick={() => setSelectedExperience(experience)} className="h-9 gap-2 self-start rounded-md shadow-none sm:self-auto">
                        Review submission <ArrowRight size={15} />
                      </Button>
                    </li>
                  ))}
                </ul>
              )}
            </Card>
          );
        })}
      </div>

      <ApprovalModal open={!!selectedExperience} onClose={() => setSelectedExperience(null)} experience={selectedExperience} fetchData={fetchData} />
    </AdminPageShell>
  );
}
