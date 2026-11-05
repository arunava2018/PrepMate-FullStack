import { ArrowRight, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import './landing.css';

export default function HeroSection() {
  return (
    <section className="landing-hero">
      <div className="landing-hero-inner">
        <div className="landing-copy">
          <p className="landing-kicker"><span /> A steadier way to prepare</p>
          <h1>Build your CS interview knowledge, one question at a time</h1>
          <p className="landing-intro">
            Practice computer science questions by subject, keep track of what you’ve covered, and learn from interview experiences shared by other developers.
          </p>
          <div className="landing-actions">
            <Link to="/dashboard" className="landing-primary">Start practicing <ArrowRight size={17} /></Link>
            <a href="#features" className="landing-secondary">See how it works</a>
          </div>
          <p className="landing-note"><BookOpen size={16} /> Subject-based practice · Progress you can follow</p>
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
