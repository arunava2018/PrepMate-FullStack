import React from 'react';
import { motion } from 'framer-motion';

const Logo = ({ showText = true, className = '', iconSize = 'h-8 w-8' }) => {
  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Animated SVG Icon Container */}
      <motion.div
        whileHover={{ scale: 1.05, rotate: 5 }}
        whileTap={{ scale: 0.95 }}
        className={`relative ${iconSize} flex-shrink-0`}
      >
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-[0_2px_8px_rgba(99,102,241,0.15)]"
        >
          <defs>
            {/* High-end tech gradient */}
            <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#6366f1" /> {/* Indigo-500 */}
              <stop offset="50%" stop-color="#8b5cf6" /> {/* Violet-500 */}
              <stop offset="100%" stop-color="#ec4899" /> {/* Pink-500 */}
            </linearGradient>
            <linearGradient id="node-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#22d3ee" /> {/* Cyan-400 */}
              <stop offset="100%" stop-color="#818cf8" /> {/* Indigo-400 */}
            </linearGradient>
            <filter id="glow-effect" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="2" stdDeviation="4" flood-color="#8b5cf6" flood-opacity="0.3" />
            </filter>
          </defs>

          {/* Ambient background glow ring */}
          <circle cx="50" cy="50" r="42" stroke="url(#logo-gradient)" stroke-width="1.5" opacity="0.1" />

          {/* Styled Abstract PM monogram: Interlocking loops representing Interview Prep and Career Match */}
          <g filter="url(#glow-effect)">
            {/* The vertical stem for 'P' (Prep) */}
            <path
              d="M 36 26 L 36 74"
              stroke="url(#logo-gradient)"
              stroke-width="7.5"
              stroke-linecap="round"
            />
            {/* The loop of 'P' which wraps around and flows into 'M' */}
            <path
              d="M 36 29.75 C 54 29.75, 56 46, 36 46 L 52 46 C 64 46, 65 67, 52 67"
              stroke="url(#logo-gradient)"
              stroke-width="7.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            {/* The second arch of the 'M' (Mate) */}
            <path
              d="M 52 50 C 65 50, 68 67, 68 67"
              stroke="url(#logo-gradient)"
              stroke-width="7.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </g>

          {/* Interactive Core Tech Node (representing technical success) */}
          <circle cx="68" cy="67" r="4.5" fill="url(#node-gradient)" />
          <circle cx="36" cy="26" r="4.5" fill="url(#node-gradient)" />
        </svg>
      </motion.div>

      {/* Brand Text Typography */}
      {showText && (
        <span className="font-extrabold text-xl tracking-tight text-foreground flex items-center">
          Prep
          <span className="bg-gradient-to-r from-indigo-500 via-violet-500 to-pink-500 bg-clip-text text-transparent ml-0.5">
            Mate
          </span>
        </span>
      )}
    </div>
  );
};

export default Logo;
