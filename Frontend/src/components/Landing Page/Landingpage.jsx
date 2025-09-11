import ExperienceCTA from "./ExperienceCTA";
import FAQ from "./FAQ";
import Features from "./Feature";
import Footer from "../../layout/Footer";
import HeroSection from "./HeroSection";
import Testimonials from "./Testimonials";
export default function LandingPage() {
  return (
    <div>
      <HeroSection />
      <ExperienceCTA/>
      <Features/>
      <Testimonials/>
      <FAQ/>
      {/* Later you can add Features section here */}
    </div>
  );
}
