import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    name: "Ankit Sharma",
    role: "Software Engineer @ Google",
    feedback:
      "PrepMate’s curated question bank saved me hours of prep. The structured layout made revising effortless!",
  },
  {
    name: "Riya Sen",
    role: "CS Student",
    feedback:
      "I love the subject-wise progress tracking. It really helped me focus on weak areas before my interviews.",
  },
  {
    name: "Vikram Das",
    role: "Developer @ Microsoft",
    feedback:
      "The questions are clear, concise, and relevant. PrepMate is a must-have for anyone preparing for CS interviews.",
  },
  {
    name: "Priya Mehta",
    role: "Software Developer @ Amazon",
    feedback:
      "The interface is clean and distraction-free. I can revise quickly without getting lost in unnecessary details.",
  },
  {
    name: "Siddharth Roy",
    role: "CS Student",
    feedback:
      "PrepMate’s subject and subtopic mapping made my preparation so much more organized and efficient.",
  },
  {
    name: "Ananya Gupta",
    role: "Backend Engineer @ Infosys",
    feedback:
      "The curated question bank is excellent. It helped me cover topics I often overlook while preparing.",
  },
  {
    name: "Rohan Verma",
    role: "Software Engineer @ Adobe",
    feedback:
      "I especially love the progress tracking feature. It keeps me motivated to complete all sections on time.",
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 bg-yellow-50 dark:bg-[#000000] px-6">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-yellow-400">
        What People Are Saying
      </h2>

      <div className="relative max-w-3xl mx-auto h-60 flex justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.8 }}
            className="absolute w-full flex justify-center"
          >
            <Card className="shadow-lg rounded-2xl border-none p-6 text-center bg-white dark:bg-neutral-800 w-11/12 sm:w-3/4 md:w-2/3">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">
                  {testimonials[current].name}
                </CardTitle>
                <CardDescription className="text-sm text-gray-600 dark:text-gray-300">
                  {testimonials[current].role}
                </CardDescription>
              </CardHeader>
              <CardContent className="text-gray-700 dark:text-gray-300 mt-2">
                {testimonials[current].feedback}
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Dots */}
        <div className="flex justify-center mt-6 gap-2 absolute bottom-0 w-full">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              className={`w-3 h-3 rounded-full transition ${
                idx === current
                  ? "bg-yellow-500 dark:bg-yellow-400"
                  : "bg-gray-300 dark:bg-gray-600"
              }`}
              onClick={() => setCurrent(idx)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
