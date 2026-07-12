import React from "react";
import { motion } from "framer-motion";
import { Megaphone } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const campaigns = [
    { name: "Clean Rispana Mission", status: "Active", budget: "₹18L", spent: "₹14L", participation: 4820, roi: "2.8x" },
    { name: "Zero Waste Rajpur Road", status: "Active", budget: "₹8L", spent: "₹6L", participation: 2100, roi: "3.1x" },
    { name: "Doon Green Cover Drive", status: "Completed", budget: "₹24L", spent: "₹22L", participation: 8400, roi: "4.2x" },
    { name: "Bindal River Revival", status: "Active", budget: "₹32L", spent: "₹21L", participation: 3600, roi: "2.1x" },
    { name: "Tourist Zone Cleanup", status: "Planned", budget: "₹12L", spent: "₹0", participation: 0, roi: "—" },
];

const budgetData = [
    { campaign: "Rispana", budget: 18, impact: 72 },
    { campaign: "Zero Waste", budget: 8, impact: 48 },
    { campaign: "Green Cover", budget: 24, impact: 91 },
    { campaign: "Bindal", budget: 32, impact: 56 },
    { campaign: "Tourist", budget: 12, impact: 0 },
];

export default function CampaignsPage() {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 pb-8">

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
                        <Megaphone className="w-6 h-6 text-[#00ff9d]" />
                        Dehradun Campaign & Mission Control
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        DMC campaign management, ROI tracking & volunteer performance
                    </p>
                </div>
                <button className="px-5 py-2.5 rounded-lg text-sm font-bold bg-[#00ff9d] text-black hover:opacity-90 transition-opacity shadow-[0_0_15px_rgba(0,255,153,0.3)]">
                    + New Campaign
                </button>
            </div>

            {/* Campaigns Table */}
            <div className="bg-[#0a0a0a] rounded-xl border border-gray-800 shadow-xl overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-gray-800 bg-white/5">
                            <th className="text-left px-6 py-4 text-gray-400 font-semibold">Campaign</th>
                            <th className="text-left px-6 py-4 text-gray-400 font-semibold">Status</th>
                            <th className="text-left px-6 py-4 text-gray-400 font-semibold">Budget</th>
                            <th className="text-left px-6 py-4 text-gray-400 font-semibold">Spent</th>
                            <th className="text-left px-6 py-4 text-gray-400 font-semibold">Participation</th>
                            <th className="text-left px-6 py-4 text-gray-400 font-semibold">ROI</th>
                        </tr>
                    </thead>
                    <tbody>
                        {campaigns.map((c, i) => (
                            <tr key={i} className="border-b border-gray-800/50 last:border-0 hover:bg-white/5 transition-colors group">
                                <td className="px-6 py-4 font-bold text-white group-hover:text-[#00ff9d] transition-colors">{c.name}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wider uppercase border ${c.status === "Active" ? "bg-[#00ff9d]/10 text-[#00ff9d] border-[#00ff9d]/20" :
                                            c.status === "Completed" ? "bg-blue-500/10 text-blue-400 border-blue-500/20" :
                                                "bg-white/5 text-gray-400 border-gray-700"
                                        }`}>
                                        {c.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 font-mono font-medium text-gray-300">{c.budget}</td>
                                <td className="px-6 py-4 font-mono font-medium text-gray-500">{c.spent}</td>
                                <td className="px-6 py-4 font-mono font-bold text-white">{c.participation.toLocaleString()}</td>
                                <td className="px-6 py-4 font-mono font-bold text-[#00ff9d]">{c.roi}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Bar Chart */}
            <div className="bg-[#0a0a0a] rounded-xl border border-gray-800 p-5 shadow-lg">
                <h3 className="text-sm font-bold text-white tracking-wide mb-6">Budget vs Impact — Dehradun Campaigns</h3>
                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={budgetData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <XAxis
                                dataKey="campaign"
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
                            {/* Budget Bar - Gray */}
                            <Bar dataKey="budget" fill="#374151" radius={[4, 4, 0, 0]} barSize={20} name="Budget (₹L)" />
                            {/* Impact Bar - Neon Green */}
                            <Bar dataKey="impact" fill="#00ff9d" radius={[4, 4, 0, 0]} barSize={20} name="Impact Score" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

        </motion.div>
    );
}