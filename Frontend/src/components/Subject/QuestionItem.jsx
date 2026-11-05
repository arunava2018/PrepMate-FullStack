import { useState } from 'react';
import { Check, CheckCircle2, ChevronDown, Circle } from 'lucide-react';
import { markQuestionAsRead, unmarkQuestion, getProgress } from '@/db/apiProgress';
import MarkdownRenderer from '@/components/MarkdownRenderer';

export default function QuestionItem({ question, progressData, setProgressData, subjectId, user }) {
  const [open, setOpen] = useState(false);
  const isRead = (progressData.completed_questions || []).includes(question.id);
  const answerId = `answer-${question.id}`;

  const handleMark = async () => {
    if (!user?.id) return;
    const success = await markQuestionAsRead(user.id, subjectId, question.id);
    if (success) {
      const data = await getProgress(user.id, subjectId);
      setProgressData(data);
      setOpen(false);
    }
  };

  const handleUnmark = async () => {
    if (!user?.id) return;
    const success = await unmarkQuestion(user.id, subjectId, question.id);
    if (success) {
      const data = await getProgress(user.id, subjectId);
      setProgressData(data);
    }
  };

  return (
    <article className="overflow-hidden rounded-lg border border-black/10 bg-[#f7f4ee] dark:border-white/10 dark:bg-[#161513]">
      <h4>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={answerId}
          onClick={() => setOpen((value) => !value)}
          className="flex min-h-14 w-full items-center justify-between gap-4 px-4 py-3 text-left transition-colors hover:bg-[#f2eee6] focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring dark:hover:bg-[#262421]">
          <span className="flex min-w-0 items-center gap-3">
            {isRead ? <CheckCircle2 size={17} className="shrink-0 text-emerald-700 dark:text-emerald-400" aria-label="Completed" /> : <Circle size={17} className="shrink-0 text-[#776f65] dark:text-[#8a847a]" aria-hidden="true" />}
            <span className="text-sm font-medium leading-5 text-[#1f1b16] dark:text-[#efe9de]">{question.question_text}</span>
          </span>
          <ChevronDown size={16} className={`shrink-0 text-[#776f65] transition-transform duration-150 dark:text-[#8a847a] ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
        </button>
      </h4>

      {open && (
        <div id={answerId} className="border-t border-black/10 px-4 py-4 dark:border-white/10 sm:px-5">
          <div className="min-w-0 text-sm leading-6 text-[#5e554a] dark:text-[#aaa398]">
            <MarkdownRenderer content={question.answer_text} />
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {!isRead ? (
              <button type="button" onClick={handleMark} className="inline-flex h-9 items-center gap-2 rounded-md bg-[#2459a6] px-3 text-sm font-medium text-white transition-colors hover:bg-[#1d4a8a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring">
                <Check size={16} /> Mark as read
              </button>
            ) : (
              <button type="button" onClick={handleUnmark} className="inline-flex h-9 items-center gap-2 rounded-md border border-black/10 px-3 text-sm font-medium text-[#5e554a] transition-colors hover:bg-[#efe9df] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring dark:border-white/10 dark:text-[#aaa398] dark:hover:bg-[#262421]">
                <CheckCircle2 size={16} /> Mark as unread
              </button>
            )}
          </div>
        </div>
      )}
    </article>
  );
}
