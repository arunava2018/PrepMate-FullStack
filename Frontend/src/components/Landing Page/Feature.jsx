import { BookOpen, FileText, MessageSquareText, PanelsTopLeft } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { features } from '@/constants.js';

const icons = [BookOpen, PanelsTopLeft, FileText, MessageSquareText];

export default function Features() {
  const { pathname } = useLocation();
  const isFeaturesPage = pathname === '/features';

  return (
    <section id="features" className="landing-section">
      <div className="landing-section-inner">
        <header className="landing-section-heading">
          {isFeaturesPage && <p className="mb-3 text-sm text-[#5e554a] dark:text-[#aaa398]">PrepMate · Practice</p>}
          {isFeaturesPage ? (
          <h1 className="m-0 text-3xl font-medium leading-tight tracking-tight sm:text-4xl">Study CS topics and learn from interview accounts</h1>
          ) : (
            <h2>What you can do with PrepMate</h2>
          )}
          <p>Build topic knowledge, see what you’ve covered, and get context from candidates’ interview accounts.</p>
        </header>
        <div className="landing-feature-grid">
          {features.map((feature, index) => {
            const Icon = icons[index];
            return (
              <article className="landing-feature" key={feature.title}>
                <Icon aria-hidden="true" />
                <h3>{feature.title}</h3>
                <p>{feature.desc}</p>
              </article>
            );
          })}
        </div>
        {isFeaturesPage && (
          <div className="mt-8 text-center">
            <Link to="/dashboard" className="inline-flex h-10 items-center justify-center rounded-md bg-[#2459a6] px-4 text-sm font-medium text-white transition-colors hover:bg-[#1d4a8a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring dark:bg-[#a8c7f3] dark:text-[#111a27] dark:hover:bg-[#91b8ef]">
              Browse subjects
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
