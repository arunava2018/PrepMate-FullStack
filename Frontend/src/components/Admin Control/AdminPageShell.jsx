import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AdminPageShell({ title, description, children, wide = false }) {
  return (
    <section className={`mx-auto w-full px-5 py-8 text-[#1f1b16] dark:text-[#efe9de] sm:px-6 md:py-10 ${wide ? 'max-w-[1200px]' : 'max-w-3xl'}`}>
      <Link to="/admin" className="mb-6 inline-flex items-center gap-2 rounded-sm text-sm text-[#5e554a] transition-colors hover:text-[#1f1b16] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring dark:text-[#aaa398] dark:hover:text-[#efe9de]">
        <ArrowLeft size={16} /> Admin home
      </Link>
      <header className="mb-7">
        <h1 className="text-3xl font-medium leading-tight tracking-tight">{title}</h1>
        {description && <p className="mt-2 max-w-2xl text-sm leading-6 text-[#5e554a] dark:text-[#aaa398]">{description}</p>}
      </header>
      {children}
    </section>
  );
}
