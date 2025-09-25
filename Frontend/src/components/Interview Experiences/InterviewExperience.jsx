import { fetchPublicInterviewExperiences } from "@/db/apiInterviewExperience";
import useFetch from "@/hooks/useFetch";
import React, { useEffect, useState } from "react";
import Loader from "../Loader";
import { Card, CardContent } from "../ui/card";
import { FileText } from "lucide-react";
import CompanyExperienceSection from "./CompanyExperienceSection";
import ExperienceStats from "./ExperienceStats";

function InterviewExperience() {
  const { data, loading, error, fn: fetchExperience } = useFetch(fetchPublicInterviewExperiences);
  const [groupedExperiences, setGroupedExperiences] = useState({});

  useEffect(() => {
    fetchExperience().then((fetchedData) => {
      if (Array.isArray(fetchedData)) {
        const grouped = fetchedData.reduce((acc, exp) => {
          if (exp.company_name) {
            const normalizedName = exp.company_name.trim().toLowerCase();

            if (!acc[normalizedName]) {
              acc[normalizedName] = {
                displayName: exp.company_name.trim(), // store clean original for display
                experiences: [],
              };
            }

            acc[normalizedName].experiences.push(exp);
          }
          return acc;
        }, {});
        setGroupedExperiences(grouped);
      }
    });
  }, []);

  if (loading) return <Loader />;

  if (error) {
    return (
      <Card className="border-red-200 bg-red-50 dark:bg-red-900/20">
        <CardContent className="flex items-center gap-3 pt-6">
          <span className="text-red-700 dark:text-red-300">
            Failed to load interview experiences. Please try again later.
          </span>
        </CardContent>
      </Card>
    );
  }

  const totalCompanies = Object.keys(groupedExperiences).length;
  const totalExperiences = Object.values(groupedExperiences)
    .map((g) => g.experiences.length)
    .reduce((a, b) => a + b, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4 mt-5">
        <div className="flex items-center justify-center gap-3">
          <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
            <FileText className="w-6 h-6 text-amber-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
            Interview Experiences
          </h1>
        </div>

        <ExperienceStats
          totalCompanies={totalCompanies}
          totalExperiences={totalExperiences}
        />
      </div>

      {/* Content */}
      {Object.keys(groupedExperiences).length > 0 ? (
        <div className="space-y-4">
          {Object.entries(groupedExperiences)
            .sort(([a], [b]) => a.localeCompare(b)) // sort lexicographically
            .map(([normalizedName, { displayName, experiences }]) => (
              <CompanyExperienceSection
                key={normalizedName}
                company={displayName}
                experiences={experiences} // anonymity handled inside children
              />
            ))}
        </div>
      ) : (
        <Card className="bg-white dark:bg-gray-800 text-center py-12 border-amber-200 dark:border-gray-700">
          <CardContent>
            <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-amber-600" />
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              No interview experiences available yet.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default InterviewExperience;
