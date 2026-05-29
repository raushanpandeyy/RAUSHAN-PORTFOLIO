import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Markdown from "react-markdown";
import GlassCard from "../../components/common/GlassCard";
import SectionShell from "../../components/common/SectionShell";
import blogs from "../../data/blogs";

export default function BlogSection() {
  const [selected, setSelected] = useState(null);

  return (
    <SectionShell
      eyebrow="Blog"
      title="Thoughts & build logs."
      copy="Things I learn while building — from full-stack decisions to design choices."
    >
      <div className="grid gap-6 md:grid-cols-2">
        {blogs.map((blog, index) => (
          <motion.div
            key={blog.id}
            onClick={() => setSelected(blog)}
            role="button"
            tabIndex={0}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") setSelected(blog);
            }}
            className="group cursor-pointer text-left"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08, duration: 0.5 }}
            whileHover={{ y: -8, scale: 1.01 }}
          >
            <GlassCard className="p-6">
              <div className="mb-3 flex items-center gap-3 text-xs font-bold text-cyan-300">
                <span>{blog.date}</span>
                <span>·</span>
                <span>{blog.readTime}</span>
              </div>
              <motion.h3 className="text-2xl font-bold text-black" whileHover={{ x: 3 }}>{blog.title}</motion.h3>
              <motion.p className="mt-3 font-bold leading-7 text-black" whileHover={{ x: 2 }}>{blog.excerpt}</motion.p>
              <div className="mt-4 flex flex-wrap gap-2">
                {blog.tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-coral/30 bg-coral/10 px-3 py-1 text-xs font-bold text-coral">
                    {tag}
                  </span>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/60 px-4 py-12 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              className="relative w-full max-w-3xl rounded-xl bg-white p-8 shadow-2xl"
              initial={{ scale: 0.92, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 20, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onClick={(event) => event.stopPropagation()}
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-cyan-100 text-lg font-bold text-cyan-700 transition hover:bg-coral hover:text-white"
              >
                ✕
              </button>
              <div className="mb-3 flex items-center gap-3 text-xs font-bold text-cyan-400">
                <span>{selected.date}</span>
                <span>·</span>
                <span>{selected.readTime}</span>
              </div>
              <h2 className="text-3xl font-bold text-black">{selected.title}</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {selected.tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-coral/30 bg-coral/10 px-3 py-1 text-xs font-bold text-coral">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="prose prose-lg prose-headings:font-bold prose-headings:text-black prose-p:font-bold prose-p:text-black prose-a:text-coral prose-a:no-underline hover:prose-a:underline prose-strong:text-black prose-code:rounded prose-code:bg-cyan-50 prose-code:px-1.5 prose-code:py-0.5 prose-code:text-sm prose-code:font-bold prose-code:text-cyan-700 prose-pre:rounded-lg prose-pre:bg-slate-900 prose-pre:text-sm mt-6 max-w-none">
                <Markdown>{selected.content}</Markdown>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </SectionShell>
  );
}