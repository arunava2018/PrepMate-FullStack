import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  BookOpen,
  BarChart3,
  ShieldCheck,
  LayoutDashboard,
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function Features() {
  const features = [
    {
      icon: BookOpen,
      title: 'Organized Learning',
      desc: 'Subjects and subtopics mapped for a smooth, structured progression.',
    },
    {
      icon: LayoutDashboard,
      title: 'Smart Dashboard',
      desc: 'Track your progress with subject-wise insights and real-time stats.',
    },
    {
      icon: ShieldCheck,
      title: 'Reliable Content',
      desc: 'Every question is admin-curated and verified for accuracy and clarity.',
    },
    {
      icon: BarChart3,
      title: 'Elegant UI',
      desc: 'Minimal, distraction-free design with responsive light/dark themes.',
    },
  ];

  return (
    <motion.section
      id="features"
      className="px-6 sm:px-10 py-20 bg-background text-foreground"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8 }}>
      {/* Section Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-4xl font-extrabold text-center mb-14">
        Why Choose{' '}
        <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
          PrepMate?
        </span>
      </motion.h2>

      {/* Feature Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {features.map((f, idx) => {
          const Icon = f.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.6 }}>
              <Card
                className="h-full shadow-md border border-border 
                           rounded-2xl hover:shadow-xl hover:scale-[1.03] 
                           transition-all duration-300 bg-card text-card-foreground">
                <CardHeader className="flex flex-col items-center pt-8">
                  <div
                    className="w-16 h-16 flex items-center justify-center rounded-full 
                                  bg-primary text-primary-foreground shadow-md">
                    <Icon className="w-7 h-7" />
                  </div>
                  <CardTitle className="mt-5 text-lg font-semibold text-foreground text-center">
                    {f.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-6 pb-8 text-center text-muted-foreground leading-relaxed">
                  {f.desc}
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
}
