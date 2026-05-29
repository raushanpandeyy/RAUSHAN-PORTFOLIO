import { motion } from "framer-motion";
import GlassCard from "../../components/common/GlassCard";
import SectionShell from "../../components/common/SectionShell";

const cards = [
  ["Founder energy", "Cravzo is where I turn product instincts into real user experiences, balancing speed, design, and technical durability."],
  ["Web craft", "I enjoy React ecosystems, animated interfaces, API design, and the tiny details that make a product feel confident."],
  ["AI direction", "My next chapter blends developer tooling, assistants, and practical AI workflows into useful everyday software."],
];

export default function AboutSection() {
  return (
    <SectionShell
      eyebrow="About"
      title="A developer profile built around motion, product taste, and useful AI."
      copy="I work across the stack with a frontend-first eye, turning ambitious ideas into polished, responsive systems."
    >
      <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
        <GlassCard className="relative min-h-80 overflow-hidden p-7">
          <div className="absolute right-8 top-8 h-28 w-28 rounded-full border border-coral/40 bg-coral/20 blur-sm" />
          <div className="absolute bottom-8 left-8 h-32 w-32 rotate-45 border border-plasma/40 bg-plasma/15" />
          <motion.div
            className="relative z-10 mt-20 max-w-md"
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          >
            <motion.p className="text-2xl font-bold leading-9 text-black" whileHover={{ scale: 1.03, y: -4 }}>
              I build interfaces that feel alive without getting in the way of the work people came to do.
            </motion.p>
          </motion.div>
        </GlassCard>
        <div className="grid gap-4">
          {cards.map(([title, copy], index) => (
            <GlassCard key={title} delay={index * 0.08} className="p-6">
              <motion.h3 className="text-xl font-bold text-black" whileHover={{ x: 5, scale: 1.02 }}>{title}</motion.h3>
              <motion.p className="mt-3 font-bold leading-7 text-black" whileHover={{ x: 3 }}>{copy}</motion.p>
            </GlassCard>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
