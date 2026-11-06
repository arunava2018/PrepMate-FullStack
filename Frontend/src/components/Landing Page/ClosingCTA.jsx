import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { UrlState } from '@/context';

export default function ClosingCTA() {
  const { isAuthenticated } = UrlState();
  return <section className="landing-section landing-closing-cta">
    <div className="landing-section-inner">
      <div className="landing-closing-panel">
        <div>
          <p className="landing-eyebrow">Your next step</p>
          <h2>{isAuthenticated ? 'Pick up your preparation' : 'Start with the subject you want to strengthen'}</h2>
          <p>{isAuthenticated ? 'Return to your study plan and continue working through your subjects.' : 'Create an account to open question practice and keep track of what you have covered.'}</p>
        </div>
        <Link to={isAuthenticated ? '/dashboard' : '/auth/signup'} className="landing-primary">{isAuthenticated ? 'Open study plan' : 'Create account'} <ArrowRight size={17}/></Link>
      </div>
    </div>
  </section>;
}
