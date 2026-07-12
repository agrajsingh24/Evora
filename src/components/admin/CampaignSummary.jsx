import React from "react";
import { Megaphone } from "lucide-react";

const campaigns = [
    { name: "Clean River Initiative", status: "active", participation: 84, impact: "High" },
    { name: "Zero Waste Week", status: "active", participation: 72, impact: "Medium" },
    { name: "Plant 10K Trees", status: "completed", participation: 96, impact: "High" },
    { name: "Air Quality Awareness", status: "planned", participation: 0, impact: "Pending" },
];

const statusBadge = {
    active: "bg-[#00ff9d]/15 text-[#00ff9d]",
    completed: "bg-blue-500/15 text-blue-400",
    planned: "bg-white/10 text-gray-400",
};

export function CampaignSummary() {
    return (
        <div className="bg-[#0a0a0a] rounded-lg border border-gray-800 p-4 shadow-lg">
            <div className="flex items-center gap-2 mb-4">
                <Megaphone className="w-4 h-4 text-[#00ff9d]" />
                <h3 className="text-sm font-semibold text-white">Campaign Impact</h3>
            </div>
            <div className="space-y-3">
                {campaigns.map((c, i) => (
                    <div key={i} className="flex items-center justify-between py-2 border-b border-gray-800 last:border-0">
                        <div>
                            <div className="text-xs font-medium text-white">{c.name}</div>
                            <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium mt-1 inline-block ${statusBadge[c.status]}`}>
                                {c.status}
                            </span>
                        </div>
                        <div className="text-right">
                            <div className="text-sm font-mono font-semibold text-white">{c.participation}%</div>
                            <div className="text-[10px] text-gray-400">{c.impact}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}