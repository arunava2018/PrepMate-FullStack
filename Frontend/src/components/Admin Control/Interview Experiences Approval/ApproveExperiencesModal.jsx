import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Building2, User } from "lucide-react";
import AdminApprovalForm from "./AdminApprovalForm";

export default function ApprovalModal({ open, onClose, experience, fetchData}) {
  if (!experience) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-orange-50 to-amber-50 dark:from-gray-800 dark:to-gray-900 border-amber-200 dark:border-gray-700">
        <DialogHeader className="space-y-4 pb-4 border-b border-amber-200 dark:border-gray-700">
          <DialogTitle className="text-xl font-semibold text-gray-800 dark:text-gray-100 flex items-center gap-3">
            <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
              <Building2 className="w-5 h-5 text-amber-600" />
            </div>
            Review & Approve Experience
          </DialogTitle>
          
          {/* Company and User Info */}
          <div className="flex flex-wrap gap-3">
            <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-200 px-3 py-1">
              <Building2 className="w-4 h-4 mr-2" />
              {experience.company_name}
            </Badge>
            <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-200 px-3 py-1">
              <User className="w-4 h-4 mr-2" />
              {experience.usersProfile?.name || "Unknown User"}
            </Badge>
            {experience.created_at && (
              <Badge variant="outline" className="border-amber-200 text-amber-700 dark:border-amber-700 dark:text-amber-300 px-3 py-1">
                Submitted {new Date(experience.created_at).toLocaleDateString()}
              </Badge>
            )}
          </div>
        </DialogHeader>

        {/* Form Content */}
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
