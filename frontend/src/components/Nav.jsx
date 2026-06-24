import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

function MagneticButton({ children, className, onClick, "data-testid": testId, type = "button" }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 22 });
  const springY = useSpring(y, { stiffness: 220, damping: 22 });

  const onMove = (e) => {
    if (!ref.current) return;
    const { width, height, left, top } = ref.current.getBoundingClientRect();
    x.set((e.clientX - (left + width / 2)) * 0.28);
    y.set((e.clientY - (top + height / 2)) * 0.28);
  };
  const onLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.button
      ref={ref}
      type={type}
      style={{ x: springX, y: springY }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={onClick}
      className={className}
      data-testid={testId}
    >
      {children}
    </motion.button>
  );
}

export default function Nav({ onRequestAccess }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "Capabilities", href: "#capabilities" },
    { label: "Compare", href: "#compare" },
    { label: "Integrations", href: "#integrations" },
  ];

  return (
    <motion.nav
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-5 pointer-events-none"
      data-testid="navigation"
    >
      <div
        className={`flex items-center gap-7 px-6 py-2.5 rounded-full pointer-events-auto transition-all duration-500 ${
          scrolled
            ? "bg-white/92 backdrop-blur-2xl border border-zinc-900/[0.08] shadow-[0_4px_24px_rgba(0,0,0,0.06)]"
            : "bg-white/75 backdrop-blur-xl border border-zinc-900/[0.05] shadow-sm"
        }`}
      >
        {/* Logo */}
        <div className="flex items-center gap-1 select-none">
          <span className="font-sans font-extrabold text-[17px] tracking-tighter text-zinc-950 leading-none">
            APEX
          </span>
          <span className="font-mono text-[9px] font-medium text-zinc-300 uppercase tracking-[0.18em] leading-none mt-0.5 ml-0.5">
            CRM
          </span>
        </div>

        {/* Links */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-[13px] font-medium text-zinc-400 hover:text-zinc-900 transition-colors duration-200"
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* Divider */}
        <div className="hidden md:block w-px h-4 bg-zinc-200" />

        {/* CTA */}
        <MagneticButton
          data-testid="nav-request-access-button"
          onClick={onRequestAccess}
          className="bg-zinc-950 text-white text-[13px] font-medium px-5 py-2 rounded-full hover:bg-zinc-800 transition-colors duration-200 cursor-pointer"
        >
          Request Access
        </MagneticButton>
      </div>
    </motion.nav>
  );
}
