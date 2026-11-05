import { useEffect, useState } from 'react';
import { LoaderCircle, Pencil, Trash2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { getSubjects } from '@/db/apiSubjects';
import { fetchSubtopics } from '@/db/apiSubtopic';
import { deleteQuestion, fetchQuestions } from '@/db/apiQuestion';
import AdminPageShell from './AdminPageShell';
import UpdateQuestionModal from './UpdateQuestionModal';

export default function QuestionManager({ mode }) {
  const isDelete = mode === 'delete';
  const title = isDelete ? 'Delete a question' : 'Update a question';
  const description = isDelete
    ? 'Select a subject and subtopic to find the question you want to remove.'
    : 'Select a subject and subtopic to find the question you want to edit.';
  const [subjects, setSubjects] = useState([]);
  const [subtopics, setSubtopics] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedSubtopic, setSelectedSubtopic] = useState('');
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [subjectLoading, setSubjectLoading] = useState(true);
  const [subtopicLoading, setSubtopicLoading] = useState(false);
  const [questionLoading, setQuestionLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState('');
  const [isEditOpen, setIsEditOpen] = useState(false);

  useEffect(() => {
    let active = true;
    getSubjects()
      .then((data) => { if (active) setSubjects(Array.isArray(data) ? data : []); })
      .catch((cause) => { if (active) setError(cause.message || 'Could not load subjects'); })
      .finally(() => { if (active) setSubjectLoading(false); });
    return () => { active = false; };
  }, []);

  useEffect(() => {
    if (!selectedSubject) {
      setSubtopics([]);
      setSelectedSubtopic('');
      setSubtopicLoading(false);
      return;
    }
    let active = true;
    setSubtopicLoading(true);
    setSubtopics([]);
    setSelectedSubtopic('');
    setQuestions([]);
    setError('');
    fetchSubtopics({ subjectId: selectedSubject })
      .then((data) => { if (active) setSubtopics(Array.isArray(data) ? data : []); })
      .catch((cause) => { if (active) setError(cause.message || 'Could not load subtopics'); })
      .finally(() => { if (active) setSubtopicLoading(false); });
    return () => { active = false; };
  }, [selectedSubject]);

  useEffect(() => {
    if (!selectedSubtopic) {
      setQuestions([]);
      setQuestionLoading(false);
      return;
    }
    let active = true;
    setQuestionLoading(true);
    setQuestions([]);
    setError('');
    fetchQuestions(selectedSubtopic)
      .then((data) => { if (active) setQuestions(Array.isArray(data) ? data : []); })
      .catch((cause) => { if (active) setError(cause.message || 'Could not load questions'); })
      .finally(() => { if (active) setQuestionLoading(false); });
    return () => { active = false; };
  }, [selectedSubtopic]);

  const handleDelete = async () => {
    if (!selectedQuestion) return;
    setDeleting(true);
    setError('');
    try {
      await deleteQuestion(selectedQuestion.id);
      setQuestions((current) => current.filter((question) => question.id !== selectedQuestion.id));
      setSelectedQuestion(null);
    } catch (cause) {
      setError(cause.message || 'Could not delete this question');
    } finally {
      setDeleting(false);
    }
  };

  const selectClass = 'h-11 w-full rounded-lg border border-black/10 bg-[#f7f4ee] px-3 text-sm text-[#1f1b16] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#386eb8] disabled:opacity-50 dark:border-white/10 dark:bg-[#161513] dark:text-[#efe9de] dark:focus-visible:ring-[#a8c7f3]';
  const busy = subtopicLoading || questionLoading;

  return (
    <AdminPageShell title={title} description={description} wide>
      <div className="space-y-5">
        <Card className="gap-0 rounded-xl border-black/10 bg-[#fdfbf7] p-5 shadow-none dark:border-white/10 dark:bg-[#1c1a18] sm:p-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="manager-subject" className="text-sm font-medium">Subject</label>
              <select id="manager-subject" value={selectedSubject} onChange={(event) => setSelectedSubject(event.target.value)} disabled={subjectLoading} className={selectClass}>
                <option value="">{subjectLoading ? 'Loading subjects' : 'Choose a subject'}</option>
                {subjects.map((subject) => <option key={subject.id} value={subject.id}>{subject.name}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <label htmlFor="manager-subtopic" className="text-sm font-medium">Subtopic</label>
              <select id="manager-subtopic" value={selectedSubtopic} onChange={(event) => setSelectedSubtopic(event.target.value)} disabled={!selectedSubject || subtopicLoading} className={selectClass}>
                <option value="">{subtopicLoading ? 'Loading subtopics' : 'Choose a subtopic'}</option>
                {subtopics.map((subtopic) => <option key={subtopic.id} value={subtopic.id}>{subtopic.name}</option>)}
              </select>
            </div>
          </div>
        </Card>

        {error && <p role="alert" className="rounded-lg border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive">{error}</p>}

        {busy && <div role="status" className="flex items-center gap-2 py-3 text-sm text-[#5e554a] dark:text-[#aaa398]"><LoaderCircle size={16} className="animate-spin" /> Loading questions</div>}

        {!selectedSubtopic && !busy && (
          <p className="rounded-xl border border-black/10 bg-[#fdfbf7] p-5 text-sm text-[#5e554a] dark:border-white/10 dark:bg-[#1c1a18] dark:text-[#aaa398]">
            Select a subject and subtopic to view questions.
          </p>
        )}

        {selectedSubtopic && !busy && questions.length === 0 && (
          <p className="rounded-xl border border-black/10 bg-[#fdfbf7] p-5 text-sm text-[#5e554a] dark:border-white/10 dark:bg-[#1c1a18] dark:text-[#aaa398]">
            No questions are available for this subtopic.
          </p>
        )}

        {questions.length > 0 && !busy && (
          <section aria-labelledby="question-list-heading" className="overflow-hidden rounded-xl border border-black/10 bg-[#fdfbf7] dark:border-white/10 dark:bg-[#1c1a18]">
            <div className="flex items-baseline justify-between gap-4 border-b border-black/10 px-5 py-4 dark:border-white/10 sm:px-6">
              <h2 id="question-list-heading" className="text-base font-medium">Questions</h2>
              <span className="text-sm tabular-nums text-[#776f65] dark:text-[#8a847a]">{questions.length} total</span>
            </div>
            <ul className="divide-y divide-black/10 dark:divide-white/10">
              {questions.map((question, index) => (
                <li key={question.id} className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                  <div className="flex min-w-0 items-start gap-3">
                    <span className="mt-0.5 w-6 shrink-0 text-xs tabular-nums text-[#776f65] dark:text-[#8a847a]">{String(index + 1).padStart(2, '0')}</span>
                    <p className="line-clamp-3 min-w-0 text-sm leading-5 text-[#1f1b16] dark:text-[#efe9de]">{question.question_text}</p>
                  </div>
                  {isDelete ? (
                    <Button type="button" variant="outline" onClick={() => setSelectedQuestion(question)} className="h-9 shrink-0 gap-2 rounded-md border-destructive/30 px-3 text-destructive shadow-none hover:bg-destructive/5">
                      <Trash2 size={15} /> Delete
                    </Button>
                  ) : (
                    <Button type="button" variant="outline" onClick={() => { setSelectedQuestion(question); setIsEditOpen(true); }} className="h-9 shrink-0 gap-2 rounded-md px-3 shadow-none">
                      <Pencil size={15} /> Edit
                    </Button>
                  )}
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>

      <UpdateQuestionModal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} question={selectedQuestion} />

      <AlertDialog open={!!selectedQuestion && isDelete} onOpenChange={(open) => { if (!open && !deleting) setSelectedQuestion(null); }}>
        <AlertDialogContent className="rounded-xl border border-black/10 bg-[#fdfbf7] text-[#1f1b16] dark:border-white/10 dark:bg-[#1c1a18] dark:text-[#efe9de]">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-lg font-medium">Delete this question?</AlertDialogTitle>
            <AlertDialogDescription className="text-sm leading-6 text-[#5e554a] dark:text-[#aaa398]">
              This removes the question from the question bank and cannot be undone.
              <span className="mt-3 block font-medium text-[#1f1b16] dark:text-[#efe9de]">{selectedQuestion?.question_text}</span>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting} className="rounded-md">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={(event) => { event.preventDefault(); handleDelete(); }} disabled={deleting} className="rounded-md bg-destructive text-white hover:bg-destructive/90">
              {deleting ? 'Deleting' : 'Delete question'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminPageShell>
  );
}
