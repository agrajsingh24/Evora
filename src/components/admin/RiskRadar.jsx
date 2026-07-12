import React from "react";
import { AlertTriangle, Zap } from "lucide-react";

const hotspots = [
    { zone: "Rispana River — ISBT Stretch", risk: "Sewage overflow & solid waste", probability: 89, status: "critical" },
    { zone: "Bindal River — Parade Ground", risk: "Industrial toxic discharge", probability: 76, status: "critical" },
    { zone: "Sahastradhara — Tourist Zone", risk: "Tourist waste accumulation", probability: 68, status: "warning" },
    { zone: "Doiwala Bypass — Peri-Urban", risk: "Illegal construction debris dumping", probability: 62, status: "warning" },
    { zone: "Rajpur Road — Astley Hall", risk: "PM2.5 spike from traffic & construction", probability: 54, status: "warning" },
    { zone: "Mussoorie Foothills — Kolhu Khet", risk: "Illegal deforestation for construction", probability: 71, status: "critical" },
];

const statusStyles = {
    critical: { bg: "bg-red-500/10", bar: "bg-red-500", text: "text-red-500" },
    warning: { bg: "bg-yellow-500/10", bar: "bg-yellow-500", text: "text-yellow-500" },
};

export function RiskRadar() {
    return (
        <div className="bg-[#0a0a0a] rounded-lg border border-gray-800 h-full flex flex-col shadow-lg">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-800">
                <AlertTriangle className="w-4 h-4 text-red-500" />
                <h3 className="text-sm font-semibold text-white">Dehradun AI Risk Radar</h3>
            </div>

            <div className="flex-1 p-4 space-y-3 overflow-y-auto no-scrollbar">
                {hotspots.map((h, i) => {
                    const style = statusStyles[h.status];
                    return (
                        <div key={i} className={`rounded-md p-3 space-y-2 ${style.bg}`}>
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-medium text-white">{h.zone}</span>
                                <span className={`text-xs font-mono font-bold ${style.text}`}>
                                    {h.probability}%
                                </span>
                            </div>
                            <div className="text-[10px] text-gray-400">{h.risk}</div>
                            <div className="w-full h-1 rounded-full bg-white/10 overflow-hidden">
                                <div
                                    className={`h-full rounded-full transition-all ${style.bar}`}
                                    style={{ width: `${h.probability}%` }}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="p-4 border-t border-gray-800">
                <button className="w-full py-2 rounded-md text-xs font-semibold bg-[#00ff9d] text-black hover:opacity-90 transition-opacity flex items-center justify-center gap-1.5 shadow-[0_0_10px_rgba(0,255,153,0.3)]">
                    <Zap className="w-3 h-3" />
                    Generate Dehradun Action Plan
                </button>
            </div>
        </div>
    );
}