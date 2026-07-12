import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

const data = [
    { dept: "Waste", score: 92 },
    { dept: "Water", score: 78 },
    { dept: "Air", score: 85 },
    { dept: "Green", score: 70 },
    { dept: "Energy", score: 88 },
    { dept: "Transit", score: 65 },
];

// Mapped to Evora theme colors
const getColor = (score) => {
    if (score >= 85) return "#00ff9d"; // Neon Green
    if (score >= 70) return "#eab308"; // Yellow
    return "#ef4444"; // Red
};

export function DepartmentPerformance() {
    return (
        <div className="bg-[#0a0a0a] rounded-lg border border-gray-800 p-4 shadow-lg">
            <h3 className="text-sm font-semibold text-white mb-4">Department Performance</h3>
            <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} layout="vertical" margin={{ left: 0, right: 8 }}>
                        <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 10, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
                        <YAxis type="category" dataKey="dept" tick={{ fontSize: 10, fill: "#d1d5db" }} axisLine={false} tickLine={false} width={50} />
                        <Tooltip
                            contentStyle={{ background: "#050505", border: "1px solid #1f2937", borderRadius: 6, fontSize: 11 }}
                            labelStyle={{ color: "#f3f4f6" }}
                            cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                        />
                        <Bar dataKey="score" radius={[0, 4, 4, 0]} barSize={14}>
                            {data.map((entry, i) => (
                                <Cell key={i} fill={getColor(entry.score)} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}