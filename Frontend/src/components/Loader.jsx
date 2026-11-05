import { BookOpen, LoaderCircle } from 'lucide-react';

export default function Loader() {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading your study space"
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#f7f4ee]/95 px-6 text-[#1f1b16] dark:bg-[#161513]/95 dark:text-[#efe9de]">
      <div className="flex items-center gap-4">
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-black/10 bg-[#fdfbf7] text-[#2459a6] dark:border-white/10 dark:bg-[#1c1a18] dark:text-[#a8c7f3]">
          <BookOpen size={20} strokeWidth={1.7} aria-hidden="true" />
        </span>
        <div className="min-w-40">
          <p className="text-sm font-medium">Loading your study space</p>
          <span className="mt-2 block h-[3px] w-6 rounded-full bg-[#386eb8] dark:bg-[#a8c7f3]" />
        </div>
        <LoaderCircle className="h-4 w-4 animate-spin text-muted-foreground motion-reduce:animate-none" aria-hidden="true" />
      </div>
      <span className="sr-only">Please wait</span>
    </div>
  );
}
