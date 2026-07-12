import React, { useState, useEffect } from "react";
import {
    Navigation, Truck, User, Search, Map as MapIcon,
    AlertCircle, Phone, Activity, Battery, ShieldAlert, CheckCircle2
} from "lucide-react";

// 🔥 Firebase
import { db } from "../../firebase";
import { collection, onSnapshot, query, where } from "firebase/firestore";

// 🗺️ Leaflet Maps
import { MapContainer, TileLayer, Marker, Popup, useMap, Polyline } from 'react-leaflet';
import L from 'leaflet';

// Custom Truck Marker Icon
const getTruckIcon = (isSelected) => {
    return L.divIcon({
        className: "custom-truck-icon",
        html: `<div style="
            background-color: ${isSelected ? '#ffffff' : '#00ff9d'}; 
            color: #000; 
            border-radius: 50%; 
            width: 36px; 
            height: 36px; 
            display: flex; 
            align-items: center; 
            justify-content: center; 
            box-shadow: 0 0 20px ${isSelected ? 'rgba(255,255,255,0.8)' : 'rgba(0,255,153,0.6)'};
            transition: all 0.3s ease;
            transform: ${isSelected ? 'scale(1.2)' : 'scale(1)'};
            font-size: 18px;
        ">🚛</div>`,
        iconSize: [36, 36],
        iconAnchor: [18, 18],
        popupAnchor: [0, -18]
    });
};

// Custom Destination Marker Icon
const getDestinationIcon = () => {
    return L.divIcon({
        className: "custom-dest-icon",
        html: `<div style="
            background-color: #ef4444;
            border: 2px solid #fff;
            border-radius: 50%;
            width: 16px;
            height: 16px;
            box-shadow: 0 0 15px rgba(239,68,68,0.9);
            animation: pulse 2s infinite;
        "></div>`,
        iconSize: [16, 16],
        iconAnchor: [8, 8],
    });
};

// Map Recenter Helper
function MapRecenter({ lat, lng }) {
    const map = useMap();
    useEffect(() => {
        if (lat && lng && lat !== 0) {
            map.flyTo([lat, lng], 14, { animate: true, duration: 1.5 });
        }
    }, [lat, lng, map]);
    return null;
}

export default function LiveVehicleTrack() {
    const [selectedVehicle, setSelectedVehicle] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    // Live Firebase Data States
    const [vehicles, setVehicles] = useState([]);
    const [totalPickups, setTotalPickups] = useState(0);
    const [lowBatteryAlert, setLowBatteryAlert] = useState(null);

    // State to hold currently assigned tasks
    const [assignedTasks, setAssignedTasks] = useState([]);

    // 1. Fetch Live Workers & Filter Duplicates
    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "workers"), (snapshot) => {
            const liveFleet = snapshot.docs.map(doc => ({ docId: doc.id, ...doc.data() }));
            const activeFleet = liveFleet.filter(v => v.location && v.location.lat !== 0);

            const uniqueVehiclesMap = new Map();
            activeFleet.forEach(v => uniqueVehiclesMap.set(v.id, v));
            const uniqueFleet = Array.from(uniqueVehiclesMap.values());

            setVehicles(uniqueFleet);

            const lowBat = uniqueFleet.find(v => parseInt(v.battery || "100") <= 20);
            setLowBatteryAlert(lowBat || null);

            if (selectedVehicle) {
                const updatedSelected = uniqueFleet.find(v => v.id === selectedVehicle.id);
                if (updatedSelected) setSelectedVehicle(updatedSelected);
            }
        });
        return () => unsubscribe();
    }, [selectedVehicle]);

    // 2. Fetch Total Pickups Count
    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "pickups"), (snapshot) => {
            setTotalPickups(snapshot.size);
        });
        return () => unsubscribe();
    }, []);

    // 3. Fetch Assigned Pickups to draw routes
    useEffect(() => {
        const q = query(collection(db, "pickups"), where("status", "==", "Assigned"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const tasks = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setAssignedTasks(tasks);
        });
        return () => unsubscribe();
    }, []);

    const handleToggleVehicle = (vehicle) => {
        setSelectedVehicle(selectedVehicle?.id === vehicle.id ? null : vehicle);
    };

    const filteredVehicles = vehicles.filter(v =>
        (v.id || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (v.driver || "").toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="h-[calc(100vh-64px)] bg-[#020617] flex flex-col overflow-hidden font-inter text-white z-0">

            {/* Top Stats Bar */}
            <div className="h-16 border-b border-gray-800 bg-[#0a0f1b] flex items-center justify-between px-6 z-30 shadow-lg">
                <div className="flex gap-8">
                    <div className="flex items-center gap-2">
                        <Activity className="text-[#00ff9d]" size={18} />
                        <span className="text-sm font-medium text-gray-400">Active Fleet: <span className="text-white font-bold">{vehicles.length}</span></span>
                    </div>
                    <div className="flex items-center gap-2">
                        <CheckCircle2 className="text-blue-400" size={18} />
                        <span className="text-sm font-medium text-gray-400">Total Pickups: <span className="text-white font-bold">{totalPickups}</span></span>
                    </div>
                    <div className="hidden lg:flex items-center gap-2">
                        <Navigation className="text-blue-400" size={18} />
                        <span className="text-sm font-medium text-gray-400">Active Routes: <span className="text-white font-bold">{assignedTasks.filter(t => t.location).length}</span></span>
                    </div>
                </div>
                <div className="hidden md:flex gap-2">
                    <span className="px-4 py-1.5 bg-[#00ff9d]/10 text-[#00ff9d] border border-[#00ff9d]/20 rounded-full text-xs font-bold animate-pulse flex items-center gap-2">
                        <ShieldAlert size={14} /> Live GPS Sync Active
                    </span>
                </div>
            </div>

            <div className="flex flex-1 overflow-hidden relative z-0">

                {/* Left Sidebar */}
                <aside className="w-[360px] bg-[#0a0f1b] border-r border-gray-800 flex flex-col z-20 shadow-2xl relative">
                    <div className="p-4 border-b border-gray-800">
                        <div className="relative">
                            <Search className="absolute left-3 top-2.5 text-gray-500" size={18} />
                            <input
                                type="text"
                                placeholder="Search vehicle or driver..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-[#020617] border border-gray-800 rounded-lg py-2 pl-10 pr-4 text-sm focus:border-[#00ff9d] outline-none text-white transition-colors"
                            />
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto custom-scrollbar">
                        {vehicles.length === 0 ? (
                            <div className="p-8 text-center flex flex-col items-center justify-center h-full text-gray-500">
                                <Truck size={40} className="mb-4 opacity-20" />
                                <p className="animate-pulse">Waiting for fleet to come online...</p>
                            </div>
                        ) : (
                            filteredVehicles.map((v) => {
                                const isSelected = selectedVehicle?.id === v.id;
                                const hasRoute = assignedTasks.some(t => t.assignedWorkerId === v.id && t.location);

                                return (
                                    <div key={v.id} className={`p-4 border-b border-gray-800 transition-all ${isSelected ? "bg-[#00ff9d]/5 border-l-4 border-l-[#00ff9d]" : "hover:bg-white/5"}`}>
                                        <div className="cursor-pointer" onClick={() => handleToggleVehicle(v)}>
                                            <div className="flex justify-between items-start mb-1">
                                                <div className="flex items-center gap-2">
                                                    <div className={`w-2 h-2 rounded-full ${v.status === 'Moving' ? 'bg-[#00ff9d] animate-pulse' : 'bg-yellow-500'}`}></div>
                                                    <span className="font-bold text-sm text-white uppercase">{v.id}</span>
                                                </div>
                                                <span className="text-[10px] text-gray-400 font-mono bg-[#020617] px-2 py-0.5 rounded border border-gray-800">{v.speed || '0 km/h'}</span>
                                            </div>
                                            <p className="text-xs text-gray-400 mb-3">{v.driver}</p>

                                            <div className="flex items-center gap-4 text-[11px] text-gray-500 font-medium">
                                                <div className="flex items-center gap-1.5"><Battery size={14} className={parseInt(v.battery || "100") <= 20 ? "text-red-500 animate-pulse" : "text-[#00ff9d]"} /> {v.battery || '100%'}</div>

                                                {hasRoute && (
                                                    <div className="flex items-center gap-1 text-blue-400 bg-blue-400/10 px-2 py-0.5 rounded">
                                                        <Navigation size={12} /> On Route
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {isSelected && (
                                            <div className="mt-4 pt-4 border-t border-gray-800/50 animate-in slide-in-from-top-2 fade-in duration-200">
                                                <div className="flex justify-between items-center mb-4">
                                                    <div className="flex gap-3 items-center">
                                                        <div className="w-10 h-10 bg-[#020617] rounded-xl flex items-center justify-center text-gray-400 border border-gray-800">
                                                            <User size={20} />
                                                        </div>
                                                        <div>
                                                            <h3 className="font-bold text-sm text-white leading-none">{v.driver}</h3>
                                                            <div className="flex gap-1 mt-1.5 text-yellow-500 text-[10px]">
                                                                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <button className="p-2.5 bg-[#020617] hover:bg-[#00ff9d]/10 hover:text-[#00ff9d] border border-gray-800 rounded-xl transition-colors text-gray-400">
                                                        <Phone size={16} />
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                );
                            })
                        )}
                    </div>
                </aside>

                {/* 🗺️ Map Interface */}
                <main className="flex-1 relative bg-[#020617] z-0 overflow-hidden">

                    {/* Dynamic Warning Alert */}
                    {lowBatteryAlert && (
                        <div className="absolute top-6 left-1/2 -translate-x-1/2 z-[400] animate-bounce">
                            <div className="bg-red-500 text-white px-4 py-2 rounded-full shadow-2xl flex items-center gap-3 border-2 border-red-400">
                                <AlertCircle size={18} />
                                <span className="text-xs font-bold uppercase tracking-tight">
                                    Warning: {lowBatteryAlert.id} Battery Low ({lowBatteryAlert.battery})
                                </span>
                                <button onClick={() => setLowBatteryAlert(null)} className="hover:opacity-70">✕</button>
                            </div>
                        </div>
                    )}

                    <MapContainer
                        center={[28.4089, 77.3178]} // Centered around Faridabad to match Heatmap
                        zoom={12}
                        style={{ height: "100%", width: "100%", zIndex: 0 }}
                        zoomControl={true} // 🔥 Enabled standard Zoom controls
                    >
                        {/* 🔥 Switched to Light Theme OpenStreetMap Tiles */}
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />

                        {selectedVehicle && selectedVehicle.location && (
                            <MapRecenter lat={selectedVehicle.location.lat} lng={selectedVehicle.location.lng} />
                        )}

                        {vehicles.map((v) => {
                            const currentTask = assignedTasks.find(t => t.assignedWorkerId === v.id);
                            const hasValidLocation = currentTask && currentTask.location && currentTask.location.lat && currentTask.location.lng;

                            return (
                                <React.Fragment key={v.id}>

                                    {/* Route Line */}
                                    {hasValidLocation && (
                                        <>
                                            <Polyline
                                                positions={[
                                                    [v.location.lat, v.location.lng],
                                                    [currentTask.location.lat, currentTask.location.lng]
                                                ]}
                                                color="#2563eb" // Switched to Blue so it pops against the light map
                                                weight={4}
                                                opacity={0.8}
                                                dashArray="10, 10"
                                            />
                                            {/* Destination Dot */}
                                            <Marker
                                                position={[currentTask.location.lat, currentTask.location.lng]}
                                                icon={getDestinationIcon()}
                                            >
                                                <Popup>
                                                    <div className="text-left font-inter p-1">
                                                        <p className="font-bold text-sm mb-1 text-black">Pickup Destination</p>
                                                        <p className="text-xs text-gray-600">Citizen: {currentTask.citizenName}</p>
                                                        <p className="text-xs font-bold text-red-500 mt-1 uppercase">{currentTask.wasteType}</p>
                                                    </div>
                                                </Popup>
                                            </Marker>
                                        </>
                                    )}

                                    {/* The Truck Marker */}
                                    <Marker
                                        position={[v.location.lat, v.location.lng]}
                                        icon={getTruckIcon(selectedVehicle?.id === v.id)}
                                        eventHandlers={{ click: () => handleToggleVehicle(v) }}
                                    >
                                        <Popup>
                                            <div className="text-center font-inter p-1 min-w-[120px]">
                                                <p className="font-bold text-lg mb-1 uppercase text-black">{v.id}</p>
                                                <p className="text-xs text-gray-700 mb-2">{v.driver}</p>
                                                <p className="text-xs font-bold text-blue-600 bg-blue-50 py-1 rounded">{v.speed}</p>
                                                <p className="text-[10px] text-gray-500 mt-2 font-mono">Bat: {v.battery}</p>
                                            </div>
                                        </Popup>
                                    </Marker>
                                </React.Fragment>
                            );
                        })}
                    </MapContainer>

                    {/* 🔥 Optional Inner Shadow to blend the light map into the dark container */}
                    <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_30px_10px_rgba(10,10,10,0.8)] z-[300]"></div>
                </main>
            </div>
        </div>
    );
}