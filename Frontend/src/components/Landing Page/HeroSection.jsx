import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";

export default function HeroSection() {
  const [typingDone, setTypingDone] = useState(false);

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center text-center px-6 bg-gradient-to-br from-yellow-50 via-amber-50 to-yellow-100 dark:from-black dark:via-neutral-950 dark:to-neutral-900 overflow-hidden">

      <div className="absolute top-10 left-10 w-32 h-32 bg-yellow-200 rounded-full opacity-30 dark:hidden animate-pulse-slow"></div>
      <div className="absolute bottom-20 right-20 w-48 h-48 bg-yellow-300 rounded-full opacity-20 dark:hidden animate-pulse-slow"></div>
      
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-32 right-32 w-24 h-24 bg-amber-200 rounded-full blur-sm opacity-25 dark:hidden"
      />
      <motion.div
        animate={{ scale: [1.1, 0.9, 1.1], opacity: [0.05, 0.15, 0.05] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        className="absolute bottom-40 left-32 w-20 h-20 bg-yellow-400 rounded-full blur-sm opacity-20 dark:hidden"
      />

      {/* Dark mode blobs with enhanced darkness */}
      <div className="absolute top-12 left-8 w-32 h-32 bg-neutral-800 rounded-full opacity-25 hidden dark:block animate-pulse-slow mix-blend-multiply"></div>
      <div className="absolute bottom-24 right-16 w-48 h-48 bg-neutral-700 rounded-full opacity-20 hidden dark:block animate-pulse-slow mix-blend-multiply"></div>

      {/* Main content */}
      <div className="relative z-10 max-w-4xl mx-auto">
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
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="max-w-2xl mx-auto text-lg sm:text-xl text-gray-700 dark:text-gray-200 mb-6 leading-relaxed"
        >
          Unlock your potential with{" "}
          <span className="font-semibold text-amber-600 dark:text-amber-400">PrepMate</span>{" "}
          — expertly curated CS questions for efficient interview preparation.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="max-w-lg mx-auto text-center mb-8 space-y-2"
        >
          <p className="text-lg text-amber-600 dark:text-amber-300 font-medium flex items-center justify-center gap-2">
            <span>✨</span> Sharpen your skills with curated questions
          </p>
          <p className="text-lg text-yellow-600 dark:text-yellow-300 font-medium flex items-center justify-center gap-2">
            <span>🚀</span> Land that dream job faster
          </p>
          <p className="text-lg text-orange-600 dark:text-orange-300 font-medium flex items-center justify-center gap-2">
            <span>💡</span> Prep smart, not hard
          </p>
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="text-base text-gray-600 dark:text-gray-300 mb-8 max-w-xl mx-auto flex items-center justify-center gap-2"
        >
          <span>Save time, sharpen skills, and build confidence to{" "}
          <span className="font-medium text-amber-600 dark:text-amber-400">stand out</span> and{" "}
          <span className="font-medium text-amber-600 dark:text-amber-400">succeed</span></span>
          <span>🎯</span>
        </motion.p>

        {/* Clean button design */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link to="/dashboard">
            <motion.div
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2">
                Explore Our Content
                <span>🎉</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Button>
            </motion.div>
          </Link>

          <Link to="/features">
            <motion.div
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                variant="outline"
                className="border-amber-500 text-amber-700 dark:border-amber-400 dark:text-amber-300 hover:bg-amber-50 dark:hover:bg-amber-900/10 px-8 py-3 rounded-full text-lg font-semibold shadow-sm hover:shadow-md transition-all duration-200 flex items-center gap-2"
              >
                Learn More
                <span>📖</span>
              </Button>
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
