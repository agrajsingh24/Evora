import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// ==========================================
// LAYOUTS (These handle your different Navbars)
// ==========================================
import CitizenLayout from "./layouts/CitizenLayout";
import CivicFlowLayout from "./layouts/CivicFlowLayout";
import AdminLayout from "./layouts/AdminLayout";


// Citizen Pages
import CitizenAgreement from "./pages/citizen/CitizenAgreement";
import CitizenLogin from "./pages/citizen/CitizenLogin";
import CitizenHome from './pages/citizen/CitizenHome';
import CitizenAbout from './pages/citizen/CitizenAbout';
import CivicFlow from './pages/citizen/civic-flow/CivicFlow';
import CitizenDashboard from './pages/citizen/civic-flow/CitizenDashboard';
import Report from './pages/citizen/civic-flow/Report';
import Reward from './pages/citizen/civic-flow/Reward';


// Admin Pages
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import GeoSpatialPage from './pages/admin/GeoSpatialPage';
import LeaderboardPage from './pages/admin/LeaderboardPage';
import RiverHealthPage from './pages/admin/RiverHealthPage';
import HimalayanEcoPage from './pages/admin/HimalayanEcoPage';
import TourismImpactPage from './pages/admin/TourismImpactPage';
import RiskForecastingPage from './pages/admin/RiskForecastingPage';
import WorkforcePage from './pages/admin/WorkforcePage';
import ImpactPage from './pages/admin/ImpactPage';
import CommunityPage from './pages/admin/CommunityPage';
import CampaignsPage from './pages/admin/CampaignsPage';
import PolicyPage from './pages/admin/PolicyPage';
import CompliancePage from './pages/admin/CompliancePage';
import LiveVehicleTrack from './pages/admin/LiveVehicleTrack';

function App() {
  return (
    <>
      <Router>
        <Routes>

          {/* ------------------------------------------------------------- */}
          {/* CITIZEN ROUTES (Uses CitizenLayout: CitizenNavbar)            */}
          {/* ------------------------------------------------------------- */}
                    <Route element={<CitizenLayout />}>
            <Route path="/CitizenAgreement" element={<CitizenAgreement />} />
            <Route path="/CitizenLogin" element={<CitizenLogin />} />
            <Route path="/CitizenHome" element={<CitizenHome />} />
            <Route path="/CitizenAbout" element={<CitizenAbout />} />
          </Route>

          <Route element={<CivicFlowLayout />}>
            {/* CivicFlow System */}
            <Route path="/civicflow" element={<CivicFlow />} />
            <Route path="/CitizenDashboard" element={<CitizenDashboard />} />
            <Route path="/Report" element={<Report />} />
            <Route path="/Reward" element={<Reward />} />
          </Route>
          


          {/* ------------------------------------------------------------- */}
          {/* ADMIN ROUTES (Uses AdminLayout: AdminNavbar)                  */}
          {/* ------------------------------------------------------------- */}
          <Route element={<AdminLayout />}>
            <Route path="/AdminLogin" element={<AdminLogin />} />
            <Route path="/AdminDashboard" element={<AdminDashboard />} />
            <Route path="/geo-spatial" element={<GeoSpatialPage />} />
            <Route path="/leaderboard" element={<LeaderboardPage />} />
            <Route path="/river-health" element={<RiverHealthPage />} />
            <Route path="/himalayan-eco" element={<HimalayanEcoPage />} />
            <Route path="/tourism-impact" element={<TourismImpactPage />} />
            <Route path="/risk-forecasting" element={<RiskForecastingPage />} />
            <Route path="/workforce" element={<WorkforcePage />} />
            <Route path="/Admin/live-vehicle-track" element={<LiveVehicleTrack />} />
            <Route path="/impact" element={<ImpactPage />} />
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/campaigns" element={<CampaignsPage />} />
            <Route path="/policy" element={<PolicyPage />} />
            <Route path="/compliance" element={<CompliancePage />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;