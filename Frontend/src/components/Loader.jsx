import { motion } from 'framer-motion';

export default function Loader() {
  const colors = ['bg-yellow-400', 'bg-blue-400', 'bg-green-400', 'bg-red-400'];

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-white dark:bg-black z-50">
      <div className="flex gap-4">
        {colors.map((color, idx) => (
          <motion.div
            key={idx}
            className={`w-5 h-5 rounded-full ${color}`}
            animate={{
              y: [0, -20, 0],
            }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              delay: idx * 0.2,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>
    </div>
  );
}
