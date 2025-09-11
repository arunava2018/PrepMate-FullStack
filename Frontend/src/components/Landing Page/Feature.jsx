import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, BarChart3, ShieldCheck, LayoutDashboard } from "lucide-react";
import { motion } from "framer-motion";

export default function Features() {
  const features = [
    {
      icon: <BookOpen className="w-8 h-8 text-yellow-500" />,
      title: "Organized Learning",
      desc: "Subjects and subtopics mapped for smooth and structured progression.",
    },
    {
      icon: <LayoutDashboard className="w-8 h-8 text-yellow-500" />,
      title: "Smart Dashboard",
      desc: "Track progress with subject-wise stats and question counts in real time.",
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-yellow-500" />,
      title: "Reliable Content",
      desc: "Every question is admin-curated and verified for clarity and accuracy.",
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-yellow-500" />,
      title: "Simple & Elegant UI",
      desc: "Distraction-free, responsive, and supports light/dark theme effortlessly.",
    },
  ];

  return (
    <motion.section
      id="features"
      className="px-10 py-20 bg-white dark:bg-[#000000]"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-yellow-400">
        Why Choose PrepMate?
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {features.map((f, idx) => (
          <Card
            key={idx}
            className="shadow-lg border-none rounded-2xl hover:scale-105 hover:shadow-2xl transition-all duration-300"
          >
            <CardHeader className="flex flex-col items-center">
              {f.icon}
              <CardTitle className="mt-4 text-lg font-semibold text-center">
                {f.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center text-gray-600 dark:text-gray-300">
              {f.desc}
            </CardContent>
          </Card>
        ))}
      </div>
    </motion.section>
  );
}
