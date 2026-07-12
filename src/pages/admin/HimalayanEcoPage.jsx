import React from "react";
import { motion } from "framer-motion";
import { Mountain, TreePine, Droplets, AlertTriangle } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const forestData = [
    { year: "2020", cover: 68 }, { year: "2021", cover: 65 }, { year: "2022", cover: 62 },
    { year: "2023", cover: 59 }, { year: "2024", cover: 57 }, { year: "2025", cover: 54 }, { year: "2026", cover: 52 },
];

const threats = [
    { threat: "Illegal tree felling — Mussoorie Road", severity: "Critical", zone: "Mussoorie Foothills", status: "Active" },
    { threat: "Hillside land clearing — Jollygrant", severity: "High", zone: "Mussoorie Foothills", status: "Investigating" },
    { threat: "Water source contamination — Maldevta", severity: "High", zone: "Eco-sensitive Belt", status: "Monitoring" },
    { threat: "Waste dumping — Lachhiwala forest edge", severity: "Medium", zone: "Rajaji Corridor", status: "Active" },
    { threat: "Landslide risk — Kimadi area", severity: "Critical", zone: "Hill Zone", status: "Alert Issued" },
    { threat: "Encroachment on river floodplain", severity: "High", zone: "Rispana Source", status: "Under Review" },
];

// EVORA specific status styling
const sevStyle = {
    Critical: "bg-red-500/10 text-red-500 border border-red-500/20",
    High: "bg-yellow-500/10 text-yellow-500 border border-yellow-500/20",
    Medium: "bg-[#00ff9d]/10 text-[#00ff9d] border border-[#00ff9d]/20",
};

export default function HimalayanEcoPage() {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 pb-8">

            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
                    <Mountain className="w-6 h-6 text-[#00ff9d]" />
                    Himalayan Ecosystem Protection
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                    Deforestation tracking, water source monitoring & hillside waste intelligence — Dehradun
                </p>
            </div>

            {/* KPIs */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-[#0a0a0a] rounded-xl border border-red-500/30 p-5 text-center shadow-[0_0_15px_rgba(239,68,68,0.1)]">
                    <TreePine className="w-6 h-6 mx-auto text-red-500 mb-2" />
                    <div className="text-3xl font-bold font-mono text-red-500">-16%</div>
                    <div className="text-[11px] font-semibold tracking-wider uppercase text-gray-500 mt-1">Forest Cover Loss (6yr)</div>
                </div>
                <div className="bg-[#0a0a0a] rounded-xl border border-yellow-500/30 p-5 text-center shadow-[0_0_15px_rgba(234,179,8,0.05)]">
                    <Mountain className="w-6 h-6 mx-auto text-yellow-500 mb-2" />
                    <div className="text-3xl font-bold font-mono text-yellow-500">6</div>
                    <div className="text-[11px] font-semibold tracking-wider uppercase text-gray-500 mt-1">Active Threat Zones</div>
                </div>
                <div className="bg-[#0a0a0a] rounded-xl border border-[#00ff9d]/30 p-5 text-center shadow-[0_0_15px_rgba(0,255,153,0.05)]">
                    <Droplets className="w-6 h-6 mx-auto text-[#00ff9d] mb-2" />
                    <div className="text-3xl font-bold font-mono text-[#00ff9d]">14</div>
                    <div className="text-[11px] font-semibold tracking-wider uppercase text-gray-500 mt-1">Water Sources Monitored</div>
                </div>
                <div className="bg-[#0a0a0a] rounded-xl border border-yellow-500/30 p-5 text-center shadow-[0_0_15px_rgba(234,179,8,0.05)]">
                    <AlertTriangle className="w-6 h-6 mx-auto text-yellow-500 mb-2" />
                    <div className="text-3xl font-bold font-mono text-yellow-500">3</div>
                    <div className="text-[11px] font-semibold tracking-wider uppercase text-gray-500 mt-1">Landslide Risk Alerts</div>
                </div>
            </div>

            {/* Forest Cover Trend */}
            <div className="bg-[#0a0a0a] rounded-xl border border-gray-800 p-5 shadow-lg">
                <h3 className="text-sm font-bold text-white mb-6 tracking-wide">Dehradun Forest Cover Trend (%)</h3>
                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={forestData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                            <defs>
                                <linearGradient id="forestGrad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#00ff9d" stopOpacity={0.3} />
                                    <stop offset="100%" stopColor="#00ff9d" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <XAxis
                                dataKey="year"
                                tick={{ fontSize: 11, fill: "#9ca3af" }}
                                axisLine={false}
                                tickLine={false}
                                dy={10}
                            />
                            <YAxis
                                domain={[40, 75]}
                                tick={{ fontSize: 11, fill: "#9ca3af" }}
                                axisLine={false}
                                tickLine={false}
                            />
                            <Tooltip
                                contentStyle={{ background: "#050505", border: "1px solid #1f2937", borderRadius: 8, fontSize: 12 }}
                                itemStyle={{ color: "#00ff9d", fontWeight: "bold" }}
                            />
                            <Area
                                type="monotone"
                                dataKey="cover"
                                stroke="#00ff9d"
                                fill="url(#forestGrad)"
                                strokeWidth={3}
                                activeDot={{ r: 6, fill: "#00ff9d", stroke: "#0a0a0a", strokeWidth: 2 }}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Threats Table */}
            <div className="bg-[#0a0a0a] rounded-xl border border-gray-800 shadow-lg overflow-hidden flex flex-col">
                <div className="px-6 py-4 border-b border-gray-800 bg-white/5">
                    <h3 className="text-sm font-bold text-white tracking-wide">Active Ecological Threats</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-800 bg-[#050505]">
                                <th className="text-left px-6 py-4 text-gray-400 font-semibold">Threat</th>
                                <th className="text-left px-6 py-4 text-gray-400 font-semibold">Zone</th>
                                <th className="text-left px-6 py-4 text-gray-400 font-semibold">Severity</th>
                                <th className="text-left px-6 py-4 text-gray-400 font-semibold">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {threats.map((t, i) => (
                                <tr key={i} className="border-b border-gray-800/50 last:border-0 hover:bg-white/5 transition-colors">
                                    <td className="px-6 py-4 font-bold text-white">{t.threat}</td>
                                    <td className="px-6 py-4 text-gray-400">{t.zone}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2.5 py-1.5 rounded-md text-[10px] font-bold tracking-wider uppercase ${sevStyle[t.severity]}`}>
                                            {t.severity}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-400 font-medium">{t.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </motion.div>
    );
}