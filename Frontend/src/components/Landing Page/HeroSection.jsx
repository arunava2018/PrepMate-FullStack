import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";

// React Icons
import { FaLightbulb, FaRocket, FaStar, FaCheckCircle, FaBookOpen, FaArrowRight } from "react-icons/fa";

export default function HeroSection() {
  const [typingDone, setTypingDone] = useState(false);

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center text-center px-6 bg-gradient-to-br from-yellow-50 via-amber-50 to-yellow-100 dark:from-black dark:via-neutral-950 dark:to-neutral-900 overflow-hidden">

      {/* Background Blobs */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-yellow-200 rounded-full opacity-25 dark:hidden animate-pulse-slow"></div>
      <div className="absolute bottom-20 right-20 w-48 h-48 bg-yellow-300 rounded-full opacity-20 dark:hidden animate-pulse-slow"></div>
      <div className="absolute top-12 left-8 w-32 h-32 bg-neutral-800 rounded-full opacity-20 hidden dark:block animate-pulse-slow mix-blend-multiply"></div>
      <div className="absolute bottom-24 right-16 w-48 h-48 bg-neutral-700 rounded-full opacity-15 hidden dark:block animate-pulse-slow mix-blend-multiply"></div>

      {/* Main content */}
      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Heading */}
        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 leading-tight bg-gradient-to-r from-amber-700 to-yellow-600 dark:from-amber-400 dark:to-yellow-400 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {!typingDone ? (
            <TypeAnimation
              sequence={[
                "Land Your Dream Tech Job Faster",
                1500,
                "Boost Your Interview Success Rate",
                1500,
                "PrepMate: Your Ultimate CS Interview Companion",
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
          className="max-w-2xl mx-auto text-lg sm:text-xl text-gray-700 dark:text-gray-200 mb-6 leading-relaxed"
        >
          Unlock your potential with{" "}
          <span className="font-semibold text-amber-600 dark:text-amber-400">PrepMate</span>{" "}
          — expertly curated CS questions designed for efficient and effective interview preparation.
        </motion.p>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="max-w-lg mx-auto text-center mb-8 space-y-3"
        >
          <p className="text-lg text-amber-600 dark:text-amber-300 font-medium flex items-center justify-center gap-2">
            <FaStar className="text-amber-500" /> Sharpen your skills with curated questions
          </p>
          <p className="text-lg text-yellow-600 dark:text-yellow-300 font-medium flex items-center justify-center gap-2">
            <FaRocket className="text-yellow-500" /> Land your dream job faster
          </p>
          <p className="text-lg text-orange-600 dark:text-orange-300 font-medium flex items-center justify-center gap-2">
            <FaLightbulb className="text-orange-500" /> Prep smart, not hard
          </p>
        </motion.div>

        {/* Confidence Line */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="text-base text-gray-600 dark:text-gray-300 mb-10 max-w-xl mx-auto flex items-center justify-center gap-2"
        >
          <span>
            Save time, sharpen skills, and build confidence to{" "}
            <span className="font-medium text-amber-600 dark:text-amber-400">stand out</span> and{" "}
            <span className="font-medium text-amber-600 dark:text-amber-400">succeed</span>
          </span>
          <FaCheckCircle className="text-green-500" />
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          {/* Primary CTA */}
          <Link to="/dashboard">
            <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.97 }}>
              <Button
                className="relative bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600
                           hover:from-amber-600 hover:via-yellow-600 hover:to-amber-700
                           text-white px-10 py-4 rounded-full text-lg sm:text-xl font-bold
                           shadow-lg hover:shadow-amber-400/40 transition-all duration-300
                           flex items-center gap-3"
              >
                <span className="drop-shadow-md">Explore Our Content</span>
                <FaArrowRight className="text-xl" />

                {/* Glow effect */}
                <span className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 opacity-30 blur-xl animate-pulse-slow pointer-events-none"></span>
              </Button>
            </motion.div>
          </Link>

          {/* Secondary CTA */}
          <Link to="/features">
            <motion.div whileHover={{ scale: 1.02, y: -1 }} whileTap={{ scale: 0.98 }}>
              <Button
                variant="outline"
                className="border-amber-500 text-amber-700 dark:border-amber-400 dark:text-amber-300 
                           hover:bg-amber-50 dark:hover:bg-amber-900/10 
                           px-8 py-3 rounded-full text-lg font-semibold 
                           shadow-sm hover:shadow-md transition-all duration-200 
                           flex items-center gap-2"
              >
                Learn More <FaBookOpen />
              </Button>
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
