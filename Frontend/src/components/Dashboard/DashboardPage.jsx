import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { getSubjects } from '@/db/apiSubjects';
import { getProgress } from '@/db/apiProgress';
import useFetch from '@/hooks/useFetch';
import Loader from '@/components/Loader';
import { getIcon } from '@/utils/iconmap';
import { motion } from 'framer-motion';
import { UrlState } from '@/context';
import DashboardInfo from './DashboardInfo';

const DashboardPage = () => {
  const navigate = useNavigate();
  const { user } = UrlState();
  const {
    data: subjects,
    loading,
    error,
    fn: fnSubjects,
  } = useFetch(getSubjects);
  const [progressMap, setProgressMap] = useState({});

  useEffect(() => {
    fnSubjects();
  }, []);

  useEffect(() => {
    if (!user || !subjects?.length) return;

    const fetchProgress = async () => {
      const newMap = {};
      await Promise.all(
        subjects.map(async (subj) => {
          const data = await getProgress(user.id, subj.id);
          newMap[subj.id] = data?.progress || 0;
        })
      );
      setProgressMap(newMap);
    };

    fetchProgress();
  }, [user, subjects]);

  const slugify = (text) =>
    text
      .toString()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, '-')
      .replace(/[^a-zA-Z0-9-]/g, '')
      .trim();

  if (loading) return <Loader />;
  if (error)
    return <p className="text-center text-red-500">Error: {error.message}</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold md:mb-1 mb-5">Dashboard</h1>

      <DashboardInfo />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {subjects?.map((subj) => {
          const Icon = getIcon(subj.icon);
          const isLoggedIn = !!user?.id;
          const progress = progressMap[subj.id] || 0;

          return (
            <Card
              key={subj.id}
              onClick={() => {
                if (isLoggedIn) {
                  navigate(`/subject/${slugify(subj.name)}/${subj.id}`);
                }
              }}
              className={`group transition-all duration-200 border border-border bg-card hover:bg-accent/50 ${
                isLoggedIn ? 'cursor-pointer hover:shadow-md hover:border-primary/50' : 'cursor-default'
              }`}>
              <CardHeader className="flex flex-col items-center relative py-6">
                <div className="p-3 bg-primary/10 rounded-xl mb-4 group-hover:scale-105 transition-transform duration-200">
                  <Icon className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-lg font-semibold text-center text-foreground">
                  {subj.name}
                </CardTitle>

                {/* Question count - only show when logged in */}
                {isLoggedIn && (
                  <div className="absolute top-4 right-4">
                    <span className="text-xs font-semibold bg-primary/10 text-primary px-2.5 py-0.5 rounded-full border border-primary/20">
                      {subj.question_count} Qs
                    </span>
                  </div>
                )}
              </CardHeader>

              <CardContent className="text-center text-muted-foreground flex flex-col items-center">
                <p className="mb-6 text-sm">
                  {subj.description || 'No description available.'}
                </p>

                {/* Progress Bar - only show when logged in */}
                {isLoggedIn && (
                  <div className="w-full flex flex-col gap-2 mt-auto">
                    <div className="flex justify-between text-sm font-medium text-foreground">
                      <span>Progress</span>
                      <span>{progress.toFixed(0)}%</span>
                    </div>

                    <div className="relative w-full bg-muted rounded-full h-2 overflow-hidden">
                      <motion.div
                        className="h-full rounded-full bg-primary relative"
                        initial={{ width: '0%' }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.8, ease: 'easeInOut' }}>
                      </motion.div>
                    </div>
                  </div>
                )}

                {/* Sign in prompt for non-logged-in users */}
                {!isLoggedIn && (
                  <div className="mt-auto w-full p-3 bg-muted rounded-md border border-border">
                    <p className="text-xs text-muted-foreground font-medium">
                      Sign in to track progress
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default DashboardPage;
