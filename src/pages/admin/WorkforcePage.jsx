import React from "react";
import { motion } from "framer-motion";
import { ClipboardList, Clock, CheckCircle, AlertTriangle, ToggleLeft } from "lucide-react";

const taskCounters = [
    { label: "Active", value: 187, icon: ClipboardList, status: "text-[#00ff9d]" },
    { label: "Overdue", value: 23, icon: AlertTriangle, status: "text-red-500" },
    { label: "Completed", value: 1420, icon: CheckCircle, status: "text-blue-400" },
];

const kanbanColumns = [
    {
        title: "To Do",
        color: "border-gray-600",
        tasks: [
            { id: 1, title: "Rispana drain cleanup — ISBT stretch", priority: "Critical", assignee: "Officer R. Negi", sla: "2h 15m" },
            { id: 2, title: "Tree census — Rajaji corridor", priority: "Medium", assignee: "Team Doon Alpha", sla: "12h 10m" },
        ],
    },
    {
        title: "In Progress",
        color: "border-[#00ff9d]",
        tasks: [
            { id: 3, title: "Water quality sampling — Bindal river", priority: "Critical", assignee: "Officer S. Rawat", sla: "1h 05m" },
            { id: 4, title: "Waste segregation audit — Prem Nagar", priority: "Medium", assignee: "Team Doon Beta", sla: "6h 30m" },
        ],
    },
    {
        title: "Review",
        color: "border-yellow-500",
        tasks: [
            { id: 5, title: "AQI monitor installation — Rajpur Road", priority: "High", assignee: "Officer K. Bisht", sla: "Done" },
        ],
    },
    {
        title: "Done",
        color: "border-blue-500",
        tasks: [
            { id: 6, title: "Sahastradhara tourist zone cleanup", priority: "High", assignee: "Team Doon Gamma", sla: "Done" },
            { id: 7, title: "Solar panel inspection — FRI campus", priority: "Medium", assignee: "Officer A. Chauhan", sla: "Done" },
        ],
    },
];

const priorityStyle = {
    Critical: "bg-red-500/10 text-red-500 border border-red-500/20",
    High: "bg-yellow-500/10 text-yellow-500 border border-yellow-500/20",
    Medium: "bg-[#00ff9d]/10 text-[#00ff9d] border border-[#00ff9d]/20",
    Low: "bg-white/5 text-gray-400 border border-gray-700",
};

export default function WorkforcePage() {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 pb-8">

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white tracking-tight">Dehradun Workforce & Task Management</h1>
                    <p className="text-sm text-gray-500 mt-1">DMC smart task allocation with SLA tracking</p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#00ff9d]/10 border border-[#00ff9d]/20 cursor-pointer hover:bg-[#00ff9d]/20 transition-colors">
                    <ToggleLeft className="w-5 h-5 text-[#00ff9d]" />
                    <span className="text-sm font-bold text-[#00ff9d]">Smart Auto-Assign</span>
                </div>
            </div>

            {/* Counters */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {taskCounters.map((t) => {
                    const Icon = t.icon;
                    return (
                        <div key={t.label} className="bg-[#0a0a0a] rounded-xl border border-gray-800 p-5 flex items-center gap-4 shadow-lg">
                            <div className={`p-3 rounded-lg bg-white/5 ${t.status}`}>
                                <Icon className="w-6 h-6" />
                            </div>
                            <div>
                                <div className={`text-3xl font-bold font-mono ${t.status}`}>{t.value}</div>
                                <div className="text-xs font-semibold tracking-wider text-gray-500 uppercase mt-1">{t.label} Tasks</div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Kanban Board */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 pt-2">
                {kanbanColumns.map((col) => (
                    <div key={col.title} className={`rounded-xl border-t-4 bg-[#050505] border-gray-800 p-4 space-y-4 shadow-lg ${col.color}`}>

                        <div className="flex items-center justify-between mb-2">
                            <h4 className="text-sm font-bold text-white uppercase tracking-wider">{col.title}</h4>
                            <span className="text-xs text-gray-400 font-mono bg-white/5 px-2 py-0.5 rounded-full">{col.tasks.length}</span>
                        </div>

                        <div className="space-y-3">
                            {col.tasks.map((task) => (
                                <div
                                    key={task.id}
                                    className="bg-[#0a0a0a] rounded-lg border border-gray-800 p-4 space-y-3 cursor-pointer hover:border-gray-500 hover:bg-white/5 transition-all shadow-md group"
                                >
                                    <p className="text-sm font-bold text-white leading-tight group-hover:text-[#00ff9d] transition-colors">{task.title}</p>

                                    <div className="flex items-center justify-between">
                                        <span className={`text-[10px] px-2 py-1 rounded-md font-bold uppercase tracking-wider ${priorityStyle[task.priority]}`}>
                                            {task.priority}
                                        </span>
                                        <div className="flex items-center gap-1.5 bg-white/5 px-2 py-1 rounded-md">
                                            <Clock className="w-3.5 h-3.5 text-gray-400" />
                                            <span className="text-[11px] font-mono font-bold text-gray-300">{task.sla}</span>
                                        </div>
                                    </div>

                                    <div className="pt-2 border-t border-gray-800/50">
                                        <p className="text-xs text-gray-500 font-medium">{task.assignee}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                ))}
            </div>
        </motion.div>
    );
}