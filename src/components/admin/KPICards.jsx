import React from "react";
import { TrendingUp, AlertTriangle, MapPin, Gauge, Users, Droplets } from "lucide-react";

const kpis = [
    { label: "Dehradun Sustainability", value: "64.2", change: "-1.8%", icon: Gauge, status: "warning" },
    { label: "Active Environmental Issues", value: "1,089", change: "+12.3%", icon: AlertTriangle, status: "critical" },
    { label: "River Pollution Alerts", value: "23", change: "+7", icon: Droplets, status: "critical" },
    { label: "Waste Density Index", value: "72.6", change: "-3.1%", icon: MapPin, status: "warning" },
    { label: "Air Quality Score", value: "142", change: "+18", icon: TrendingUp, status: "warning" },
    { label: "Citizen Participation (Doon)", value: "47.3%", change: "+6.2%", icon: Users, status: "ai" },
];

const statusStyles = {
    safe: { border: "border-[#00ff9d]/30", text: "text-[#00ff9d]" },
    warning: { border: "border-yellow-500/30", text: "text-yellow-500" },
    critical: { border: "border-red-500/30", text: "text-red-500" },
    ai: { border: "border-[#00ff9d]/30", text: "text-[#00ff9d]" }, // Mapped AI to Evora Green
};

export function KPICards() {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
            {kpis.map((kpi) => {
                const style = statusStyles[kpi.status];
                const Icon = kpi.icon;

                return (
                    <div
                        key={kpi.label}
                        className={`bg-[#0a0a0a] rounded-lg p-4 space-y-2 border shadow-lg ${style.border}`}
                    >
                        <div className="flex items-center justify-between">
                            <Icon className={`w-4 h-4 ${style.text}`} />
                            <span className={`text-[10px] font-mono font-semibold ${style.text}`}>
                                {kpi.change}
                            </span>
                        </div>
                        <div>
                            <div className={`text-2xl font-bold font-mono ${style.text}`}>
                                {kpi.value}
                            </div>
                            <div className="text-[10px] text-gray-400 mt-0.5">{kpi.label}</div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}