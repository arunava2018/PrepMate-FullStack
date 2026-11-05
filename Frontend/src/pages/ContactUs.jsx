import { ArrowUpRight, MessagesSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import { socialLinks } from '@/constants';

export default function ContactUs() {
  return (
    <div className="mx-auto w-full max-w-5xl px-5 py-12 text-[#1f1b16] dark:text-[#efe9de] sm:px-6 sm:py-16 md:px-8">
      <header className="max-w-2xl border-b border-black/10 pb-8 dark:border-white/10">
        <p className="mb-3 text-sm text-[#5e554a] dark:text-[#aaa398]">Contact PrepMate</p>
        <h1 className="text-3xl font-medium leading-tight tracking-tight sm:text-4xl">Get in touch</h1>
        <p className="mt-4 text-sm leading-6 text-[#5e554a] dark:text-[#aaa398]">
          For questions, feedback, or corrections, reach out through one of the PrepMate social channels below.
        </p>
      </header>

      <section className="mt-8 max-w-2xl" aria-labelledby="social-contact-heading">
        <h2 id="social-contact-heading" className="text-base font-medium">Find PrepMate</h2>
        <ul className="mt-4 divide-y divide-black/10 border-y border-black/10 dark:divide-white/10 dark:border-white/10">
          {socialLinks.map(({ href, icon: Icon, label }) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-14 items-center justify-between gap-4 py-3 text-sm text-[#5e554a] transition-colors hover:text-[#1f1b16] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring dark:text-[#aaa398] dark:hover:text-[#efe9de]">
                <span className="inline-flex items-center gap-3">
                  <Icon size={17} strokeWidth={1.6} aria-hidden="true" />
                  {label}
                </span>
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </section>

      <aside className="mt-10 flex max-w-2xl items-start gap-4 rounded-xl border border-black/10 bg-[#fdfbf7] p-5 dark:border-white/10 dark:bg-[#1c1a18]">
        <MessagesSquare size={18} className="mt-0.5 shrink-0 text-[#5e554a] dark:text-[#aaa398]" aria-hidden="true" />
        <div>
          <h2 className="text-sm font-medium">Sharing an interview account?</h2>
          <p className="mt-1 text-sm leading-6 text-[#5e554a] dark:text-[#aaa398]">Add an account to the community collection from the interview experiences page.</p>
          <Link to="/view-interview-experiences" className="mt-3 inline-flex min-h-9 items-center text-sm font-medium text-[#2459a6] underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring dark:text-[#a8c7f3]">
            View interview experiences
          </Link>
        </div>
      </aside>
    </div>
  );
}
