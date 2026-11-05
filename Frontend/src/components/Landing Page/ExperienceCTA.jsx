import { ArrowRight, BookOpen, Share2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ExperienceCTA() {
  const navigate = useNavigate();

  return (
    <section className="landing-section landing-section-muted">
      <div className="landing-section-inner">
        <header className="landing-section-heading">
          <h2>Learn from the interview room</h2>
          <p>Read interview accounts shared by developers, or add your own experience for others to learn from.</p>
        </header>
        <div className="landing-cta-actions">
          <button type="button" className="landing-primary" onClick={() => navigate('/view-interview-experiences')}><BookOpen size={17} /> Browse experiences <ArrowRight size={16} /></button>
          <button type="button" className="landing-secondary" onClick={() => navigate('/share-experience')}><Share2 size={16} /> Share an experience</button>
        </div>
      </div>
    </section>
  );
}
