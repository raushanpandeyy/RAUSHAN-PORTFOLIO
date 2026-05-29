import { motion } from "framer-motion";

export default function SectionShell({ eyebrow, title, copy, children }) {
  return (
    <div className="mx-auto max-w-7xl">
      <motion.div
        className="mb-8 max-w-3xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
      >
        <motion.p className="mb-3 text-xs font-bold uppercase tracking-[0.34em] text-cyan-300" whileHover={{ x: 8, scale: 1.03 }}>{eyebrow}</motion.p>
        <motion.h2 className="text-balance text-5xl font-bold tracking-normal text-white sm:text-7xl" whileHover={{ scale: 1.02, y: -3 }}>{title}</motion.h2>
        {copy && <motion.p className="mt-5 text-base font-bold leading-8 text-white/90 sm:text-lg" whileHover={{ x: 5 }}>{copy}</motion.p>}
      </motion.div>
      {children}
    </div>
  );
}
