import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Building2, User } from 'lucide-react';
import AdminApprovalForm from './AdminApprovalForm';

export default function ApprovalModal({
  open,
  onClose,
  experience,
  fetchData,
}) {
  if (!experience) return null;

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-card text-card-foreground border border-border">
        <DialogHeader className="space-y-4 pb-4 border-b border-border">
          <DialogTitle className="text-xl font-semibold text-foreground flex items-center gap-3">
            <div className="p-2 bg-muted rounded-lg">
              <Building2 className="w-5 h-5 text-primary" />
            </div>
            Review & Approve Experience
          </DialogTitle>

          <div className="flex flex-wrap gap-3">
            {/* Company */}
            <Badge
              variant="secondary"
              className="flex items-center gap-1 px-3 py-1">
              <Building2 className="w-4 h-4" />
              {experience.company_name}
            </Badge>

            {/* Respect anonymity */}
            <Badge
              variant="secondary"
              className="flex items-center gap-1 px-3 py-1">
              <User className="w-4 h-4" />
              {experience.is_anonymous
                ? 'Anonymous User'
                : experience.users?.full_name || 'Unknown User'}
            </Badge>

            {/* Date */}
            {experience.created_at && (
              <Badge
                variant="outline"
                className="border-border text-muted-foreground px-3 py-1">
                Submitted {new Date(experience.created_at).toLocaleDateString()}
              </Badge>
            )}
          </div>
        </DialogHeader>

        <div className="mt-4">
          <AdminApprovalForm
            initialData={experience}
            onClose={onClose}
            fetchData={fetchData}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
