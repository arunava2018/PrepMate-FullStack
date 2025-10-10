import { useEffect, useState } from 'react';
import { fetchUnpublishedInterviewExperiences } from '@/db/apiInterviewExperience';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
  ChevronDown,
  Building2,
  RefreshCw,
  CheckCircle,
  User,
} from 'lucide-react';
import ApprovalModal from './ApprovalModal';

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
      console.error('Error fetching experiences:', err);
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
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-3">
          <h1 className="text-3xl font-bold text-foreground">
            Approve Interview Experiences
          </h1>
          <div className="flex justify-center gap-4">
            <Badge variant="secondary" className="flex items-center gap-1">
              <Building2 className="w-4 h-4" />
              {Object.keys(groupedExperiences).length} Companies
            </Badge>
            <Badge variant="secondary">{experiences.length} Pending</Badge>
          </div>
          <Button
            onClick={fetchData}
            disabled={loading}
            variant="outline"
            className="gap-2">
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>

        {/* Loading */}
        {loading && (
          <div className="space-y-3">
            {[1, 2].map((i) => (
              <Card key={i} className="bg-card border border-border">
                <CardHeader>
                  <Skeleton className="h-6 w-40" />
                </CardHeader>
              </Card>
            ))}
          </div>
        )}

        {/* Empty */}
        {!loading && experiences.length === 0 && (
          <Card className="bg-card text-center py-12 border border-border">
            <CardContent>
              <p className="text-lg font-medium text-muted-foreground">
                No pending experiences to approve.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Companies */}
        {!loading &&
          Object.entries(groupedExperiences).map(
            ([company, companyExperiences]) => (
              <Card
                key={company}
                className="bg-card border border-border rounded-xl">
                <CardHeader
                  onClick={() =>
                    setExpandedCompany((prev) =>
                      prev === company ? null : company
                    )
                  }
                  className="cursor-pointer flex justify-between items-center rounded-t-xl">
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <Building2 className="w-5 h-5 text-primary" />
                    {company}
                    <Badge variant="secondary" className="ml-2">
                      {companyExperiences.length} pending
                    </Badge>
                  </CardTitle>
                  <ChevronDown
                    className={`w-5 h-5 text-muted-foreground transition-transform ${
                      expandedCompany === company ? 'rotate-180' : ''
                    }`}
                  />
                </CardHeader>

                {expandedCompany === company && (
                  <CardContent className="space-y-3">
                    {companyExperiences.map((exp, idx) => (
                      <div
                        key={exp.id}
                        className="flex justify-between items-center bg-muted p-4 rounded-lg border border-border">
                        <div className="flex items-center gap-3">
                          <span className="w-7 h-7 flex items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                            {idx + 1}
                          </span>
                          <User className="w-5 h-5 text-muted-foreground" />
                          <p>
                            {exp.is_anonymous
                              ? 'Anonymous User'
                              : exp.users?.full_name || 'Unknown User'}
                          </p>
                        </div>
                        <Button
                          onClick={() => setSelectedExp(exp)}
                          className="bg-primary text-primary-foreground hover:bg-primary/90">
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Review & Approve
                        </Button>
                      </div>
                    ))}
                  </CardContent>
                )}
              </Card>
            )
          )}
      </div>

      {/* Modal */}
      <ApprovalModal
        open={!!selectedExp}
        onClose={() => setSelectedExp(null)}
        experience={selectedExp}
        fetchData={fetchData}
      />
    </div>
  );
}
