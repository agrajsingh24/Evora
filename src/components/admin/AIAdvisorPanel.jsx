import React from "react";
import { BrainCircuit, AlertTriangle, TrendingUp, DollarSign, Activity, Zap, Droplets } from "lucide-react";

const insights = [
    {
        type: "urgent",
        icon: Droplets,
        title: "Rispana Sewage Overflow — ISBT",
        description: "Untreated sewage discharge detected near ISBT bridge. 89% probability of escalation. Recommend emergency drain diversion.",
        action: "Deploy Cleanup Team",
    },
    {
        type: "risk",
        icon: AlertTriangle,
        title: "Monsoon Flood Risk — Prem Nagar",
        description: "Pre-monsoon patterns indicate 67% waterlogging probability in Prem Nagar underpass within 14 days. Drainage at 31% capacity.",
        action: "Pre-deploy Pumps",
    },
    {
        type: "urgent",
        icon: Activity,
        title: "Deforestation Alert — Mussoorie Road",
        description: "Satellite imagery confirms illegal tree felling near Kolhu Khet. 12 trees removed without clearance in last 48h.",
        action: "Issue Stop Order",
    },
    {
        type: "budget",
        icon: DollarSign,
        title: "Budget Reallocation — River Cleanup",
        description: "Reallocating ₹1.8Cr from low-priority road beautification to Rispana-Bindal cleanup can improve river health score by 18%.",
        action: "Simulate Impact",
    },
    {
        type: "policy",
        icon: TrendingUp,
        title: "Tourist Waste Policy — Sahastradhara",
        description: "Sahastradhara generates 680kg waste/day. AI recommends mandatory deposit-refund scheme for plastic at entry points.",
        action: "Review Policy",
    },
    {
        type: "anomaly",
        icon: Zap,
        title: "AQI Anomaly — Rajpur Road",
        description: "PM2.5 spiked to 182 near Astley Hall. Construction + traffic convergence. Similar pattern predicted for next 3 days.",
        action: "Issue Advisory",
    },
];

// Mapped to EVORA Theme
const typeStyles = {
    urgent: "border-l-red-500",
    risk: "border-l-yellow-500",
    budget: "border-l-[#00ff9d]",
    policy: "border-l-blue-400",
    anomaly: "border-l-yellow-500",
};

const iconStyles = {
    urgent: "text-red-500",
    risk: "text-yellow-500",
    budget: "text-[#00ff9d]",
    policy: "text-blue-400",
    anomaly: "text-yellow-500",
};

export function AIAdvisorPanel() {
    return (
        <div className="p-4 space-y-4 bg-[#0a0a0a] h-full overflow-y-auto no-scrollbar border-l border-gray-800">

            {/* Header */}
            <div className="flex items-center gap-3 pb-4 border-b border-gray-800">
                <div className="w-8 h-8 rounded-lg bg-[#00ff9d]/10 border border-[#00ff9d]/30 flex items-center justify-center shadow-[0_0_10px_rgba(0,255,153,0.2)]">
                    <BrainCircuit className="w-4 h-4 text-[#00ff9d]" />
                </div>
                <div>
                    <h3 className="text-sm font-bold text-white tracking-wide">Dehradun AI Advisor</h3>
                    <p className="text-[10px] text-gray-500">Environmental intelligence co-pilot</p>
                </div>
            </div>

            {/* Status */}
            <div className="flex items-center gap-2 px-3 py-2 rounded-md bg-[#00ff9d]/5 border border-[#00ff9d]/20">
                <div className="w-1.5 h-1.5 rounded-full bg-[#00ff9d] animate-pulse" />
                <span className="text-[11px] text-[#00ff9d] font-mono tracking-wide">Monitoring 20 Dehradun zones</span>
            </div>

            {/* Insights */}
            <div className="space-y-3">
                {insights.map((insight, i) => {
                    const InsightIcon = insight.icon;
                    return (
                        <div
                            key={i}
                            className={`border-l-2 rounded-r-md bg-[#050505] border-y border-r border-gray-800 p-3 space-y-2 hover:bg-white/5 transition-colors ${typeStyles[insight.type]}`}
                        >
                            <div className="flex items-start gap-2">
                                <InsightIcon className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${iconStyles[insight.type]}`} />
                                <div className="space-y-1 min-w-0">
                                    <h4 className="text-xs font-bold text-white">{insight.title}</h4>
                                    <p className="text-[11px] text-gray-400 leading-relaxed">{insight.description}</p>
                                </div>
                            </div>
                            <button className="w-full py-1.5 mt-2 rounded text-[10px] font-bold bg-white/5 hover:bg-white/10 text-white transition-colors border border-gray-700 hover:border-gray-500">
                                {insight.action}
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}