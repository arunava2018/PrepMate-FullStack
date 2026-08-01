import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { fetchPublicInterviewExperiences } from '@/db/apiInterviewExperience';
import useFetch from '@/hooks/useFetch';
import Loader from '../Loader';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import {
  FileText,
  Search,
  Filter,
  Plus,
  Sparkles,
  LayoutGrid,
  Building2,
  XCircle,
  TrendingUp,
} from 'lucide-react';
import CompanyExperienceSection from './CompanyExperienceSection';
import ExperienceStats from './ExperienceStats';
import ExperienceCard from './ExperienceCard';
import { UrlState } from '@/context';
import { motion, AnimatePresence } from 'framer-motion';

function InterviewExperience() {
  const { user } = UrlState();
  const isAuthenticated = !!user?.id;

  const {
    data: fetchedExperiences,
    loading,
    error,
    fn: fetchExperience,
  } = useFetch(fetchPublicInterviewExperiences);

  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOfferType, setSelectedOfferType] = useState('all');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'company'

  useEffect(() => {
    fetchExperience();
  }, []);

  const experiencesList = useMemo(() => {
    return Array.isArray(fetchedExperiences) ? fetchedExperiences : [];
  }, [fetchedExperiences]);

  // Filter experiences based on search and offer type
  const filteredExperiences = useMemo(() => {
    return experiencesList.filter((exp) => {
      // Search match
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        exp.company_name?.toLowerCase().includes(query) ||
        exp.role?.toLowerCase().includes(query) ||
        (!exp.is_anonymous && exp.users?.full_name?.toLowerCase().includes(query));

      // Offer type match
      const matchesOffer =
        selectedOfferType === 'all' || exp.offer_type === selectedOfferType;

      return matchesSearch && matchesOffer;
    });
  }, [experiencesList, searchQuery, selectedOfferType]);

  // Group filtered experiences by company for 'company' view mode
  const groupedExperiences = useMemo(() => {
    return filteredExperiences.reduce((acc, exp) => {
      if (exp.company_name) {
        const normalizedName = exp.company_name.trim().toLowerCase();

        if (!acc[normalizedName]) {
          acc[normalizedName] = {
            displayName: exp.company_name.trim(),
            experiences: [],
          };
        }

        acc[normalizedName].experiences.push(exp);
      }
      return acc;
    }, {});
  }, [filteredExperiences]);

  const totalCompaniesCount = Object.keys(
    experiencesList.reduce((acc, exp) => {
      if (exp.company_name) acc[exp.company_name.trim().toLowerCase()] = true;
      return acc;
    }, {})
  ).length;

  if (loading) return <Loader />;

  if (error) {
    return (
      <Card className="border border-destructive/20 bg-destructive/5 rounded-2xl shadow-sm my-8">
        <CardContent className="flex items-center justify-between p-6">
          <div className="flex items-center gap-3">
            <XCircle className="w-6 h-6 text-destructive" />
            <span className="text-destructive font-medium">
              Failed to load interview experiences. Please try again later.
            </span>
          </div>
          <Button onClick={fetchExperience} variant="outline" size="sm">
            Retry
          </Button>
        </CardContent>
      </Card>
    );
  }

  const offerTypeFilters = [
    { id: 'all', label: 'All Offers' },
    { id: 'full_time', label: 'Full Time' },
    { id: 'internship_ppo', label: 'Internship + PPO' },
    { id: 'internship', label: 'Internship' },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* SaaS Hero Section */}
      <div className="relative overflow-hidden rounded-3xl border border-border/70 bg-gradient-to-b from-card/80 via-card/50 to-background/40 backdrop-blur-xl p-8 sm:p-12 text-center shadow-sm">
        {/* Glow accent */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-primary/20 bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Verified Peer Insights</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight leading-tight">
            Interview Experiences{' '}
            <span className="bg-gradient-to-r from-indigo-500 via-violet-500 to-pink-500 bg-clip-text text-transparent">
              & Insights
            </span>
          </h1>

          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            Discover real interview questions, recruitment processes, and career strategies shared by candidates from top tech companies.
          </p>

          {/* Action CTA */}
          <div className="pt-2 flex items-center justify-center gap-4">
            <Link to={isAuthenticated ? '/submit-interview-experience' : '/auth/login'}>
              <Button size="lg" className="rounded-xl shadow-lg shadow-primary/20 gap-2 font-semibold">
                <Plus className="w-4 h-4" /> Share Experience
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <ExperienceStats
        experiences={experiencesList}
        totalCompanies={totalCompaniesCount}
      />

      {/* Controls: Search, Filters & View Toggle */}
      <div className="space-y-4 bg-card/60 backdrop-blur-md border border-border/70 p-4 sm:p-6 rounded-2xl shadow-sm">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search by company, role..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-9 rounded-xl bg-background/80 border-border/70 focus-visible:ring-primary"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <XCircle className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Filter Pills & View Switcher */}
          <div className="flex flex-wrap items-center justify-between md:justify-end gap-3 w-full md:w-auto">
            {/* Offer Type Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
              {offerTypeFilters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setSelectedOfferType(filter.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    selectedOfferType === filter.id
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>

            {/* View Mode Segmented Controls */}
            <div className="flex items-center bg-muted/60 p-1 rounded-xl border border-border/60">
              <button
                onClick={() => setViewMode('grid')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  viewMode === 'grid'
                    ? 'bg-card text-foreground shadow-xs'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                title="Grid View"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Cards</span>
              </button>
              <button
                onClick={() => setViewMode('company')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  viewMode === 'company'
                    ? 'bg-card text-foreground shadow-xs'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                title="Company Group View"
              >
                <Building2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Company</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Grid or Accordion Content */}
      {filteredExperiences.length > 0 ? (
        <AnimatePresence mode="wait">
          {viewMode === 'grid' ? (
            /* Cards Grid View */
            <motion.div
              key="grid-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredExperiences.map((exp, idx) => (
                <ExperienceCard key={exp.id} experience={exp} index={idx} layoutMode="grid" />
              ))}
            </motion.div>
          ) : (
            /* Company Grouped Accordion View */
            <motion.div
              key="company-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              {Object.entries(groupedExperiences)
                .sort(([a], [b]) => a.localeCompare(b))
                .map(([normalizedName, { displayName, experiences }]) => (
                  <CompanyExperienceSection
                    key={normalizedName}
                    company={displayName}
                    experiences={experiences}
                  />
                ))}
            </motion.div>
          )}
        </AnimatePresence>
      ) : (
        /* Empty State */
        <Card className="bg-card/70 border border-border/70 rounded-2xl text-center py-16 px-6 shadow-sm">
          <CardContent className="space-y-4 max-w-md mx-auto">
            <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto text-primary">
              <Search className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-foreground">No experiences found</h3>
            <p className="text-sm text-muted-foreground">
              We couldn't find any experiences matching your search filters. Try adjusting your query or offer type filter.
            </p>
            {(searchQuery || selectedOfferType !== 'all') && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedOfferType('all');
                }}
                className="mt-2 rounded-xl"
              >
                Reset Filters
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default InterviewExperience;
