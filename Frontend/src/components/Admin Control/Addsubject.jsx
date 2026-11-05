import { useEffect, useState } from 'react';
import { BookOpen, Code2, Cloud, Cpu, Database, GitBranch, Lock, Network, Server, Terminal, Workflow } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { addSubject } from '@/db/apiSubjects';
import useFetch from '@/hooks/useFetch';
import AdminPageShell from './AdminPageShell';

const subjectIcons = [
  { label: 'Operating systems', value: 'Server', Icon: Server },
  { label: 'DBMS', value: 'Database', Icon: Database },
  { label: 'Computer networks', value: 'Network', Icon: Network },
  { label: 'Algorithms', value: 'Workflow', Icon: Workflow },
  { label: 'Computer architecture', value: 'Cpu', Icon: Cpu },
  { label: 'Programming languages', value: 'Code2', Icon: Code2 },
  { label: 'Software engineering', value: 'Terminal', Icon: Terminal },
  { label: 'Cyber security', value: 'Lock', Icon: Lock },
  { label: 'Cloud computing', value: 'Cloud', Icon: Cloud },
  { label: 'Version control (Git)', value: 'GitBranch', Icon: GitBranch },
  { label: 'Object-oriented programming', value: 'Code2', Icon: Code2 },
];

export default function AddSubject() {
  const [form, setForm] = useState({ name: '', description: '', icon: '' });
  const [successMsg, setSuccessMsg] = useState('');
  const { loading, error, fn: saveSubject } = useFetch(addSubject);

  useEffect(() => {
    if (!successMsg) return;
    const timer = setTimeout(() => setSuccessMsg(''), 3000);
    return () => clearTimeout(timer);
  }, [successMsg]);

  const handleChange = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = await saveSubject(form);
    if (result?.saved) {
      setSuccessMsg(`${result.subject.name} added`);
      setForm({ name: '', description: '', icon: '' });
    }
  };

  const SelectedIcon = subjectIcons.find((item) => item.value === form.icon)?.Icon;
  const fieldClass = 'h-11 rounded-lg border-black/10 bg-[#f7f4ee] px-3 text-sm shadow-none focus-visible:ring-2 dark:border-white/10 dark:bg-[#161513]';

  return (
    <AdminPageShell title="Add a subject" description="Create a subject for the PrepMate question bank">
      <Card className="gap-0 overflow-hidden rounded-xl border-black/10 bg-[#fdfbf7] py-0 shadow-none dark:border-white/10 dark:bg-[#1c1a18]">
        <form onSubmit={handleSubmit} className="space-y-5 p-5 sm:p-6">
          <div className="space-y-2">
            <label htmlFor="subject-name" className="text-sm font-medium">Subject name</label>
            <Input id="subject-name" className={fieldClass} name="name" value={form.name} onChange={handleChange} placeholder="Operating systems" required />
          </div>

          <div className="space-y-2">
            <label htmlFor="subject-description" className="text-sm font-medium">Description</label>
            <Textarea id="subject-description" className="min-h-24 rounded-lg border-black/10 bg-[#f7f4ee] px-3 py-2 text-sm shadow-none focus-visible:ring-2 dark:border-white/10 dark:bg-[#161513]" name="description" value={form.description} onChange={handleChange} placeholder="What will learners study in this subject?" rows={4} required />
          </div>

          <div className="space-y-2">
            <label htmlFor="subject-icon" className="text-sm font-medium">Subject icon</label>
            <select id="subject-icon" name="icon" value={form.icon} onChange={handleChange} required className={`${fieldClass} w-full`}>
              <option value="">Choose an icon</option>
              {subjectIcons.map(({ label, value }) => <option key={label} value={value}>{label}</option>)}
            </select>
            {SelectedIcon && (
              <div className="flex items-center gap-2 pt-1 text-sm text-[#5e554a] dark:text-[#aaa398]">
                <SelectedIcon size={18} strokeWidth={1.6} aria-hidden="true" />
                <span>Preview</span>
              </div>
            )}
          </div>

          {successMsg && <p role="status" className="rounded-lg border border-emerald-700/20 bg-emerald-700/5 px-4 py-3 text-sm text-emerald-800 dark:text-emerald-300">{successMsg}</p>}
          {error && <p role="alert" className="rounded-lg border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive">{error.message}</p>}

          <Button type="submit" disabled={loading} className="h-11 w-full rounded-lg bg-[#2459a6] text-sm font-medium text-white shadow-none hover:bg-[#1d4a8a]">
            {loading ? 'Saving subject' : 'Add subject'}
          </Button>
        </form>
      </Card>
    </AdminPageShell>
  );
}
