import React from "react";
import { motion } from "framer-motion";
import { Trash2, MessageSquareWarning, Star } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

// Pulling directly from your centralized data file
import { touristSites } from "../../data/data";

const wasteData = touristSites.map((s) => ({
    name: s.name.split(" ")[0],
    waste: s.dailyWaste,
    complaints: s.complaints
}));

export default function TourismImpactPage() {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 pb-8">

            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-white tracking-tight">Tourism Environmental Impact — Dehradun</h1>
                <p className="text-sm text-gray-500 mt-1">
                    Monitoring waste generation, complaints & cleanliness at tourist destinations
                </p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-[#0a0a0a] rounded-xl border border-yellow-500/30 p-5 text-center shadow-[0_0_15px_rgba(234,179,8,0.05)] space-y-2">
                    <Trash2 className="w-6 h-6 mx-auto text-yellow-500" />
                    <div className="text-3xl font-bold font-mono text-yellow-500">
                        {touristSites.reduce((a, s) => a + s.dailyWaste, 0).toLocaleString()} <span className="text-xl">kg</span>
                    </div>
                    <div className="text-[11px] font-semibold tracking-wider uppercase text-gray-500">Daily Tourist Waste</div>
                </div>

                <div className="bg-[#0a0a0a] rounded-xl border border-red-500/30 p-5 text-center shadow-[0_0_15px_rgba(239,68,68,0.05)] space-y-2">
                    <MessageSquareWarning className="w-6 h-6 mx-auto text-red-500" />
                    <div className="text-3xl font-bold font-mono text-red-500">
                        {touristSites.reduce((a, s) => a + s.complaints, 0)}
                    </div>
                    <div className="text-[11px] font-semibold tracking-wider uppercase text-gray-500">Active Complaints</div>
                </div>

                <div className="bg-[#0a0a0a] rounded-xl border border-[#00ff9d]/30 p-5 text-center shadow-[0_0_15px_rgba(0,255,153,0.05)] space-y-2">
                    <Star className="w-6 h-6 mx-auto text-[#00ff9d]" />
                    <div className="text-3xl font-bold font-mono text-[#00ff9d]">
                        {(touristSites.reduce((a, s) => a + s.cleanliness, 0) / touristSites.length).toFixed(1)}
                    </div>
                    <div className="text-[11px] font-semibold tracking-wider uppercase text-gray-500">Avg Cleanliness Score</div>
                </div>
            </div>

            {/* Chart */}
            <div className="bg-[#0a0a0a] rounded-xl border border-gray-800 p-5 shadow-lg">
                <h3 className="text-sm font-bold text-white mb-6 tracking-wide">Waste & Complaints by Tourist Site</h3>
                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={wasteData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <XAxis
                                dataKey="name"
                                tick={{ fontSize: 11, fill: "#9ca3af" }}
                                axisLine={false}
                                tickLine={false}
                                dy={10}
                            />
                            <YAxis
                                tick={{ fontSize: 11, fill: "#9ca3af" }}
                                axisLine={false}
                                tickLine={false}
                            />
                            <Tooltip
                                contentStyle={{ background: "#050505", border: "1px solid #1f2937", borderRadius: 8, fontSize: 12, color: "#fff" }}
                                cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                            />
                            <Bar dataKey="waste" fill="#eab308" radius={[4, 4, 0, 0]} barSize={16} name="Waste (kg/day)" />
                            <Bar dataKey="complaints" fill="#ef4444" radius={[4, 4, 0, 0]} barSize={16} name="Complaints" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Detailed Table */}
            <div className="bg-[#0a0a0a] rounded-xl border border-gray-800 shadow-lg overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-gray-800 bg-white/5">
                            <th className="text-left px-6 py-4 text-gray-400 font-semibold">Tourist Site</th>
                            <th className="text-left px-6 py-4 text-gray-400 font-semibold">Daily Waste (kg)</th>
                            <th className="text-left px-6 py-4 text-gray-400 font-semibold">Complaints</th>
                            <th className="text-left px-6 py-4 text-gray-400 font-semibold">Cleanliness</th>
                        </tr>
                    </thead>
                    <tbody>
                        {touristSites.map((s, i) => (
                            <tr key={i} className="border-b border-gray-800/50 last:border-0 hover:bg-white/5 transition-colors">
                                <td className="px-6 py-4 font-bold text-white">{s.name}</td>
                                <td className="px-6 py-4 font-mono text-yellow-500 font-bold">{s.dailyWaste}</td>
                                <td className="px-6 py-4 font-mono text-red-500 font-bold">{s.complaints}</td>
                                <td className="px-6 py-4">
                                    <span
                                        className={`font-mono font-bold px-2.5 py-1 rounded-md border ${s.cleanliness >= 6
                                                ? "text-[#00ff9d] bg-[#00ff9d]/10 border-[#00ff9d]/20"
                                                : s.cleanliness >= 4
                                                    ? "text-yellow-500 bg-yellow-500/10 border-yellow-500/20"
                                                    : "text-red-500 bg-red-500/10 border-red-500/20"
                                            }`}
                                    >
                                        {s.cleanliness}/10
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </motion.div>
    );
}