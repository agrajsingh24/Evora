import React from "react";
import { motion } from "framer-motion";
import { Trophy, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { zoneLeaderboard } from "../../data/data";

export default function LeaderboardPage() {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 pb-8">

            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
                    <Trophy className="w-6 h-6 text-[#00ff9d]" />
                    Dehradun Sustainability Leaderboard
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                    Zone rankings by environmental performance & citizen participation
                </p>
            </div>

            {/* Leaderboard Table */}
            <div className="bg-[#0a0a0a] rounded-xl border border-gray-800 shadow-xl overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-gray-800 bg-white/5">
                            <th className="text-center px-6 py-4 text-gray-400 font-semibold w-16">#</th>
                            <th className="text-left px-6 py-4 text-gray-400 font-semibold">Zone</th>
                            <th className="text-center px-6 py-4 text-gray-400 font-semibold w-1/3">Sustainability Score</th>
                            <th className="text-center px-6 py-4 text-gray-400 font-semibold">Participation %</th>
                            <th className="text-center px-6 py-4 text-gray-400 font-semibold">Trend</th>
                        </tr>
                    </thead>
                    <tbody>
                        {zoneLeaderboard.map((z) => {
                            // Parse the trend string (e.g., "+4%") to an integer for conditional styling
                            const trendVal = parseInt(z.trend);

                            return (
                                <tr
                                    key={z.rank}
                                    className="border-b border-gray-800/50 last:border-0 hover:bg-white/5 transition-colors group"
                                >
                                    <td className="px-6 py-4 text-center">
                                        {z.rank <= 3 ? (
                                            <span className="text-xl filter drop-shadow-md">
                                                {z.rank === 1 ? "🥇" : z.rank === 2 ? "🥈" : "🥉"}
                                            </span>
                                        ) : (
                                            <span className="font-mono text-gray-500 font-bold">{z.rank}</span>
                                        )}
                                    </td>

                                    <td className="px-6 py-4 font-bold text-white group-hover:text-[#00ff9d] transition-colors">
                                        {z.zone}
                                    </td>

                                    <td className="px-6 py-4 text-center">
                                        <div className="flex items-center justify-center gap-3">
                                            <div className="w-full max-w-[150px] h-2 rounded-full bg-white/10 overflow-hidden">
                                                <div
                                                    className="h-full rounded-full bg-[#00ff9d] shadow-[0_0_10px_rgba(0,255,153,0.5)]"
                                                    style={{ width: `${z.score}%` }}
                                                />
                                            </div>
                                            <span className="font-mono text-[#00ff9d] font-bold w-8">{z.score}</span>
                                        </div>
                                    </td>

                                    <td className="px-6 py-4 text-center font-mono text-gray-400">
                                        {z.participation}%
                                    </td>

                                    <td className="px-6 py-4 text-center">
                                        <span
                                            className={`inline-flex items-center gap-1 text-xs font-mono font-bold px-2.5 py-1 rounded-full border ${trendVal > 0
                                                ? "text-[#00ff9d] bg-[#00ff9d]/10 border-[#00ff9d]/20"
                                                : trendVal < 0
                                                    ? "text-red-500 bg-red-500/10 border-red-500/20"
                                                    : "text-gray-400 bg-white/5 border-gray-700"
                                                }`}
                                        >
                                            {trendVal > 0 ? (
                                                <TrendingUp className="w-3 h-3" />
                                            ) : trendVal < 0 ? (
                                                <TrendingDown className="w-3 h-3" />
                                            ) : (
                                                <Minus className="w-3 h-3" />
                                            )}
                                            {z.trend}
                                        </span>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </motion.div>
    );
}