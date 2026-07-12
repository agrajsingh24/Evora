import React from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { month: "Jan", time: 4.2 },
  { month: "Feb", time: 3.8 },
  { month: "Mar", time: 3.5 },
  { month: "Apr", time: 3.1 },
  { month: "May", time: 2.9 },
  { month: "Jun", time: 2.7 },
  { month: "Jul", time: 2.4 },
  { month: "Aug", time: 2.6 },
  { month: "Sep", time: 2.3 },
  { month: "Oct", time: 2.1 },
  { month: "Nov", time: 2.0 },
  { month: "Dec", time: 1.8 },
];

export function ResolutionTrend() {
  return (
    <div className="bg-[#0a0a0a] rounded-lg border border-gray-800 p-4 shadow-lg">
      <h3 className="text-sm font-semibold text-white mb-1">Resolution Time Trend</h3>
      <p className="text-[10px] text-gray-400 mb-4">Average hours to resolve • Improving ↓</p>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="resGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00ff9d" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#00ff9d" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 10, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{ background: "#050505", border: "1px solid #1f2937", borderRadius: 6, fontSize: 11 }}
              labelStyle={{ color: "#f3f4f6" }}
            />
            <Area type="monotone" dataKey="time" stroke="#00ff9d" fill="url(#resGrad)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}