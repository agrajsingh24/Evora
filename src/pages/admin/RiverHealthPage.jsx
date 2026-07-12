import React from "react";
import { motion } from "framer-motion";
import { Droplets, AlertTriangle, TrendingDown } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

// Pulling directly from your new centralized data file
import { riverHealthData } from "../../data/data";

const rivers = [riverHealthData.rispana, riverHealthData.bindal];

export default function RiverHealthPage() {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 pb-8">

            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
                    <Droplets className="w-6 h-6 text-[#00ff9d]" />
                    River Health Monitoring — Dehradun
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                    Rispana & Bindal river pollution tracking, dumping alerts & cleanliness scores
                </p>
            </div>

            {/* River Cards Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {rivers.map((river) => (
                    <div key={river.name} className="bg-[#0a0a0a] rounded-xl border border-gray-800 overflow-hidden shadow-lg flex flex-col">

                        {/* Card Header */}
                        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-800 bg-white/5">
                            <div className="flex items-center gap-2">
                                <h3 className="text-base font-bold text-white">{river.name}</h3>
                            </div>
                            <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-md bg-white/10 text-gray-300">
                                {river.length}
                            </span>
                        </div>

                        <div className="p-5 flex-1 space-y-6">

                            {/* Stats Row */}
                            <div className="grid grid-cols-3 gap-4">
                                <div className="text-center p-3 rounded-lg bg-[#050505] border border-gray-800/50">
                                    <div className="text-2xl font-bold font-mono text-red-500">{river.cleanlinessScore}/100</div>
                                    <div className="text-[10px] text-gray-500 uppercase tracking-wider mt-1">Cleanliness</div>
                                </div>
                                <div className="text-center p-3 rounded-lg bg-[#050505] border border-gray-800/50">
                                    <div className="text-2xl font-bold font-mono text-yellow-500">{river.dumping_alerts}</div>
                                    <div className="text-[10px] text-gray-500 uppercase tracking-wider mt-1">Dumping Alerts</div>
                                </div>
                                <div className="text-center p-3 rounded-lg bg-[#050505] border border-gray-800/50">
                                    <div className="text-2xl font-bold font-mono text-[#00ff9d]">{river.active_reports}</div>
                                    <div className="text-[10px] text-gray-500 uppercase tracking-wider mt-1">Active Reports</div>
                                </div>
                            </div>

                            {/* Pollution Level Badge */}
                            <div className="flex items-center justify-between p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                                <div className="flex items-center gap-2">
                                    <AlertTriangle className="w-4 h-4 text-red-500" />
                                    <span className="text-sm font-semibold text-white">Pollution Level</span>
                                </div>
                                <span className="text-sm font-bold tracking-wide uppercase text-red-500">
                                    {river.pollutionLevel}
                                </span>
                            </div>

                            {/* Trend Chart */}
                            <div className="pt-2">
                                <div className="flex items-center gap-2 mb-4 px-1">
                                    <TrendingDown className="w-4 h-4 text-red-500" />
                                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">6-Month Cleanliness Trend</span>
                                </div>
                                <div className="h-40">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={river.monthly}>
                                            <XAxis
                                                dataKey="month"
                                                tick={{ fontSize: 10, fill: "#9ca3af" }}
                                                axisLine={false}
                                                tickLine={false}
                                                dy={10}
                                            />
                                            <YAxis
                                                domain={[20, 55]}
                                                tick={{ fontSize: 10, fill: "#9ca3af" }}
                                                axisLine={false}
                                                tickLine={false}
                                                width={30}
                                            />
                                            <Tooltip
                                                contentStyle={{ background: "#050505", border: "1px solid #1f2937", borderRadius: 8, fontSize: 12, color: "#fff" }}
                                                itemStyle={{ color: "#ef4444", fontWeight: "bold" }}
                                            />
                                            <Line
                                                type="monotone"
                                                dataKey="score"
                                                stroke="#ef4444"
                                                strokeWidth={3}
                                                dot={{ r: 4, fill: "#ef4444", strokeWidth: 2, stroke: "#0a0a0a" }}
                                                activeDot={{ r: 6, fill: "#ef4444" }}
                                            />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                        </div>
                    </div>
                ))}
            </div>
        </motion.div>
    );
}