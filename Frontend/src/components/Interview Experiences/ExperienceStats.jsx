import React from 'react';
import { Badge } from '../ui/badge';
import { Building2, FileText } from 'lucide-react';

function ExperienceStats({ totalCompanies, totalExperiences }) {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-200 px-4 py-2 text-sm font-medium">
        <Building2 className="w-4 h-4 mr-2" />
        {totalCompanies} Companies
      </Badge>
      <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-200 px-4 py-2 text-sm font-medium">
        <FileText className="w-4 h-4 mr-2" />
        {totalExperiences} Experiences
      </Badge>
    </div>
  );
}

export default ExperienceStats;
