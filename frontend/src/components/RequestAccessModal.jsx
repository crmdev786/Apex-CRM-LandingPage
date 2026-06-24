import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import axios from "axios";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.96, y: 14 },
  visible: {
    opacity: 1, scale: 1, y: 0,
    transition: { type: "spring", stiffness: 280, damping: 28, delay: 0.04 },
  },
  exit: {
    opacity: 0, scale: 0.96, y: 10,
    transition: { duration: 0.18 },
  },
};

export default function RequestAccessModal({ isOpen, onClose }) {
  const [form, setForm] = useState({ name: "", dealership: "", email: "", volume: "" });
  const [status, setStatus] = useState("idle");

  const set = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    try {
      await axios.post(`${API}/request-access`, form);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => setStatus("idle"), 350);
  };

  const inputClass =
    "w-full border-b border-zinc-200 pb-3 pt-0.5 outline-none text-[14px] font-sans text-zinc-900 bg-transparent placeholder:text-zinc-300 focus:border-zinc-900 transition-colors duration-200";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 z-50 flex items-center justify-center p-5"
          style={{ background: "rgba(9,9,11,0.25)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)" }}
          onClick={(e) => e.target === e.currentTarget && handleClose()}
          data-testid="modal-overlay"
        >
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="w-full max-w-md bg-white rounded-2xl overflow-hidden"
            style={{
              border: "1px solid rgba(0,0,0,0.07)",
              boxShadow: "0 24px 80px rgba(0,0,0,0.12), 0 4px 16px rgba(0,0,0,0.06)",
            }}
            data-testid="request-access-modal"
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between px-8 pt-8 pb-0">
              <div>
                <h2 className="font-sans font-bold text-[22px] tracking-tight text-zinc-950">
                  Request Access
                </h2>
                <p className="font-sans text-[13px] text-zinc-400 font-light mt-1">
                  Join the waitlist — we'll onboard you within 48 hours.
                </p>
              </div>
              <button
                data-testid="modal-close-button"
                onClick={handleClose}
                className="p-2 rounded-xl hover:bg-zinc-100 transition-colors duration-150 -mt-1 -mr-2 cursor-pointer"
              >
                <X size={15} className="text-zinc-500" strokeWidth={2} />
              </button>
            </div>

            {/* Divider */}
            <div className="h-px bg-zinc-100 mx-8 mt-5 mb-0" />

            {/* Body */}
            <div className="px-8 pb-8 pt-6">
              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-10"
                    data-testid="success-message"
                  >
                    <div
                      className="font-sans font-extrabold tracking-tighter text-zinc-950 mb-3"
                      style={{ fontSize: "32px" }}
                    >
                      You're In.
                    </div>
                    <p className="font-sans text-[13px] text-zinc-400 font-light max-w-xs mx-auto leading-relaxed">
                      Expect a call from your dedicated onboarding specialist within 24 hours.
                    </p>
                    <button
                      onClick={handleClose}
                      className="mt-7 font-mono text-[11px] uppercase tracking-[0.15em] text-zinc-400 hover:text-zinc-900 transition-colors cursor-pointer"
                    >
                      Close window
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    <div>
                      <label className="font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-400 block mb-2">
                        Full Name
                      </label>
                      <input
                        data-testid="input-name"
                        type="text"
                        value={form.name}
                        onChange={set("name")}
                        required
                        placeholder="Jordan Kessler"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-400 block mb-2">
                        Dealership Name
                      </label>
                      <input
                        data-testid="input-dealership"
                        type="text"
                        value={form.dealership}
                        onChange={set("dealership")}
                        required
                        placeholder="Apex Moto Group"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-400 block mb-2">
                        Email Address
                      </label>
                      <input
                        data-testid="input-email"
                        type="email"
                        value={form.email}
                        onChange={set("email")}
                        required
                        placeholder="jordan@apexmoto.com"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-400 block mb-2">
                        Monthly Sales Volume
                      </label>
                      <select
                        data-testid="input-volume"
                        value={form.volume}
                        onChange={set("volume")}
                        required
                        className={`${inputClass} appearance-none cursor-pointer`}
                      >
                        <option value="" disabled>Select volume</option>
                        <option value="under-25">Under 25 units / mo</option>
                        <option value="25-50">25–50 units / mo</option>
                        <option value="50-100">50–100 units / mo</option>
                        <option value="100+">100+ units / mo</option>
                      </select>
                    </div>

                    <button
                      data-testid="submit-lead-form"
                      type="submit"
                      disabled={status === "loading"}
                      className="w-full bg-zinc-950 text-white rounded-xl py-4 text-[14px] font-medium tracking-tight hover:bg-zinc-800 transition-colors duration-200 disabled:opacity-50 cursor-pointer mt-2"
                    >
                      {status === "loading" ? "Processing..." : "Request Early Access"}
                    </button>

                    {status === "error" && (
                      <p
                        data-testid="error-message"
                        className="text-center font-sans text-[12px] text-zinc-500 mt-2"
                      >
                        Something went wrong. Please try again.
                      </p>
                    )}

                    <p className="font-mono text-[9px] text-zinc-300 text-center uppercase tracking-wider">
                      No credit card required · Cancel anytime
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
