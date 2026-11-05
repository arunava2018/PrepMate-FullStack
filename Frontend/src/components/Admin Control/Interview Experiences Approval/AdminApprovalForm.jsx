import { useState } from 'react';
import { Briefcase, Check, FileText, Github, Linkedin, LoaderCircle, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MarkdownEditor from '@/components/submit-experience-form/MarkdownEditor';
import { approveExperience, deleteExperience } from '@/db/apiInterviewExperience';

export default function AdminApprovalForm({ initialData, onClose, fetchData }) {
  const [formData, setFormData] = useState({
    role: initialData.role || '',
    offer_type: initialData.offer_type || '',
    opportunity_type: initialData.opportunity_type || '',
    linkedin_url: initialData.linkedin_url || '',
    github_url: initialData.github_url || '',
    content: initialData.content || '',
  });
  const [loading, setLoading] = useState(false);
  const [action, setAction] = useState(null);
  const [error, setError] = useState('');

  const offerTypes = [
    { value: 'internship', label: 'Internship' },
    { value: 'full_time', label: 'Full time' },
    { value: 'internship_ppo', label: 'Internship + PPO' },
  ];
  const opportunityTypes = [
    { value: 'on', label: 'On campus' },
    { value: 'off', label: 'Off campus' },
  ];

  const handleChange = (event) => setFormData((current) => ({ ...current, [event.target.name]: event.target.value }));
  const handleContentChange = (value) => setFormData((current) => ({ ...current, content: value }));

  const handleApprove = async () => {
    setLoading(true);
    setAction('approve');
    setError('');
    try {
      await approveExperience(initialData.id, {
        ...formData,
        is_anonymous: initialData.is_anonymous,
        is_public: true,
      });
      await fetchData();
      onClose();
    } catch (cause) {
      setError(cause.message || 'Could not approve this experience');
    } finally {
      setLoading(false);
      setAction(null);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    setAction('delete');
    setError('');
    try {
      await deleteExperience(initialData.id);
      await fetchData();
      onClose();
    } catch (cause) {
      setError(cause.message || 'Could not delete this experience');
    } finally {
      setLoading(false);
      setAction(null);
    }
  };

  const inputClass = 'h-11 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground shadow-none focus-visible:ring-2 focus-visible:ring-ring';
  const selectClass = 'h-11 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring';

  return (
    <div className="space-y-5 bg-card text-card-foreground">
      <div className="space-y-2">
        <label htmlFor="approval-role" className="flex items-center gap-2 text-sm font-medium"><Briefcase size={16} className="text-muted-foreground" /> Position</label>
        <input id="approval-role" type="text" name="role" value={formData.role} onChange={handleChange} className={inputClass} placeholder="Software engineer intern" />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="approval-offer" className="flex items-center gap-2 text-sm font-medium"><FileText size={16} className="text-muted-foreground" /> Offer type</label>
          <select id="approval-offer" name="offer_type" value={formData.offer_type} onChange={handleChange} className={selectClass}>
            <option value="">Choose an offer type</option>
            {offerTypes.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
          </select>
        </div>
        <div className="space-y-2">
          <label htmlFor="approval-opportunity" className="flex items-center gap-2 text-sm font-medium"><FileText size={16} className="text-muted-foreground" /> Opportunity type</label>
          <select id="approval-opportunity" name="opportunity_type" value={formData.opportunity_type} onChange={handleChange} className={selectClass}>
            <option value="">Choose an opportunity type</option>
            {opportunityTypes.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="approval-linkedin" className="flex items-center gap-2 text-sm font-medium"><Linkedin size={16} className="text-muted-foreground" /> LinkedIn URL</label>
          <input id="approval-linkedin" type="url" name="linkedin_url" value={formData.linkedin_url} onChange={handleChange} className={inputClass} />
        </div>
        <div className="space-y-2">
          <label htmlFor="approval-github" className="flex items-center gap-2 text-sm font-medium"><Github size={16} className="text-muted-foreground" /> GitHub URL</label>
          <input id="approval-github" type="url" name="github_url" value={formData.github_url} onChange={handleChange} className={inputClass} />
        </div>
      </div>

      <div className="space-y-2">
        <MarkdownEditor id="approval-content" value={formData.content} onChange={handleContentChange} label="Experience content" />
      </div>

      {error && <p role="alert" className="rounded-lg border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive">{error}</p>}

      <div className="flex flex-col-reverse justify-between gap-3 border-t border-border pt-4 sm:flex-row">
        <Button type="button" variant="destructive" disabled={loading} onClick={handleDelete} className="h-10 shadow-none">
          {loading && action === 'delete' ? <LoaderCircle size={16} className="animate-spin" /> : <Trash2 size={16} />}
          {loading && action === 'delete' ? 'Deleting' : 'Delete submission'}
        </Button>
        <Button type="button" disabled={loading} onClick={handleApprove} className="h-10 bg-[#2459a6] text-white shadow-none hover:bg-[#1d4a8a]">
          {loading && action === 'approve' ? <LoaderCircle size={16} className="animate-spin" /> : <Check size={16} />}
          {loading && action === 'approve' ? 'Approving' : 'Approve experience'}
        </Button>
      </div>
    </div>
  );
}
