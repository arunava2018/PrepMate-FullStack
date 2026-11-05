export default function PolicyPage({ title, intro, children }) {
  return (
    <article className="mx-auto w-full max-w-3xl px-5 py-12 text-[#1f1b16] dark:text-[#efe9de] sm:px-6 sm:py-16 md:px-8">
      <header className="border-b border-black/10 pb-7 dark:border-white/10 [&_a]:font-medium [&_a]:text-[#2459a6] [&_a]:underline-offset-4 [&_a:hover]:underline dark:[&_a]:text-[#a8c7f3]">
        <p className="mb-3 text-sm text-[#5e554a] dark:text-[#aaa398]">PrepMate · Policies</p>
        <h1 className="text-3xl font-medium leading-tight tracking-tight sm:text-4xl">{title}</h1>
        <p className="mt-4 text-sm leading-6 text-[#5e554a] dark:text-[#aaa398]">{intro}</p>
      </header>
      <div className="policy-content mt-8 space-y-8 text-sm leading-7 text-[#5e554a] dark:text-[#aaa398] [&_h2]:mb-2 [&_h2]:text-base [&_h2]:font-medium [&_h2]:leading-6 [&_h2]:text-[#1f1b16] dark:[&_h2]:text-[#efe9de] [&_p]:leading-7 [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-5 [&_a]:font-medium [&_a]:text-[#2459a6] [&_a]:underline-offset-4 [&_a:hover]:underline dark:[&_a]:text-[#a8c7f3]">
        {children}
      </div>
    </article>
  );
}
