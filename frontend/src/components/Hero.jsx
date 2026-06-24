import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useInView, AnimatePresence } from "framer-motion";
import DashboardMockup from "./DashboardMockup";
import { Play, ArrowRight } from "lucide-react";

function MagneticCTA({ children, onClick, variant = "primary", testId }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 20 });
  const sy = useSpring(y, { stiffness: 200, damping: 20 });

  const move = (e) => {
    if (!ref.current) return;
    const { width, height, left, top } = ref.current.getBoundingClientRect();
    x.set((e.clientX - (left + width / 2)) * 0.3);
    y.set((e.clientY - (top + height / 2)) * 0.3);
  };
  const leave = () => { x.set(0); y.set(0); };

  const base = "relative font-medium text-[14px] px-6 py-3.5 rounded-full cursor-pointer transition-all duration-200 flex items-center gap-2 select-none";
  const styles =
    variant === "primary"
      ? `${base} bg-zinc-950 text-white hover:bg-zinc-800 shadow-[0_2px_12px_rgba(0,0,0,0.18)]`
      : `${base} bg-white text-zinc-700 border border-zinc-200 hover:border-zinc-400 hover:text-zinc-900`;

  return (
    <motion.button
      ref={ref}
      style={{ x: sx, y: sy }}
      onMouseMove={move}
      onMouseLeave={leave}
      onClick={onClick}
      className={styles}
      data-testid={testId}
      whileTap={{ scale: 0.97 }}
    >
      {children}
    </motion.button>
  );
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 22, scale: 0.98 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { type: "spring", stiffness: 90, damping: 18 },
  },
};

export default function Hero({ onRequestAccess }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [demoHovered, setDemoHovered] = useState(false);

  return (
    <section
      className="relative min-h-screen flex flex-col items-center pt-32 pb-16 px-6 overflow-hidden"
      style={{
        background: `
          radial-gradient(ellipse 90% 60% at 12% 40%, rgba(0,0,0,0.022) 0%, transparent 70%),
          radial-gradient(ellipse 70% 50% at 88% 15%, rgba(0,0,0,0.028) 0%, transparent 65%),
          radial-gradient(ellipse 50% 45% at 55% 85%, rgba(0,0,0,0.015) 0%, transparent 70%),
          #ffffff
        `,
      }}
      data-testid="hero-section"
    >
      {/* Dot grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.055) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
          maskImage: "radial-gradient(ellipse 85% 60% at 50% 50%, black 0%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 85% 60% at 50% 50%, black 0%, transparent 100%)",
        }}
      />

      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto"
      >
        {/* Eyebrow */}
        <motion.div variants={itemVariants} className="mb-7">
          <span
            className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-400 border border-zinc-200 rounded-full px-4 py-1.5"
            style={{ background: "rgba(255,255,255,0.8)", backdropFilter: "blur(12px)" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 inline-block" />
            Early Access // v1.0
          </span>
        </motion.div>

        {/* H1 */}
        <motion.h1
          variants={itemVariants}
          className="font-sans font-extrabold tracking-tighter leading-[1.04] text-zinc-950 mb-5"
          style={{ fontSize: "clamp(40px, 7vw, 76px)" }}
        >
          The First Ever Real
          <br />
          <span className="text-zinc-400">CRM For Powersports.</span>
        </motion.h1>

        {/* Subhead */}
        <motion.p
          variants={itemVariants}
          className="font-sans font-medium text-lg md:text-xl tracking-tight text-zinc-500 mb-3"
        >
          Engineered for speed, built for dealerships.
        </motion.p>

        {/* Body */}
        <motion.p
          variants={itemVariants}
          className="font-sans text-base text-zinc-400 font-light max-w-lg leading-relaxed mb-10"
        >
          Track leads, manage inventory, and close deals — all in one pristine platform designed exclusively for motorcycle and powersports retailers.
        </motion.p>

        {/* CTA Group */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-3">
          <MagneticCTA
            onClick={onRequestAccess}
            variant="primary"
            testId="hero-cta-primary"
          >
            Request Access
            <ArrowRight size={14} strokeWidth={2.5} />
          </MagneticCTA>
          <MagneticCTA
            onClick={() => document.getElementById("capabilities")?.scrollIntoView({ behavior: "smooth" })}
            variant="secondary"
            testId="hero-cta-secondary"
          >
            <div
              className="w-6 h-6 rounded-full bg-zinc-100 flex items-center justify-center"
              onMouseEnter={() => setDemoHovered(true)}
              onMouseLeave={() => setDemoHovered(false)}
            >
              <Play size={9} fill="currentColor" className="text-zinc-600 ml-0.5" />
            </div>
            Watch Demo
          </MagneticCTA>
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          variants={itemVariants}
          className="flex items-center gap-6 mt-9"
        >
          {[
            { value: "400+", label: "Dealerships" },
            { value: "98%", label: "Retention" },
            { value: "48h", label: "Onboarding" },
          ].map(({ value, label }) => (
            <div key={label} className="flex flex-col items-center">
              <span className="font-mono text-[13px] font-medium text-zinc-700">{value}</span>
              <span className="font-mono text-[9px] text-zinc-400 uppercase tracking-[0.15em]">{label}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Dashboard Mockup */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.9, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="relative z-10 w-full max-w-5xl mx-auto mt-16 px-0 md:px-6"
        data-testid="hero-dashboard-container"
      >
        <DashboardMockup />
      </motion.div>
    </section>
  );
}
