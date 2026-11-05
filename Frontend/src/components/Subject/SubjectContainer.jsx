import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import useFetch from '@/hooks/useFetch';
import { getSubjectById } from '@/db/apiSubjects';
import { fetchSubtopics } from '@/db/apiSubtopic';
import { fetchQuestions } from '@/db/apiQuestion';
import { getProgress } from '@/db/apiProgress';
import Loader from '@/components/Loader';
import { getIcon } from '@/utils/iconmap';
import { UrlState } from '@/context';
import ProgressCard from '@/components/Subject/ProgressCard';
import SubtopicAccordion from '@/components/Subject/SubtopicAccordion';

function SubjectContainer() {
  const { id } = useParams();
  const { user } = UrlState();
  const [subject, setSubject] = useState(null);
  const [subtopics, setSubtopics] = useState([]);
  const [questions, setQuestions] = useState({});
  const [openSubtopic, setOpenSubtopic] = useState(null);
  const [progressData, setProgressData] = useState(null);
  const [subtopicsLoading, setSubtopicsLoading] = useState(true);
  const { loading: subjectLoading, error: subjectError, fn: fetchSubject } = useFetch(getSubjectById);

  useEffect(() => {
    if (!id) return;
    let active = true;
    fetchSubject(id).then((data) => { if (active) setSubject(data); });
    return () => { active = false; };
  }, [id]);

  useEffect(() => {
    if (!id) return;
    let active = true;
    setSubtopicsLoading(true);
    const fetchAll = async () => {
      try {
        const result = await fetchSubtopics({ subjectId: id });
        const validSubtopics = Array.isArray(result) ? result : [];
        const entries = await Promise.all(validSubtopics.map(async (subtopic) => {
          try {
            return [subtopic.id, await fetchQuestions(subtopic.id)];
          } catch (error) {
            console.error(`Failed to fetch questions for subtopic ${subtopic.id}`, error);
            return [subtopic.id, []];
          }
        }));
        if (active) {
          setSubtopics(validSubtopics);
          setQuestions(Object.fromEntries(entries));
        }
      } catch (error) {
        console.error('Failed to fetch subtopics:', error);
        if (active) {
          setSubtopics([]);
          setQuestions({});
        }
      } finally {
        if (active) setSubtopicsLoading(false);
      }
    };
    fetchAll();
    return () => { active = false; };
  }, [id]);

  useEffect(() => {
    if (!user?.id || !id) return;
    let active = true;
    const refreshProgress = async () => {
      const data = await getProgress(user.id, id);
      if (active) {
        setProgressData(data || { progress: 0, completedQ: 0, totalQ: 0, completed_questions: [] });
      }
    };
    refreshProgress();
    return () => { active = false; };
  }, [user?.id, id]);

  if (subjectError && !subject) {
    return (
      <section className="mx-auto max-w-5xl px-6 py-12 text-[#1f1b16] dark:text-[#efe9de]">
        <h1 className="text-2xl font-medium">Subject unavailable</h1>
        <p role="alert" className="mt-3 text-sm text-[#5e554a] dark:text-[#aaa398]">We couldn’t load this subject. {subjectError.message}</p>
        <Link to="/dashboard" className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[#2459a6] hover:underline dark:text-[#a8c7f3]"><ArrowLeft size={16} /> Back to subjects</Link>
      </section>
    );
  }

  if (subjectLoading || !progressData || subtopicsLoading) return <Loader />;
  if (!subject) return <p className="mx-auto max-w-5xl px-6 py-12 text-sm text-muted-foreground">Subject not found.</p>;

  const Icon = getIcon(subject.icon);

  return (
    <div className="mx-auto w-full max-w-5xl px-5 py-8 text-[#1f1b16] dark:text-[#efe9de] sm:px-6 md:py-10">
      <Link to="/dashboard" className="mb-6 inline-flex items-center gap-2 rounded-sm text-sm text-[#5e554a] transition-colors hover:text-[#1f1b16] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring dark:text-[#aaa398] dark:hover:text-[#efe9de]">
        <ArrowLeft size={16} /> All subjects
      </Link>

      <header className="mb-6 flex items-start gap-4">
        <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-black/10 bg-[#fdfbf7] text-[#5e554a] dark:border-white/10 dark:bg-[#1c1a18] dark:text-[#aaa398]">
          <Icon size={20} strokeWidth={1.6} aria-hidden="true" />
        </span>
        <div className="min-w-0">
          <h1 className="text-3xl font-medium leading-tight tracking-tight">{subject.name}</h1>
          {subject.description && <p className="mt-2 max-w-2xl text-sm leading-6 text-[#5e554a] dark:text-[#aaa398]">{subject.description}</p>}
        </div>
      </header>

      <ProgressCard
        progress={progressData.progress}
        completedQ={progressData.completedQ}
        totalQ={progressData.totalQ}
      />

      <section aria-labelledby="subtopics-heading" className="mt-8">
        <div className="mb-4 flex items-baseline justify-between gap-4">
          <h2 id="subtopics-heading" className="text-xl font-medium">Subtopics</h2>
          <span className="text-sm tabular-nums text-[#776f65] dark:text-[#8a847a]">{subtopics.length} in this subject</span>
        </div>
        {subtopics.length === 0 ? (
          <p className="rounded-xl border border-black/10 bg-[#fdfbf7] p-5 text-sm text-[#5e554a] dark:border-white/10 dark:bg-[#1c1a18] dark:text-[#aaa398]">No subtopics are available for this subject yet.</p>
        ) : (
          <div className="space-y-3">
            {subtopics.map((subtopic, index) => (
              <SubtopicAccordion
                key={subtopic.id}
                subtopic={subtopic}
                index={index}
                questions={questions[subtopic.id] || []}
                openSubtopic={openSubtopic}
                setOpenSubtopic={setOpenSubtopic}
                progressData={progressData}
                setProgressData={setProgressData}
                subjectId={id}
                user={user}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default SubjectContainer;
