import React from "react";
import { motion } from "framer-motion";
import { Users, AlertTriangle } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const engagementData = [
    { month: "Oct", users: 4200 }, { month: "Nov", users: 5100 }, { month: "Dec", users: 6800 },
    { month: "Jan", users: 8400 }, { month: "Feb", users: 11200 }, { month: "Mar", users: 14600 },
];

const sentimentData = [
    { name: "Positive", value: 48, color: "#00ff9d" }, // EVORA Green
    { name: "Neutral", value: 31, color: "#6b7280" },  // Gray-500
    { name: "Negative", value: 21, color: "#ef4444" }, // Red-500
];

const topContributors = [
    { name: "Priya Rawat", reports: 147, badge: "🏆", area: "Rajpur Road" },
    { name: "Rahul Negi", reports: 118, badge: "⭐", area: "Prem Nagar" },
    { name: "Anita Bisht", reports: 96, badge: "⭐", area: "Clement Town" },
    { name: "Vikram Chauhan", reports: 82, badge: "", area: "ISBT Area" },
    { name: "Sunita Panwar", reports: 71, badge: "", area: "Vasant Vihar" },
];

const alerts = [
    { type: "Toxicity", zone: "Rispana River Forum", severity: "High" },
    { type: "Spam Cluster", zone: "Sahastradhara Reports", severity: "Medium" },
    { type: "Misinformation", zone: "Doiwala Community Feed", severity: "Low" },
    { type: "Harassment", zone: "DMC Complaint Portal", severity: "Medium" },
];

export default function CommunityPage() {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 pb-8">

            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
                    <Users className="w-6 h-6 text-[#00ff9d]" />
                    Dehradun Community Intelligence
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                    Citizen engagement & sentiment monitoring — Doon Valley
                </p>
            </div>

            {/* Top Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Engagement Line Chart */}
                <div className="lg:col-span-2 bg-[#0a0a0a] rounded-xl border border-gray-800 p-5 shadow-lg">
                    <h3 className="text-sm font-bold text-white tracking-wide mb-6">Dehradun Citizen Engagement Growth</h3>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={engagementData} margin={{ top: 5, right: 20, left: -20, bottom: 0 }}>
                                <XAxis
                                    dataKey="month"
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
                                    itemStyle={{ color: "#00ff9d", fontWeight: "bold" }}
                                    cursor={{ stroke: 'rgba(255,255,255,0.05)', strokeWidth: 2 }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="users"
                                    name="Active Users"
                                    stroke="#00ff9d"
                                    strokeWidth={3}
                                    dot={false}
                                    activeDot={{ r: 6, fill: "#00ff9d", stroke: "#0a0a0a", strokeWidth: 2 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Sentiment Pie Chart */}
                <div className="bg-[#0a0a0a] rounded-xl border border-gray-800 p-5 shadow-lg flex flex-col">
                    <h3 className="text-sm font-bold text-white tracking-wide mb-2">Sentiment Analysis</h3>
                    <div className="h-48 flex-1">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={sentimentData}
                                    dataKey="value"
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={50}
                                    outerRadius={75}
                                    strokeWidth={0}
                                >
                                    {sentimentData.map((d, i) => <Cell key={i} fill={d.color} />)}
                                </Pie>
                                <Tooltip
                                    contentStyle={{ background: "#050505", border: "1px solid #1f2937", borderRadius: 8, fontSize: 12, color: "#fff" }}
                                    itemStyle={{ fontWeight: "bold" }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="flex justify-center gap-4 mt-2">
                        {sentimentData.map((d) => (
                            <div key={d.name} className="flex items-center gap-1.5">
                                <div className="w-2.5 h-2.5 rounded-full" style={{ background: d.color }} />
                                <span className="text-xs text-gray-400 font-medium">{d.name} {d.value}%</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* Top Contributors */}
                <div className="bg-[#0a0a0a] rounded-xl border border-gray-800 p-5 shadow-lg">
                    <div className="flex items-center gap-2 mb-6">
                        <Users className="w-5 h-5 text-[#00ff9d]" />
                        <h3 className="text-sm font-bold text-white tracking-wide">Top Dehradun Contributors</h3>
                    </div>
                    <div className="space-y-3">
                        {topContributors.map((c, i) => (
                            <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 transition-colors group">
                                <div className="flex items-center gap-3">
                                    <span className="text-xs font-mono text-gray-500 w-5">#{i + 1}</span>
                                    <span className="text-sm font-bold text-white group-hover:text-[#00ff9d] transition-colors">{c.name}</span>
                                    {c.badge && <span className="text-sm drop-shadow-md">{c.badge}</span>}
                                    <span className="text-xs text-gray-500 tracking-wide hidden sm:inline-block">• {c.area}</span>
                                </div>
                                <div className="flex items-center gap-1.5 bg-[#0a0a0a] px-2.5 py-1 rounded-md border border-gray-800">
                                    <span className="text-xs font-mono font-bold text-[#00ff9d]">{c.reports}</span>
                                    <span className="text-[10px] text-gray-500 uppercase">Reports</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Moderation Alerts */}
                <div className="bg-[#0a0a0a] rounded-xl border border-gray-800 p-5 shadow-lg">
                    <div className="flex items-center gap-2 mb-6">
                        <AlertTriangle className="w-5 h-5 text-yellow-500" />
                        <h3 className="text-sm font-bold text-white tracking-wide">Moderation Alerts</h3>
                    </div>
                    <div className="space-y-3">
                        {alerts.map((a, i) => (
                            <div key={i} className="flex items-center justify-between p-3.5 rounded-lg bg-white/5 border border-gray-800 hover:border-gray-600 transition-colors">
                                <div>
                                    <div className="text-sm font-bold text-white">{a.type}</div>
                                    <div className="text-xs text-gray-400 mt-0.5">{a.zone}</div>
                                </div>
                                <span className={`text-[10px] font-bold tracking-wider uppercase px-2.5 py-1.5 rounded-md border ${a.severity === "High" ? "bg-red-500/10 text-red-500 border-red-500/20" :
                                    a.severity === "Medium" ? "bg-yellow-500/10 text-yellow-500 border-yellow-500/20" :
                                        "bg-white/5 text-gray-400 border-gray-700"
                                    }`}>
                                    {a.severity}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </motion.div>
    );
}