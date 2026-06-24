import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useInView } from "framer-motion";
import { ArrowRight, Zap, Grid, Clock } from "lucide-react";

/* ─── Tilt + Light Sweep Card ──────────────────────────────────────────── */
function TiltCard({ children, className, style }) {
  const ref = useRef(null);
  const rotX = useMotionValue(0);
  const rotY = useMotionValue(0);
  const sRotX = useSpring(rotX, { stiffness: 160, damping: 22 });
  const sRotY = useSpring(rotY, { stiffness: 160, damping: 22 });
  const [light, setLight] = useState({ x: 50, y: 50 });
  const [hovered, setHovered] = useState(false);

  const onMove = (e) => {
    if (!ref.current) return;
    const { width, height, left, top } = ref.current.getBoundingClientRect();
    const nx = (e.clientX - left) / width;
    const ny = (e.clientY - top) / height;
    rotX.set((ny - 0.5) * -8);
    rotY.set((nx - 0.5) * 8);
    setLight({ x: nx * 100, y: ny * 100 });
  };
  const onLeave = () => {
    rotX.set(0); rotY.set(0);
    setHovered(false);
  };
  const onEnter = () => setHovered(true);

  return (
    <motion.div
      ref={ref}
      style={{ rotateX: sRotX, rotateY: sRotY, transformPerspective: 900, ...style }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onMouseEnter={onEnter}
      className={`relative overflow-hidden ${className}`}
    >
      {/* Light sweep */}
      <div
        className="absolute inset-0 pointer-events-none rounded-[inherit] transition-opacity duration-300"
        style={{
          opacity: hovered ? 1 : 0,
          background: `radial-gradient(circle at ${light.x}% ${light.y}%, rgba(255,255,255,0.45) 0%, transparent 60%)`,
        }}
      />
      {children}
    </motion.div>
  );
}

/* ─── Lead Routing Visual ──────────────────────────────────────────────── */
function LeadRoutingVisual() {
  const stages = [
    { label: "Inbound", sub: "All channels" },
    { label: "Score", sub: "AI-ranked" },
    { label: "Route", sub: "Instant assign" },
    { label: "Close", sub: "Tracked live" },
  ];
  const scores = [
    { range: "81–100", tier: "HOT", rep: "Senior Rep", w: "90%" },
    { range: "60–80", tier: "WARM", rep: "Round Robin", w: "70%" },
    { range: "0–59", tier: "NEW", rep: "Nurture Seq.", w: "45%" },
  ];

  return (
    <div className="mt-6 space-y-5">
      {/* Pipeline */}
      <div className="flex items-center gap-0">
        {stages.map((s, i) => (
          <div key={s.label} className="flex items-center flex-1">
            <div className="flex-1 text-center">
              <div className="inline-flex flex-col items-center gap-1.5 bg-zinc-50 border border-zinc-100 rounded-xl px-4 py-2.5 w-full">
                <span className="font-sans font-semibold text-[12px] text-zinc-800 tracking-tight">{s.label}</span>
                <span className="font-mono text-[9px] text-zinc-400 uppercase tracking-wider">{s.sub}</span>
              </div>
            </div>
            {i < stages.length - 1 && (
              <div className="flex items-center justify-center w-6 flex-shrink-0">
                <ArrowRight size={10} className="text-zinc-300" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Score breakdown */}
      <div className="space-y-2">
        {scores.map(({ range, tier, rep, w }) => (
          <div key={tier} className="flex items-center gap-3">
            <span className="font-mono text-[9px] text-zinc-400 w-12 flex-shrink-0">{range}</span>
            <div className="flex-1 h-1.5 bg-zinc-100 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-zinc-800 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: w }}
                transition={{ delay: 0.4, duration: 1.2, ease: [0.21, 0.47, 0.32, 0.98] }}
              />
            </div>
            <span className={`font-mono text-[9px] font-semibold px-2 py-0.5 rounded-full ${tier === "HOT" ? "bg-zinc-900 text-white" : tier === "WARM" ? "bg-zinc-100 text-zinc-600" : "bg-zinc-50 text-zinc-400 border border-zinc-200"}`}>
              {tier}
            </span>
            <span className="font-mono text-[9px] text-zinc-400 w-20 flex-shrink-0">{rep}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Inventory Visual ─────────────────────────────────────────────────── */
function InventoryVisual() {
  const units = [
    { cat: "Motorcycles", count: 89, max: 120, label: "MC" },
    { cat: "ATVs / UTVs", count: 34, max: 60, label: "ATV" },
    { cat: "Watercraft", count: 24, max: 50, label: "PWC" },
  ];

  return (
    <div className="mt-6 space-y-4">
      {units.map(({ cat, count, max, label }) => (
        <div key={cat} className="space-y-1.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[9px] bg-zinc-100 text-zinc-500 px-1.5 py-0.5 rounded">{label}</span>
              <span className="font-sans text-[12px] font-medium text-zinc-700 tracking-tight">{cat}</span>
            </div>
            <span className="font-mono text-[12px] font-medium text-zinc-900">{count}</span>
          </div>
          <div className="h-1.5 bg-zinc-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-zinc-800 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(count / max) * 100}%` }}
              transition={{ delay: 0.3, duration: 1.1, ease: [0.21, 0.47, 0.32, 0.98] }}
            />
          </div>
        </div>
      ))}
      <div className="pt-3 border-t border-zinc-100 flex items-center justify-between">
        <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-wider">Floor Total</span>
        <span className="font-mono text-[18px] font-semibold text-zinc-900 tracking-tight">147 units</span>
      </div>
    </div>
  );
}

/* ─── Follow-Ups Timeline ──────────────────────────────────────────────── */
function FollowUpsVisual() {
  const steps = [
    { day: "Day 0", type: "SMS", msg: "Thanks for visiting. The Z900RS you looked at is still available — want to lock it in?" },
    { day: "Day 1", type: "Email", msg: "Following up on your recent inquiry. We have financing options tailored for you." },
    { day: "Day 3", type: "Call", msg: "Personal outreach from your assigned rep. Inventory moves fast." },
    { day: "Day 7", type: "SMS", msg: "One last opportunity — we have an end-of-month special on that unit." },
    { day: "Day 14", type: "Email", msg: "Clearance offer on units matching your interest. Expires in 48 hours." },
  ];

  return (
    <div className="mt-6 flex items-start gap-0 overflow-x-auto pb-2">
      {steps.map(({ day, type, msg }, i) => (
        <div key={day} className="flex items-start flex-shrink-0" style={{ minWidth: "170px" }}>
          <div className="flex flex-col gap-2 pr-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full border-2 border-zinc-900 bg-white flex-shrink-0" />
              {i < steps.length - 1 && (
                <div className="flex-1 h-px bg-zinc-200" style={{ width: "calc(100% - 12px)" }} />
              )}
            </div>
            <div className="pr-4">
              <div className="font-mono text-[9px] text-zinc-400 uppercase tracking-wider mb-1">{day}</div>
              <span className="font-mono text-[8px] bg-zinc-900 text-white px-1.5 py-0.5 rounded font-medium">{type}</span>
              <p className="font-sans text-[10px] text-zinc-500 mt-1.5 leading-relaxed line-clamp-3">{msg}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── Main Component ───────────────────────────────────────────────────── */
const cardVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 90, damping: 18 } },
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13 } },
};

const glassCard = {
  background: "rgba(255,255,255,0.80)",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  border: "1px solid rgba(0,0,0,0.06)",
  boxShadow: "0 4px 24px rgba(0,0,0,0.04), 0 1px 0 rgba(255,255,255,0.9) inset",
};

export default function Capabilities() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section
      className="py-24 md:py-36"
      style={{ background: "linear-gradient(180deg, #ffffff 0%, #fafafa 100%)" }}
      data-testid="capabilities-section"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="mb-14"
        >
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-400 mb-4">
            Core Systems
          </div>
          <h2 className="font-sans font-extrabold tracking-tighter text-zinc-950 leading-tight"
            style={{ fontSize: "clamp(30px, 4.5vw, 48px)" }}>
            Every tool your floor needs.
          </h2>
          <p className="font-sans text-zinc-400 font-light text-base md:text-lg mt-3 max-w-md leading-relaxed">
            Purpose-built modules that orchestrate the entire powersports sales cycle.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-12 gap-5"
        >
          {/* Card 1: Lead Routing – large */}
          <motion.div variants={cardVariants} className="md:col-span-7">
            <TiltCard
              className="h-full rounded-2xl p-7 md:p-8"
              style={glassCard}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="w-9 h-9 rounded-xl bg-zinc-900 flex items-center justify-center">
                  <Zap size={15} className="text-white" strokeWidth={2} />
                </div>
                <span className="font-mono text-[9px] text-zinc-300 uppercase tracking-wider">01 / Lead Routing</span>
              </div>
              <h3 className="font-sans font-bold text-[20px] tracking-tight text-zinc-900 mt-4">
                Intelligent Lead Routing
              </h3>
              <p className="font-sans text-[13px] text-zinc-400 font-light leading-relaxed mt-1.5 max-w-sm">
                Every inbound lead is instantly scored, tiered, and dispatched — zero manual triage required.
              </p>
              <LeadRoutingVisual />
            </TiltCard>
          </motion.div>

          {/* Card 2: Inventory Matrix – small */}
          <motion.div variants={cardVariants} className="md:col-span-5">
            <TiltCard
              className="h-full rounded-2xl p-7 md:p-8"
              style={glassCard}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="w-9 h-9 rounded-xl bg-zinc-100 flex items-center justify-center">
                  <Grid size={15} className="text-zinc-700" strokeWidth={1.5} />
                </div>
                <span className="font-mono text-[9px] text-zinc-300 uppercase tracking-wider">02 / Inventory</span>
              </div>
              <h3 className="font-sans font-bold text-[20px] tracking-tight text-zinc-900 mt-4">
                Inventory Matrix
              </h3>
              <p className="font-sans text-[13px] text-zinc-400 font-light leading-relaxed mt-1.5">
                Live floor sync across all categories, pricing tiers, and allocation pipelines.
              </p>
              <InventoryVisual />
            </TiltCard>
          </motion.div>

          {/* Card 3: Smart Follow-Ups – full width */}
          <motion.div variants={cardVariants} className="md:col-span-12">
            <TiltCard
              className="rounded-2xl p-7 md:p-8"
              style={glassCard}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="w-9 h-9 rounded-xl bg-zinc-100 flex items-center justify-center">
                  <Clock size={15} className="text-zinc-700" strokeWidth={1.5} />
                </div>
                <span className="font-mono text-[9px] text-zinc-300 uppercase tracking-wider">03 / Smart Follow-Ups</span>
              </div>
              <div className="md:flex md:items-start md:justify-between md:gap-12">
                <div className="md:max-w-xs">
                  <h3 className="font-sans font-bold text-[20px] tracking-tight text-zinc-900 mt-4">
                    Automated Follow-Up Engine
                  </h3>
                  <p className="font-sans text-[13px] text-zinc-400 font-light leading-relaxed mt-1.5">
                    A hyper-targeted sequence of texts, emails, and calls — triggered automatically to re-engage cold leads without any staff input.
                  </p>
                </div>
                <div className="flex-1 mt-4 md:mt-0">
                  <FollowUpsVisual />
                </div>
              </div>
            </TiltCard>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
