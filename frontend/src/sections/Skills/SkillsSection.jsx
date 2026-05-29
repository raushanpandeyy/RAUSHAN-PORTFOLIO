import { motion } from "framer-motion";
import SectionShell from "../../components/common/SectionShell";

const categories = [
  ["Frontend", [["React", 92], ["JavaScript", 90], ["Tailwind", 88]]],
  ["Backend", [["Node.js", 84], ["Express", 82], ["REST APIs", 86]]],
  ["Database", [["MongoDB", 82], ["PostgreSQL", 74]]],
  ["AI", [["Voice AI", 78], ["Automation", 80], ["Prompting", 84]]],
  ["Languages", [["Java", 78], ["C", 70], ["Python", 82]]],
];

function SkillCube({ name, level, index }) {
  return (
    <motion.div
      className="preserve-3d relative aspect-square min-h-28 rounded-lg border border-cyan-200 bg-white/95 p-4 shadow-neon"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ delay: index * 0.035 }}
      whileHover={{ rotateX: 18, rotateY: -22, scale: 1.06 }}
    >
      <div className="absolute inset-0 rounded-lg bg-[radial-gradient(circle_at_30%_20%,rgba(18,214,197,0.25),transparent_35%),radial-gradient(circle_at_75%_80%,rgba(6,182,212,0.28),transparent_42%)]" />
      <div className="relative z-10 flex h-full flex-col justify-between">
        <motion.h4 className="text-base font-bold text-ink" whileHover={{ x: 4, scale: 1.05 }}>{name}</motion.h4>
        <div>
          <div className="mb-2 h-1.5 overflow-hidden rounded-full bg-cyan-100">
            <motion.div className="h-full rounded-full bg-gradient-to-r from-coral to-plasma" initial={{ width: 0 }} whileInView={{ width: `${level}%` }} viewport={{ once: true }} />
          </div>
          <p className="text-xs font-bold text-ink">{level}% proficiency</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function SkillsSection() {
  let skillIndex = 0;
  return (
    <SectionShell eyebrow="Skills" title="A cube wall of practical tools." copy="Grouped by the way projects actually get built: interface, server, data, AI, and core programming.">
      <div className="grid gap-5 lg:grid-cols-5">
        {categories.map(([category, skills]) => (
          <div key={category} className="glass-panel rounded-lg p-4">
            <motion.h3 className="mb-4 text-lg font-bold text-cyan-300" whileHover={{ x: 5 }}>{category}</motion.h3>
            <div className="grid gap-3">
              {skills.map(([name, level]) => {
                skillIndex += 1;
                return <SkillCube key={name} name={name} level={level} index={skillIndex} />;
              })}
            </div>
          </div>
        ))}
      </div>
    </SectionShell>
  );
}
