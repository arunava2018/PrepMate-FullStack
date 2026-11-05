import ExperienceCTA from './ExperienceCTA';
import FAQ from './FAQ';
import Features from './Feature';
import HeroSection from './HeroSection';
import Testimonials from './Testimonials';
import './landing.css';
export default function LandingPage() {
  return (
    <div className="landing-page">
      <HeroSection />
      <ExperienceCTA />
      <Features />
      <Testimonials />
      <FAQ />
      {/* Later you can add Features section here */}
    </div>
  );
}
