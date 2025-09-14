import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { CheckCircle2, X, Clock, Shield } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const SuccessMessage = ({ showSuccess, onClose }) => {
  const [progress, setProgress] = useState(100);

  // Auto-close timer with progress bar
  useEffect(() => {
    if (showSuccess) {
      setProgress(100);
      const duration = 5000; // 5 seconds
      const interval = 50; // Update every 50ms
      const decrement = (interval / duration) * 100;

      const timer = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev - decrement;
          if (newProgress <= 0) {
            clearInterval(timer);
            if (onClose) onClose();
            return 0;
          }
          return newProgress;
        });
      }, interval);

      return () => clearInterval(timer);
    }
  }, [showSuccess, onClose]);

  // Animation variants for different elements
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  const modalVariants = {
    hidden: { 
      scale: 0.7, 
      opacity: 0, 
      y: -50,
      rotateX: -15 
    },
    visible: { 
      scale: 1, 
      opacity: 1, 
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 500,
        duration: 0.4
      }
    },
    exit: { 
      scale: 0.8, 
      opacity: 0, 
      y: 20,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: { 
      scale: 1, 
      rotate: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 500,
        delay: 0.2
      }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        delay: 0.3,
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  const progressVariants = {
    hidden: { scaleX: 0 },
    visible: { 
      scaleX: 1,
      transition: {
        delay: 0.5,
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget && onClose) {
      onClose();
    }
  };

  const handleClose = () => {
    if (onClose) onClose();
  };

  return (
    <AnimatePresence mode="wait">
      {showSuccess && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50 p-4"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={handleBackdropClick}
        >
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative"
            style={{ perspective: 1000 }}
          >
            <Alert
              variant="default"
              className="w-[32rem] max-w-[95vw] flex flex-col items-center text-center bg-white dark:bg-gray-800 
                         rounded-3xl shadow-2xl border-2 border-green-200 dark:border-green-700 p-8 relative overflow-hidden"
            >
              {/* Close Button */}
              <motion.button
                onClick={handleClose}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 
                           transition-colors duration-200 group"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <X className="w-5 h-5 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300" />
              </motion.button>

              {/* Success Icon with Animation */}
              <motion.div
                variants={iconVariants}
                initial="hidden"
                animate="visible"
                className="relative mb-4"
              >
                <motion.div
                  className="absolute inset-0 bg-green-100 dark:bg-green-900/30 rounded-full"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.7, 0.3, 0.7] 
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    ease: "easeInOut" 
                  }}
                />
                <CheckCircle2 className="w-16 h-16 text-green-600 dark:text-green-400 relative z-10" />
              </motion.div>

              {/* Content with Staggered Animation */}
              <motion.div
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                className="space-y-4"
              >
                <AlertTitle className="text-2xl font-bold text-green-700 dark:text-green-400 mb-2">
                  🎉 Thank You for Your Submission!
                </AlertTitle>

                <AlertDescription className="text-base text-gray-600 dark:text-gray-300 leading-relaxed space-y-3">
                  <p>
                    Your interview experience has been successfully submitted and is now 
                    <span className="font-semibold text-gray-900 dark:text-white mx-1">
                      in review
                    </span>
                    by our moderation team.
                  </p>
                  
                  <div className="flex items-center justify-center gap-6 py-3">
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-blue-500" />
                      <span className="font-medium">24-48 hours</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Shield className="w-4 h-4 text-purple-500" />
                      <span className="font-medium">Quality reviewed</span>
                    </div>
                  </div>

                  <p className="text-sm">
                    You'll receive an email notification once your experience is approved and published.
                    <br />
                    <span className="font-semibold text-green-600 dark:text-green-400">
                      Thank you for helping the community! 🙌
                    </span>
                  </p>
                </AlertDescription>
              </motion.div>

              {/* Auto-close Progress Bar */}
              <motion.div
                variants={progressVariants}
                initial="hidden"
                animate="visible"
                className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-700 overflow-hidden rounded-b-3xl"
              >
                <motion.div
                  className="h-full bg-gradient-to-r from-green-500 to-green-600 origin-left"
                  style={{ 
                    scaleX: progress / 100,
                    transformOrigin: "left center"
                  }}
                  transition={{ duration: 0.1, ease: "linear" }}
                />
              </motion.div>

              {/* Decorative Elements */}
              <motion.div
                className="absolute -top-2 -right-2 w-20 h-20 bg-green-100 dark:bg-green-900/20 rounded-full opacity-20"
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 180, 360] 
                }}
                transition={{ 
                  duration: 8, 
                  repeat: Infinity,
                  ease: "linear" 
                }}
              />
              <motion.div
                className="absolute -bottom-4 -left-4 w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full opacity-20"
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [360, 180, 0] 
                }}
                transition={{ 
                  duration: 6, 
                  repeat: Infinity,
                  ease: "linear" 
                }}
              />
            </Alert>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SuccessMessage;
