import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Share2, BookOpen, Loader2, Users, TrendingUp } from "lucide-react";
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
      {/* Full screen loader */}
      {(loadingState.share || loadingState.view) && <Loader />}

      <section className="py-24 text-center px-6 bg-background text-foreground">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            {/* Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 tracking-tight"
            >
              Professional{" "}
              <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                Interview Insights
              </span>
            </motion.h2>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-xl text-muted-foreground max-w-4xl mx-auto mb-8 leading-relaxed font-medium"
            >
              Access authentic interview experiences from industry professionals across leading technology companies. 
              Contribute your insights to build a comprehensive knowledge base for the developer community.
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="flex justify-center gap-8 mb-12"
            >
              <div className="flex items-center gap-2 text-muted-foreground">
                <Users className="w-5 h-5 text-primary" />
                <span className="font-semibold">500+ Experiences</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <TrendingUp className="w-5 h-5 text-primary" />
                <span className="font-semibold">Top Companies</span>
              </div>
            </motion.div>
          </div>

          {/* Action Cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
          >
            {/* Share Experience Card */}
            <motion.div
              whileHover={{ scale: 1.02, y: -4 }}
              className="bg-card text-card-foreground rounded-2xl p-8 shadow-lg border border-border hover:shadow-xl transition-all"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-primary/10 rounded-xl">
                  <Share2 className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Share Your Experience</h3>
              </div>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Help fellow developers by sharing detailed insights from your interview process, including questions, 
                preparation tips, and company culture observations.
              </p>
              <Button
                onClick={handleShareClick}
                disabled={loadingState.share || loadingState.view}
                className="w-full px-8 py-4 bg-primary text-primary-foreground 
                           font-semibold rounded-xl text-base shadow-md 
                           hover:shadow-lg transition-all flex items-center justify-center gap-3 
                           disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loadingState.share ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Share2 className="w-5 h-5" />
                )}
                Contribute Experience
              </Button>
            </motion.div>

            {/* View Experiences Card */}
            <motion.div
              whileHover={{ scale: 1.02, y: -4 }}
              className="bg-card text-card-foreground rounded-2xl p-8 shadow-lg border border-border hover:shadow-xl transition-all"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-secondary/20 rounded-xl">
                  <BookOpen className="w-6 h-6 text-secondary-foreground" />
                </div>
                <h3 className="text-xl font-bold">Explore Experiences</h3>
              </div>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Browse comprehensive interview experiences from various companies and roles. 
                Learn from others' journeys to better prepare for your own interviews.
              </p>
              <Button
                variant="outline"
                onClick={handleViewClick}
                disabled={loadingState.share || loadingState.view}
                className="w-full px-8 py-4 rounded-xl border-2 border-primary 
                           text-primary font-semibold hover:bg-primary/10 
                           transition-all flex items-center justify-center gap-3 
                           disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loadingState.view ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <BookOpen className="w-5 h-5" />
                )}
                Browse Insights
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default ExperienceCTA;
