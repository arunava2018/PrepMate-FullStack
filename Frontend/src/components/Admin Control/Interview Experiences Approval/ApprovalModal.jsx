import { Building2, User } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import AdminApprovalForm from './AdminApprovalForm';

export default function ApprovalModal({ open, onClose, experience, fetchData }) {
  if (!experience) return null;
  const submitted = experience.created_at
    ? new Date(experience.created_at).toLocaleDateString()
    : null;
  const submitter = experience.is_anonymous
    ? 'Anonymous learner'
    : experience.users?.full_name || 'Unknown user';

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto rounded-xl border border-black/10 bg-[#fdfbf7] text-[#1f1b16] dark:border-white/10 dark:bg-[#1c1a18] dark:text-[#efe9de]">
        <DialogHeader className="border-b border-black/10 pb-4 pr-8 text-left dark:border-white/10">
          <DialogTitle className="text-lg font-medium">Review interview experience</DialogTitle>
          <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-[#5e554a] dark:text-[#aaa398]">
            <span className="inline-flex items-center gap-2"><Building2 size={15} />{experience.company_name}</span>
            <span className="inline-flex items-center gap-2"><User size={15} />{submitter}</span>
            {submitted && <span>Submitted {submitted}</span>}
          </div>
        </DialogHeader>

        <AdminApprovalForm initialData={experience} onClose={onClose} fetchData={fetchData} />
      </DialogContent>
    </Dialog>
  );
}
