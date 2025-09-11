import { motion } from "framer-motion";

const faqs = [
  {
    question: "What is PrepMate?",
    answer:
      "PrepMate is your personal Computer Science Q&A bank, curated by experts, to help you revise and prepare efficiently for interviews and exams.",
  },
  {
    question: "Do I need to pay to use PrepMate?",
    answer:
      "No, the core features are free. In the future, premium features like cloud backup and advanced analytics may be introduced.",
  },
  {
    question: "Is my progress tracked?",
    answer:
      "Yes! PrepMate tracks your progress subject-wise, showing question counts and performance stats to help you focus on weaker areas.",
  },
  {
    question: "Is the content reliable?",
    answer:
      "Absolutely. Every question is carefully curated and verified by our admins to ensure accuracy and clarity.",
  },
  {
    question: "Can I access PrepMate on mobile?",
    answer:
      "Yes, the web app is fully responsive and works smoothly on mobile, tablet, and desktop.",
  },
  {
    question: "Are there preloaded questions?",
    answer:
      "Yes, PrepMate comes with a set of common interview questions for each CS subject, ready for practice and revision.",
  },
];

export default function FAQ() {
  return (
    <motion.section
      id="faq"
      className="py-20 bg-neutral-50 dark:bg-[#000000] transition-colors"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-neutral-900 dark:text-white">
          Frequently Asked Questions
        </h2>
        <p className="text-center text-neutral-600 dark:text-neutral-400 mt-2">
          Everything you need to know about PrepMate
        </p>

        <div className="mt-12 grid md:grid-cols-2 gap-10">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-neutral-800 p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
                {faq.question}
              </h3>
              <p className="mt-2 text-neutral-700 dark:text-neutral-300 text-sm leading-relaxed">
                {faq.answer}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
