import React, { useState, useEffect } from "react";
import { MapPin, Activity } from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from 'leaflet';

// 🔥 Firebase Imports
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../../firebase";

const riskColor = {
  Low: "#4ade80",      // Lighter Green
  Medium: "#eab308",   // Yellow
  High: "#f97316",     // Orange
  Critical: "#ef4444", // Red
};

const layers = ["All", "Waste", "Water", "Air", "Deforestation"];

// 🔥 UPDATED: Semi-transparent "Non-Solid" Circle Icon
const createCustomIcon = (severity) => {
  const color = riskColor[severity] || riskColor.Medium;
  return L.divIcon({
    className: 'custom-pin-icon',
    html: `
      <div style="
        background-color: ${color}40; /* 40 adds 25% opacity to the hex color */
        width: 32px;
        height: 32px;
        border-radius: 50%;
        border: 2px solid ${color}; /* Solid outer ring */
        box-shadow: 0 0 10px ${color}80; /* Subtle outer glow */
        display: flex;
        align-items: center;
        justify-content: center;
        backdrop-filter: blur(2px); /* Slight blur effect for modern UI */
      ">
        <div style="
            width: 8px;
            height: 8px;
            background-color: ${color}; /* Solid center dot */
            border-radius: 50%;
            box-shadow: 0 0 5px white;
        "></div>
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 16], // Exact center
    popupAnchor: [0, -16],
  });
};

export function GISHeatmap() {
  const [activeLayer, setActiveLayer] = useState("All");
  const [liveReports, setLiveReports] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔥 FETCH REAL-TIME DATA FOR THE DIGITAL TWIN
  useEffect(() => {
    const q = query(collection(db, "reports"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const reportsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      // Filter out reports without valid GPS coordinates
      const validReports = reportsData.filter(r => r.location && r.location.lat && r.location.lng);
      setLiveReports(validReports);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const displayedReports = liveReports.filter(
    (report) => activeLayer === "All" || report.type === activeLayer
  );

  return (
    <div className="bg-[#0a0a0a] rounded-lg border border-gray-800 overflow-hidden shadow-lg flex flex-col h-full">

      {/* 🌙 DARK MODE Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-4 py-3 border-b border-gray-800 gap-3 bg-[#0a0f1b]">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-[#00ff9d]" />
          <h3 className="text-sm font-semibold text-white">Faridabad Environmental Map</h3>
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          {layers.map((l) => (
            <button
              key={l}
              onClick={() => setActiveLayer(l)}
              className={`px-3 py-1 rounded-full text-[11px] font-bold transition-colors ${activeLayer === l
                ? "bg-[#00ff9d]/20 text-[#00ff9d] border border-[#00ff9d]/40"
                : "bg-white/5 text-gray-400 border border-gray-700 hover:bg-white/10 hover:text-white"
                }`}
            >
              {l}
            </button>
          ))}
        </div>
      </div>

      {/* ☀️ LIGHT MODE Map Container */}
      <div className="relative h-80 sm:h-[550px] bg-[#020617] overflow-hidden z-0">

        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#020617]/80 z-50">
            <Activity className="text-[#00ff9d] animate-spin" size={32} />
          </div>
        )}

        <MapContainer
          center={[28.4089, 77.3178]} // Faridabad Coordinates
          zoom={12}
          style={{ height: "100%", width: "100%", zIndex: 0 }}
          zoomControl={true}
        >
          {/* Light Street Map Tiles (OpenStreetMap) */}
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />

          {/* Plot Real Citizen Reports */}
          {displayedReports.map((report) => (
            <Marker
              key={report.id}
              position={[report.location.lat, report.location.lng]}
              icon={createCustomIcon(report.severity)}
            >
              <Popup>
                {/* Notice text is black here because Leaflet popups are white by default */}
                <div className="text-left font-inter p-1 min-w-[160px]">
                  <div className="text-[10px] uppercase font-bold tracking-wider mb-1" style={{ color: riskColor[report.severity] || riskColor.Medium }}>
                    {report.severity} • {report.type}
                  </div>
                  <div className="font-bold text-sm text-black mb-1">{report.title}</div>
                  <div className="text-xs text-gray-700 mb-2">{report.description}</div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        {/* 🌙 DARK MODE Floating Legend Overlay */}
        <div className="absolute top-4 right-4 bg-[#0a0f1b]/95 backdrop-blur-md p-4 rounded-xl shadow-2xl border border-gray-800 z-[400]">
          <h4 className="font-bold text-sm text-white mb-3">Severity / गंभीरता</h4>
          <div className="space-y-2">
            {["Critical", "High", "Medium", "Low"].map((severity) => (
              <div key={severity} className="flex items-center gap-2">
                <div className="w-3.5 h-3.5 rounded-full shadow-sm" style={{ backgroundColor: riskColor[severity] }}></div>
                <span className="text-sm text-gray-300 font-medium">{severity}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Inner Shadow to blend the light map into the dark container */}
        <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_30px_10px_rgba(10,10,10,0.8)] z-[300]"></div>
      </div>
    </div>
  );
}