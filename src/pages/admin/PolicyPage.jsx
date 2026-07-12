import React from "react";
import { motion } from "framer-motion";
import { Sliders, BrainCircuit } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const deptEfficiency = [
    { dept: "Waste (DMC)", budget: 38, efficiency: 72 },
    { dept: "Water Supply", budget: 52, efficiency: 64 },
    { dept: "River Cleanup", budget: 28, efficiency: 48 },
    { dept: "Forest Dept", budget: 22, efficiency: 58 },
    { dept: "Air Quality", budget: 18, efficiency: 71 },
    { dept: "Tourism Env", budget: 12, efficiency: 55 },
];

const suggestions = [
    { from: "Road Beautification", to: "Rispana River Cleanup", amount: "₹4.2 Cr", impact: "+18% River Health", confidence: 91 },
    { from: "General Admin", to: "Tourist Zone Waste Mgmt", amount: "₹1.8 Cr", impact: "+22% Cleanliness", confidence: 84 },
    { from: "Park Maintenance", to: "Bindal Sewage Treatment", amount: "₹3.6 Cr", impact: "+14% SDG 6", confidence: 78 },
    { from: "Infrastructure", to: "AQI Monitoring Network", amount: "₹2.1 Cr", impact: "+11% SDG 13", confidence: 72 },
];

export default function PolicyPage() {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 pb-8">

            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
                    <BrainCircuit className="w-6 h-6 text-[#00ff9d]" />
                    Dehradun Policy & Budget Optimization
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                    AI-driven resource allocation for DMC departments
                </p>
            </div>

            {/* AI Suggestions Box (Full Width) */}
            <div className="bg-[#0a0a0a] rounded-xl border border-gray-800 p-5 shadow-lg flex flex-col">
                <div className="flex items-center gap-2 mb-4">
                    <h3 className="text-sm font-bold text-white tracking-wide">AI Budget Reallocation Recommendations</h3>
                </div>

                <div className="space-y-3">
                    {suggestions.map((s, i) => (
                        <div key={i} className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/5 hover:border-gray-600 transition-colors">
                            <div className="space-y-1">
                                <div className="text-sm text-white font-medium flex items-center gap-2">
                                    <span className="text-gray-400">{s.from}</span>
                                    <span className="text-gray-500 px-1">→</span>
                                    <span className="font-bold">{s.to}</span>
                                </div>
                                <div className="text-xs text-gray-500 tracking-wide mt-1">
                                    Projected: <span className="text-gray-400">{s.impact}</span>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-lg font-mono font-bold text-[#00ff9d]">{s.amount}</div>
                                <div className="text-[10px] text-gray-500 font-mono mt-1">Confidence: {s.confidence}%</div>
                            </div>
                        </div>
                    ))}
                </div>

                <button className="mt-5 w-full py-3 rounded-lg text-sm font-bold bg-[#00ff9d] text-black hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(0,255,153,0.3)]">
                    <Sliders className="w-4 h-4" /> Open "What-If" Simulator
                </button>
            </div>

            {/* Efficiency Chart (Full Width) */}
            <div className="bg-[#0a0a0a] rounded-xl border border-gray-800 p-5 shadow-lg">
                <h3 className="text-sm font-bold text-white tracking-wide mb-6">DMC Department Efficiency</h3>
                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={deptEfficiency} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <XAxis
                                dataKey="dept"
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
                            {/* Budget - Gray */}
                            <Bar dataKey="budget" fill="#374151" radius={[4, 4, 0, 0]} barSize={16} name="Budget (₹Cr)" />
                            {/* Efficiency - Green */}
                            <Bar dataKey="efficiency" fill="#00ff9d" radius={[4, 4, 0, 0]} barSize={16} name="Efficiency %" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

        </motion.div>
    );
}