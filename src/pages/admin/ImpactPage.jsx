import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Leaf, Droplets, TreePine, Wind, Recycle } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const impactMetrics = [
    { label: "Waste Removed (Dehradun)", value: 4820, unit: "tons", icon: Recycle, color: "text-[#00ff9d]" },
    { label: "Water Saved (Doon Valley)", value: 1840000, unit: "liters", icon: Droplets, color: "text-cyan-400" },
    { label: "Trees Planted", value: 12340, unit: "", icon: TreePine, color: "text-[#00ff9d]" },
    { label: "CO₂ Reduced", value: 2180, unit: "tons", icon: Wind, color: "text-cyan-400" },
    { label: "Plastic Prevented", value: 680, unit: "tons", icon: Leaf, color: "text-yellow-500" },
];

const zoneData = [
    { zone: "Rajpur", waste: 320, water: 680, trees: 80 },
    { zone: "ISBT", waste: 580, water: 240, trees: 25 },
    { zone: "Clement", waste: 210, water: 460, trees: 180 },
    { zone: "Prem Ngr", waste: 440, water: 320, trees: 60 },
    { zone: "Vasant V", waste: 180, water: 520, trees: 140 },
    { zone: "Doiwala", waste: 620, water: 180, trees: 40 },
];

const sdgs = [
    { id: 6, label: "Clean Water", progress: 58 },
    { id: 11, label: "Sustainable Cities", progress: 52 },
    { id: 12, label: "Responsible Consumption", progress: 44 },
    { id: 13, label: "Climate Action", progress: 49 },
    { id: 15, label: "Life on Land", progress: 56 },
];

// Helper component for the animated numbers (TypeScript removed)
function AnimatedCounter({ target, duration = 1500 }) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let start = 0;
        const step = target / (duration / 16);
        const timer = setInterval(() => {
            start += step;
            if (start >= target) {
                setCount(target);
                clearInterval(timer);
            } else {
                setCount(Math.floor(start));
            }
        }, 16);
        return () => clearInterval(timer);
    }, [target, duration]);

    return <span>{count.toLocaleString()}</span>;
}

export default function ImpactPage() {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 pb-8">

            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
                    <Leaf className="w-6 h-6 text-[#00ff9d]" />
                    Dehradun Sustainability Impact Dashboard
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                    Measurable environmental outcomes for Doon Valley & SDG alignment
                </p>
            </div>

            {/* Animated Counters Grid */}
            <div className="grid grid-cols-2 xl:grid-cols-5 gap-4">
                {impactMetrics.map((m) => {
                    const Icon = m.icon;
                    return (
                        <div key={m.label} className="bg-[#0a0a0a] rounded-xl border border-gray-800 p-5 text-center shadow-lg hover:border-gray-600 transition-colors">
                            <Icon className={`w-8 h-8 mx-auto mb-3 ${m.color}`} />
                            <div className={`text-3xl font-bold font-mono ${m.color}`}>
                                <AnimatedCounter target={m.value} />
                            </div>
                            <div className="text-[11px] font-semibold tracking-wider uppercase text-gray-500 mt-2">
                                {m.label} <span className="text-gray-600 lowercase">{m.unit && `(${m.unit})`}</span>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* Zone Impact Bar Chart */}
                <div className="bg-[#0a0a0a] rounded-xl border border-gray-800 p-5 shadow-lg">
                    <h3 className="text-sm font-bold text-white tracking-wide mb-6">Dehradun Zone-wise Impact</h3>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={zoneData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                                <XAxis
                                    dataKey="zone"
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
                                <Bar dataKey="waste" name="Waste (tons)" fill="#00ff9d" radius={[4, 4, 0, 0]} barSize={12} />
                                <Bar dataKey="water" name="Water (kL)" fill="#22d3ee" radius={[4, 4, 0, 0]} barSize={12} />
                                <Bar dataKey="trees" name="Trees" fill="#eab308" radius={[4, 4, 0, 0]} barSize={12} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="flex justify-center gap-6 mt-4 border-t border-gray-800/50 pt-4">
                        <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#00ff9d]" /><span className="text-[10px] text-gray-400 uppercase tracking-wider">Waste</span></div>
                        <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-cyan-400" /><span className="text-[10px] text-gray-400 uppercase tracking-wider">Water</span></div>
                        <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-yellow-500" /><span className="text-[10px] text-gray-400 uppercase tracking-wider">Trees</span></div>
                    </div>
                </div>

                {/* SDG Progress Circles */}
                <div className="bg-[#0a0a0a] rounded-xl border border-gray-800 p-5 shadow-lg">
                    <h3 className="text-sm font-bold text-white tracking-wide mb-6">Dehradun SDG Progress</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-y-8 gap-x-4 pt-2">
                        {sdgs.map((sdg) => (
                            <div key={sdg.id} className="flex flex-col items-center space-y-3">
                                <div className="relative w-20 h-20">
                                    {/* SVG Radial Progress */}
                                    <svg className="w-20 h-20 -rotate-90 drop-shadow-[0_0_8px_rgba(0,255,153,0.3)]" viewBox="0 0 36 36">
                                        <path
                                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                            fill="none"
                                            stroke="#1f2937"
                                            strokeWidth="3"
                                        />
                                        <path
                                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                            fill="none"
                                            stroke="#00ff9d"
                                            strokeWidth="3"
                                            strokeDasharray={`${sdg.progress}, 100`}
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                    {/* Percentage in center */}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <span className="text-sm font-bold font-mono text-white">{sdg.progress}%</span>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <div className="text-xs font-bold text-[#00ff9d] tracking-wide">SDG {sdg.id}</div>
                                    <div className="text-[11px] text-gray-400 font-medium max-w-[100px] leading-tight mt-1">{sdg.label}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </motion.div>
    );
}