import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
    LayoutDashboard, Map, BrainCircuit,Navigation, ClipboardList, Leaf, Users,
    Megaphone, PiggyBank, Shield, ChevronLeft, ChevronRight, Zap,
    Palmtree, Mountain, Droplets, Trophy,
} from "lucide-react";

const navGroups = [
    {
        label: "Executive Intelligence",
        items: [
            { icon: LayoutDashboard, label: "Dehradun Overview", path: "/AdminDashboard" }, // Adjusted path to match your setup
            { icon: Map, label: "Geo-Spatial Intel", path: "/geo-spatial" },
            { icon: Trophy, label: "Zone Leaderboard", path: "/leaderboard" },
        ],
    },
    {
        label: "Environmental Monitoring",
        items: [
            { icon: Droplets, label: "River Health", path: "/river-health" },
            { icon: Mountain, label: "Himalayan Ecosystem", path: "/himalayan-eco" },
            { icon: Palmtree, label: "Tourism Impact", path: "/tourism-impact" },
        ],
    },
    {
        label: "Predictive AI",
        items: [
            { icon: BrainCircuit, label: "Risk Forecasting", path: "/risk-forecasting" },
        ],
    },
    {
        label: "Operational Control",
        items: [
            { icon: Navigation, label: "Live Tracking", path: "/Admin/live-vehicle-track" },
            { icon: ClipboardList, label: "Workforce Mgmt", path: "/workforce" },
            { icon: Leaf, label: "Impact Dashboard", path: "/impact" },
        ],
    },
    {
        label: "Community & Governance",
        items: [
            { icon: Users, label: "Community Intel", path: "/community" },
            { icon: Megaphone, label: "Campaign Control", path: "/campaigns" },
            { icon: PiggyBank, label: "Policy & Budget", path: "/policy" },
            { icon: Shield, label: "Compliance", path: "/compliance" },
        ],
    },
];

export function SidebarNav({ collapsed, onToggle }) {
    const location = useLocation();

    return (
        <div
            className={`flex flex-col h-full border-r border-gray-800 bg-[#050505] transition-all duration-300 ${collapsed ? "w-16" : "w-64"
                }`}
        >
            {/* Logo */}
            <div className="flex items-center gap-3 px-4 h-16 border-b border-gray-800">
                <div className="flex items-center justify-center min-w-8 w-8 h-8 rounded-lg bg-[#00ff9d]/10 border border-[#00ff9d]/30">
                    <Zap className="w-4 h-4 text-[#00ff9d]" />
                </div>
                {!collapsed && (
                    <div className="overflow-hidden whitespace-nowrap">
                        <span className="text-sm font-bold tracking-tight text-white block">DOON SICC</span>
                        <span className="block text-[10px] text-gray-500 leading-tight">Dehradun Command Center</span>
                    </div>
                )}
            </div>

            {/* Nav Groups */}
            <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-6 no-scrollbar">
                {navGroups.map((group) => (
                    <div key={group.label}>
                        {!collapsed && (
                            <div className="px-3 mb-2 text-[10px] font-bold uppercase tracking-widest text-gray-500">
                                {group.label}
                            </div>
                        )}
                        <div className="space-y-1">
                            {group.items.map((item) => {
                                const isActive = location.pathname === item.path;
                                return (
                                    <NavLink
                                        key={item.path}
                                        to={item.path}
                                        className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${isActive
                                            ? "bg-[#00ff9d]/10 text-[#00ff9d] font-medium"
                                            : "text-gray-400 hover:bg-white/5 hover:text-white"
                                            }`}
                                    >
                                        <item.icon className={`w-4 h-4 shrink-0 ${isActive ? "text-[#00ff9d]" : ""}`} />
                                        {!collapsed && <span className="truncate">{item.label}</span>}
                                    </NavLink>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </nav>

            {/* Collapse Button */}
            <button
                onClick={onToggle}
                className="flex items-center justify-center h-12 border-t border-gray-800 text-gray-500 hover:text-white hover:bg-white/5 transition-colors"
            >
                {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
            </button>
        </div>
    );
}