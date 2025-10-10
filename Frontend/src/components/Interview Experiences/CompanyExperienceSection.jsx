import React from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '../ui/accordion';
import { Badge } from '../ui/badge';
import { Building2 } from 'lucide-react';
import ExperienceCard from './ExperienceCard';

function CompanyExperienceSection({ company, experiences }) {
  return (
    <Accordion type="multiple" className="w-full">
      <AccordionItem
        value={company}
        className="border border-amber-200 dark:border-gray-700 rounded-xl bg-gradient-to-r from-orange-50 to-amber-50 dark:from-gray-800 dark:to-gray-900 shadow-sm hover:shadow-md transition-shadow duration-200">
        <AccordionTrigger className="px-6 py-4 hover:no-underline group">
          <div className="flex items-center gap-3 text-left">
            <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg group-hover:bg-amber-200 dark:group-hover:bg-amber-900/50 transition-colors">
              <Building2 className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-amber-800 dark:text-amber-300 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                {company}
              </h2>
              <Badge className="mt-1 bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-200 text-sm">
                {experiences.length} experience
                {experiences.length > 1 ? 's' : ''}
              </Badge>
            </div>
          </div>
        </AccordionTrigger>

        <AccordionContent className="px-6 pb-6">
          <div className="pt-2">
            <div className="h-px bg-gradient-to-r from-transparent via-amber-200 dark:via-gray-700 to-transparent mb-4" />

            {/* Experience cards */}
            <Accordion type="multiple" className="space-y-3">
              {experiences.map((exp, index) => (
                <div key={exp.id} className="flex items-center justify-between">
                  <ExperienceCard experience={exp} index={index} />
                </div>
              ))}
            </Accordion>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export default CompanyExperienceSection;
