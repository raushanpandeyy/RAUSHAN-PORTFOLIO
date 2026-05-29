import { motion } from "framer-motion";
import GlassCard from "../../components/common/GlassCard";
import MagneticButton from "../../components/common/MagneticButton";
import SectionShell from "../../components/common/SectionShell";

const timeline = [
  ["Founder", "Cravzo", "Building a product-led web platform with modern full stack foundations."],
  ["Developer", "React and Node ecosystem", "Crafting responsive applications, API flows, dashboards, and interactive experiences."],
  ["Resume", "Raushan Pandey", "Download the latest resume PDF directly from this portfolio."],
];

export default function ResumeSection() {
  return (
    <SectionShell eyebrow="Resume" title="A resume interface with a living timeline." copy="A concise snapshot of education, experience, and the skills powering this portfolio.">
      <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
        <GlassCard className="p-7">
          <motion.h3 className="text-2xl font-bold text-black" whileHover={{ x: 4 }}>Resume Capsule</motion.h3>
          <motion.p className="mt-4 font-bold leading-7 text-black" whileHover={{ x: 3 }}>
            Full stack developer and founder of Cravzo, focused on React, modern web products, clean backend flows, and AI-assisted software experiences.
          </motion.p>
          <MagneticButton
            as="a"
            href="/resume/Raushan-Pandey-Resume.pdf"
            download
            className="mt-7 inline-flex rounded-md bg-coral px-5 py-3 font-bold text-ink shadow-coral transition hover:-translate-y-0.5"
          >
            Download Resume
          </MagneticButton>
          <div className="mt-7 grid gap-3 text-sm font-bold text-black">
            <motion.p whileHover={{ x: 4 }}>Core: React, JavaScript, Node.js, Express</motion.p>
            <motion.p whileHover={{ x: 4 }}>Data: MongoDB, PostgreSQL</motion.p>
            <motion.p whileHover={{ x: 4 }}>AI: Voice interfaces, automation, assistant concepts</motion.p>
          </div>
        </GlassCard>
        <div className="relative grid gap-4 before:absolute before:left-4 before:top-2 before:h-[calc(100%-1rem)] before:w-px before:bg-gradient-to-b before:from-coral before:via-plasma before:to-transparent">
          {timeline.map(([role, place, copy], index) => (
            <GlassCard key={role} className="ml-10 p-5" delay={index * 0.08}>
              <div className="absolute -left-[1.9rem] mt-1 h-4 w-4 rounded-full border border-coral bg-white shadow-coral" />
              <motion.p className="text-xs font-bold uppercase tracking-[0.24em] text-cyan-300" whileHover={{ x: 5 }}>{role}</motion.p>
              <motion.h3 className="mt-2 text-xl font-bold text-black" whileHover={{ x: 3, scale: 1.02 }}>{place}</motion.h3>
              <motion.p className="mt-2 font-bold leading-7 text-black" whileHover={{ x: 2 }}>{copy}</motion.p>
            </GlassCard>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
