import { ChevronDown } from 'lucide-react';
import QuestionItem from './QuestionItem';

export default function SubtopicAccordion({
  subtopic,
  index,
  questions,
  openSubtopic,
  setOpenSubtopic,
  progressData,
  setProgressData,
  subjectId,
  user,
}) {
  const isOpen = openSubtopic === subtopic.id;
  const contentId = `subtopic-${subtopic.id}`;

  return (
    <section className="overflow-hidden rounded-xl border border-black/10 bg-[#fdfbf7] dark:border-white/10 dark:bg-[#1c1a18]">
      <h3>
        <button
          type="button"
          aria-expanded={isOpen}
          aria-controls={contentId}
          onClick={() => setOpenSubtopic(isOpen ? null : subtopic.id)}
          className="flex min-h-16 w-full items-center justify-between gap-4 px-4 py-4 text-left transition-colors hover:bg-[#f2eee6] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring dark:hover:bg-[#262421] sm:px-5">
          <span className="flex min-w-0 items-center gap-3">
            <span className="w-7 shrink-0 text-xs tabular-nums text-[#776f65] dark:text-[#8a847a]">{String(index + 1).padStart(2, '0')}</span>
            <span className="min-w-0 text-base font-medium leading-6 text-[#1f1b16] dark:text-[#efe9de]">{subtopic.name}</span>
          </span>
          <span className="flex shrink-0 items-center gap-3 text-xs text-[#776f65] dark:text-[#8a847a]">
            {questions.length} {questions.length === 1 ? 'question' : 'questions'}
            <ChevronDown size={17} className={`transition-transform duration-150 ${isOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
          </span>
        </button>
      </h3>

      {isOpen && (
        <div id={contentId} className="border-t border-black/10 p-3 dark:border-white/10 sm:p-4">
          {questions.length ? (
            <div className="space-y-2">
              {questions.map((question) => (
                <QuestionItem
                  key={question.id}
                  question={question}
                  progressData={progressData}
                  setProgressData={setProgressData}
                  subjectId={subjectId}
                  user={user}
                />
              ))}
            </div>
          ) : (
            <p className="rounded-lg border border-black/10 bg-[#f7f4ee] p-4 text-sm text-[#5e554a] dark:border-white/10 dark:bg-[#161513] dark:text-[#aaa398]">No questions are available in this subtopic yet.</p>
          )}
        </div>
      )}
    </section>
  );
}
