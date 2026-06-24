import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Check, Minus } from "lucide-react";

const rows = [
  {
    feature: "Lead Response Time",
    legacy: "~4.2 hrs avg.",
    apex: "< 30 seconds",
    gain: "506× faster",
  },
  {
    feature: "Dashboard Load Time",
    legacy: "8.4s initial load",
    apex: "0.6s on cold start",
    gain: "−93% latency",
  },
  {
    feature: "Inventory Synchronization",
    legacy: "24hr batch cycle",
    apex: "Real-time, live",
    gain: "Continuous",
  },
  {
    feature: "Mobile Experience",
    legacy: "Degraded / partial",
    apex: "Full feature parity",
    gain: "+100% coverage",
  },
  {
    feature: "Predictive Analytics",
    legacy: "None / manual reports",
    apex: "Built-in AI engine",
    gain: "Integrated",
  },
  {
    feature: "API Extensibility",
    legacy: "Proprietary, locked",
    apex: "Open REST API",
    gain: "Full access",
  },
  {
    feature: "Dealer Onboarding",
    legacy: "6–8 weeks",
    apex: "48 hours",
    gain: "−85% time",
  },
  {
    feature: "Support Response SLA",
    legacy: "72+ hours",
    apex: "< 4 hours",
    gain: "−94% wait",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const rowVariants = {
  hidden: { opacity: 0, x: -12 },
  visible: {
    opacity: 1, x: 0,
    transition: { type: "spring", stiffness: 100, damping: 20 },
  },
};

export default function Comparison() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      className="py-24 md:py-36 border-t border-zinc-900/[0.05]"
      style={{ background: "#ffffff" }}
      data-testid="comparison-section"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="mb-16"
        >
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-400 mb-4">
            Architecture Comparison
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2
              className="font-sans font-extrabold tracking-tighter text-zinc-950 leading-tight"
              style={{ fontSize: "clamp(30px, 4.5vw, 48px)" }}
            >
              Zero-latency vs. legacy.
            </h2>
            <p className="font-sans text-zinc-400 font-light text-sm md:text-base max-w-xs leading-relaxed">
              Every specification, side by side. The data speaks for itself.
            </p>
          </div>
        </motion.div>

        {/* Table */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            border: "1px solid rgba(0,0,0,0.06)",
            boxShadow: "0 4px 32px rgba(0,0,0,0.04)",
          }}
        >
          {/* Column Headers */}
          <div className="grid grid-cols-12 bg-zinc-50 border-b border-zinc-100">
            <div className="col-span-4 px-6 py-4">
              <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-zinc-300">Specification</span>
            </div>
            <div className="col-span-3 px-6 py-4 border-l border-zinc-100">
              <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-zinc-400 mb-0.5">Legacy Stack</div>
              <div className="font-sans text-[10px] text-zinc-300 font-light">CDK · DealerSocket · Elead</div>
            </div>
            <div className="col-span-3 px-6 py-4 border-l border-zinc-100"
              style={{ background: "rgba(9,9,11,0.02)" }}
            >
              <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-zinc-900 mb-0.5">APEX CRM</div>
              <div className="font-sans text-[10px] text-zinc-400 font-light">Current version</div>
            </div>
            <div className="col-span-2 px-6 py-4 border-l border-zinc-100">
              <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-zinc-300">Delta</span>
            </div>
          </div>

          {/* Rows */}
          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {rows.map(({ feature, legacy, apex, gain }, i) => (
              <motion.div
                key={feature}
                variants={rowVariants}
                className={`grid grid-cols-12 border-b last:border-0 border-zinc-50 hover:bg-zinc-50/60 transition-colors duration-150 ${
                  i % 2 === 0 ? "" : "bg-white"
                }`}
                data-testid={`comparison-row-${i}`}
              >
                {/* Feature */}
                <div className="col-span-4 px-6 py-4 flex items-center">
                  <span className="font-sans font-medium text-[13px] text-zinc-700 tracking-tight">
                    {feature}
                  </span>
                </div>

                {/* Legacy */}
                <div className="col-span-3 px-6 py-4 border-l border-zinc-100/80 flex items-center gap-2">
                  <Minus size={12} className="text-zinc-300 flex-shrink-0" strokeWidth={2} />
                  <span className="font-mono text-[12px] text-zinc-400 line-through decoration-zinc-200">
                    {legacy}
                  </span>
                </div>

                {/* APEX */}
                <div
                  className="col-span-3 px-6 py-4 border-l border-zinc-100/80 flex items-center gap-2"
                  style={{ background: "rgba(9,9,11,0.018)" }}
                >
                  <Check size={12} className="text-zinc-800 flex-shrink-0" strokeWidth={2.5} />
                  <span className="font-mono text-[12px] text-zinc-900 font-medium">
                    {apex}
                  </span>
                </div>

                {/* Gain */}
                <div className="col-span-2 px-6 py-4 border-l border-zinc-100/80 flex items-center">
                  <span className="font-mono text-[11px] font-semibold text-zinc-900 bg-zinc-100 px-2 py-1 rounded-md">
                    {gain}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-6 font-mono text-[10px] text-zinc-300 text-center uppercase tracking-wider"
        >
          Data based on avg. performance across 400+ active dealerships · 2024 benchmark
        </motion.p>
      </div>
    </section>
  );
}
