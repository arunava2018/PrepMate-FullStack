import React from 'react';
import { Building2, FileText, Briefcase, Award } from 'lucide-react';
import { motion } from 'framer-motion';

function ExperienceStats({ experiences = [], totalCompanies = 0 }) {
  const totalExperiences = experiences.length;
  const fullTimeCount = experiences.filter(
    (e) => e.offer_type === 'full_time'
  ).length;
  const internCount = experiences.filter(
    (e) => e.offer_type === 'internship' || e.offer_type === 'internship_ppo'
  ).length;

  const stats = [
    {
      label: 'Companies Covered',
      value: totalCompanies,
      icon: Building2,
      color: 'from-blue-500/20 to-indigo-500/20 text-blue-600 dark:text-blue-400 border-blue-500/20',
    },
    {
      label: 'Shared Experiences',
      value: totalExperiences,
      icon: FileText,
      color: 'from-violet-500/20 to-purple-500/20 text-violet-600 dark:text-violet-400 border-violet-500/20',
    },
    {
      label: 'Full-Time Offers',
      value: fullTimeCount,
      icon: Briefcase,
      color: 'from-emerald-500/20 to-teal-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
    },
    {
      label: 'Internships & PPOs',
      value: internCount,
      icon: Award,
      color: 'from-amber-500/20 to-orange-500/20 text-amber-600 dark:text-amber-400 border-amber-500/20',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 my-6">
      {stats.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.05 }}
            className="relative overflow-hidden rounded-2xl border border-border/60 bg-card/60 backdrop-blur-md p-4 sm:p-5 shadow-sm hover:shadow-md hover:border-primary/30 transition-all group"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                  {stat.label}
                </p>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                  {stat.value}
                </h3>
              </div>
              <div
                className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} border group-hover:scale-110 transition-transform`}
              >
                <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

export default ExperienceStats;
