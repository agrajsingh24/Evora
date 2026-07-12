import React, { useState } from "react";
import { Mail, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("admin@gmail.com");
  const [password, setPassword] = useState("123456");
  const [error, setError] = useState("");

  // Dummy Admin Credentials
  const adminEmail = "admin@gmail.com";
  const adminPassword = "123456";

  const handleLogin = (e) => {
    e.preventDefault();

    if (email === adminEmail && password === adminPassword) {
      localStorage.setItem("adminLoggedIn", "true");
      navigate("/AdminDashboard"); // redirect to admin dashboard
    } else {
      setError("⚠️ Incorrect admin email or password");
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <div className="bg-[#0a0a0a] border border-[#00ff9d40] rounded-2xl shadow-[0_0_25px_#00ff9d30] p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-[#00ff9d] text-center mb-6">
          Admin Login
        </h1>

        <form className="space-y-5" onSubmit={handleLogin}>
          {/* Email */}
          <div className="flex items-center gap-3 bg-white/10 px-4 py-3 rounded-xl border border-[#00ff9d20]">
            <Mail size={20} className="text-[#00ff9d]" />
            <input
              type="email"
              placeholder="Enter admin email"
              className="bg-transparent w-full outline-none text-white placeholder-gray-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div className="flex items-center gap-3 bg-white/10 px-4 py-3 rounded-xl border border-[#00ff9d20]">
            <Lock size={20} className="text-[#00ff9d]" />
            <input
              type="password"
              placeholder="Enter admin password"
              className="bg-transparent w-full outline-none text-white placeholder-gray-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Error Message */}
          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-3 bg-[#00ff9d] text-black font-semibold rounded-xl 
            hover:shadow-[0_0_20px_#00ff9d] transition"
          >
            Login as Admin
          </button>
        </form>

        {/* Admin Credentials Display
        <div className="mt-5 bg-black/40 border border-[#00ff9d20] rounded-xl p-4 text-gray-300 text-sm">
          <p className="text-[#00ff9d] font-semibold mb-2">
            Admin Login Credentials
          </p>
          <p> Email: <span className="text-white">{adminEmail}</span></p>
          <p> Password: <span className="text-white">{adminPassword}</span></p>
        </div> */}

        {/* Admin Authority Note */}
        <p className="mt-4 text-xs text-gray-400 text-center">
          Admins have special authority including access to system reports,
          student analytics, activity monitoring, and content management.
        </p>
      </div>
    </div>
  );
}
