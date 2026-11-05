import { useEffect, useState } from 'react';
import { Database, Eye, FilePenLine, LoaderCircle, Search, Trash2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import useFetch from '@/hooks/useFetch';
import { getSubjects } from '@/db/apiSubjects';
import { fetchSubtopics } from '@/db/apiSubtopic';
import { runAdminAiAgent, approveAndSaveQuestions } from '@/db/aiAgentApi';
import AdminPageShell from './AdminPageShell';

export default function AdminAgentPanel() {
  const [form, setForm] = useState({ subjectId: '', subtopicId: '', prompt: '', autoCommit: false });
  const [loading, setLoading] = useState(false);
  const [agentSummary, setAgentSummary] = useState('');
  const [curatedQuestions, setCuratedQuestions] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [toolLogs, setToolLogs] = useState([]);
  const [filterQuery, setFilterQuery] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [saving, setSaving] = useState(false);
  const { data: subjects, fn: fetchSubjects } = useFetch(getSubjects);
  const { data: subtopics, fn: fetchSubtopicsForSubject } = useFetch(fetchSubtopics);

  useEffect(() => { fetchSubjects(); }, []);
  useEffect(() => {
    setForm((current) => ({ ...current, subtopicId: '' }));
    if (form.subjectId) fetchSubtopicsForSubject({ subjectId: form.subjectId });
  }, [form.subjectId]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setForm((current) => ({ ...current, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleRunAgent = async (event) => {
    event.preventDefault();
    if (!form.prompt.trim()) {
      setErrorMsg('Describe the topic and questions to research');
      return;
    }
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');
    setCuratedQuestions([]);
    setAgentSummary('');
    setToolLogs([]);
    setSelectedIndex(0);
    try {
      const response = await runAdminAiAgent({
        prompt: form.prompt,
        subjectId: form.subjectId,
        subtopicId: form.subtopicId,
        autoCommit: form.autoCommit,
      });
      const nextQuestions = response.questions || [];
      setAgentSummary(response.agentSummary || '');
      setCuratedQuestions(form.autoCommit ? [] : nextQuestions);
      setToolLogs(response.toolLogs || []);
      setSuccessMsg(form.autoCommit
        ? `${nextQuestions.length} questions added to the database`
        : `${nextQuestions.length} questions ready for review`);
    } catch (cause) {
      setErrorMsg(cause.message || 'Could not run the content curator');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteQuestion = (index) => {
    setCuratedQuestions((current) => {
      const next = current.filter((_, itemIndex) => itemIndex !== index);
      setSelectedIndex((currentIndex) => Math.min(currentIndex, Math.max(0, next.length - 1)));
      return next;
    });
  };

  const handleQuestionChange = (field, value) => {
    setCuratedQuestions((current) => current.map((question, index) =>
      index === selectedIndex ? { ...question, [field]: value } : question));
  };

  const handleSaveToDb = async () => {
    if (!form.subjectId || !form.subtopicId) {
      setErrorMsg('Choose a subject and subtopic before saving');
      return;
    }
    if (curatedQuestions.length === 0) {
      setErrorMsg('There are no questions to save');
      return;
    }
    setSaving(true);
    setErrorMsg('');
    try {
      const result = await approveAndSaveQuestions({
        subjectId: form.subjectId,
        subtopicId: form.subtopicId,
        questions: curatedQuestions,
      });
      setSuccessMsg(result.message || 'Questions saved');
      setCuratedQuestions([]);
      setAgentSummary('');
    } catch (cause) {
      setErrorMsg(cause.message || 'Could not save these questions');
    } finally {
      setSaving(false);
    }
  };

  const filteredQuestions = curatedQuestions.filter((question) =>
    (question.question_text || '').toLowerCase().includes(filterQuery.toLowerCase()));
  const currentQuestion = curatedQuestions[selectedIndex];
  const selectClass = 'h-11 w-full rounded-lg border border-black/10 bg-[#f7f4ee] px-3 text-sm text-[#1f1b16] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#386eb8] dark:border-white/10 dark:bg-[#161513] dark:text-[#efe9de] dark:focus-visible:ring-[#a8c7f3]';

  return (
    <AdminPageShell title="AI content curator" description="Research a topic, review suggested questions, and save them to the question bank" wide>
      <div className="space-y-6">
        <Card className="gap-0 rounded-xl border-black/10 bg-[#fdfbf7] p-5 shadow-none dark:border-white/10 dark:bg-[#1c1a18] sm:p-6">
          <form onSubmit={handleRunAgent} className="space-y-5">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="agent-subject" className="text-sm font-medium">Subject</label>
                <select id="agent-subject" name="subjectId" value={form.subjectId} onChange={handleChange} className={selectClass}>
                  <option value="">Choose a subject</option>
                  {Array.isArray(subjects) && subjects.map(({ id, name }) => <option key={id} value={id}>{name}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <label htmlFor="agent-subtopic" className="text-sm font-medium">Subtopic</label>
                <select id="agent-subtopic" name="subtopicId" value={form.subtopicId} onChange={handleChange} disabled={!form.subjectId} className={selectClass}>
                  <option value="">Choose a subtopic</option>
                  {Array.isArray(subtopics) && subtopics.map(({ id, name }) => <option key={id} value={id}>{name}</option>)}
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="agent-prompt" className="text-sm font-medium">Research prompt</label>
              <textarea id="agent-prompt" name="prompt" rows={4} value={form.prompt} onChange={handleChange} placeholder="Describe a computer science topic and the interview questions you want researched" className="w-full resize-y rounded-lg border border-black/10 bg-[#f7f4ee] px-3 py-3 text-sm leading-6 text-[#1f1b16] placeholder:text-[#776f65] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#386eb8] dark:border-white/10 dark:bg-[#161513] dark:text-[#efe9de] dark:placeholder:text-[#8a847a] dark:focus-visible:ring-[#a8c7f3]" />
              <p className="text-xs leading-5 text-[#776f65] dark:text-[#8a847a]">Include the topic and the kind of answer you want drafted.</p>
            </div>

            <div className="flex flex-col gap-4 rounded-lg border border-black/10 p-4 dark:border-white/10 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3">
                <input id="agent-auto-commit" type="checkbox" name="autoCommit" checked={form.autoCommit} onChange={handleChange} className="mt-1 h-4 w-4 accent-[#2459a6] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring" />
                <div>
                  <label htmlFor="agent-auto-commit" className="text-sm font-medium">Save results automatically</label>
                  <p className="mt-1 text-xs leading-5 text-[#5e554a] dark:text-[#aaa398]">When selected, generated questions are added without manual review.</p>
                </div>
              </div>
              <Button type="submit" disabled={loading} className="h-10 shrink-0 gap-2 rounded-lg bg-[#2459a6] px-4 text-white shadow-none hover:bg-[#1d4a8a]">
                {loading ? <LoaderCircle size={16} className="animate-spin" /> : null}
                {loading ? 'Researching' : 'Research topic'}
              </Button>
            </div>
          </form>
        </Card>

        {successMsg && <p role="status" className="rounded-lg border border-emerald-700/20 bg-emerald-700/5 px-4 py-3 text-sm text-emerald-800 dark:text-emerald-300">{successMsg}</p>}
        {errorMsg && <p role="alert" className="rounded-lg border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive">{errorMsg}</p>}

        {toolLogs.length > 0 && (
          <section aria-labelledby="agent-activity-heading" className="rounded-xl border border-black/10 bg-[#fdfbf7] p-4 dark:border-white/10 dark:bg-[#1c1a18]">
            <div className="mb-3 flex items-baseline justify-between gap-4">
              <h2 id="agent-activity-heading" className="text-sm font-medium">Research activity</h2>
              <span className="text-xs tabular-nums text-[#776f65] dark:text-[#8a847a]">{toolLogs.length} steps</span>
            </div>
            <div className="max-h-40 space-y-2 overflow-y-auto rounded-lg border border-black/10 bg-[#f7f4ee] p-3 font-mono text-xs dark:border-white/10 dark:bg-[#161513]">
              {toolLogs.map((log, index) => (
                <div key={`${log.tool}-${index}`} className="flex min-w-0 gap-3">
                  <span className="shrink-0 text-[#2459a6] dark:text-[#a8c7f3]">{log.tool}</span>
                  <span className="truncate text-[#776f65] dark:text-[#8a847a]">{JSON.stringify(log.args)}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {curatedQuestions.length > 0 && (
          <section aria-labelledby="curated-heading" className="space-y-4 border-t border-black/10 pt-6 dark:border-white/10">
            <div className="flex flex-col gap-4 rounded-xl border border-black/10 bg-[#fdfbf7] p-5 dark:border-white/10 dark:bg-[#1c1a18] sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 id="curated-heading" className="text-lg font-medium">Questions for review <span className="ml-1 text-sm tabular-nums text-[#776f65] dark:text-[#8a847a]">{curatedQuestions.length}</span></h2>
                {agentSummary && <p className="mt-2 max-w-2xl text-sm leading-5 text-[#5e554a] dark:text-[#aaa398]">{agentSummary}</p>}
              </div>
              <Button type="button" onClick={handleSaveToDb} disabled={saving} className="h-10 shrink-0 gap-2 rounded-lg bg-[#2459a6] px-4 text-white shadow-none hover:bg-[#1d4a8a]">
                {saving ? <LoaderCircle size={16} className="animate-spin" /> : <Database size={16} />}
                {saving ? 'Saving questions' : 'Approve and save'}
              </Button>
            </div>

            <div className="grid min-h-[440px] grid-cols-1 gap-4 lg:grid-cols-12">
              <div className="flex min-h-80 flex-col overflow-hidden rounded-xl border border-black/10 bg-[#fdfbf7] dark:border-white/10 dark:bg-[#1c1a18] lg:col-span-5">
                <div className="relative border-b border-black/10 p-3 dark:border-white/10">
                  <Search size={16} className="pointer-events-none absolute left-6 top-1/2 -translate-y-1/2 text-[#776f65] dark:text-[#8a847a]" />
                  <input aria-label="Filter questions" type="search" placeholder="Filter questions" value={filterQuery} onChange={(event) => setFilterQuery(event.target.value)} className="h-9 w-full rounded-md border border-black/10 bg-[#f7f4ee] pl-9 pr-3 text-sm text-[#1f1b16] placeholder:text-[#776f65] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#386eb8] dark:border-white/10 dark:bg-[#161513] dark:text-[#efe9de] dark:placeholder:text-[#8a847a] dark:focus-visible:ring-[#a8c7f3]" />
                </div>
                <ul className="flex-1 divide-y divide-black/10 overflow-y-auto dark:divide-white/10">
                  {filteredQuestions.map((question) => {
                    const realIndex = curatedQuestions.indexOf(question);
                    const selected = realIndex === selectedIndex;
                    return (
                      <li key={`${realIndex}-${question.question_text}`} className={`flex items-start gap-2 p-3 ${selected ? 'bg-[#efe9df] dark:bg-[#262421]' : ''}`}>
                        <button type="button" onClick={() => { setSelectedIndex(realIndex); setIsEditing(false); }} aria-current={selected ? 'true' : undefined} className="min-w-0 flex-1 rounded-sm text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring">
                          <span className="mb-1 block text-xs tabular-nums text-[#776f65] dark:text-[#8a847a]">Question {realIndex + 1}</span>
                          <span className="line-clamp-2 block text-sm leading-5 text-[#1f1b16] dark:text-[#efe9de]">{question.question_text || 'Untitled question'}</span>
                        </button>
                        <button type="button" onClick={() => handleDeleteQuestion(realIndex)} aria-label={`Remove question ${realIndex + 1}`} className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-[#776f65] transition-colors hover:bg-background hover:text-destructive focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring dark:text-[#8a847a] dark:hover:bg-[#161513]">
                          <Trash2 size={15} />
                        </button>
                      </li>
                    );
                  })}
                  {filteredQuestions.length === 0 && <li className="p-4 text-sm text-[#5e554a] dark:text-[#aaa398]">No questions match this filter.</li>}
                </ul>
                <p className="border-t border-black/10 px-3 py-2 text-xs text-[#776f65] dark:border-white/10 dark:text-[#8a847a]">Select a question to review or edit it.</p>
              </div>

              <div className="min-h-80 rounded-xl border border-black/10 bg-[#fdfbf7] p-4 dark:border-white/10 dark:bg-[#1c1a18] sm:p-5 lg:col-span-7">
                {currentQuestion ? (
                  <div className="flex h-full min-h-72 flex-col">
                    <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-black/10 pb-3 dark:border-white/10">
                      <p className="text-sm text-[#5e554a] dark:text-[#aaa398]">Question {selectedIndex + 1} of {curatedQuestions.length}</p>
                      <div className="flex items-center gap-2">
                        <Button type="button" variant="outline" size="sm" onClick={() => setIsEditing((value) => !value)} className="h-8 gap-2 rounded-md shadow-none">
                          {isEditing ? <Eye size={14} /> : <FilePenLine size={14} />}{isEditing ? 'Preview' : 'Edit'}
                        </Button>
                        <Button type="button" variant="ghost" size="icon" onClick={() => handleDeleteQuestion(selectedIndex)} aria-label="Remove selected question" className="h-8 w-8 text-destructive hover:bg-destructive/5">
                          <Trash2 size={15} />
                        </Button>
                      </div>
                    </div>

                    {isEditing ? (
                      <div className="flex flex-1 flex-col gap-4">
                        <div className="space-y-2">
                          <label htmlFor="curated-question" className="text-sm font-medium">Question</label>
                          <textarea id="curated-question" rows={3} value={currentQuestion.question_text || ''} onChange={(event) => handleQuestionChange('question_text', event.target.value)} className="w-full resize-y rounded-lg border border-black/10 bg-[#f7f4ee] px-3 py-2 text-sm leading-5 text-[#1f1b16] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#386eb8] dark:border-white/10 dark:bg-[#161513] dark:text-[#efe9de] dark:focus-visible:ring-[#a8c7f3]" />
                        </div>
                        <div className="flex flex-1 flex-col space-y-2">
                          <label htmlFor="curated-answer" className="text-sm font-medium">Answer and explanation</label>
                          <textarea id="curated-answer" rows={12} value={currentQuestion.answer_text || ''} onChange={(event) => handleQuestionChange('answer_text', event.target.value)} className="min-h-56 w-full flex-1 resize-y rounded-lg border border-black/10 bg-[#f7f4ee] px-3 py-2 font-mono text-xs leading-5 text-[#1f1b16] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#386eb8] dark:border-white/10 dark:bg-[#161513] dark:text-[#efe9de] dark:focus-visible:ring-[#a8c7f3]" />
                        </div>
                      </div>
                    ) : (
                      <div className="min-h-0 flex-1 space-y-5 overflow-y-auto">
                        <div>
                          <h3 className="text-base font-medium leading-6">{currentQuestion.question_text}</h3>
                        </div>
                        <div className="border-t border-black/10 pt-4 dark:border-white/10">
                          <p className="mb-3 text-sm font-medium">Answer and explanation</p>
                          <div className="max-w-none rounded-lg border border-black/10 bg-[#f7f4ee] p-4 text-sm leading-6 text-[#5e554a] dark:border-white/10 dark:bg-[#161513] dark:text-[#aaa398]">
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>{currentQuestion.answer_text || ''}</ReactMarkdown>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex min-h-72 items-center justify-center text-center text-sm text-[#5e554a] dark:text-[#aaa398]">
                    Select a question to review its answer.
                  </div>
                )}
              </div>
            </div>
          </section>
        )}
      </div>
    </AdminPageShell>
  );
}
