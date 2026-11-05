import { CheckCircle2, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';

export default function SuccessMessage({ showSuccess, onClose }) {
  return (
    <Dialog open={showSuccess} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        showCloseButton={false}
        className="max-w-md rounded-xl border border-black/10 bg-[#fdfbf7] p-6 text-[#1f1b16] shadow-lg dark:border-white/10 dark:bg-[#1c1a18] dark:text-[#efe9de] sm:p-7">
        <DialogHeader className="text-left">
          <div className="flex items-center justify-between">
            <CheckCircle2 size={22} strokeWidth={1.7} className="text-[#386eb8] dark:text-[#a8c7f3]" aria-hidden="true" />
            <DialogClose asChild>
              <button type="button" aria-label="Close confirmation" className="inline-flex h-9 w-9 items-center justify-center rounded-md text-[#776f65] transition-colors hover:bg-[#efe9df] hover:text-[#1f1b16] focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring dark:text-[#8a847a] dark:hover:bg-[#262421] dark:hover:text-[#efe9de]">
                <X size={17} aria-hidden="true" />
              </button>
            </DialogClose>
          </div>
          <DialogTitle className="pt-2 text-xl font-medium">Submitted for review</DialogTitle>
          <DialogDescription className="text-sm leading-6 text-[#5e554a] dark:text-[#aaa398]">
            Your interview account is awaiting review. If approved, it will appear in the shared experiences collection.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-2 flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <DialogClose asChild>
            <button type="button" className="inline-flex h-10 items-center justify-center rounded-md border border-black/10 px-4 text-sm font-medium text-[#5e554a] transition-colors hover:bg-[#efe9df] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring dark:border-white/10 dark:text-[#aaa398] dark:hover:bg-[#262421]">
              Close
            </button>
          </DialogClose>
          <Link
            to="/view-interview-experiences"
            onClick={onClose}
            className="inline-flex h-10 items-center justify-center rounded-md bg-[#2459a6] px-4 text-sm font-medium text-white transition-colors hover:bg-[#1d4a8a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring dark:bg-[#a8c7f3] dark:text-[#111a27] dark:hover:bg-[#91b8ef]">
            View experiences
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
