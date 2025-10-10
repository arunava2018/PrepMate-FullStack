import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';
import { testimonials } from '@/constants.js';

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
    <section className="py-20 bg-background text-foreground px-6">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
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
            className="absolute w-full flex justify-center">
            <Card className="shadow-lg rounded-2xl border border-border bg-card text-card-foreground p-6 text-center w-11/12 sm:w-3/4 md:w-2/3">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">
                  {testimonials[current].name}
                </CardTitle>
                <CardDescription className="text-sm text-muted-foreground">
                  {testimonials[current].role}
                </CardDescription>
              </CardHeader>
              <CardContent className="text-muted-foreground mt-2">
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
                idx === current ? 'bg-primary' : 'bg-muted'
              }`}
              onClick={() => setCurrent(idx)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
