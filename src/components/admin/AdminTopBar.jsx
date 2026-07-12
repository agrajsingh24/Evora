import React from "react";
import { Bell, Activity, AlertTriangle, Clock, Droplets, User, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom"; // 🔥 Added for navigation

const metrics = [
    { label: "Doon Sustainability", value: "64.2", icon: Activity, status: "warning" },
    { label: "River Alerts", value: "23", icon: Droplets, status: "critical" },
    { label: "Avg Resolution", value: "3.8h", icon: Clock, status: "warning" },
    { label: "AQI (Rajpur Rd)", value: "142", icon: AlertTriangle, status: "warning" },
];

const statusColors = {
    safe: "text-[#00ff9d]",
    warning: "text-yellow-500",
    critical: "text-red-500",
};

export function TopBar({ onToggleAI, aiPanelOpen }) {
    const navigate = useNavigate(); // 🔥 Initialize navigation

    // 🔥 Added secure logout function
    const handleAdminLogout = () => {
        localStorage.removeItem("adminLoggedIn");
        navigate("/");
    };

    return (
        <header className="flex items-center justify-between h-16 px-6 border-b border-gray-800 bg-[#0a0a0a]">

            {/* Live Metrics */}
            <div className="flex items-center gap-6 overflow-x-auto no-scrollbar">
                {metrics.map((m) => {
                    const Icon = m.icon;
                    return (
                        <div key={m.label} className="flex items-center gap-2 whitespace-nowrap">
                            <Icon className={`w-4 h-4 ${statusColors[m.status]}`} />
                            <div className="flex items-baseline gap-1.5">
                                <span className={`text-sm font-mono font-bold ${statusColors[m.status]}`}>
                                    {m.value}
                                </span>
                                <span className="text-xs text-gray-400 hidden lg:inline">{m.label}</span>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-4 ml-4 shrink-0">

                {/* Sync Indicator */}
                <div className="hidden sm:flex items-center gap-2 bg-white/5 px-2 py-1 rounded-md">
                    <div className="w-2 h-2 rounded-full bg-[#00ff9d] animate-pulse" />
                    <span className="text-[10px] text-gray-400 font-mono tracking-wider">DEHRADUN LIVE</span>
                </div>

                {/* Notifications */}
                <button className="relative p-2 rounded-md text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-red-500 text-[9px] font-bold flex items-center justify-center text-white border border-[#0a0a0a]">
                        7
                    </span>
                </button>

                {/* AI Panel Toggle */}
                <button
                    onClick={onToggleAI}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${aiPanelOpen
                        ? "bg-[#00ff9d]/10 text-[#00ff9d] border-[#00ff9d]/30"
                        : "bg-transparent text-gray-400 border-gray-700 hover:text-white hover:bg-white/5"
                        }`}
                >
                    🤖 AI Advisor
                </button>

                <div className="h-6 w-px bg-gray-800 mx-1"></div>

                {/* Admin Profile & Logout */}
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-3 cursor-pointer group">
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-[#00ff9d]/20 transition-colors">
                            <User className="w-4 h-4 text-gray-300 group-hover:text-[#00ff9d]" />
                        </div>
                        <span className="text-sm font-bold text-white hidden xl:inline">DMC Admin</span>
                    </div>

                    {/* 🔥 New Logout Button */}
                    <button
                        onClick={handleAdminLogout}
                        className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                        title="Logout Admin"
                    >
                        <LogOut className="w-5 h-5" />
                    </button>
                </div>

            </div>
        </header>
    );
}