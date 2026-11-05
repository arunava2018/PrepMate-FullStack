
import React from "react";

const Logo = ({
  showText = true,
  className = "",
  iconSize = "h-9 w-9",
}) => {
  return (
    <div
      className={`flex items-center gap-2.5 select-none ${className}`}
      aria-label="PrepMate"
    >
      {/* Logo Icon */}
      <div className={`relative ${iconSize} flex-shrink-0 text-blue-700 dark:text-blue-300`}>
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
          role="img"
          aria-label="PrepMate logo"
        >
          {/* Open book */}
          <path
            d="M50 36 C39 27 24 25 12 30 V72 C25 68 39 71 50 81 C61 71 75 68 88 72 V30 C76 25 61 27 50 36Z"
            fill="currentColor"
            fillOpacity="0.08"
            stroke="currentColor"
            strokeWidth="5"
            strokeLinejoin="round"
          />

          {/* Center spine */}
          <path
            d="M50 37 V80"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
          />

          {/* Code brackets */}
          <path
            d="M30 45 L22 52 L30 59"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <path
            d="M39 45 L33 59"
            stroke="currentColor"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* Progress lines */}
          <path
            d="M61 47 H76"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
          />

          <path
            d="M61 57 H72"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
          />

          {/* Achievement checkmark */}
          <circle
            cx="76"
            cy="25"
            r="13"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="1"
          />

          <path
            d="M70 25 L74 29 L82 20"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Brand Name */}
      {showText && (
        <span className="flex items-center font-semibold text-lg text-foreground">PrepMate</span>
      )}
    </div>
  );
};

export default Logo;
