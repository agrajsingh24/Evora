import React from "react";
import { motion } from "framer-motion";
import { BrainCircuit, Info } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const forecastData = Array.from({ length: 30 }, (_, i) => ({
    day: `D${i + 1}`,
    actual: i < 15 ? 50 + Math.sin(i * 0.5) * 20 + Math.random() * 10 : undefined,
    predicted: i >= 13 ? 55 + Math.sin(i * 0.4) * 15 + Math.random() * 5 : undefined,
    upper: i >= 13 ? 65 + Math.sin(i * 0.4) * 15 + Math.random() * 8 : undefined,
    lower: i >= 13 ? 45 + Math.sin(i * 0.4) * 15 - Math.random() * 5 : undefined,
}));

export default function RiskForecastingPage() {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 pb-8">

            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
                    <BrainCircuit className="w-6 h-6 text-[#00ff9d]" />
                    Dehradun Predictive Risk & Forecasting Engine
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                    AI-driven predictions for Doon Valley environmental risks
                </p>
            </div>

            {/* Forecast Chart */}
            <div className="bg-[#0a0a0a] rounded-xl border border-gray-800 p-5 shadow-lg">
                <h3 className="text-sm font-bold text-white tracking-wide mb-6">Dehradun Environmental Risk Forecast — 30 Day Outlook</h3>
                <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={forecastData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                            <defs>
                                <linearGradient id="actualGrad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#00ff9d" stopOpacity={0.3} />
                                    <stop offset="100%" stopColor="#00ff9d" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="predGrad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#eab308" stopOpacity={0.2} />
                                    <stop offset="100%" stopColor="#eab308" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <XAxis
                                dataKey="day"
                                tick={{ fontSize: 11, fill: "#9ca3af" }}
                                axisLine={false}
                                tickLine={false}
                                interval={4}
                                dy={10}
                            />
                            <YAxis
                                tick={{ fontSize: 11, fill: "#9ca3af" }}
                                axisLine={false}
                                tickLine={false}
                            />
                            <Tooltip
                                contentStyle={{ background: "#050505", border: "1px solid #1f2937", borderRadius: 8, fontSize: 12, color: "#fff" }}
                                cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1, strokeDasharray: '4 4' }}
                            />
                            {/* Confidence Band (Upper/Lower bounds) */}
                            <Area type="monotone" dataKey="upper" stroke="none" fill="#eab308" fillOpacity={0.1} />
                            <Area type="monotone" dataKey="lower" stroke="none" fill="#0a0a0a" fillOpacity={1} />

                            {/* Actual Data Line */}
                            <Area
                                type="monotone"
                                dataKey="actual"
                                stroke="#00ff9d"
                                fill="url(#actualGrad)"
                                strokeWidth={3}
                                connectNulls={false}
                                activeDot={{ r: 6, fill: "#00ff9d", stroke: "#0a0a0a", strokeWidth: 2 }}
                            />

                            {/* Predicted Data Line */}
                            <Area
                                type="monotone"
                                dataKey="predicted"
                                stroke="#eab308"
                                fill="url(#predGrad)"
                                strokeWidth={3}
                                strokeDasharray="6 6"
                                connectNulls={false}
                                activeDot={{ r: 6, fill: "#eab308", stroke: "#0a0a0a", strokeWidth: 2 }}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                {/* Chart Legend */}
                <div className="flex items-center gap-6 mt-6 justify-center sm:justify-start px-2">
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-1 bg-[#00ff9d] rounded-full" />
                        <span className="text-xs font-semibold tracking-wider text-gray-400 uppercase">Actual</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-1 bg-yellow-500 rounded-full" style={{ borderTop: "2px dashed #eab308", backgroundColor: "transparent" }} />
                        <span className="text-xs font-semibold tracking-wider text-gray-400 uppercase">Predicted</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-3 bg-yellow-500/20 rounded" />
                        <span className="text-xs font-semibold tracking-wider text-gray-400 uppercase">Confidence Band</span>
                    </div>
                </div>
            </div>

            {/* Bottom Row: XAI Box + Seasonal */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* Explainable AI Box */}
                <div className="bg-[#0a0a0a] rounded-xl border border-gray-800 p-5 shadow-lg space-y-4 flex flex-col">
                    <div className="flex items-center gap-2">
                        <BrainCircuit className="w-5 h-5 text-[#00ff9d]" />
                        <h3 className="text-sm font-bold text-white tracking-wide">Explainable AI — Dehradun Insights</h3>
                    </div>
                    <div className="bg-[#050505] rounded-lg border border-gray-800/50 p-4 space-y-3 flex-1">
                        <p className="text-sm text-gray-300 leading-relaxed">
                            The model detects a <strong className="text-red-500 font-bold bg-red-500/10 px-1.5 py-0.5 rounded">67% increased flood risk</strong> in Rispana River corridor and Prem Nagar over the next 14 days, driven by:
                        </p>
                        <ul className="text-xs text-gray-400 space-y-2 ml-4 list-disc marker:text-[#00ff9d]">
                            <li>Pre-monsoon rainfall pattern approaching Doon Valley (weight: <span className="text-white font-mono">0.38</span>)</li>
                            <li>Rispana riverbed 42% blocked by solid waste & encroachment (weight: <span className="text-white font-mono">0.34</span>)</li>
                            <li>Bindal drainage capacity at 31% — sewage backlog detected (weight: <span className="text-white font-mono">0.28</span>)</li>
                        </ul>
                    </div>
                    <button className="w-full py-2.5 mt-2 rounded-lg text-sm font-bold bg-[#00ff9d] text-black hover:opacity-90 transition-opacity shadow-[0_0_15px_rgba(0,255,153,0.3)]">
                        Generate Dehradun Mitigation Plan
                    </button>
                </div>

                {/* Seasonal Patterns */}
                <div className="bg-[#0a0a0a] rounded-xl border border-gray-800 p-5 shadow-lg space-y-4">
                    <div className="flex items-center gap-2 mb-2">
                        <Info className="w-5 h-5 text-[#00ff9d]" />
                        <h3 className="text-sm font-bold text-white tracking-wide">Dehradun Seasonal Patterns</h3>
                    </div>
                    <div className="space-y-3">
                        {[
                            { pattern: "Monsoon Waterlogging — Prem Nagar, ISBT", state: "Approaching" },
                            { pattern: "Tourist Season Waste Spike — Sahastradhara, Robber's Cave", state: "Active" },
                            { pattern: "Winter Air Pollution — Rajpur Road, Haridwar Road", state: "Dormant" },
                            { pattern: "Post-Monsoon Illegal Dumping — Doiwala, Mussoorie Road", state: "Upcoming" },
                            { pattern: "Summer Water Scarcity — Clement Town, Raipur", state: "Dormant" },
                        ].map((item, i) => (
                            <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                                <span className="text-sm text-gray-300 font-medium">{item.pattern}</span>
                                <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wider uppercase ${item.state === "Active" ? "text-red-500 bg-red-500/10 border border-red-500/20" :
                                        item.state === "Approaching" ? "text-yellow-500 bg-yellow-500/10 border border-yellow-500/20" :
                                            item.state === "Upcoming" ? "text-[#00ff9d] bg-[#00ff9d]/10 border border-[#00ff9d]/20" :
                                                "text-gray-500 bg-gray-800 border border-gray-700"
                                    }`}>
                                    {item.state}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </motion.div>
    );
}