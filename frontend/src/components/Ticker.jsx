import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const integrations = [
  { name: "CDK Global", style: "font-extrabold text-zinc-300 tracking-tighter" },
  { name: "Lightspeed", style: "font-light text-zinc-400 italic tracking-wide" },
  { name: "Elead", style: "font-bold text-zinc-300 uppercase tracking-[0.1em]" },
  { name: "DealerSocket", style: "font-medium text-zinc-400 tracking-tight" },
  { name: "Reynolds & Reynolds", style: "font-light text-zinc-300 tracking-wide" },
  { name: "Dealertrack", style: "font-extrabold text-zinc-300 tracking-tighter" },
  { name: "RouteOne", style: "font-medium text-zinc-400 uppercase tracking-[0.08em]" },
  { name: "PBS Systems", style: "font-light text-zinc-300 italic" },
  { name: "VinSolutions", style: "font-bold text-zinc-400 tracking-tight" },
  { name: "Darwin Automotive", style: "font-light text-zinc-300 tracking-wider" },
];

// Duplicate for seamless loop
const allItems = [...integrations, ...integrations];

export default function Ticker() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <section
      className="py-20 border-t border-zinc-900/[0.05] overflow-hidden"
      style={{ background: "#fafafa" }}
      ref={ref}
      data-testid="ticker-section"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-10">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center"
        >
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-300 mb-2">
            Trusted by teams running on
          </div>
          <p className="font-sans text-[13px] text-zinc-400 font-light">
            APEX integrates with the platforms your dealership already depends on.
          </p>
        </motion.div>
      </div>

      {/* Gradient masks */}
      <div className="relative">
        <div
          className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
          style={{ background: "linear-gradient(90deg, #fafafa 0%, transparent 100%)" }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
          style={{ background: "linear-gradient(270deg, #fafafa 0%, transparent 100%)" }}
        />

        {/* Ticker strip */}
        <div className="overflow-hidden">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              duration: 28,
              repeat: Infinity,
              ease: "linear",
            }}
            className="flex items-center gap-16 whitespace-nowrap"
            style={{ width: "max-content" }}
            data-testid="ticker-strip"
          >
            {allItems.map((item, i) => (
              <div
                key={`${item.name}-${i}`}
                className={`font-sans text-[18px] select-none flex-shrink-0 ${item.style}`}
              >
                {item.name}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
