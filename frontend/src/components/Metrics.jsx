import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";

function CountUp({ target, prefix = "", suffix = "", duration = 2200 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const startTime = performance.now();
    let rafId;

    const tick = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setValue(Math.round(eased * target));
      if (progress < 1) rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [isInView, target, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}{value}{suffix}
    </span>
  );
}

const metrics = [
  {
    prefix: "+",
    value: 38,
    suffix: "%",
    label: "Closing Rate",
    subtext: "Avg. improvement across all active dealerships in Year 1.",
    mono: true,
  },
  {
    prefix: "-",
    value: 45,
    suffix: "m",
    label: "Response Time",
    subtext: "Reduction from first inbound contact to live conversation.",
    mono: true,
  },
  {
    prefix: "",
    value: 100,
    suffix: "%",
    label: "Inventory Control",
    subtext: "Real-time floor sync. No batch delays, no data drift.",
    mono: true,
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 90, damping: 18 } },
};

export default function Metrics() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section
      className="py-20 md:py-28 border-y border-zinc-900/[0.06]"
      style={{ background: "linear-gradient(180deg, #fafafa 0%, #ffffff 100%)" }}
      data-testid="metrics-section"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-0 md:divide-x md:divide-zinc-900/[0.05]"
        >
          {metrics.map(({ prefix, value, suffix, label, subtext }) => (
            <motion.div
              key={label}
              variants={itemVariants}
              className="flex flex-col gap-3 px-8 md:px-12 py-8 md:py-4 border-b md:border-b-0 border-zinc-900/[0.05] last:border-b-0 first:pl-0 last:pr-0"
              data-testid={`metric-${label.toLowerCase().replace(/\s+/g, "-")}`}
            >
              {/* Number */}
              <div className="font-mono font-medium text-zinc-950" style={{ fontSize: "clamp(42px, 5vw, 58px)", letterSpacing: "-0.03em", lineHeight: 1 }}>
                <CountUp target={value} prefix={prefix} suffix={suffix} />
              </div>

              {/* Label */}
              <div>
                <div className="font-sans font-semibold text-zinc-800 text-[15px] tracking-tight mb-1">
                  {label}
                </div>
                <p className="font-sans text-[13px] text-zinc-400 font-light leading-relaxed">
                  {subtext}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
