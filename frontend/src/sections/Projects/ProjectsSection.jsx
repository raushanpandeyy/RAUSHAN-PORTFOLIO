import { useState } from "react";
import { motion } from "framer-motion";
import GlassCard from "../../components/common/GlassCard";
import SectionShell from "../../components/common/SectionShell";

const projects = [
  {
    name: "cravzo.shop",
    stack: ["React", "Node.js", "MongoDB", "E-commerce", "Product Design"],
    live: "https://cravzo.shop",
    problem: "A modern shop needs to feel trustworthy, fast, and simple from the first tap, especially on mobile.",
    solution: "Cravzo is built as a clean product-led commerce experience with polished UI, focused browsing, and scalable full stack foundations.",
    impact: "The project positions Raushan as a founder-developer who can build not just screens, but a real product experience.",
    description: "Founder-led e-commerce project with a premium interface, clean product flow, and full stack thinking.",
    detail: "Cravzo.shop is the main flagship project: a founder-led commerce platform focused on mobile-first usability, sharp visual presentation, and a product experience that can grow into a real brand.",
  },
];

export default function ProjectsSection() {
  const [activeProject, setActiveProject] = useState(projects[0]);

  return (
    <SectionShell eyebrow="Projects" title="The flagship build: Cravzo.shop." copy="One strong project presented like a case study, with problem, solution, impact, tech stack, and live access.">
      <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <GlassCard className="p-6">
          <motion.p className="text-xs font-bold uppercase tracking-[0.28em] text-cyan-300" whileHover={{ x: 4 }}>Case Study</motion.p>
          <motion.h3 className="mt-2 text-3xl font-bold text-black" whileHover={{ x: 3 }}>{activeProject.name}</motion.h3>
          <motion.p className="mt-3 font-bold leading-7 text-black" whileHover={{ x: 2 }}>{activeProject.description}</motion.p>
          <div className="mt-5 grid gap-3 text-sm font-bold leading-6 text-black">
            <motion.p whileHover={{ x: 3 }}><span className="font-semibold text-black">Problem:</span> {activeProject.problem}</motion.p>
            <motion.p whileHover={{ x: 3 }}><span className="font-semibold text-black">Solution:</span> {activeProject.solution}</motion.p>
            <motion.p whileHover={{ x: 3 }}><span className="font-semibold text-black">Impact:</span> {activeProject.impact}</motion.p>
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            {activeProject.stack.map((tech) => (
              <motion.span key={tech} className="rounded-full border border-cyan-200 bg-white/75 px-3 py-1 text-xs font-bold text-black inline-block" whileHover={{ scale: 1.1, y: -3 }}>
                {tech}
              </motion.span>
            ))}
          </div>
          <motion.a
            href={activeProject.live}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex rounded-md bg-coral px-5 py-3 font-bold text-black shadow-coral transition hover:-translate-y-0.5"
            whileHover={{ x: 3 }}
          >
            Open Live Site →
          </motion.a>
        </GlassCard>

        <GlassCard className="flex flex-col overflow-hidden p-0">
          <div className="flex items-center gap-2 border-b border-cyan-200 bg-white/90 px-4 py-2.5">
            <div className="flex gap-1.5">
              <div className="h-3 w-3 rounded-full bg-red-400" />
              <div className="h-3 w-3 rounded-full bg-yellow-400" />
              <div className="h-3 w-3 rounded-full bg-green-400" />
            </div>
            <div className="ml-3 flex-1 truncate rounded bg-cyan-50 px-3 py-1 text-xs text-cyan-700">https://{activeProject.name}</div>
          </div>
          <div className="relative flex-1 bg-white">
            <iframe
              src={activeProject.live}
              className="h-[500px] w-full"
              title={activeProject.name}
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
              loading="lazy"
            />
          </div>
        </GlassCard>
      </div>

      <div className="mt-8">
        <motion.p className="mb-4 text-xs font-bold uppercase tracking-[0.32em] text-cyan-300" whileHover={{ x: 5 }}>Projects</motion.p>
        <div className="flex flex-wrap gap-3">
          {projects.map((project, index) => (
            <motion.button
              key={project.name}
              onClick={() => setActiveProject(project)}
              className={`rounded-lg border px-6 py-3 text-center font-bold shadow-lg transition ${
                activeProject.name === project.name
                  ? "border-coral bg-coral/20 text-ink shadow-coral"
                  : "border-cyan-200 bg-white/95 text-ink"
              }`}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              whileHover={{ scale: 1.06, y: -4 }}
              whileTap={{ scale: 0.94 }}
            >
              {project.name}
            </motion.button>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
