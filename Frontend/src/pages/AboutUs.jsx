import { Link } from "react-router-dom";
import { GraduationCap, Sparkles, ArrowRight } from "lucide-react";
import { coreValues } from "@/constants";

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="py-15 sm:py-28 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles size={16} />
            Built by developers, for developers
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-3">
            About <span className="text-primary">PrepMate</span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            PrepMate is your all-in-one Computer Science interview prep companion.  
            We provide structured learning, curated questions, and real interview insights —  
            helping you prepare smarter, not harder.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <GraduationCap className="w-12 h-12 text-primary mx-auto mb-4" />
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Our Mission</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            We believe every aspiring engineer deserves access to high-quality interview prep.  
            Our mission is to simplify your journey by combining curated content,  
            progress tracking, and a supportive community in one platform.
          </p>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Core Values</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              These principles guide everything we build and how we serve our community
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreValues.map((value, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-xl p-6 text-center shadow-sm hover:shadow-md transition"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <value.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            Ready to Ace Your Next Interview?
          </h2>
          <p className="text-muted-foreground mb-6">
            Join thousands of learners using PrepMate to prepare smarter and land top offers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/auth/signup"
              className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium gap-2"
            >
              Get Started
              <ArrowRight size={18} />
            </Link>
            <Link 
              to="/contact-us"
              className="inline-flex items-center px-6 py-3 border border-border text-foreground rounded-lg hover:bg-muted transition-colors font-medium"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
