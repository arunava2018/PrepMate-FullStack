import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { TypeAnimation } from 'react-type-animation';
import { motion } from 'framer-motion';

import { FaCheckCircle, FaArrowRight } from 'react-icons/fa';

export default function HeroSection() {
  const [typingDone, setTypingDone] = useState(false);

  return (
    <section className="relative min-h-screen flex items-center px-4 sm:px-6 lg:px-8 overflow-hidden bg-background pt-20 pb-12 lg:pt-0">
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      
      {/* Radial Gradient to fade the grid at the edges */}
      <div className="absolute inset-0 bg-background [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none"></div>

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Column (Content) */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
          {/* Pill Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted/50 border border-border text-sm text-muted-foreground mb-8"
          >
            <span className="flex h-2 w-2 rounded-full bg-primary"></span>
            Your Ultimate CS Interview Companion
          </motion.div>

          {/* Heading */}
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-8 leading-[1.1] text-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}>
            {!typingDone ? (
              <TypeAnimation
                sequence={[
                  'Land Your Dream Tech Job Faster.',
                  1500,
                  'Boost Your Interview Success Rate.',
                  1500,
                  'Master CS Interviews with Confidence.',
                  () => setTypingDone(true),
                ]}
                wrapper="span"
                speed={50}
                cursor={true}
                repeat={0}
              />
            ) : (
              <span>Master CS Interviews with Confidence.</span>
            )}
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-xl text-lg sm:text-xl mb-10 text-muted-foreground leading-relaxed">
            Unlock your potential with <span className="font-semibold text-foreground">PrepMate</span>.
            Expertly curated questions and tailored practice designed for efficient and effective interview preparation.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start w-full sm:w-auto mb-12">
            {/* Primary CTA */}
            <Link to="/dashboard" className="w-full sm:w-auto">
              <Button
                className="w-full sm:w-auto h-12 px-8 rounded-md bg-primary text-primary-foreground text-base font-semibold shadow-sm hover:bg-primary/90 hover:shadow-md transition-all flex items-center justify-center gap-2">
                Start Practicing <FaArrowRight className="text-sm" />
              </Button>
            </Link>

            {/* Secondary CTA */}
            <Link to="/features" className="w-full sm:w-auto">
              <Button
                variant="outline"
                className="w-full sm:w-auto h-12 px-8 rounded-md bg-background border-border text-foreground hover:bg-muted text-base font-semibold shadow-sm transition-all flex items-center justify-center">
                Explore Features
              </Button>
            </Link>
          </motion.div>

          {/* Trust/Confidence indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap justify-center lg:justify-start gap-6 text-sm font-medium text-muted-foreground">
            <div className="flex items-center gap-2">
              <FaCheckCircle className="text-primary/80" /> Curated Questions
            </div>
            <div className="flex items-center gap-2">
              <FaCheckCircle className="text-primary/80" /> Track Progress
            </div>
            <div className="flex items-center gap-2">
              <FaCheckCircle className="text-primary/80" /> Interview Ready
            </div>
          </motion.div>
        </div>

        {/* Right Column (Image) */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="hidden lg:flex justify-center items-center w-full relative"
        >
          {/* Subtle glow behind the image */}
          <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full translate-y-4"></div>
          
          <img 
            src="/hero-illustration.jpg" 
            alt="SaaS Platform Dashboard" 
            className="relative w-full max-w-lg xl:max-w-xl object-contain rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-border/50"
          />
        </motion.div>

      </div>
    </section>
  );
}
