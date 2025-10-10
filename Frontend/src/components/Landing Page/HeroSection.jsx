import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { TypeAnimation } from 'react-type-animation';
import { motion } from 'framer-motion';

import { FaCheckCircle, FaBookOpen, FaArrowRight } from 'react-icons/fa';

export default function HeroSection() {
  const [typingDone, setTypingDone] = useState(false);

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center text-center px-6 overflow-hidden bg-background text-foreground">
      {/* Background Blobs */}
      <div className="absolute top-10 left-10 w-32 h-32 rounded-full opacity-20 bg-primary/30 animate-pulse-slow" />
      <div className="absolute bottom-20 right-20 w-48 h-48 rounded-full opacity-20 bg-secondary/40 animate-pulse-slow" />
      <div className="absolute top-12 left-8 w-32 h-32 rounded-full opacity-10 bg-accent mix-blend-multiply animate-pulse-slow" />
      <div className="absolute bottom-24 right-16 w-48 h-48 rounded-full opacity-10 bg-muted mix-blend-multiply animate-pulse-slow" />

      {/* Main content */}
      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Heading */}
        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 leading-tight 
                     bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}>
          {!typingDone ? (
            <TypeAnimation
              sequence={[
                'Land Your Dream Tech Job Faster',
                1500,
                'Boost Your Interview Success Rate',
                1500,
                'PrepMate: Your Ultimate CS Interview Companion',
                () => setTypingDone(true),
              ]}
              wrapper="span"
              speed={60}
              cursor={true}
              repeat={0}
            />
          ) : (
            <span>PrepMate: Your Ultimate CS Interview Companion</span>
          )}
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="max-w-2xl mx-auto text-lg sm:text-xl mb-6 leading-relaxed text-muted-foreground">
          Unlock your potential with{' '}
          <span className="font-semibold text-primary">PrepMate</span> —
          expertly curated CS questions designed for efficient and effective
          interview preparation.
        </motion.p>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="max-w-lg mx-auto text-center mb-8 space-y-3">
          <p className="text-lg text-primary font-medium flex items-center justify-center gap-2">
            Sharpen your skills with curated questions
          </p>
          <p className="text-lg text-secondary-foreground font-medium flex items-center justify-center gap-2">
            Land your dream job faster
          </p>
          <p className="text-lg text-accent-foreground font-medium flex items-center justify-center gap-2">
            Prep smart, not hard
          </p>
        </motion.div>

        {/* Confidence Line */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="text-base text-muted-foreground mb-10 max-w-xl mx-auto flex items-center justify-center gap-2">
          <span>
            Save time, sharpen skills, and build confidence to{' '}
            <span className="font-medium text-primary">stand out</span> and{' '}
            <span className="font-medium text-primary">succeed</span>
          </span>
          <FaCheckCircle className="text-green-500" />
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          {/* Primary CTA */}
          <Link to="/dashboard">
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.97 }}>
              <Button
                className="relative bg-primary text-primary-foreground px-10 py-4 rounded-full 
                           text-lg sm:text-xl font-bold shadow-lg hover:shadow-primary/40 
                           transition-all duration-300 flex items-center gap-3">
                <span className="drop-shadow-md">Explore Our Content</span>
                <FaArrowRight className="text-xl" />
                {/* Glow effect */}
                <span className="absolute inset-0 rounded-full bg-primary opacity-20 blur-xl animate-pulse-slow pointer-events-none"></span>
              </Button>
            </motion.div>
          </Link>

          {/* Secondary CTA */}
          <Link to="/features">
            <motion.div
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}>
              <Button
                variant="outline"
                className="border-primary text-primary hover:bg-primary/10 
                           px-8 py-3 rounded-full text-lg font-semibold 
                           shadow-sm hover:shadow-md transition-all duration-200 
                           flex items-center gap-2">
                Learn More <FaBookOpen />
              </Button>
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
