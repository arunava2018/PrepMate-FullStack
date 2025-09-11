// src/pages/Subject.jsx
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useFetch from "@/hooks/useFetch";
import { getSubjectById } from "@/db/apiSubjects";
import { fetchSubtopics } from "@/db/apiSubtopic";
import { fetchQuestions } from "@/db/apiQuestion";
import { getProgress} from "@/db/apiProgress";
import Loader from "@/components/Loader";
import ProgressCard from "@/components/Subject/ProgressCard";
import { getIcon } from "@/utils/iconmap";
import { UrlState } from "@/context";
import SubtopicAccordion from "@/components/Subject/SubtopicAccordion";

function SubjectContainer() {
  const { id } = useParams();
  const { user } = UrlState();
  const [subject, setSubject] = useState(null);
  const [subtopics, setSubtopics] = useState([]);
  const [questions, setQuestions] = useState({});
  const [openSubtopic, setOpenSubtopic] = useState(null);
  const [progressData, setProgressData] = useState(null);

  const { loading: subjectLoading, fn: fetchSubject } = useFetch(getSubjectById);

  // Fetch subject
  useEffect(() => {
    if (!id) return;
    fetchSubject(id).then(setSubject);
  }, [id]);

  // Fetch subtopics and questions together
  useEffect(() => {
    if (!subject) return;

    const fetchAll = async () => {
      const subs = await fetchSubtopics({ subject: subject.name });
      setSubtopics(subs);

      const allQuestions = {};
      for (let st of subs) {
        allQuestions[st.id] = await fetchQuestions(st.id);
      }
      setQuestions(allQuestions);
    };

    fetchAll();
  }, [subject]);

  // Fetch progress
  useEffect(() => {
    if (!user || !id) return;

    const refreshProgress = async () => {
      const data = await getProgress(user.id, id);
      setProgressData(data);
    };
    refreshProgress();
  }, [user, id, questions]);

  if (subjectLoading || !progressData) return <Loader />;
  if (!subject) return <p>Loading or subject not found</p>;

  const Icon = getIcon(subject.icon);

  return (
    <motion.div className="max-w-5xl mx-auto px-6 py-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <motion.div whileHover={{ scale: 1.1, rotate: 5 }} className="p-3 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-2xl shadow-lg">
          <Icon className="w-8 h-8 text-white" />
        </motion.div>
        <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100">{subject.name}</h1>
      </div>

      <ProgressCard
        progress={progressData.progress}
        completedQ={progressData.completedQ}
        totalQ={progressData.totalQ}
      />

      {/* Subtopics */}
      <div className="mt-6 space-y-4">
        {subtopics.map((sub, index) => (
          <SubtopicAccordion
            key={sub.id}
            subtopic={sub}
            index={index}
            questions={questions[sub.id] || []}
            openSubtopic={openSubtopic}
            setOpenSubtopic={setOpenSubtopic}
            progressData={progressData}
            setProgressData={setProgressData}
            subjectId={id}
            user={user}
          />
        ))}
      </div>
    </motion.div>
  );
}

export default SubjectContainer;
