    import { useEffect, useState } from "react";
    import { fetchUnpublishedInterviewExperiences } from "@/db/apiInterviewExperience";
    import { Button } from "@/components/ui/button";
    import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
    import { Badge } from "@/components/ui/badge";
    import { Skeleton } from "@/components/ui/skeleton";
    import { ChevronDown, Building2, RefreshCw, CheckCircle, User } from "lucide-react";
    import ApprovalModal from "./ApproveExperiencesModal";

    export default function ApproveExperiences() {
      const [experiences, setExperiences] = useState([]);
      const [loading, setLoading] = useState(false);
      const [expandedCompany, setExpandedCompany] = useState(null);
      const [selectedExp, setSelectedExp] = useState(null); // for modal

      const fetchData = async () => {
        setLoading(true);
        try {
          const res = await fetchUnpublishedInterviewExperiences();
          setExperiences(res);
        } catch (err) {
          console.error("Error fetching experiences:", err);
        } finally {
          setLoading(false);
        }
      };

      useEffect(() => {
        fetchData();
      }, []);

      const groupedExperiences = experiences.reduce((acc, exp) => {
        if (!acc[exp.company_name]) acc[exp.company_name] = [];
        acc[exp.company_name].push(exp);
        return acc;
      }, {});

      return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 dark:from-gray-900 dark:to-gray-800 p-6">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Header */}
            <div className="text-center space-y-3">
              <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
                Approve Interview Experiences
              </h1>
              <div className="flex justify-center gap-4">
                <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-200">
                  <Building2 className="w-4 h-4 mr-1" />
                  {Object.keys(groupedExperiences).length} Companies
                </Badge>
                <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-200">
                  {experiences.length} Pending
                </Badge>
              </div>
              <Button
                onClick={fetchData}
                disabled={loading}
                variant="outline"
                className="gap-2 border-amber-200 text-amber-700 hover:bg-amber-50 dark:border-amber-700 dark:text-amber-300"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
                Refresh
              </Button>
            </div>

            {/* Loading */}
            {loading && (
              <div className="space-y-3">
                {[1, 2].map((i) => (
                  <Card key={i} className="bg-white dark:bg-gray-800">
                    <CardHeader><Skeleton className="h-6 w-40" /></CardHeader>
                  </Card>
                ))}
              </div>
            )}

            {/* Empty */}
            {!loading && experiences.length === 0 && (
              <Card className="bg-white dark:bg-gray-800 text-center py-12">
                <CardContent>
                  <p className="text-lg font-medium text-gray-600 dark:text-gray-300">
                    No pending experiences to approve.
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Companies */}
            {!loading &&
              Object.entries(groupedExperiences).map(([company, companyExperiences]) => (
                <Card
                  key={company}
                  className="bg-white dark:bg-gray-800 border border-amber-200 dark:border-gray-700 rounded-xl"
                >
                  <CardHeader
                    onClick={() =>
                      setExpandedCompany((prev) => (prev === company ? null : company))
                    }
                    className="cursor-pointer flex justify-between items-center rounded-t-xl"
                  >
                    <CardTitle className="flex items-center gap-2 text-gray-800 dark:text-gray-200">
                      <Building2 className="w-5 h-5 text-amber-600" />
                      {company}
                      <Badge className="ml-2 bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200">
                        {companyExperiences.length} pending
                      </Badge>
                    </CardTitle>
                    <ChevronDown
                      className={`w-5 h-5 text-gray-500 transition-transform ${
                        expandedCompany === company ? "rotate-180" : ""
                      }`}
                    />
                  </CardHeader>

                  {expandedCompany === company && (
                    <CardContent className="space-y-3">
                      {companyExperiences.map((exp, idx) => (
                        <div
                          key={exp.id}
                          className="flex justify-between items-center bg-gradient-to-r from-slate-800 to-slate-700 text-white p-4 rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            <span className="w-7 h-7 flex items-center justify-center rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-sm font-bold">
                              {idx + 1}
                            </span>
                            <span>
                              <User className="w-5 h-5 text-white inline" />
                            </span>
                            <p>{exp.usersProfile?.name || "Unknown User"}</p>
                          </div>
                          <Button
                            onClick={() => setSelectedExp(exp)}
                            className="bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-white"
                          >
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Review & Approve
                          </Button>
                        </div>
                      ))}
                    </CardContent>
                  )}
                </Card>
              ))}
          </div>

          {/* Modal */}
          <ApprovalModal
            open={!!selectedExp}
            onClose={() => setSelectedExp(null)}
            experience={selectedExp}
            refreshData = {fetchData}
          />
        </div>
      );
    }
