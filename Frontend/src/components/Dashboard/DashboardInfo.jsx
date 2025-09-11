import { UrlState } from "@/context";
import { getProgress } from "@/db/apiProgress";
import { getSubjects } from "@/db/apiSubjects";
import useFetch from "@/hooks/useFetch";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { BookOpen, HelpCircle, TrendingUp, Activity, Award, Target, UserPlus, LogIn, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

function DashboardInfo() {
  const { user } = UrlState();
  const navigate = useNavigate();
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [totalSubjects, setTotalSubjects] = useState(0);
  const [avgProgressPercentage, setAvgProgressPercentage] = useState(0);
  const [completedQuestions, setCompletedQuestions] = useState(0);
  
  const {
    data: subjects,
    loading,
    error,
    fn: fnSubjects,
  } = useFetch(getSubjects);

  useEffect(() => {
    if (user?.id) {
      fnSubjects();
    }
  }, [user?.id]);

  useEffect(() => {
    if (subjects && user?.id) {
      const totalQ = subjects.reduce((acc, subj) => acc + (subj.question_count || 0), 0);
      setTotalQuestions(totalQ);
      setTotalSubjects(subjects.length);
      
      let totalCompletedQuestions = 0;
      const fetchProgress = async () => {
        await Promise.all(
          subjects.map(async (subj) => {
            const data = await getProgress(user.id, subj.id);
            totalCompletedQuestions += data?.completedQ || 0;
          })
        );
        
        setCompletedQuestions(totalCompletedQuestions);
        const avgProgress = totalQ > 0 ? (totalCompletedQuestions / totalQ) * 100 : 0;
        setAvgProgressPercentage(avgProgress.toFixed(1));
      };
      fetchProgress();
    }
  }, [subjects, user?.id]);

  // Compact login prompt for non-logged-in users
  if (!user?.id) {
    return (
      <div className="mb-6">
        <Card className="relative bg-white dark:bg-gray-800 border border-yellow-200 dark:border-yellow-800/50 rounded-xl shadow-lg overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 dark:from-yellow-900/20 to-transparent" />
          
          <CardContent className="relative z-10 p-6">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center shadow-lg shrink-0">
                <UserPlus className="w-6 h-6 text-white" />
              </div>

              <div className="flex-1 text-center sm:text-left">
                <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-1">
                  Track Your Learning Progress
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                  Create an account to access detailed analytics and track your progress across subjects.
                </p>
                
                <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                  <Button
                    onClick={() => navigate('/auth/signup')}
                    size="sm"
                    className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white font-semibold px-4 py-2 rounded-lg text-xs"
                  >
                    <UserPlus className="w-3 h-3 mr-1" />
                    Sign Up
                  </Button>

                  <Button
                    onClick={() => navigate('/auth/login')}
                    variant="outline"
                    size="sm"
                    className="border border-yellow-400 hover:border-yellow-500 text-yellow-600 dark:text-yellow-400 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 font-semibold px-4 py-2 rounded-lg text-xs"
                  >
                    <LogIn className="w-3 h-3 mr-1" />
                    Sign In
                  </Button>
                </div>
              </div>

              <div className="hidden md:flex items-center gap-6 text-center shrink-0">
                <div>
                  <p className="text-lg font-bold text-yellow-600">10k+</p>
                  <p className="text-xs text-gray-500">Questions</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-yellow-600">50+</p>
                  <p className="text-xs text-gray-500">Subjects</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Circular Progress Component
  const CircularProgress = ({ percentage, size = 60, strokeWidth = 6 }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
      <div className="relative">
        <svg width={size} height={size} className="transform -rotate-90">
          <circle cx={size / 2} cy={size / 2} r={radius} fill="transparent" stroke="rgb(229, 231, 235)" strokeWidth={strokeWidth} />
          <motion.circle
            cx={size / 2} cy={size / 2} r={radius} fill="transparent" stroke="url(#progressGradient)"
            strokeWidth={strokeWidth} strokeLinecap="round" strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
          <defs>
            <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#facc15" />
              <stop offset="100%" stopColor="#eab308" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-black text-gray-800 dark:text-white">{percentage}%</span>
        </div>
      </div>
    );
  };

  const stats = [
    {
      title: "Total Subjects", value: totalSubjects, icon: BookOpen, description: "Available learning paths",
      gradient: "from-blue-400 to-blue-500", bgColor: "bg-blue-100/70 dark:bg-blue-900/30", borderColor: "border-blue-200/50 dark:border-blue-800/30"
    },
    {
      title: "Total Questions", value: totalQuestions.toLocaleString(), icon: HelpCircle, description: "Practice questions available",
      gradient: "from-purple-400 to-purple-500", bgColor: "bg-purple-100/70 dark:bg-purple-900/30", borderColor: "border-purple-200/50 dark:border-purple-800/30"
    },
    {
      title: "Questions Completed", value: completedQuestions.toLocaleString(), icon: Target, description: "Successfully answered",
      gradient: "from-green-400 to-green-500", bgColor: "bg-green-100/70 dark:bg-green-900/30", borderColor: "border-green-200/50 dark:border-green-800/30"
    },
    {
      title: "Average Progress", value: `${avgProgressPercentage}%`, icon: TrendingUp, description: "Overall completion rate",
      gradient: "from-yellow-400 to-yellow-500", bgColor: "bg-yellow-100/70 dark:bg-yellow-900/30", borderColor: "border-yellow-200/50 dark:border-yellow-800/30", isProgress: true
    }
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[...Array(4)].map((_, index) => (
          <Card key={index} className="bg-white/70 dark:bg-gray-800/70 border border-gray-200/50 dark:border-gray-700/50 rounded-xl animate-pulse h-24">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
                <div className="h-6 w-6 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
              </div>
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-12"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Card className="bg-red-100/70 dark:bg-red-900/30 border border-red-200/50 dark:border-red-800/30 rounded-xl mb-6">
        <CardContent className="p-6 text-center">
          <Activity className="w-8 h-8 text-red-500 mx-auto mb-2" />
          <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-1">Unable to Load Dashboard</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">There was an error loading your progress data.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="mb-6">
      {/* Compact Header */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-1">Dashboard Overview</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">Track your learning progress and achievements</p>
      </div>

      {/* Compact Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => (
          <Card key={stat.title} className={`relative ${stat.bgColor} backdrop-blur-sm border ${stat.borderColor} rounded-xl shadow-lg overflow-hidden group transition-all hover:shadow-xl hover:scale-105`}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-gray-600 dark:text-gray-300 text-xs font-medium">{stat.title}</CardTitle>
                <div className={`p-2 bg-gradient-to-r ${stat.gradient} rounded-lg shadow-md`}>
                  <stat.icon className="w-4 h-4 text-white" />
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="pt-0">
              {stat.isProgress ? (
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-black text-gray-800 dark:text-gray-100">{stat.value}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{stat.description}</p>
                  </div>
                  <CircularProgress percentage={parseFloat(avgProgressPercentage)} />
                </div>
              ) : (
                <div>
                  <p className="text-2xl font-black text-gray-800 dark:text-gray-100 mb-1">{stat.value}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{stat.description}</p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default DashboardInfo;
