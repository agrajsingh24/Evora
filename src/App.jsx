import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// ==========================================
// LAYOUTS (These handle your different Navbars)
// ==========================================
import AdminLayout from "./layouts/AdminLayout";

// Admin Pages
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";

function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* ------------------------------------------------------------- */}
          {/* ADMIN ROUTES (Uses AdminLayout: AdminNavbar)                  */}
          {/* ------------------------------------------------------------- */}
          <Route element={<AdminLayout />}>
            <Route path="/AdminLogin" element={<AdminLogin />} />
            <Route path="/AdminDashboard" element={<AdminDashboard />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
