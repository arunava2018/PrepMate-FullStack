import { ArrowRight, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { UrlState } from '@/context';
import './landing.css';

export default function HeroSection() {
  const { isAuthenticated } = UrlState();
  return (
    <section className="landing-hero">
      <div className="landing-hero-inner">
        <div className="landing-copy">
          <p className="landing-kicker"><span /> PrepMate · CS interview practice</p>
          <h1>Prepare for CS interviews, one topic at a time</h1>
          <p className="landing-intro">
            Study questions and explanations by subject, mark what you’ve covered, and learn from interview accounts shared by other candidates.
          </p>
          <div className="landing-actions">
            <Link to={isAuthenticated ? '/dashboard' : '/auth/signup'} className="landing-primary">{isAuthenticated ? 'Open your study plan' : 'Create your study account'} <ArrowRight size={17} /></Link>
            <a href="#how-it-works" className="landing-secondary">See how it works</a>
          </div>
          <p className="landing-note"><BookOpen size={16} /> Subjects and subtopics · Tracked question progress</p>
        </div>

        <div className="study-preview" aria-label="PrepMate dashboard preview">
          <div className="study-preview-top">
            <div className="study-preview-brand">
              <span className="study-mark"><BookOpen size={17} /></span>
              <span>PrepMate <small>Study desk</small></span>
            </div>
            <span className="study-preview-label">Practice overview</span>
          </div>
          <img
            className="block aspect-[8/5] w-full bg-[#161513] object-cover object-top"
            src="/media/prepmate-dashboard-preview.png"
            alt="PrepMate dashboard showing subject cards, question counts, and study progress"
            loading="eager"
            fetchPriority="high"
          />
          <div className="study-preview-caption">
            <span className="study-live-rule" /> Real PrepMate dashboard · Sample data
          </div>
        </div>
      </div>
    </section>
  );
}
