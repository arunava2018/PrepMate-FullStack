import { ArrowRight, BookOpen, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { UrlState } from '@/context';

export default function ExperienceCTA() {
  const { isAuthenticated } = UrlState();

  return (
    <section className="landing-section landing-section-muted">
      <div className="landing-section-inner">
        <header className="landing-section-heading">
          <p className="landing-eyebrow">Beyond the question bank</p>
          <h2>Learn what the interview felt like</h2>
          <p>Explore candidate accounts with company, role, offer path, and interview notes. New submissions are reviewed before they appear publicly. Reading and sharing requires an account.</p>
        </header>
        <div className="landing-cta-actions">
          <Link to={isAuthenticated ? '/view-interview-experiences' : '/auth/login'} className="landing-primary"><BookOpen size={17} /> {isAuthenticated ? 'Browse interview accounts' : 'Sign in to browse'} <ArrowRight size={16} /></Link>
          <Link to={isAuthenticated ? '/share-experience' : '/auth/signup'} className="landing-secondary"><Share2 size={16} /> {isAuthenticated ? 'Share your account' : 'Create an account'}</Link>
        </div>
      </div>
    </section>
  );
}
