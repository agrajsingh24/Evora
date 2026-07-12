import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { SidebarNav } from "../components/admin/AdminSidebarNav";
import { TopBar } from "../components/admin/AdminTopBar";
import { AIAdvisorPanel } from "../components/admin/AIAdvisorPanel";

export default function AdminLayout() {
  const location = useLocation();

  // State for toggles
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isAIPanelOpen, setIsAIPanelOpen] = useState(false);

  // Hide the entire admin shell if we are on the login screen
  const isLoginPage = location.pathname === "/AdminLogin";

  if (isLoginPage) {
    return (
      <div className="min-h-screen bg-[#020617]">
        <Outlet />
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full bg-[#020617] overflow-hidden font-inter text-white">

      {/* 1. Left Sidebar */}
      <SidebarNav
        collapsed={isSidebarCollapsed}
        onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />

      {/* 2. Right Side Wrapper (Top Nav + Content + AI Panel) */}
      <div className="flex-1 flex flex-col overflow-hidden relative">

        {/* Top Navigation */}
        <TopBar
          aiPanelOpen={isAIPanelOpen}
          onToggleAI={() => setIsAIPanelOpen(!isAIPanelOpen)}
        />

        {/* Container for Main Content and AI Panel */}
        <div className="flex-1 flex overflow-hidden relative">

          {/* Main Dashboard Content Area */}
          <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 transition-all duration-300">
            <div className="max-w-7xl mx-auto">
              <Outlet />
            </div>
          </main>

          {/* AI Advisor Panel (Conditionally rendered to the right) */}
          {isAIPanelOpen && (
            <aside className="w-80 flex-shrink-0 border-l border-gray-800 bg-[#0a0a0a] shadow-2xl animate-in slide-in-from-right duration-300">
              <AIAdvisorPanel />
            </aside>
          )}

        </div>
      </div>

    </div>
  );
}