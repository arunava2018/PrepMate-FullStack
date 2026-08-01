import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '../ui/badge';
import {
  Briefcase,
  ArrowRight,
  User,
  ShieldCheck,
  Building2,
  Sparkles,
  CheckCircle2,
  GraduationCap,
  Globe,
  School,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { motion } from 'framer-motion';

function ExperienceCard({ experience, index = 0, layoutMode = 'grid' }) {
  const { id, role, company_name, offer_type, opportunity_type, users, is_anonymous } = experience;

  // Respect anonymity
  const userName = is_anonymous
    ? 'Anonymous Candidate'
    : users?.full_name || 'Community Peer';
  const userPhoto = !is_anonymous ? users?.profile_photo : null;

  // Company avatar initials
  const companyInitial = company_name ? company_name.trim().charAt(0).toUpperCase() : 'C';

  // Badge config for Offer Type
  const getOfferBadgeConfig = (type) => {
    switch (type) {
      case 'full_time':
        return {
          icon: CheckCircle2,
          className:
            'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20',
          label: 'Full Time',
        };
      case 'internship_ppo':
        return {
          icon: Sparkles,
          className:
            'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20 hover:bg-purple-500/20',
          label: 'Internship + PPO',
        };
      case 'internship':
        return {
          icon: GraduationCap,
          className:
            'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20 hover:bg-blue-500/20',
          label: 'Internship',
        };
      default:
        return {
          icon: Briefcase,
          className:
            'bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20 hover:bg-slate-500/20',
          label: type || 'Interview',
        };
    }
  };

  const badgeConfig = getOfferBadgeConfig(offer_type);
  const BadgeIcon = badgeConfig.icon;

  // Opportunity Type (On Campus / Off Campus)
  const getOpportunityBadge = (type) => {
    if (!type) return null;
    const isOffCampus = type.toLowerCase().includes('off');
    return (
      <Badge
        variant="outline"
        className="text-[11px] font-medium px-2 py-0.5 rounded-full border-border/60 bg-muted/30 text-muted-foreground flex items-center gap-1"
      >
        {isOffCampus ? <Globe className="w-3 h-3" /> : <School className="w-3 h-3" />}
        {isOffCampus ? 'Off Campus' : 'On Campus'}
      </Badge>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: index * 0.04 }}
      className={`group relative overflow-hidden rounded-2xl border border-border/70 bg-card/70 backdrop-blur-md p-5 sm:p-6 
        shadow-sm hover:shadow-xl hover:border-primary/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between ${
          layoutMode === 'list' ? 'w-full' : 'h-full'
        }`}
    >
      {/* Top Header: Company Avatar & Badges */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            {/* Company Initial Icon */}
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 border border-primary/20 flex items-center justify-center text-primary font-extrabold text-lg shadow-inner group-hover:scale-105 transition-transform">
              {companyInitial}
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {company_name || 'Company'}
              </h4>
              <h3 className="text-base sm:text-lg font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                {role || 'Software Engineering Role'}
              </h3>
            </div>
          </div>
        </div>

        {/* Offer & Opportunity Badges */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <Badge
            variant="outline"
            className={`text-xs font-semibold px-2.5 py-1 rounded-full border flex items-center gap-1.5 transition-colors ${badgeConfig.className}`}
          >
            <BadgeIcon className="w-3.5 h-3.5" />
            {badgeConfig.label}
          </Badge>

          {getOpportunityBadge(opportunity_type)}
        </div>
      </div>

      {/* Footer: User Info & CTA */}
      <div className="pt-4 mt-2 border-t border-border/50 flex items-center justify-between gap-3">
        {/* User profile */}
        <div className="flex items-center gap-2.5 min-w-0">
          <Avatar className="h-7 w-7 border border-border flex-shrink-0">
            {userPhoto ? (
              <AvatarImage src={userPhoto} alt={userName} />
            ) : (
              <AvatarFallback className="bg-primary/10 text-primary text-[10px] font-bold">
                {is_anonymous ? <ShieldCheck className="w-3.5 h-3.5 text-primary" /> : userName[0]}
              </AvatarFallback>
            )}
          </Avatar>
          <span className="text-xs font-medium text-muted-foreground truncate" title={userName}>
            {userName}
          </span>
        </div>

        {/* Read CTA button */}
        <Link
          to={`/view-interview-experiences/${id}`}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary/80 transition-colors flex-shrink-0 group/link"
        >
          <span>Read Story</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
        </Link>
      </div>
    </motion.div>
  );
}

export default ExperienceCard;
