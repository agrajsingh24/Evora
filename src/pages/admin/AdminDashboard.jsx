import React from "react";
import { motion } from "framer-motion";

// Updated import paths pointing to your components/admin folder
import { KPICards } from "../../components/admin/KPICards";
import { RiskRadar } from "../../components/admin/RiskRadar";
import { DepartmentPerformance } from "../../components/admin/DepartmentPerformance";
import { ResolutionTrend } from "../../components/admin/ResolutionTrend";
import { GISHeatmap } from "../../components/admin/GISHeatmap";
import { CampaignSummary } from "../../components/admin/CampaignSummary";

const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08 } },
};

const fadeUp = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const AdminDashboard = () => {
    return (
        <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-6 pb-8">
            {/* Page Title */}
            <motion.div variants={fadeUp}>
                <h1 className="text-2xl font-bold text-white tracking-tight">Dehradun Executive Overview</h1>
                <p className="text-xs text-gray-500 mt-1">
                    Doon Valley environmental intelligence • Dehradun Municipal Corporation • <span className="text-gray-400">Last synced 4s ago</span>
                </p>
            </motion.div>

            {/* KPI Cards */}
            <motion.div variants={fadeUp}>
                <KPICards />
            </motion.div>

            {/* Main Grid: Heatmap + Risk Radar */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                <motion.div variants={fadeUp} className="xl:col-span-2">
                    <GISHeatmap />
                </motion.div>
                <motion.div variants={fadeUp} className="h-full min-h-[400px]">
                    <RiskRadar />
                </motion.div>
            </div>

            {/* Bottom Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                <motion.div variants={fadeUp}>
                    <DepartmentPerformance />
                </motion.div>
                <motion.div variants={fadeUp}>
                    <ResolutionTrend />
                </motion.div>
                <motion.div variants={fadeUp}>
                    <CampaignSummary />
                </motion.div>
            </div>
        </motion.div>
    );
};

export default AdminDashboard;