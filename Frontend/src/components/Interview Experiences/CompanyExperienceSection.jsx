import React from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '../ui/accordion';
import { Badge } from '../ui/badge';
import { Building2, Layers } from 'lucide-react';
import ExperienceCard from './ExperienceCard';

function CompanyExperienceSection({ company, experiences }) {
  const companyInitial = company ? company.trim().charAt(0).toUpperCase() : 'C';

  return (
    <Accordion type="multiple" className="w-full">
      <AccordionItem
        value={company}
        className="border border-border/70 rounded-2xl bg-card/60 backdrop-blur-md hover:bg-card/90 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden"
      >
        <AccordionTrigger className="px-6 py-4 hover:no-underline group">
          <div className="flex items-center gap-3 text-left">
            {/* Company Avatar Badge */}
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/10 to-indigo-500/20 border border-primary/20 flex items-center justify-center text-primary font-bold text-base group-hover:scale-105 transition-transform">
              {companyInitial}
            </div>

            <div>
              <h2 className="text-base sm:text-lg font-bold text-foreground group-hover:text-primary transition-colors flex items-center gap-2">
                {company}
              </h2>
              <p className="text-xs text-muted-foreground flex items-center gap-1.5 mt-0.5">
                <Layers className="w-3 h-3 text-primary" />
                <span>
                  {experiences.length} experience{experiences.length > 1 ? 's' : ''} shared
                </span>
              </p>
            </div>
          </div>
        </AccordionTrigger>

        <AccordionContent className="px-6 pb-6">
          <div className="pt-2">
            <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-5" />

            {/* Experience Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {experiences.map((exp, index) => (
                <ExperienceCard key={exp.id} experience={exp} index={index} layoutMode="list" />
              ))}
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export default CompanyExperienceSection;
