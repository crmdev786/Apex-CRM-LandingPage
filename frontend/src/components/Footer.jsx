import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const navLinks = [
  { label: "Capabilities", href: "#capabilities" },
  { label: "Compare", href: "#compare" },
  { label: "Integrations", href: "#integrations" },
  { label: "Documentation", href: "#" },
  { label: "Support", href: "#" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
  { label: "Cookie Policy", href: "#" },
];

export default function Footer({ onRequestAccess }) {
  return (
    <footer
      className="relative overflow-hidden border-t border-zinc-900/[0.06]"
      style={{ background: "#fafafa" }}
      data-testid="footer"
    >
      {/* Large APEX watermark */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[30%] pointer-events-none select-none"
        aria-hidden="true"
      >
        <span
          className="font-sans font-extrabold tracking-tighter text-zinc-900/[0.03]"
          style={{ fontSize: "clamp(120px, 20vw, 220px)", lineHeight: 1, whiteSpace: "nowrap" }}
        >
          APEX
        </span>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-24">
        {/* Top section */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-12 mb-16">
          {/* Brand */}
          <div className="max-w-xs">
            <div className="flex items-baseline gap-1.5 mb-4">
              <span className="font-sans font-extrabold text-2xl tracking-tighter text-zinc-950">APEX</span>
              <span className="font-mono text-[9px] text-zinc-300 uppercase tracking-[0.18em]">CRM</span>
            </div>
            <p className="font-sans text-[13px] text-zinc-400 font-light leading-relaxed">
              The premier operating system for motorcycle and powersports dealerships. Built for speed. Designed for results.
            </p>
            <button
              onClick={onRequestAccess}
              className="mt-5 flex items-center gap-2 font-medium text-[13px] text-zinc-900 group cursor-pointer"
              data-testid="footer-request-access-button"
            >
              Request Early Access
              <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" strokeWidth={2.5} />
            </button>
          </div>

          {/* Links */}
          <div className="flex flex-col sm:flex-row gap-10 sm:gap-16">
            <div>
              <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-400 mb-4">Platform</div>
              <ul className="space-y-2.5">
                {navLinks.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="font-sans text-[13px] text-zinc-500 hover:text-zinc-900 transition-colors duration-200 font-light"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-400 mb-4">Legal</div>
              <ul className="space-y-2.5">
                {legalLinks.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="font-sans text-[13px] text-zinc-500 hover:text-zinc-900 transition-colors duration-200 font-light"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-zinc-900/[0.06] pt-7 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-mono text-[11px] text-zinc-300">
            © 2025 Apex Technologies, Inc. All rights reserved.
          </span>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 inline-block" />
            <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-wider">System Operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
