import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
  Bot,
  Database,
  CheckCircle2,
  Trash2,
  Edit3,
  Sparkles,
  RefreshCw,
  Layers,
  Eye,
  Search,
  SlidersHorizontal,
  Code2,
  Check,
  Terminal,
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import useFetch from '@/hooks/useFetch';
import { getSubjects } from '@/db/apiSubjects';
import { fetchSubtopics } from '@/db/apiSubtopic';
import { runAdminAiAgent, approveAndSaveQuestions } from '@/db/aiAgentApi';

export default function AdminAgentPanel() {
  const [form, setForm] = useState({
    subjectId: '',
    subtopicId: '',
    prompt: 'Create 10 most interview asked questions for OOPs on Inheritance topic with appropriate answers',
    autoCommit: false,
  });

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

  const { data: subjects, fn: fnSubjects } = useFetch(getSubjects);
  const { data: subtopics, fn: fnSubtopics } = useFetch(fetchSubtopics);

  useEffect(() => {
    fnSubjects();
  }, []);

  useEffect(() => {
    if (form.subjectId) {
      fnSubtopics({ subjectId: form.subjectId });
      setForm((prev) => ({ ...prev, subtopicId: '' }));
    }
  }, [form.subjectId]);

  useEffect(() => {
    if (successMsg || errorMsg) {
      const timer = setTimeout(() => {
        setSuccessMsg('');
        setErrorMsg('');
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [successMsg, errorMsg]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleRunAgent = async (e) => {
    e.preventDefault();
    if (!form.prompt.trim()) {
      setErrorMsg('Please enter an instruction prompt for the AI Agent');
      return;
    }

    try {
      setLoading(true);
      setErrorMsg('');
      setSuccessMsg('');
      setCuratedQuestions([]);
      setAgentSummary('');
      setToolLogs([]);
      setSelectedIndex(0);

      const response = await runAdminAiAgent({
        prompt: form.prompt,
        subjectId: form.subjectId,
        subtopicId: form.subtopicId,
        autoCommit: form.autoCommit,
      });

      setAgentSummary(response.agentSummary || '');
      setCuratedQuestions(response.questions || []);
      setToolLogs(response.toolLogs || []);

      if (form.autoCommit) {
        setSuccessMsg(`🤖 Agent finished! Automatically committed ${response.questions?.length || 0} questions to database.`);
      } else {
        setSuccessMsg(`✨ Agent finished! Curated ${response.questions?.length || 0} questions for review.`);
      }
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || 'Failed to run AI Agent');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteQuestion = (indexToDelete, e) => {
    e.stopPropagation();
    setCuratedQuestions((prev) => {
      const next = prev.filter((_, i) => i !== indexToDelete);
      if (selectedIndex >= next.length) {
        setSelectedIndex(Math.max(0, next.length - 1));
      }
      return next;
    });
  };

  const handleQuestionChange = (field, value) => {
    setCuratedQuestions((prev) => {
      const updated = [...prev];
      if (updated[selectedIndex]) {
        updated[selectedIndex] = { ...updated[selectedIndex], [field]: value };
      }
      return updated;
    });
  };

  const handleSaveToDb = async () => {
    if (!form.subjectId || !form.subtopicId) {
      setErrorMsg('Please select both a Subject and Subtopic before saving to DB');
      return;
    }
    if (curatedQuestions.length === 0) {
      setErrorMsg('No curated questions available to save.');
      return;
    }

    try {
      setSaving(true);
      setErrorMsg('');
      const res = await approveAndSaveQuestions({
        subjectId: form.subjectId,
        subtopicId: form.subtopicId,
        questions: curatedQuestions,
      });

      setSuccessMsg(`✅ ${res.message}`);
      setCuratedQuestions([]);
      setAgentSummary('');
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || 'Failed to save questions');
    } finally {
      setSaving(false);
    }
  };

  const filteredQuestions = curatedQuestions.filter((q) =>
    (q.question_text || '').toLowerCase().includes(filterQuery.toLowerCase())
  );

  const currentQuestion = curatedQuestions[selectedIndex];

  return (
    <div className="relative min-h-screen py-10 px-4 sm:px-6 lg:px-8 bg-background overflow-hidden">
      {/* Subtle SaaS Grid Background matching Landing Page */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
      
      {/* Radial Gradient overlay */}
      <div className="absolute inset-0 bg-background [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none"></div>

      {/* Main SaaS Container */}
      <div className="relative z-10 max-w-7xl mx-auto space-y-8">
        
        {/* Top Header & SaaS Pill Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center space-y-3">
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted/60 border border-border text-xs sm:text-sm text-muted-foreground shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
            PrepMate AI Agent Hub • Autonomous Web Search & DB Tool Engine
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground flex items-center justify-center gap-3">
            <Bot className="w-9 h-9 text-primary" />
            AI Content Curator Agent
          </h1>

          <p className="max-w-2xl text-muted-foreground text-sm sm:text-base leading-relaxed">
            Instruct the AI Agent to research real-world interview questions on DuckDuckGo, curate Markdown solutions, and populate your database with 1-click.
          </p>
        </motion.div>

        {/* Main Card Console (Glassmorphic Border & Shadow) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}>
          <Card className="relative bg-card/90 backdrop-blur-md border border-border/80 rounded-2xl shadow-xl overflow-hidden p-6 sm:p-8 space-y-8">
            
            {/* Ambient Background Glow behind Card */}
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 blur-3xl rounded-full pointer-events-none"></div>

            {/* Agent Command Console Form */}
            <form onSubmit={handleRunAgent} className="space-y-6 relative z-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Subject Dropdown */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Target Subject *
                  </label>
                  <select
                    name="subjectId"
                    value={form.subjectId}
                    onChange={handleChange}
                    className="w-full h-11 px-3.5 border rounded-lg bg-background text-foreground border-input focus:ring-2 focus:ring-primary focus:border-primary transition text-sm">
                    <option value="">Select Subject</option>
                    {Array.isArray(subjects) &&
                      subjects.map(({ id, name }) => (
                        <option key={id} value={id}>
                          {name}
                        </option>
                      ))}
                  </select>
                </div>

                {/* Subtopic Dropdown */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Target Subtopic *
                  </label>
                  <select
                    name="subtopicId"
                    value={form.subtopicId}
                    onChange={handleChange}
                    className="w-full h-11 px-3.5 border rounded-lg bg-background text-foreground border-input focus:ring-2 focus:ring-primary focus:border-primary transition text-sm">
                    <option value="">Select Subtopic</option>
                    {Array.isArray(subtopics) &&
                      subtopics.map(({ id, name }) => (
                        <option key={id} value={id}>
                          {name}
                        </option>
                      ))}
                  </select>
                </div>
              </div>

              {/* Agent Instruction Input */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-primary" /> Agent Command / Topic Instruction *
                  </span>
                  <span className="text-[11px] text-muted-foreground font-normal">DuckDuckGo Web Search Enabled</span>
                </label>
                <textarea
                  name="prompt"
                  rows={3}
                  value={form.prompt}
                  onChange={handleChange}
                  placeholder="e.g. Create 10 most interview asked questions for OOPs on Inheritance topic with appropriate answers..."
                  className="w-full p-3.5 border rounded-lg bg-background text-foreground border-input focus:ring-2 focus:ring-primary focus:border-primary transition text-sm leading-relaxed resize-none shadow-sm"
                />
              </div>

              {/* Auto Commit & Submit Button Footer Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-3.5 bg-muted/40 rounded-xl border border-border/60">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="autoCommit"
                    name="autoCommit"
                    checked={form.autoCommit}
                    onChange={handleChange}
                    className="w-4 h-4 text-primary rounded focus:ring-primary accent-primary cursor-pointer"
                  />
                  <div>
                    <label htmlFor="autoCommit" className="text-sm font-medium text-foreground cursor-pointer block">
                      Auto-Commit to Database
                    </label>
                    <p className="text-xs text-muted-foreground">
                      Bypass manual review and insert curated questions directly into PostgreSQL.
                    </p>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="h-10 px-5 text-sm rounded-lg bg-primary text-primary-foreground font-semibold shadow-sm hover:bg-primary/90 transition-all flex items-center justify-center gap-2 shrink-0 self-end sm:self-center">
                  {loading ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      Agent Researching & Curating...
                    </>
                  ) : (
                    <>
                      <Bot className="w-4 h-4" />
                      Run AI Content Curator Agent
                    </>
                  )}
                </Button>
              </div>
            </form>

            {/* Notification Alerts */}
            <AnimatePresence>
              {successMsg && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                  <Alert className="bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    <AlertTitle className="font-semibold">Success</AlertTitle>
                    <AlertDescription>{successMsg}</AlertDescription>
                  </Alert>
                </motion.div>
              )}

              {errorMsg && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                  <Alert className="bg-destructive/10 border-destructive/30 text-destructive">
                    <AlertTitle className="font-semibold">Error</AlertTitle>
                    <AlertDescription>{errorMsg}</AlertDescription>
                  </Alert>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Agent Tool Activity Log Console */}
            {toolLogs.length > 0 && (
              <div className="p-4 bg-muted/50 rounded-xl border border-border/80 space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Terminal className="w-4 h-4 text-primary" /> Live Agent Execution Terminal
                  </span>
                  <span className="text-[11px] font-normal text-muted-foreground">{toolLogs.length} Tool Executions</span>
                </div>
                <div className="space-y-1 text-xs font-mono text-foreground/90 bg-background/80 p-3 rounded-lg border border-border/60 max-h-32 overflow-y-auto">
                  {toolLogs.map((log, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="text-primary font-bold whitespace-nowrap">[{log.tool}]</span>
                      <span className="truncate text-muted-foreground">{JSON.stringify(log.args)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SAAS SIDE-BY-SIDE QUESTION CURATION PANEL */}
            {curatedQuestions.length > 0 && (
              <div className="space-y-6 pt-6 border-t border-border/80 relative z-10">
                
                {/* Section Title & Approve CTA */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-muted/30 p-4 rounded-xl border border-border/60">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-bold text-foreground">
                        Curated Questions ({curatedQuestions.length})
                      </h3>
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                        Review Ready
                      </span>
                    </div>
                    {agentSummary && <p className="text-xs text-muted-foreground mt-1 max-w-xl">{agentSummary}</p>}
                  </div>

                  <Button
                    onClick={handleSaveToDb}
                    disabled={saving}
                    className="h-11 px-6 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-sm transition flex items-center justify-center gap-2 whitespace-nowrap">
                    {saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Database className="w-4 h-4" />}
                    Approve & Push All to DB
                  </Button>
                </div>

                {/* Split Master-Detail Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[520px]">
                  
                  {/* Left Column: Master Question List */}
                  <div className="lg:col-span-5 border border-border/80 rounded-xl bg-muted/20 p-3 space-y-3 flex flex-col justify-between">
                    <div className="space-y-2">
                      {/* Search Filter input */}
                      <div className="relative">
                        <Search className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
                        <input
                          type="text"
                          placeholder="Filter curated questions..."
                          value={filterQuery}
                          onChange={(e) => setFilterQuery(e.target.value)}
                          className="w-full h-9 pl-9 pr-3 text-xs bg-background border border-input rounded-lg text-foreground focus:ring-1 focus:ring-primary"
                        />
                      </div>

                      {/* Question List */}
                      <div className="space-y-2 max-h-[480px] overflow-y-auto pr-1">
                        {filteredQuestions.map((q, idx) => {
                          const realIndex = curatedQuestions.findIndex((item) => item === q);
                          const isSelected = selectedIndex === realIndex;

                          return (
                            <div
                              key={idx}
                              onClick={() => {
                                setSelectedIndex(realIndex);
                                setIsEditing(false);
                              }}
                              className={`p-3 rounded-lg border transition-all cursor-pointer flex items-start justify-between gap-3 ${
                                isSelected
                                  ? 'bg-background border-primary shadow-sm ring-1 ring-primary/30'
                                  : 'bg-background/60 border-border/60 hover:bg-background hover:border-border'
                              }`}>
                              <div className="space-y-1 flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                  <span
                                    className={`text-[11px] font-bold px-2 py-0.5 rounded ${
                                      isSelected
                                        ? 'bg-primary text-primary-foreground'
                                        : 'bg-muted text-muted-foreground'
                                    }`}>
                                    Q#{realIndex + 1}
                                  </span>
                                </div>
                                <p className="text-xs font-semibold text-foreground line-clamp-2 leading-snug">
                                  {q.question_text || 'Untitled Question'}
                                </p>
                              </div>

                              <button
                                onClick={(e) => handleDeleteQuestion(realIndex, e)}
                                title="Delete question"
                                className="text-muted-foreground hover:text-destructive p-1 rounded transition">
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="text-[11px] text-muted-foreground text-center pt-2 border-t border-border/40">
                      Click any question to view solution or edit text
                    </div>
                  </div>

                  {/* Right Column: Detail View & Live Code/Markdown Reader */}
                  <div className="lg:col-span-7 border border-border/80 rounded-xl bg-background p-5 flex flex-col justify-between space-y-4 shadow-sm">
                    {currentQuestion ? (
                      <div className="space-y-4 flex-1 flex flex-col">
                        
                        {/* Header Bar for Active Question */}
                        <div className="flex items-center justify-between pb-3 border-b border-border/80">
                          <span className="text-xs font-semibold text-muted-foreground flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-primary"></span>
                            Question {selectedIndex + 1} of {curatedQuestions.length}
                          </span>

                          <div className="flex items-center gap-2">
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => setIsEditing(!isEditing)}
                              className="h-8 text-xs flex items-center gap-1.5 border-border">
                              {isEditing ? (
                                <>
                                  <Eye className="w-3.5 h-3.5 text-primary" />
                                  Preview Mode
                                </>
                              ) : (
                                <>
                                  <Edit3 className="w-3.5 h-3.5 text-primary" />
                                  Edit Content
                                </>
                              )}
                            </Button>

                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={(e) => handleDeleteQuestion(selectedIndex, e)}
                              className="h-8 text-xs text-destructive hover:bg-destructive/10">
                              <Trash2 className="w-3.5 h-3.5" />
                            </Button>
                          </div>
                        </div>

                        {/* Editor vs Markdown Preview Mode */}
                        {isEditing ? (
                          <div className="space-y-4 flex-1">
                            <div className="space-y-1">
                              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                Question Heading
                              </label>
                              <textarea
                                rows={2}
                                value={currentQuestion.question_text}
                                onChange={(e) => handleQuestionChange('question_text', e.target.value)}
                                className="w-full p-2.5 border rounded-lg bg-background text-foreground border-input focus:ring-1 focus:ring-primary text-sm font-semibold"
                              />
                            </div>

                            <div className="space-y-1 flex-1">
                              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                Answer Solution (Markdown & Code)
                              </label>
                              <textarea
                                rows={12}
                                value={currentQuestion.answer_text}
                                onChange={(e) => handleQuestionChange('answer_text', e.target.value)}
                                className="w-full p-3 border rounded-lg bg-muted/30 text-foreground border-input focus:ring-1 focus:ring-primary text-xs font-mono leading-relaxed resize-none"
                              />
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-4 flex-1 flex flex-col">
                            {/* Question Title */}
                            <div>
                              <div className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                                Question
                              </div>
                              <h4 className="text-base font-bold text-foreground leading-snug">
                                {currentQuestion.question_text}
                              </h4>
                            </div>

                            {/* Markdown Answer Viewer */}
                            <div className="flex-1 flex flex-col">
                              <div className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 flex items-center justify-between">
                                <span>Answer & Explanation</span>
                                <span className="text-[10px] text-primary flex items-center gap-1">
                                  <Code2 className="w-3 h-3" /> Markdown Formatted
                                </span>
                              </div>
                              <div className="prose dark:prose-invert max-w-none text-sm text-foreground/90 bg-muted/30 p-4 rounded-xl border border-border/60 max-h-[380px] overflow-y-auto leading-relaxed">
                                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                  {currentQuestion.answer_text}
                                </ReactMarkdown>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full py-16 text-muted-foreground space-y-2">
                        <Bot className="w-10 h-10 text-muted-foreground/40" />
                        <p className="text-xs">Select a question from the left panel to inspect solution details.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
