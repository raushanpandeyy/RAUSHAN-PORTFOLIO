import { lazy, Suspense, useCallback, useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import PortfolioCanvas from "../components/ui3d/PortfolioCanvas";
import NavCubeCanvas from "../components/cube/NavCubeCanvas";
import FloatingBackButton from "../components/common/FloatingBackButton";
import Loader from "../components/common/Loader";
import usePrefersReducedMotion from "../hooks/usePrefersReducedMotion";

const Home = lazy(() => import("../pages/Home"));
const About = lazy(() => import("../sections/About/AboutSection"));
const Projects = lazy(() => import("../sections/Projects/ProjectsSection"));
const Skills = lazy(() => import("../sections/Skills/SkillsSection"));
const Resume = lazy(() => import("../sections/Experience/ResumeSection"));
const Contact = lazy(() => import("../sections/Contact/ContactSection"));
const Blog = lazy(() => import("../sections/Blog/BlogSection"));

const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "resume", label: "Resume" },
  { id: "blog", label: "Blog" },
  { id: "contact", label: "Contact" },
];

const pageMap = {
  home: Home,
  about: About,
  projects: Projects,
  skills: Skills,
  resume: Resume,
  blog: Blog,
  contact: Contact,
};

const pages = navItems.map((item) => ({
  ...item,
  Component: pageMap[item.id],
}));

export default function App() {
  const [activated, setActivated] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [reducedScene, setReducedScene] = useState(false);
  const cursorX = useSpring(useMotionValue(-200), { stiffness: 120, damping: 24, mass: 0.2 });
  const cursorY = useSpring(useMotionValue(-200), { stiffness: 120, damping: 24, mass: 0.2 });
  const reducedMotion = usePrefersReducedMotion();
  const playTap = useCallback(() => {
    if (reducedMotion) return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const context = new AudioContext();
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(520, context.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(780, context.currentTime + 0.08);
    gain.gain.setValueAtTime(0.0001, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.035, context.currentTime + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.16);
    oscillator.connect(gain).connect(context.destination);
    oscillator.start();
    oscillator.stop(context.currentTime + 0.18);
  }, [reducedMotion]);

  const activate = useCallback(() => {
    playTap();
    setActivated(true);
  }, [playTap]);

  const selectSection = useCallback((section) => {
    playTap();
    setActivated(true);
    setActiveSection(section);
    window.setTimeout(() => {
      document.getElementById(section)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
  }, [playTap]);

  useEffect(() => {
    if (!activated) return undefined;

    let snapGuard = false;
    const handleWheel = (e) => {
      if (snapGuard) return;
      if (e.deltaY < 0 && window.scrollY <= 500) {
        snapGuard = true;
        window.scrollTo({ top: 0, behavior: "smooth" });
        setTimeout(() => { snapGuard = false; }, 500);
      }
    };
    let touchStartY = 0;
    let touchStartScrollY = 0;
    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
      touchStartScrollY = window.scrollY;
    };
    const handleTouchEnd = (e) => {
      const deltaY = e.changedTouches[0].clientY - touchStartY;
      if (touchStartScrollY <= 0 && deltaY > 120) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };
    window.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActiveSection(visible.target.id);
      },
      { threshold: [0.28, 0.45, 0.62], rootMargin: "-24% 0px -45% 0px" },
    );
    pages.forEach((page) => {
      const node = document.getElementById(page.id);
      if (node) observer.observe(node);
    });
    return () => {
      observer.disconnect();
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [activated]);

  return (
    <main
      className="relative min-h-screen overflow-x-hidden bg-white text-ink"
      onPointerMove={(event) => {
        cursorX.set(event.clientX);
        cursorY.set(event.clientY);
      }}
    >
      <motion.div
        className="cursor-glow pointer-events-none fixed z-30 hidden h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full lg:block"
        style={{ x: cursorX, y: cursorY }}
      />
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute inset-0 scanline opacity-35" />
        <div className="light-ray left-[12%] top-[-12%]" />
        <div className="light-ray right-[18%] top-[18%]" />
        <div className="absolute bottom-0 left-0 h-64 w-full bg-gradient-to-t from-slate-50/95 via-slate-50/45 to-transparent" />
      </div>

      <section className="fixed inset-0 z-10">
        <PortfolioCanvas
          activated={activated}
          onActivate={activate}
          onDeclinePerformance={() => setReducedScene(true)}
          reducedMotion={reducedMotion}
        />
      </section>

      <motion.div
        className="pointer-events-none fixed inset-0 z-[15] bg-black"
        animate={{ opacity: activated ? 0.55 : 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      />

      <NavCubeCanvas
        navItems={navItems}
        activeSection={activeSection}
        onSelect={selectSection}
        activated={activated}
      />

      <motion.div
        className="pointer-events-none fixed inset-x-0 bottom-9 z-20 mx-auto flex max-w-4xl flex-col items-center px-5 text-center"
        animate={{ opacity: activated ? 0 : 1, y: activated ? 20 : 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.p
          className="mb-5 rounded-full border border-coral/40 bg-white/75 px-4 py-2 text-xs font-bold uppercase tracking-[0.32em] text-cyan-700 shadow-coral"
          animate={{ opacity: [0.55, 1, 0.55], scale: [1, 1.035, 1] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
          whileHover={{ scale: 1.08, y: -3 }}
        >
          Touch the cube
        </motion.p>
        <motion.h1
          className="text-balance text-4xl font-bold tracking-normal text-ink drop-shadow-[0_12px_28px_rgba(6,52,61,0.22)] sm:text-6xl"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.8 }}
          whileHover={{ scale: 1.03, y: -4 }}
        >
          Raushan Pandey
        </motion.h1>
        <motion.div
          className="mt-4 flex flex-wrap justify-center gap-2 text-sm font-bold text-slate-700 sm:text-base"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.8 }}
          whileHover={{ y: -3 }}
        >
          {["Full Stack Developer", "Founder of Cravzo", "React Developer", "AI Enthusiast"].map((label) => (
            <motion.span
              key={label}
              className="rounded-full border border-cyan-200 bg-white/70 px-3 py-1 shadow-sm inline-block"
              whileHover={{ scale: 1.1, y: -4 }}
            >
              {label}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>

      {activated && (
        <div className="pointer-events-none relative z-20 px-4 pb-20 pt-40 sm:px-6 lg:px-8">
          <Suspense fallback={<Loader />}>
            {pages.map(({ id, Component }, index) => (
              <motion.section
                id={id}
                key={id}
                className="pointer-events-auto min-h-screen scroll-mt-36 py-12 sm:py-16"
                initial={{ opacity: 0, y: 44 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.22 }}
                transition={{ duration: 0.65, delay: Math.min(index * 0.04, 0.18), ease: [0.22, 1, 0.36, 1] }}
              >
                <Component reducedScene={reducedScene} onNavigate={selectSection} />
              </motion.section>
            ))}
          </Suspense>
        </div>
      )}

      <FloatingBackButton onBack={() => { setActivated(false); window.scrollTo({ top: 0, behavior: "smooth" }); }} />
    </main>
  );
}
