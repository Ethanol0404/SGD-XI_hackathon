import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in react-leaflet
const DefaultIcon = L.divIcon({
  html: `
    <div style="
      background-color: #3388ff;
      width: 12px;
      height: 12px;
      border: 2px solid white;
      border-radius: 50%;
      box-shadow: 0 2px 4px rgba(0,0,0,0.2);
    "></div>
  `,
  className: 'leaflet-custom-marker',
  iconSize: [16, 16],
  iconAnchor: [8, 8],
});

// Custom icons with labels
const createHospitalIcon = (name: string) => L.divIcon({
  html: `
    <div style="position: relative;">
      <div style="
        background-color: #dc2626;
        width: 24px;
        height: 24px;
        border: 2px solid white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 2px 6px rgba(0,0,0,0.3);
        color: white;
        font-size: 12px;
        font-weight: bold;
      ">H</div>
      <div style="
        position: absolute;
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
        margin-top: 4px;
        background: white;
        padding: 2px 6px;
        border-radius: 4px;
        font-size: 10px;
        font-weight: 600;
        white-space: nowrap;
        box-shadow: 0 1px 3px rgba(0,0,0,0.2);
        border: 1px solid #e5e5e5;
        color: #dc2626;
      ">${name}</div>
    </div>
  `,
  className: 'leaflet-custom-marker',
  iconSize: [100, 40], // Increased size to accommodate label
  iconAnchor: [12, 12],
});

const clinicIcon = L.divIcon({
  html: `
    <div style="
      background-color: #ea580c;
      width: 18px;
      height: 18px;
      border: 2px solid white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2px 6px rgba(0,0,0,0.3);
      color: white;
      font-size: 9px;
      font-weight: bold;
    ">C</div>
  `,
  className: 'leaflet-custom-marker',
  iconSize: [22, 22],
  iconAnchor: [11, 11],
});

const userLocationIcon = L.divIcon({
  html: `
    <div style="
      background-color: #16a34a;
      width: 16px;
      height: 16px;
      border: 3px solid white;
      border-radius: 50%;
      box-shadow: 0 2px 6px rgba(0,0,0,0.3);
      animation: pulse 2s infinite;
    "></div>
    <style>
      @keyframes pulse {
        0% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.2); opacity: 0.7; }
        100% { transform: scale(1); opacity: 1; }
      }
    </style>
  `,
  className: 'leaflet-custom-marker',
  iconSize: [22, 22],
  iconAnchor: [11, 11],
});

interface HealthcareFacility {
  id: string;
  name: string;
  type: 'hospital' | 'clinic';
  latitude: number;
  longitude: number;
  address: string;
  phone?: string;
  hours?: string;
  website?: string;
  specialty?: string;
}

// Map bounds for Malaysia
const malaysiaBounds: L.LatLngBoundsExpression = [
  [0.85, 99.64] as L.LatLngTuple,
  [7.35, 119.27] as L.LatLngTuple
];

function MapController({ userLocation }: { userLocation: [number, number] | null }) {
  const map = useMap();
  
  useEffect(() => {
    // Set bounds to Malaysia
    map.setMaxBounds(malaysiaBounds);
    map.setMinZoom(6);
    
    if (userLocation) {
      map.setView(userLocation, 12);
    }
  }, [map, userLocation]);

  return null;
}

export function MalaysiaMap() {
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [mapReady, setMapReady] = useState(false);
  const [mapContainerRef, setMapContainerRef] = useState<HTMLDivElement | null>(null);

  // Healthcare facilities data
  const healthcareFacilities: HealthcareFacility[] = [
    {
      id: 'hkl',
      name: 'Hospital Kuala Lumpur',
      type: 'hospital',
      latitude: 3.1478,
      longitude: 101.6953,
      address: 'Jalan Pahang, 53000 Kuala Lumpur',
      phone: '03-26155555',
      hours: '24/7 Emergency',
      website: 'https://www.hkl.gov.my',
      specialty: 'General & Specialist Hospital'
    },
    {
      id: 'ummc',
      name: 'UMMC',
      type: 'hospital',
      latitude: 3.1200,
      longitude: 101.6544,
      address: 'Lembah Pantai, 59100 Kuala Lumpur',
      phone: '03-79494422',
      hours: '24/7',
      website: 'https://www.ummc.edu.my',
      specialty: 'Teaching Hospital'
    },
    {
      id: 'klinik_kl',
      name: 'Klinik Kesihatan KL',
      type: 'clinic',
      latitude: 3.1390,
      longitude: 101.6869,
      address: 'Jalan Raja Laut, 50350 Kuala Lumpur',
      phone: '03-26981233',
      hours: 'Mon-Fri: 8:00 AM - 5:00 PM',
      specialty: 'Government Clinic'
    },
    {
      id: 'hselayang',
      name: 'Hospital Selayang',
      type: 'hospital',
      latitude: 3.2497,
      longitude: 101.6593,
      address: 'Lebuhraya Selayang-Kepong, 68100 Batu Caves, Selangor',
      phone: '03-61203233',
      hours: '24/7',
      specialty: 'General Hospital'
    },
    {
      id: 'hpp',
      name: 'Hospital Pulau Pinang',
      type: 'hospital',
      latitude: 5.4164,
      longitude: 100.3111,
      address: 'Jalan Residensi, 10990 George Town, Pulau Pinang',
      phone: '04-2225333',
      hours: '24/7',
      website: 'https://www.hpp.moh.gov.my',
      specialty: 'General Hospital'
    },
    {
      id: 'hsab',
      name: 'Hospital Sultanah Aminah',
      type: 'hospital',
      latitude: 1.4854,
      longitude: 103.7620,
      address: 'Jalan Persiaran Abu Bakar Sultan, 80100 Johor Bahru, Johor',
      phone: '07-2257000',
      hours: '24/7',
      specialty: 'State General Hospital'
    },
  ];

  useEffect(() => {
    // Get user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([latitude, longitude]);
          setMapReady(true);
        },
        () => {
          // Default to Kuala Lumpur if location access denied
          setUserLocation([3.1390, 101.6869]);
          setMapReady(true);
        }
      );
    } else {
      setUserLocation([3.1390, 101.6869]);
      setMapReady(true);
    }
  }, []);

  // Force map to update when container is ready
  useEffect(() => {
    if (mapContainerRef) {
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'));
      }, 100);
    }
  }, [mapContainerRef]);

  if (!mapReady) {
    return (
      <div 
        ref={setMapContainerRef}
        className="relative w-full h-full min-h-[600px] rounded-2xl overflow-hidden border border-border/50 bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center"
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Malaysia Map...</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={setMapContainerRef}
      className="relative w-full h-full min-h-[600px] rounded-2xl overflow-hidden border border-border/50 bg-gray-100"
    >
      <MapContainer
        center={userLocation || [3.1390, 101.6869]}
        zoom={7}
        style={{ 
          height: '100%', 
          width: '100%',
          position: 'relative',
          zIndex: 1
        }}
        className="rounded-2xl"
        whenReady={() => {
          // Force map to update after a short delay
          setTimeout(() => {
            const mapElement = document.querySelector('.leaflet-container') as any;
            if (mapElement?._leaflet_map) {
              mapElement._leaflet_map.invalidateSize();
            }
          }, 100);
        }}
      >
        {/* OpenStreetMap Tile Layer */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapController userLocation={userLocation} />

        {/* User Location Marker */}
        {userLocation && (
          <Marker position={userLocation} icon={userLocationIcon}>
            <Popup>
              <div className="text-center">
                <strong>Your Location</strong>
              </div>
            </Popup>
          </Marker>
        )}

        {/* Healthcare Facilities */}
        {healthcareFacilities.map((facility) => (
          <Marker
            key={facility.id}
            position={[facility.latitude, facility.longitude]}
            icon={facility.type === 'hospital' ? createHospitalIcon(facility.name) : clinicIcon}
          >
            <Popup>
              <div className="min-w-[250px]">
                <div className="flex items-start gap-3 mb-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    facility.type === 'hospital' ? 'bg-red-100' : 'bg-orange-100'
                  }`}>
                    <div className={`w-6 h-6 rounded-sm flex items-center justify-center text-white text-xs font-bold ${
                      facility.type === 'hospital' ? 'bg-red-600' : 'bg-orange-500'
                    }`}>
                      {facility.type === 'hospital' ? 'H' : 'C'}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 text-sm">
                      {facility.name}
                    </h3>
                    <p className="text-xs text-gray-600 capitalize mb-1">
                      {facility.type}
                      {facility.specialty && ` • ${facility.specialty}`}
                    </p>
                    <p className="text-xs text-gray-700 mb-2">
                      📍 {facility.address}
                    </p>
                    {facility.phone && (
                      <p className="text-xs text-gray-700 mb-1">
                        📞 {facility.phone}
                      </p>
                    )}
                    {facility.hours && (
                      <p className="text-xs text-gray-700 mb-2">
                        🕒 {facility.hours}
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      // Open in Google Maps for directions
                      const url = `https://www.google.com/maps/dir/?api=1&destination=${facility.latitude},${facility.longitude}`;
                      window.open(url, '_blank');
                    }}
                    className="flex-1 bg-green-600 text-white text-xs py-2 px-3 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Get Directions
                  </button>
                  
                  {facility.website && (
                    <a
                      href={facility.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-blue-600 text-white text-xs py-2 px-3 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Website
                    </a>
                  )}
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Custom Controls */}
      <div className="absolute top-4 right-4 flex flex-col gap-2 z-[1000]">
        <button
          onClick={() => {
            const mapElement = document.querySelector('.leaflet-container') as any;
            if (mapElement?._leaflet_map) {
              mapElement._leaflet_map.zoomIn();
            }
          }}
          className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-lg flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors shadow-lg border border-white/20 hover:bg-white"
        >
          +
        </button>
        <button
          onClick={() => {
            const mapElement = document.querySelector('.leaflet-container') as any;
            if (mapElement?._leaflet_map) {
              mapElement._leaflet_map.zoomOut();
            }
          }}
          className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-lg flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors shadow-lg border border-white/20 hover:bg-white"
        >
          −
        </button>
        <button
          onClick={() => {
            const mapElement = document.querySelector('.leaflet-container') as any;
            if (mapElement?._leaflet_map && userLocation) {
              mapElement._leaflet_map.setView(userLocation, 13);
              mapElement._leaflet_map.invalidateSize();
            }
          }}
          className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-lg flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors shadow-lg border border-white/20 hover:bg-white"
          title="Center on my location"
        >
          📍
        </button>
      </div>

      {/* Legend */}
      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/20 z-[1000]">
        <div className="text-sm font-semibold text-gray-900 mb-3">Malaysia Healthcare</div>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs">
            <div className="w-3 h-3 rounded-full bg-green-600" />
            <span className="text-gray-700">Your Location</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-3 h-3 rounded-full bg-red-600" />
            <span className="text-gray-700">Hospitals</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-3 h-3 rounded-full bg-orange-500" />
            <span className="text-gray-700">Clinics</span>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="absolute bottom-4 right-4 flex gap-2 z-[1000]">
        <div className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 flex items-center gap-2 text-xs shadow-lg border border-white/20">
          <div className="w-2 h-2 rounded-full bg-red-600"></div>
          <span className="text-gray-700">
            {healthcareFacilities.filter(f => f.type === 'hospital').length} Hospitals
          </span>
        </div>
        <div className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 flex items-center gap-2 text-xs shadow-lg border border-white/20">
          <div className="w-2 h-2 rounded-full bg-orange-500"></div>
          <span className="text-gray-700">
            {healthcareFacilities.filter(f => f.type === 'clinic').length} Clinics
          </span>
        </div>
      </div>
    </div>
  );
}