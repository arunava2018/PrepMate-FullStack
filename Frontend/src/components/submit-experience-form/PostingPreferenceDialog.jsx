import { useState } from 'react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export default function PostingPreferenceDialog({ open, onClose, onSelect }) {
  const [selected, setSelected] = useState('public');

  const handleContinue = () => {
    onSelect(selected === 'anonymous');
    onClose('confirmed');
  };

  const options = [
    {
      value: 'public',
      title: 'Show my profile name',
      description: 'Your PrepMate profile name appears with the shared account.',
    },
    {
      value: 'anonymous',
      title: 'Share anonymously',
      description: 'Your profile name is hidden. Leave identifying details out of your account.',
    },
  ];

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose('dismissed')}>
      <DialogContent className="max-w-md rounded-xl border border-black/10 bg-[#fdfbf7] text-[#1f1b16] shadow-lg dark:border-white/10 dark:bg-[#1c1a18] dark:text-[#efe9de]">
        <DialogHeader className="text-left">
          <p className="text-sm text-[#5e554a] dark:text-[#aaa398]">Before you write</p>
          <DialogTitle className="text-xl font-medium">How should your account appear?</DialogTitle>
          <p className="text-sm leading-6 text-[#5e554a] dark:text-[#aaa398]">
            Choose whether your PrepMate profile name is shown with your interview account.
          </p>
        </DialogHeader>

        <div className="mt-2 space-y-2" role="radiogroup" aria-label="Name display preference">
          {options.map(({ value, title, description }) => {
            const active = selected === value;
            return (
              <button
                key={value}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => setSelected(value)}
                className={`w-full rounded-lg border p-4 text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring ${active ? 'border-[#2459a6] bg-[#eef3fa] dark:border-[#a8c7f3] dark:bg-[#202936]' : 'border-black/10 hover:bg-[#f2eee6] dark:border-white/10 dark:hover:bg-[#262421]'}`}>
                <span className="flex items-start gap-3">
                  <span className={`mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${active ? 'border-[#2459a6] dark:border-[#a8c7f3]' : 'border-[#776f65] dark:border-[#8a847a]'}`} aria-hidden="true">
                    {active && <span className="h-2 w-2 rounded-full bg-[#2459a6] dark:bg-[#a8c7f3]" />}
                  </span>
                  <span>
                    <span className="block text-sm font-medium">{title}</span>
                    <span className="mt-1 block text-sm leading-5 text-[#5e554a] dark:text-[#aaa398]">{description}</span>
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        <DialogFooter className="mt-2 gap-2 sm:justify-between">
          <Button type="button" variant="outline" onClick={() => onClose('dismissed')} className="h-10 rounded-md border-black/10 bg-transparent text-[#5e554a] shadow-none hover:bg-[#efe9df] dark:border-white/10 dark:text-[#aaa398] dark:hover:bg-[#262421]">
            Back to experiences
          </Button>
          <Button type="button" onClick={handleContinue} className="h-10 rounded-md bg-[#2459a6] px-4 text-white shadow-none hover:bg-[#1d4a8a] dark:bg-[#a8c7f3] dark:text-[#111a27] dark:hover:bg-[#91b8ef]">
            Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
