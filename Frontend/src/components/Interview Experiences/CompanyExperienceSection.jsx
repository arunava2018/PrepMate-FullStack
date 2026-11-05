import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import ExperienceCard from './ExperienceCard';

function CompanyExperienceSection({ company, experiences }) {
  return (
    <Accordion type="multiple" className="w-full">
      <AccordionItem value={company} className="overflow-hidden rounded-xl border border-black/10 bg-[#fdfbf7] dark:border-white/10 dark:bg-[#1c1a18]">
        <AccordionTrigger className="px-5 py-4 text-left hover:no-underline sm:px-6">
          <span className="min-w-0">
            <span className="block truncate text-base font-medium text-[#1f1b16] dark:text-[#efe9de]">{company}</span>
            <span className="mt-1 block text-sm font-normal text-[#5e554a] dark:text-[#aaa398]">
              {experiences.length} {experiences.length === 1 ? 'account' : 'accounts'}
            </span>
          </span>
        </AccordionTrigger>
        <AccordionContent className="border-t border-black/10 px-4 pb-4 pt-4 dark:border-white/10 sm:px-5">
          <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
            {experiences.map((experience) => <ExperienceCard key={experience.id} experience={experience} />)}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export default CompanyExperienceSection;
