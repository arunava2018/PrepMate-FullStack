import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getSubjects } from '@/db/apiSubjects';
import { fetchSubtopics } from '@/db/apiSubtopic';
import { addQuestion } from '@/db/apiQuestion';
import useFetch from '@/hooks/useFetch';
import MarkdownEditor from '../submit-experience-form/MarkdownEditor';
import AdminPageShell from './AdminPageShell';

export default function AddQuestion() {
  const [form, setForm] = useState({ subjectId: '', subtopicId: '', question: '', answer: '' });
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { data: subjects, loading: subjectsLoading, fn: fetchSubjects } = useFetch(getSubjects);
  const { data: subtopics, loading: subtopicsLoading, error: subtopicsError, fn: fetchSubjectSubtopics } = useFetch(fetchSubtopics);

  useEffect(() => { fetchSubjects(); }, []);
  useEffect(() => {
    if (!form.subjectId) return;
    setForm((current) => ({ ...current, subtopicId: '' }));
    fetchSubjectSubtopics({ subjectId: form.subjectId });
  }, [form.subjectId]);
  useEffect(() => {
    if (!successMsg && !errorMsg) return;
    const timer = setTimeout(() => { setSuccessMsg(''); setErrorMsg(''); }, 3000);
    return () => clearTimeout(timer);
  }, [successMsg, errorMsg]);

  const handleChange = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
    setSuccessMsg('');
    setErrorMsg('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setSuccessMsg('');
    setErrorMsg('');
    try {
      await addQuestion({
        subjectId: form.subjectId,
        subtopicId: form.subtopicId,
        question: form.question,
        answer: form.answer,
      });
      setSuccessMsg('Question added');
      setForm((current) => ({ ...current, question: '', answer: '' }));
    } catch (error) {
      setErrorMsg(error.message || 'Could not add this question');
    } finally {
      setSubmitting(false);
    }
  };

  const selectClass = 'h-11 w-full rounded-lg border border-black/10 bg-[#f7f4ee] px-3 text-sm text-[#1f1b16] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#386eb8] disabled:opacity-50 dark:border-white/10 dark:bg-[#161513] dark:text-[#efe9de] dark:focus-visible:ring-[#a8c7f3]';

  return (
    <AdminPageShell title="Add a question" description="Choose where it belongs, then write the prompt and answer">
      <Card className="gap-0 overflow-hidden rounded-xl border-black/10 bg-[#fdfbf7] py-0 shadow-none dark:border-white/10 dark:bg-[#1c1a18]">
        <form onSubmit={handleSubmit} className="space-y-6 p-5 sm:p-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="question-subject" className="text-sm font-medium">Subject</label>
              <select id="question-subject" name="subjectId" value={form.subjectId} onChange={handleChange} disabled={subjectsLoading} required className={selectClass}>
                <option value="">{subjectsLoading ? 'Loading subjects' : 'Choose a subject'}</option>
                {Array.isArray(subjects) && subjects.map(({ id, name }) => <option key={id} value={id}>{name}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <label htmlFor="question-subtopic" className="text-sm font-medium">Subtopic</label>
              <select id="question-subtopic" name="subtopicId" value={form.subtopicId} onChange={handleChange} disabled={!form.subjectId || subtopicsLoading} required className={selectClass}>
                <option value="">{subtopicsLoading ? 'Loading subtopics' : 'Choose a subtopic'}</option>
                {Array.isArray(subtopics) && subtopics.map(({ id, name }) => <option key={id} value={id}>{name}</option>)}
              </select>
              {subtopicsError && <p role="alert" className="text-sm text-destructive">{subtopicsError.message}</p>}
            </div>
          </div>

          <MarkdownEditor id="question-prompt" value={form.question} onChange={(value) => setForm((current) => ({ ...current, question: value }))} label="Question" placeholder="Write the question" />
          <MarkdownEditor id="question-answer" value={form.answer} onChange={(value) => setForm((current) => ({ ...current, answer: value }))} label="Answer" placeholder="Write the answer and explanation" />

          {successMsg && <p role="status" className="rounded-lg border border-emerald-700/20 bg-emerald-700/5 px-4 py-3 text-sm text-emerald-800 dark:text-emerald-300">{successMsg}</p>}
          {errorMsg && <p role="alert" className="rounded-lg border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive">{errorMsg}</p>}

          <Button type="submit" disabled={submitting || subtopicsLoading} className="h-11 w-full rounded-lg bg-[#2459a6] text-sm font-medium text-white shadow-none hover:bg-[#1d4a8a]">
            {submitting ? 'Adding question' : 'Add question'}
          </Button>
        </form>
      </Card>
    </AdminPageShell>
  );
}
