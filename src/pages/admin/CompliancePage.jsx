import React from "react";
import { motion } from "framer-motion";
import { Shield, FileText, Eye, Clock } from "lucide-react";

const sdgTracking = [
    { sdg: "SDG 6", title: "Clean Water & Sanitation", status: "Behind", score: 48, color: "text-red-500" },
    { sdg: "SDG 11", title: "Sustainable Cities", status: "At Risk", score: 52, color: "text-yellow-500" },
    { sdg: "SDG 12", title: "Responsible Consumption", status: "At Risk", score: 44, color: "text-yellow-500" },
    { sdg: "SDG 13", title: "Climate Action", status: "At Risk", score: 49, color: "text-yellow-500" },
    { sdg: "SDG 15", title: "Life on Land", status: "At Risk", score: 56, color: "text-yellow-500" },
];

const auditLogs = [
    { time: "14:32:08", user: "DMC Admin S. Negi", action: "Updated Rispana cleanup budget allocation", module: "Policy Engine" },
    { time: "13:47:22", user: "System AI", action: "Auto-generated flood risk report for Prem Nagar", module: "Risk Engine" },
    { time: "12:15:41", user: "DMC Admin P. Rawat", action: "Published Q1 ESG transparency report — Dehradun", module: "Compliance" },
    { time: "11:03:55", user: "DMC Admin R. Bisht", action: "Updated SDG 6 targets for river health", module: "Governance" },
    { time: "09:48:12", user: "System AI", action: "Flagged illegal dumping anomaly — Doiwala bypass", module: "AI Advisor" },
    { time: "08:22:30", user: "System AI", action: "Tourist zone waste spike alert — Sahastradhara", module: "Tourism Monitor" },
];

export default function CompliancePage() {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 pb-8">

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
                        <Shield className="w-6 h-6 text-[#00ff9d]" />
                        Dehradun Transparency & Compliance
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        SDG alignment for Dehradun, ESG reporting & audit trail
                    </p>
                </div>
                <div className="flex flex-wrap gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-gray-800 text-sm font-medium text-gray-300 hover:bg-white/10 hover:text-white transition-colors">
                        <FileText className="w-4 h-4" /> Export DMC ESG Report
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#00ff9d]/10 border border-[#00ff9d]/30 text-sm font-bold text-[#00ff9d] hover:bg-[#00ff9d]/20 transition-colors shadow-[0_0_10px_rgba(0,255,153,0.1)]">
                        <Eye className="w-4 h-4" /> Open Data Portal
                    </button>
                </div>
            </div>

            {/* SDG Tracker */}
            <div className="bg-[#0a0a0a] rounded-xl border border-gray-800 p-5 shadow-lg">
                <div className="flex items-center gap-2 mb-6">
                    <h3 className="text-sm font-bold text-white tracking-wide">Dehradun SDG Alignment Tracker</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-5">
                    {sdgTracking.map((s) => (
                        <div key={s.sdg} className="bg-[#050505] rounded-xl border border-gray-800/60 p-5 space-y-4 hover:border-gray-600 transition-colors shadow-md">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-[#00ff9d] bg-[#00ff9d]/10 px-2 py-1 rounded-md">{s.sdg}</span>
                                <span className={`text-[10px] font-bold uppercase tracking-wider ${s.color}`}>{s.status}</span>
                            </div>
                            <div className="text-sm text-white font-medium min-h-[40px]">{s.title}</div>
                            <div>
                                <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden mb-2">
                                    <div
                                        className="h-full rounded-full transition-all bg-[#00ff9d] shadow-[0_0_8px_rgba(0,255,153,0.5)]"
                                        style={{ width: `${s.score}%` }}
                                    />
                                </div>
                                <div className="text-right text-[11px] font-mono text-gray-400 font-bold">{s.score}%</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Audit Log */}
            <div className="bg-[#0a0a0a] rounded-xl border border-gray-800 p-5 shadow-lg">
                <div className="flex items-center gap-2 mb-6">
                    <Clock className="w-5 h-5 text-gray-400" />
                    <h3 className="text-sm font-bold text-white tracking-wide">DMC System Audit Log</h3>
                </div>
                <div className="space-y-3">
                    {auditLogs.map((log, i) => (
                        <div key={i} className="flex items-start gap-4 p-3.5 rounded-lg bg-white/5 border border-transparent hover:border-gray-800 hover:bg-white/10 transition-colors group">
                            <span className="text-[11px] font-mono text-gray-500 shrink-0 mt-0.5 w-16 group-hover:text-gray-300 transition-colors">
                                {log.time}
                            </span>
                            <div className="min-w-0 flex-1">
                                <div className="text-sm text-white font-medium">{log.action}</div>
                                <div className="text-xs mt-1.5 flex items-center gap-2">
                                    <span className={`font-semibold ${log.user === 'System AI' ? 'text-purple-400' : 'text-[#00ff9d]'}`}>
                                        {log.user}
                                    </span>
                                    <span className="text-gray-600">•</span>
                                    <span className="text-gray-400 tracking-wide uppercase text-[10px] bg-black px-2 py-0.5 rounded border border-gray-800">
                                        {log.module}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </motion.div>
    );
}