import { motion } from "framer-motion";
import GlassCard from "../components/common/GlassCard";
import MagneticButton from "../components/common/MagneticButton";

export default function Home({ onNavigate }) {
  const stats = [
    ["01", "Cube-led navigation system"],
    ["03", "Flagship builds"],
    ["60", "FPS-focused interactions"],
  ];

  return (
    <div className="mx-auto grid min-h-[58vh] max-w-7xl items-end gap-8 lg:grid-cols-[1fr_0.8fr]">
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}>
        <motion.p className="mb-4 text-xs font-bold uppercase tracking-[0.34em] text-cyan-300" whileHover={{ x: 6, scale: 1.02 }}>
          Activated portfolio system
        </motion.p>
        <motion.h2 className="text-balance text-5xl font-bold tracking-normal text-white drop-shadow-[0_16px_34px_rgba(6,52,61,0.2)] sm:text-7xl lg:text-8xl" whileHover={{ scale: 1.02, y: -3 }}>
          Building web products with cinematic precision.
        </motion.h2>
        <motion.p className="mt-6 max-w-2xl text-lg font-bold leading-8 text-white/80 drop-shadow-[0_8px_20px_rgba(6,52,61,0.12)]" whileHover={{ x: 4 }}>
          I am Raushan Pandey, a full stack developer, founder of Cravzo, React developer, and AI enthusiast crafting fast interfaces with memorable interactions.
        </motion.p>
        <div className="mt-8 flex flex-wrap gap-3">
          <MagneticButton onClick={() => onNavigate("projects")} className="rounded-md bg-coral px-5 py-3 font-bold text-ink shadow-coral transition hover:-translate-y-0.5">
            View Projects
          </MagneticButton>
          <MagneticButton onClick={() => onNavigate("contact")} className="rounded-md border border-cyan-200 bg-white/95 px-5 py-3 font-bold text-ink transition hover:border-plasma/70 hover:bg-cyan-100">
            Contact
          </MagneticButton>
        </div>
      </motion.div>

      <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
        {stats.map(([number, label], index) => (
          <GlassCard key={label} delay={index * 0.08} className="p-5">
            <motion.p className="text-3xl font-bold text-ink" whileHover={{ scale: 1.1, x: 3 }}>{number}</motion.p>
            <motion.p className="mt-2 text-sm font-bold text-ink" whileHover={{ x: 4 }}>{label}</motion.p>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
