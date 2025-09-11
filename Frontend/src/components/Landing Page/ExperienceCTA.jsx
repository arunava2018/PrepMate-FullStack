import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Share2, BookOpen, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader";

const ExperienceCTA = () => {
  const [loadingState, setLoadingState] = useState({
    share: false,
    view: false,
  });
  const navigate = useNavigate();

  const handleShareClick = async () => {
    setLoadingState({ share: true, view: false });
    await new Promise((resolve) => setTimeout(resolve, 1500));
    navigate("/share-experience");
    setLoadingState({ share: false, view: false });
  };

  const handleViewClick = async () => {
    setLoadingState({ share: false, view: true });
    await new Promise((resolve) => setTimeout(resolve, 1500));
    navigate("/view-interview-experiences");
    setLoadingState({ share: false, view: false });
  };

  return (
    <>
      {/* Full screen loader when either button is clicked */}
      {(loadingState.share || loadingState.view) && <Loader />}

      <section className="py-20 bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-800">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6"
          >
            Learn & Contribute with{" "}
            <span className="bg-gradient-to-r from-amber-600 via-yellow-500 to-orange-500 bg-clip-text text-transparent">
              Interview Experiences
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed"
          >
            Explore real interview stories from students & professionals across
            top companies. Share your journey to help others and grow the
            community.
          </motion.p>

          <div className="flex flex-col sm:flex-row justify-center gap-5">
            <Button
              onClick={handleShareClick}
              disabled={loadingState.share || loadingState.view}
              className="px-8 py-5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 
                         disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold rounded-full shadow-md 
                         transition-all flex items-center gap-2 disabled:cursor-not-allowed"
            >
              {loadingState.share ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Share2 className="w-5 h-5" />
              )}
              Share Experience
            </Button>

            <Button
              variant="outline"
              onClick={handleViewClick}
              disabled={loadingState.share || loadingState.view}
              className="px-8 py-5 rounded-full border-2 border-amber-500 text-amber-600 dark:text-amber-400 
                         hover:bg-amber-50 dark:hover:bg-neutral-800 disabled:border-gray-400 disabled:text-gray-400
                         disabled:hover:bg-transparent transition-all flex items-center gap-2 disabled:cursor-not-allowed"
            >
              {loadingState.view ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <BookOpen className="w-5 h-5" />
              )}
              View Experiences
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default ExperienceCTA;
