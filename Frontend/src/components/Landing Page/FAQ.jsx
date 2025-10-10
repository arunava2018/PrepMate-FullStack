import { motion } from 'framer-motion';
import { faqs } from '@/constants.js';

export default function FAQ() {
  return (
    <motion.section
      id="faq"
      className="py-20 bg-background text-foreground transition-colors"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8 }}>
      <div className="max-w-6xl mx-auto px-6">
        {/* Heading */}
        <h2 className="text-3xl font-bold text-center">
          Frequently Asked Questions
        </h2>
        <p className="text-center text-muted-foreground mt-2">
          Everything you need to know about PrepMate
        </p>

        {/* FAQ Cards */}
        <div className="mt-12 grid md:grid-cols-2 gap-10">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-card text-card-foreground p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-border">
              <h3 className="text-lg font-semibold text-foreground">
                {faq.question}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {faq.answer}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
