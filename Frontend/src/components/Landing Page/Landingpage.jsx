import ExperienceCTA from './ExperienceCTA';
import FAQ from './FAQ';
import Features from './Feature';
import HeroSection from './HeroSection';
import LearningFlow from './LearningFlow';
import ClosingCTA from './ClosingCTA';
import './landing.css';
export default function LandingPage() {
  return (
    <div className="landing-page">
      <HeroSection />
      <LearningFlow />
      <Features />
      <ExperienceCTA />
      <FAQ />
      <ClosingCTA />
    </div>
  );
}
