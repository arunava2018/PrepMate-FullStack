import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const SuccessMessage = ({ showSuccess }) => {
  return (
    <AnimatePresence>
      {showSuccess && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Alert
              variant="default"
              className="w-[28rem] max-w-[90%] flex flex-col items-center text-center bg-white dark:bg-gray-800 
                         rounded-2xl shadow-xl border border-green-200 dark:border-green-800 p-6"
            >
              <CheckCircle2 className="w-10 h-10 text-green-600 mb-3" />

              <AlertTitle className="text-xl font-semibold text-green-700 dark:text-green-400">
                🎉 Thank you for your submission!
              </AlertTitle>

              <AlertDescription className="text-sm text-gray-600 dark:text-gray-300 mt-3 leading-relaxed">
                Your response will be validated by our admin before publishing.  
                Reviews usually take
                <span className="font-medium text-gray-900 dark:text-white">
                  24–48 hours
                </span>
                We appreciate your support! 🙌
              </AlertDescription>
            </Alert>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SuccessMessage;
