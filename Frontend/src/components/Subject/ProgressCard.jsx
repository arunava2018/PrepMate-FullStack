function ProgressCard({ progress, completedQ, totalQ }) {
  const percentage = Math.min(100, Math.max(0, Number(progress) || 0));

  return (
    <section className="rounded-xl border border-black/10 bg-[#fdfbf7] p-5 dark:border-white/10 dark:bg-[#1c1a18]" aria-label="Subject progress">
      <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="text-sm font-medium text-[#1f1b16] dark:text-[#efe9de]">Progress</h2>
        <p className="text-sm text-[#5e554a] dark:text-[#aaa398]">
          <span className="font-medium tabular-nums text-[#1f1b16] dark:text-[#efe9de]">{completedQ} of {totalQ}</span> questions completed
          <span className="ml-2 font-medium tabular-nums text-[#2459a6] dark:text-[#a8c7f3]">{Math.round(percentage)}%</span>
        </p>
      </div>
      <div
        role="progressbar"
        aria-label="Subject completion"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(percentage)}
        className="h-1.5 overflow-hidden rounded-full bg-black/10 dark:bg-white/10">
        <span className="block h-full origin-left rounded-full bg-[#386eb8] dark:bg-[#a8c7f3]" style={{ transform: `scaleX(${percentage / 100})` }} />
      </div>
    </section>
  );
}

export default ProgressCard;
