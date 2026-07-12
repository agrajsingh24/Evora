import React from "react";
import { motion } from "framer-motion";
import { MapPin, Filter, Calendar } from "lucide-react";
import { dehradunZones } from "../../data/data";

const riskColor = {
    Low: "#00ff9d",    // EVORA Green
    Medium: "#eab308", // Yellow
    High: "#f97316",   // Orange
    Critical: "#ef4444"// Red 
};

const riskStyle = {
    Low: "bg-[#00ff9d]/15 text-[#00ff9d]",
    Medium: "bg-yellow-500/15 text-yellow-500",
    High: "bg-orange-500/15 text-orange-500",
    Critical: "bg-red-500/20 text-red-500",
};

function toPos(lat, lng) {
    const x = ((lng - 77.90) / (78.15 - 77.90)) * 100;
    const y = ((30.45 - lat) / (30.45 - 30.20)) * 100;
    return { x: Math.max(3, Math.min(97, x)), y: Math.max(3, Math.min(97, y)) };
}

export default function GeoSpatialPage() {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 pb-8">

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white tracking-tight">Dehradun Geo-Spatial Intelligence</h1>
                    <p className="text-sm text-gray-500 mt-1">Ward-level analytics & predictive risk overlay — Doon Valley</p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-gray-800 text-sm font-medium text-gray-300 hover:bg-white/10 hover:text-white transition-colors">
                        <Filter className="w-4 h-4" /> Zone Filter
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-gray-800 text-sm font-medium text-gray-300 hover:bg-white/10 hover:text-white transition-colors">
                        <Calendar className="w-4 h-4" /> Date Range
                    </button>
                </div>
            </div>

            {/* Map Area */}
            <div className="bg-[#0a0a0a] rounded-xl border border-gray-800 shadow-xl overflow-hidden p-1">
                <div className="relative h-[400px] lg:h-[500px] bg-[#050505] overflow-hidden rounded-lg">
                    <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <pattern id="geo-grid" width="50" height="50" patternUnits="userSpaceOnUse">
                                <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#geo-grid)" />
                    </svg>

                    {dehradunZones.map((zone) => {
                        const pos = toPos(zone.lat, zone.lng);
                        const size = zone.risk === "Critical" ? 56 : zone.risk === "High" ? 46 : zone.risk === "Medium" ? 38 : 30;
                        return (
                            <div
                                key={zone.id}
                                className="absolute rounded-full cursor-pointer transition-transform hover:scale-110 group"
                                style={{
                                    left: `${pos.x}%`, top: `${pos.y}%`, width: size, height: size, transform: "translate(-50%, -50%)",
                                    background: `${riskColor[zone.risk]}20`, border: `1.5px solid ${riskColor[zone.risk]}80`,
                                }}
                            >
                                <div className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full -translate-x-1/2 -translate-y-1/2" style={{ background: riskColor[zone.risk] }} />

                                {/* Tooltip */}
                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 hidden group-hover:block z-20">
                                    <div className="bg-[#0a0a0a] text-white text-xs px-3 py-2.5 rounded-lg shadow-2xl whitespace-nowrap border border-gray-700 space-y-1.5">
                                        <div className="font-bold text-sm">{zone.name}</div>
                                        <div className="text-gray-400">Issues: <span className="text-white font-mono">{zone.issues}</span> • <span style={{ color: riskColor[zone.risk] }}>{zone.risk} Risk</span></div>
                                        <div className="text-gray-500 text-[11px] max-w-[200px] truncate">{zone.primaryConcern}</div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Data Table */}
            <div className="bg-[#0a0a0a] rounded-xl border border-gray-800 shadow-xl overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-gray-800 bg-white/5">
                            <th className="text-left px-6 py-4 text-gray-400 font-semibold">Zone / Ward</th>
                            <th className="text-left px-6 py-4 text-gray-400 font-semibold">Type</th>
                            <th className="text-left px-6 py-4 text-gray-400 font-semibold">Issues</th>
                            <th className="text-left px-6 py-4 text-gray-400 font-semibold">Risk Level</th>
                            <th className="text-left px-6 py-4 text-gray-400 font-semibold">Primary Concern</th>
                            <th className="text-right px-6 py-4 text-gray-400 font-semibold">Health Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dehradunZones.map((z) => (
                            <tr key={z.id} className="border-b border-gray-800/50 last:border-0 hover:bg-white/5 transition-colors cursor-pointer group">
                                <td className="px-6 py-4 font-bold text-white flex items-center gap-2">
                                    <MapPin className="w-4 h-4 text-gray-600 group-hover:text-[#00ff9d] transition-colors" />
                                    {z.name}
                                </td>
                                <td className="px-6 py-4 text-gray-400 capitalize">{z.type.replace("-", " ")}</td>
                                <td className="px-6 py-4 font-mono text-white">{z.issues}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase ${riskStyle[z.risk]}`}>
                                        {z.risk}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-gray-400 max-w-[250px] truncate">{z.primaryConcern}</td>
                                <td className="px-6 py-4 text-right font-mono font-bold text-[#00ff9d]">{z.sustainabilityScore}/100</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </motion.div>
    );
}