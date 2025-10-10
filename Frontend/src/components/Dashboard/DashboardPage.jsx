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
              className={`group transition transform hover:scale-105 hover:shadow-xl rounded-2xl ${
                isLoggedIn ? 'cursor-pointer' : 'cursor-default'
              }`}>
              <CardHeader className="flex flex-col items-center relative py-6">
                <div className="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-full shadow-md mb-3">
                  <Icon className="w-10 h-10 text-yellow-600 dark:text-yellow-300" />
                </div>
                <CardTitle className="text-lg font-semibold text-center text-gray-800 dark:text-gray-100">
                  {subj.name}
                </CardTitle>

                {/* Question count - only show when logged in */}
                {isLoggedIn && (
                  <div className="absolute top-4 right-4">
                    <span className="text-xs font-semibold bg-gradient-to-r from-yellow-400 to-yellow-600 text-white px-3 py-1 rounded-full shadow-md">
                      {subj.question_count} Qs
                    </span>
                  </div>
                )}
              </CardHeader>

              <CardContent className="text-center text-gray-600 dark:text-gray-400">
                <p className="mb-3">
                  {subj.description || 'No description available.'}
                </p>

                {/* Progress Bar - only show when logged in */}
                {isLoggedIn && (
                  <div className="w-full flex flex-col gap-2">
                    <div className="flex justify-between text-sm font-medium text-gray-700 dark:text-gray-300">
                      <span>Progress</span>
                      <span>{progress.toFixed(0)}%</span>
                    </div>

                    <div className="relative w-full bg-gray-200 dark:bg-gray-700 rounded-full h-5 overflow-hidden shadow-inner">
                      <motion.div
                        className="h-5 rounded-full bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 shadow-md relative"
                        initial={{ width: '0%' }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.8, ease: 'easeInOut' }}>
                        {/* Animated stripe overlay */}
                        <motion.div
                          className="absolute inset-0 rounded-full bg-[linear-gradient(45deg,rgba(255,255,255,0.25)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.25)_50%,rgba(255,255,255,0.25)_75%,transparent_75%,transparent)] bg-[length:1rem_1rem]"
                          animate={{
                            backgroundPosition: ['0px 0px', '20px 0px'],
                          }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: 'linear',
                          }}
                        />
                      </motion.div>
                    </div>
                  </div>
                )}

                {/* Sign in prompt for non-logged-in users */}
                {!isLoggedIn && (
                  <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800/30">
                    <p className="text-sm text-yellow-700 dark:text-yellow-300 font-medium">
                      Sign in to track your progress and access content
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
