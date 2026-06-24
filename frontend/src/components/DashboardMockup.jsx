import { motion } from "framer-motion";
import {
  LayoutDashboard, Users, Package, MessageSquare, BarChart2, Settings, Bell, Search
} from "lucide-react";

const leads = [
  { name: "Jordan K.", unit: "Kawasaki Z900RS", status: "HOT", score: 96, time: "2m" },
  { name: "Marcus W.", unit: "Yamaha MT-07", status: "WARM", score: 74, time: "15m" },
  { name: "Sarah C.", unit: "Can-Am Maverick", status: "NEW", score: 52, time: "31m" },
  { name: "Tyler R.", unit: "Harley Sportster S", status: "HOT", score: 89, time: "1h" },
  { name: "Priya N.", unit: "KTM 890 Duke R", status: "WARM", score: 67, time: "2h" },
];

const statusConfig = {
  HOT: "bg-zinc-900 text-white",
  WARM: "bg-zinc-100 text-zinc-600",
  NEW: "bg-zinc-50 text-zinc-400 border border-zinc-200",
};

const navItems = [
  { label: "Dashboard", Icon: LayoutDashboard, active: false },
  { label: "Leads", Icon: Users, active: true, badge: 3 },
  { label: "Inventory", Icon: Package, active: false },
  { label: "Follow-Ups", Icon: MessageSquare, active: false },
  { label: "Analytics", Icon: BarChart2, active: false },
];

const kpiStats = [
  { label: "Active Leads", value: "127" },
  { label: "Units Avail.", value: "147" },
  { label: "Avg Response", value: "22m" },
  { label: "Closing Rate", value: "74%" },
];

export default function DashboardMockup() {
  return (
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      className="relative w-full max-w-4xl mx-auto"
      data-testid="dashboard-mockup"
      style={{
        filter: "drop-shadow(0 40px 80px rgba(0,0,0,0.10)) drop-shadow(0 16px 32px rgba(0,0,0,0.06))",
      }}
    >
      {/* Window Chrome */}
      <div
        className="rounded-t-2xl flex items-center px-4 py-3 gap-3"
        style={{
          background: "rgba(250,250,250,0.95)",
          borderBottom: "1px solid rgba(0,0,0,0.06)",
          backdropFilter: "blur(20px)",
        }}
      >
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-zinc-300" />
          <div className="w-3 h-3 rounded-full bg-zinc-200" />
          <div className="w-3 h-3 rounded-full bg-zinc-200" />
        </div>
        <div className="flex-1 flex justify-center">
          <div className="bg-white border border-zinc-100 rounded-md px-10 py-1.5 text-[11px] font-mono text-zinc-400">
            app.apexcrm.io / leads
          </div>
        </div>
        <div className="w-16" />
      </div>

      {/* App Content */}
      <div
        className="rounded-b-2xl overflow-hidden"
        style={{
          background: "#fafafa",
          border: "1px solid rgba(0,0,0,0.07)",
          borderTop: "none",
        }}
      >
        {/* App Header Bar */}
        <div className="flex items-center gap-4 px-4 py-2.5 bg-white border-b border-zinc-100/80">
          <span className="font-sans font-extrabold text-[13px] tracking-tighter text-zinc-950 select-none">
            APEX
          </span>
          <div className="flex-1 max-w-xs">
            <div className="bg-zinc-50 border border-zinc-100 rounded-lg px-3 py-1.5 flex items-center gap-2">
              <Search size={11} className="text-zinc-300 flex-shrink-0" />
              <span className="text-[11px] font-mono text-zinc-300">Search leads, units...</span>
            </div>
          </div>
          <div className="flex items-center gap-2 ml-auto">
            <div className="w-7 h-7 rounded-full bg-zinc-50 border border-zinc-100 flex items-center justify-center">
              <Bell size={11} className="text-zinc-400" />
            </div>
            <div className="w-7 h-7 rounded-full bg-zinc-900 flex items-center justify-center">
              <span className="text-[10px] font-sans font-bold text-white">JK</span>
            </div>
          </div>
        </div>

        {/* Main Layout */}
        <div className="flex" style={{ minHeight: "340px" }}>
          {/* Sidebar */}
          <div className="w-44 flex-shrink-0 bg-white border-r border-zinc-100/80 py-3 flex flex-col gap-0.5">
            {navItems.map(({ label, Icon, active, badge }) => (
              <div
                key={label}
                className={`flex items-center gap-2.5 px-3 py-2 mx-2 rounded-lg text-[11px] cursor-default select-none ${
                  active
                    ? "bg-zinc-950 text-white"
                    : "text-zinc-400"
                }`}
              >
                <Icon size={12} strokeWidth={active ? 2 : 1.5} />
                <span className="font-medium tracking-tight">{label}</span>
                {badge && (
                  <span className={`ml-auto text-[9px] font-mono px-1.5 py-0.5 rounded-full ${active ? "bg-white/20 text-white" : "bg-zinc-100 text-zinc-500"}`}>
                    {badge}
                  </span>
                )}
              </div>
            ))}
            <div className="mt-auto px-2">
              <div className="h-px bg-zinc-100 my-2" />
              <div className="flex items-center gap-2.5 px-3 py-2 text-[11px] text-zinc-300 cursor-default select-none">
                <Settings size={12} strokeWidth={1.5} />
                <span className="font-medium">Settings</span>
              </div>
            </div>
          </div>

          {/* Main Area */}
          <div className="flex-1 p-4 flex flex-col gap-3 min-w-0">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-[13px] font-semibold text-zinc-900 tracking-tight">Lead Queue</span>
                <span className="text-[11px] font-mono text-zinc-400">127 active</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span
                  className="w-1.5 h-1.5 rounded-full bg-zinc-400"
                  style={{ animation: "pulse 2s ease-in-out infinite" }}
                />
                <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-[0.15em]">Live</span>
              </div>
            </div>

            {/* KPI Row */}
            <div className="grid grid-cols-4 gap-2">
              {kpiStats.map(({ label, value }) => (
                <div key={label} className="bg-white border border-zinc-100 rounded-xl p-3">
                  <div className="text-[8px] font-mono text-zinc-400 uppercase tracking-wider mb-1.5 leading-tight">
                    {label}
                  </div>
                  <div className="text-[18px] font-sans font-semibold tracking-tight text-zinc-900 leading-none">
                    {value}
                  </div>
                </div>
              ))}
            </div>

            {/* Lead Table */}
            <div className="bg-white border border-zinc-100 rounded-xl overflow-hidden flex-1">
              <table className="w-full text-[11px]">
                <thead>
                  <tr className="border-b border-zinc-50">
                    {["Contact", "Unit Interest", "Status", "Score", "Time"].map((h) => (
                      <th
                        key={h}
                        className={`py-2 ${h === "Score" || h === "Time" ? "text-right px-3" : "text-left px-3"} text-[9px] font-mono text-zinc-300 uppercase tracking-[0.12em] font-normal`}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {leads.map((lead, i) => (
                    <tr key={i} className="border-b border-zinc-50/80 last:border-0">
                      <td className="px-3 py-2 font-medium text-zinc-800 whitespace-nowrap">
                        {lead.name}
                      </td>
                      <td className="px-3 py-2 font-mono text-zinc-500 whitespace-nowrap truncate max-w-[120px]">
                        {lead.unit}
                      </td>
                      <td className="px-3 py-2">
                        <span className={`font-mono text-[8px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider ${statusConfig[lead.status]}`}>
                          {lead.status}
                        </span>
                      </td>
                      <td className="px-3 py-2 text-right font-mono text-zinc-700">
                        {lead.score}
                      </td>
                      <td className="px-3 py-2 text-right font-mono text-zinc-400">
                        {lead.time}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Bottom Bar */}
            <div className="flex items-center justify-between px-1">
              <span className="text-[10px] font-mono text-zinc-300">avg score: 75.6 pts</span>
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-mono text-zinc-300">today: 8 closings</span>
                <span className="text-[10px] font-mono text-zinc-400 font-medium">↑ +12% vs. last week</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
