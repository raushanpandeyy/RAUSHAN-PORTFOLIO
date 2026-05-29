import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const driftPath = [
  { x: 0, y: 0 },
  { x: 40, y: -30 },
  { x: -30, y: 50 },
  { x: 50, y: 20 },
  { x: -40, y: -40 },
  { x: 0, y: 0 },
];

export default function FloatingBackButton({ onBack }) {
  const [visible, setVisible] = useState(false);
  const xRef = useRef(0);
  const yRef = useRef(0);
  const rafRef = useRef(null);
  const stepRef = useRef(0);
  const progressRef = useRef(0);

  const handleClick = useCallback(() => {
    if (onBack) onBack();
    else window.scrollTo({ top: 0, behavior: "smooth" });
  }, [onBack]);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!visible) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      return;
    }

    let startTime = performance.now();
    const duration = 5000;
    stepRef.current = 0;
    progressRef.current = 0;
    xRef.current = 0;
    yRef.current = 0;

    const el = document.getElementById("floating-back-btn");
    if (!el) return;

    const tick = (now) => {
      const elapsed = now - startTime;
      progressRef.current = Math.min(elapsed / duration, 1);
      const from = driftPath[stepRef.current];
      const to = driftPath[(stepRef.current + 1) % driftPath.length];
      const t = progressRef.current;
      const ease = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      xRef.current = from.x + (to.x - from.x) * ease;
      yRef.current = from.y + (to.y - from.y) * ease;
      el.style.transform = `translate(${xRef.current}px, ${yRef.current}px)`;

      if (progressRef.current >= 1) {
        stepRef.current = (stepRef.current + 1) % driftPath.length;
        startTime = now;
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [visible]);

  return (
    <motion.button
      id="floating-back-btn"
      onClick={handleClick}
      initial={{ opacity: 0, scale: 0 }}
      animate={visible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="fixed bottom-10 right-10 z-50 flex h-16 w-16 cursor-pointer items-center justify-center rounded-full border-2 border-coral bg-coral text-4xl text-white shadow-xl shadow-coral/40 backdrop-blur-md transition hover:border-coral hover:bg-white hover:text-coral hover:shadow-coral/60"
    >
      ↑
    </motion.button>
  );
}