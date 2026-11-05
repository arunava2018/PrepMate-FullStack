import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { addSubtopic } from '@/db/apiSubtopic';
import { getSubjects } from '@/db/apiSubjects';
import useFetch from '@/hooks/useFetch';
import AdminPageShell from './AdminPageShell';

function AddSubtopic() {
  const [form, setForm] = useState({ subjectId: '', name: '' });
  const [successMsg, setSuccessMsg] = useState('');
  const { data: subjects, loading: subjectsLoading, error: subjectsError, fn: fetchSubjects } = useFetch(getSubjects);
  const { loading: saving, error, fn: saveSubtopic } = useFetch(addSubtopic);

  useEffect(() => { fetchSubjects(); }, []);
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
    const result = await saveSubtopic(form);
    if (result?.subtopic) {
      setSuccessMsg(`${result.subtopic.name} added`);
      setForm((current) => ({ ...current, name: '' }));
    }
  };

  const fieldClass = 'h-11 rounded-lg border-black/10 bg-[#f7f4ee] px-3 text-sm shadow-none focus-visible:ring-2 dark:border-white/10 dark:bg-[#161513]';

  return (
    <AdminPageShell title="Add a subtopic" description="Choose a subject, then add a focused section of questions">
      <Card className="gap-0 overflow-hidden rounded-xl border-black/10 bg-[#fdfbf7] py-0 shadow-none dark:border-white/10 dark:bg-[#1c1a18]">
        <form onSubmit={handleSubmit} className="space-y-5 p-5 sm:p-6">
          <div className="space-y-2">
            <label htmlFor="subtopic-subject" className="text-sm font-medium">Subject</label>
            <select id="subtopic-subject" name="subjectId" value={form.subjectId} onChange={handleChange} disabled={subjectsLoading} required className={`${fieldClass} w-full`}>
              <option value="">{subjectsLoading ? 'Loading subjects' : 'Choose a subject'}</option>
              {Array.isArray(subjects) && subjects.map(({ id, name }) => <option key={id} value={id}>{name}</option>)}
            </select>
            {subjectsError && <p role="alert" className="text-sm text-destructive">{subjectsError.message}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="subtopic-name" className="text-sm font-medium">Subtopic name</label>
            <Input id="subtopic-name" className={fieldClass} name="name" value={form.name} onChange={handleChange} placeholder="Processes and threads" required />
          </div>

          {successMsg && <p role="status" className="rounded-lg border border-emerald-700/20 bg-emerald-700/5 px-4 py-3 text-sm text-emerald-800 dark:text-emerald-300">{successMsg}</p>}
          {error && <p role="alert" className="rounded-lg border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive">{error.message}</p>}

          <Button type="submit" disabled={saving || subjectsLoading || !subjects?.length} className="h-11 w-full rounded-lg bg-[#2459a6] text-sm font-medium text-white shadow-none hover:bg-[#1d4a8a]">
            {saving ? 'Saving subtopic' : 'Add subtopic'}
          </Button>
        </form>
      </Card>
    </AdminPageShell>
  );
}

export default AddSubtopic;
