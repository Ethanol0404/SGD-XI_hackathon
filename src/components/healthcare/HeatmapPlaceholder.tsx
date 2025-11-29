import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, Circle, LayersControl } from 'react-leaflet';
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

// Custom icons for healthcare facilities
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
  iconSize: [100, 40],
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

// Air quality data interface
interface AirQualityData {
  lat: number;
  lng: number;
  aqi: number;
  pollutant?: string;
  timestamp?: string;
  city?: string;
}

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

// Generate grid points covering Malaysia
const generateGridPoints = (bounds: L.LatLngBoundsExpression, gridSize: number = 8) => {
  const [southWest, northEast] = bounds as [L.LatLngTuple, L.LatLngTuple];
  const points: { lat: number; lng: number }[] = [];
  
  const latStep = (northEast[0] - southWest[0]) / gridSize;
  const lngStep = (northEast[1] - southWest[1]) / gridSize;
  
  for (let lat = southWest[0]; lat <= northEast[0]; lat += latStep) {
    for (let lng = southWest[1]; lng <= northEast[1]; lng += lngStep) {
      // Add some randomness to make it look more natural
      const randomLat = lat + (Math.random() - 0.5) * latStep * 0.3;
      const randomLng = lng + (Math.random() - 0.5) * lngStep * 0.3;
      
      points.push({
        lat: randomLat,
        lng: randomLng
      });
    }
  }
  
  return points;
};

function MapController({ userLocation }: { userLocation: [number, number] | null }) {
  const map = useMap();
  
  useEffect(() => {
    map.setMaxBounds(malaysiaBounds);
    map.setMinZoom(6);
    
    if (userLocation) {
      map.setView(userLocation, 12);
    }
  }, [map, userLocation]);

  return null;
}

export function HeatmapPlaceholder() {
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [mapReady, setMapReady] = useState(false);
  const [mapContainerRef, setMapContainerRef] = useState<HTMLDivElement | null>(null);
  const [airQualityData, setAirQualityData] = useState<AirQualityData[]>([]);
  const [gridAirQualityData, setGridAirQualityData] = useState<AirQualityData[]>([]);
  const [healthcareFacilities, setHealthcareFacilities] = useState<HealthcareFacility[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showHeatmap, setShowHeatmap] = useState(true);

  // Generate grid points covering Malaysia
  const gridPoints = generateGridPoints(malaysiaBounds, 12);

  // Function to get color based on AQI
  const getAQIColor = (aqi: number): string => {
    if (aqi <= 50) return '#22c55e'; // Green
    if (aqi <= 100) return '#eab308'; // Yellow
    if (aqi <= 150) return '#f97316'; // Orange
    if (aqi <= 200) return '#ef4444'; // Red
    if (aqi <= 300) return '#a855f7'; // Purple
    return '#991b1b'; // Dark Red
  };

  const getAQILabel = (aqi: number): string => {
    if (aqi <= 50) return 'Good';
    if (aqi <= 100) return 'Moderate';
    if (aqi <= 150) return 'Unhealthy for Sensitive Groups';
    if (aqi <= 200) return 'Unhealthy';
    if (aqi <= 300) return 'Very Unhealthy';
    return 'Hazardous';
  };

  // Function to calculate AQI from pollutant concentration
  const calculateAQI = (pollutant: string, concentration: number): number => {
    switch (pollutant) {
      case 'pm25':
        if (concentration <= 12) return (concentration / 12) * 50;
        if (concentration <= 35.4) return 50 + ((concentration - 12) / (35.4 - 12)) * 50;
        if (concentration <= 55.4) return 100 + ((concentration - 35.4) / (55.4 - 35.4)) * 50;
        if (concentration <= 150.4) return 150 + ((concentration - 55.4) / (150.4 - 55.4)) * 50;
        return 200 + ((concentration - 150.4) / (250.4 - 150.4)) * 100;
      
      case 'pm10':
        if (concentration <= 54) return (concentration / 54) * 50;
        if (concentration <= 154) return 50 + ((concentration - 54) / (154 - 54)) * 50;
        if (concentration <= 254) return 100 + ((concentration - 154) / (254 - 154)) * 50;
        if (concentration <= 354) return 150 + ((concentration - 254) / (354 - 254)) * 50;
        return 200 + ((concentration - 354) / (424 - 354)) * 100;
      
      case 'no2':
        if (concentration <= 53) return (concentration / 53) * 50;
        if (concentration <= 100) return 50 + ((concentration - 53) / (100 - 53)) * 50;
        if (concentration <= 360) return 100 + ((concentration - 100) / (360 - 100)) * 50;
        if (concentration <= 649) return 150 + ((concentration - 360) / (649 - 360)) * 50;
        return 200 + ((concentration - 649) / (1249 - 649)) * 100;
      
      default:
        return Math.min(concentration * 2, 300);
    }
  };

  // Function to generate simulated air quality data for grid points
  const generateSimulatedAirQualityData = (realData: AirQualityData[]) => {
    return gridPoints.map((point, index) => {
      // Find the closest real data point
      let closestDistance = Infinity;
      let closestAQI = 50; // Default moderate AQI
      
      realData.forEach(realPoint => {
        const distance = Math.sqrt(
          Math.pow(realPoint.lat - point.lat, 2) + 
          Math.pow(realPoint.lng - point.lng, 2)
        );
        
        if (distance < closestDistance) {
          closestDistance = distance;
          closestAQI = realPoint.aqi;
        }
      });
      
      // Add some regional variation based on location
      let regionalVariation = 0;
      
      // Simulate higher pollution in urban/industrial areas
      if (point.lat > 3.0 && point.lat < 3.3 && point.lng > 101.0 && point.lng < 101.8) {
        // Kuala Lumpur area
        regionalVariation = 20;
      } else if (point.lat > 5.3 && point.lat < 5.5 && point.lng > 100.2 && point.lng < 100.4) {
        // Penang area
        regionalVariation = 15;
      } else if (point.lat > 1.4 && point.lat < 1.6 && point.lng > 103.6 && point.lng < 103.8) {
        // Johor Bahru area
        regionalVariation = 18;
      } else if (point.lat > 2.1 && point.lat < 2.3 && point.lng > 102.2 && point.lng < 102.3) {
        // Malacca area
        regionalVariation = 12;
      } else {
        // Rural areas generally have better air quality
        regionalVariation = -10;
      }
      
      // Add some random noise but keep within reasonable bounds
      const randomNoise = (Math.random() - 0.5) * 15;
      
      // Calculate final AQI with regional variation and noise
      let finalAQI = closestAQI + regionalVariation + randomNoise;
      
      // Ensure AQI stays within reasonable bounds
      finalAQI = Math.max(20, Math.min(180, finalAQI));
      
      return {
        lat: point.lat,
        lng: point.lng,
        aqi: Math.round(finalAQI),
        pollutant: 'PM2.5',
        timestamp: new Date().toISOString()
      };
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Major cities in Malaysia for air quality monitoring
        const malaysiaCities = [
          { name: 'Kuala Lumpur', lat: 3.1390, lng: 101.6869 },
          { name: 'Penang', lat: 5.4164, lng: 100.3111 },
          { name: 'Johor Bahru', lat: 1.4854, lng: 103.7620 },
          { name: 'Ipoh', lat: 4.5975, lng: 101.0901 },
          { name: 'Malacca', lat: 2.1890, lng: 102.2500 },
          { name: 'Kota Kinabalu', lat: 5.9804, lng: 116.0735 },
          { name: 'Kuching', lat: 1.5397, lng: 110.3542 },
          { name: 'Shah Alam', lat: 3.0733, lng: 101.5185 },
          { name: 'Petaling Jaya', lat: 3.1073, lng: 101.6067 },
          { name: 'Klang', lat: 3.0449, lng: 101.4456 },
          { name: 'Johor Bahru', lat: 1.4927, lng: 103.7414 },
          { name: 'Subang Jaya', lat: 3.0497, lng: 101.5843 },
          { name: 'George Town', lat: 5.4141, lng: 100.3288 },
          { name: 'Kuala Terengganu', lat: 5.3281, lng: 103.1410 },
          { name: 'Kota Bharu', lat: 6.1343, lng: 102.2397 },
          { name: 'Seremban', lat: 2.7259, lng: 101.9378 },
          { name: 'Kuantan', lat: 3.8167, lng: 103.3333 },
          { name: 'Alor Setar', lat: 6.1164, lng: 100.3667 },
          { name: 'Melaka', lat: 2.1896, lng: 102.2501 },
          { name: 'Sandakan', lat: 5.8388, lng: 118.1173 },
          { name: 'Tawau', lat: 4.2497, lng: 117.8875 },
          { name: 'Miri', lat: 4.4149, lng: 114.0089 },
          { name: 'Sibu', lat: 2.2874, lng: 111.8344 },
        ];

        // Fetch air quality data for major cities
        const airQualityPromises = malaysiaCities.map(async (city) => {
          try {
            // Simulate API call with realistic data
            await new Promise(resolve => setTimeout(resolve, 100));
            
            // Generate realistic AQI based on city characteristics
            let baseAQI = 45; // Base moderate air quality
            
            // Adjust based on city characteristics (urban areas typically have worse air quality)
            if (city.name.includes('Kuala Lumpur') || city.name.includes('Petaling') || city.name.includes('Klang')) {
              baseAQI = 65; // Urban areas
            } else if (city.name.includes('Penang') || city.name.includes('Johor')) {
              baseAQI = 55; // Developed urban areas
            } else if (city.name.includes('Kota Kinabalu') || city.name.includes('Kuching')) {
              baseAQI = 40; // Less urbanized
            } else {
              baseAQI = 35; // Rural/smaller towns
            }
            
            // Add some random variation
            const variation = (Math.random() - 0.5) * 20;
            const finalAQI = Math.max(20, Math.min(80, baseAQI + variation));
            
            return {
              lat: city.lat,
              lng: city.lng,
              aqi: Math.round(finalAQI),
              pollutant: 'PM2.5',
              timestamp: new Date().toISOString(),
              city: city.name
            };
          } catch (error) {
            console.error(`Error fetching air quality for ${city.name}:`, error);
            return {
              lat: city.lat,
              lng: city.lng,
              aqi: Math.floor(Math.random() * 80) + 20,
              pollutant: 'PM2.5',
              timestamp: new Date().toISOString(),
              city: city.name
            };
          }
        });

        // Use fallback healthcare facilities
        const healthcareFacilitiesData: HealthcareFacility[] = [
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

        const airQualityResults = await Promise.all(airQualityPromises);
        const validAirQualityData = airQualityResults
          .filter((item) => item !== null && item.aqi > 0)
          .map((item) => item as AirQualityData);

        // Generate grid-based air quality data covering all areas
        const gridData = generateSimulatedAirQualityData(validAirQualityData);

        setAirQualityData(validAirQualityData);
        setGridAirQualityData(gridData);
        setHealthcareFacilities(healthcareFacilitiesData);

      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load real-time data. Using simulated data instead.');
        
        // Fallback data with grid coverage
        const fallbackData = [
          { lat: 3.1390, lng: 101.6869, aqi: 65, pollutant: 'PM2.5', city: 'Kuala Lumpur' },
          { lat: 5.4164, lng: 100.3111, aqi: 45, pollutant: 'PM2.5', city: 'Penang' },
          { lat: 1.4854, lng: 103.7620, aqi: 68, pollutant: 'PM2.5', city: 'Johor Bahru' },
        ];
        
        setAirQualityData(fallbackData);
        setGridAirQualityData(generateSimulatedAirQualityData(fallbackData));
        
        setHealthcareFacilities([
          {
            id: 'hkl',
            name: 'Hospital Kuala Lumpur',
            type: 'hospital',
            latitude: 3.1478,
            longitude: 101.6953,
            address: 'Jalan Pahang, 53000 Kuala Lumpur'
          },
          {
            id: 'hpp',
            name: 'Hospital Pulau Pinang',
            type: 'hospital',
            latitude: 5.4164,
            longitude: 100.3111,
            address: 'Jalan Residensi, 10990 George Town'
          }
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    // Get user location first, then fetch data
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([latitude, longitude]);
          setMapReady(true);
          fetchData();
        },
        () => {
          setUserLocation([3.1390, 101.6869]);
          setMapReady(true);
          fetchData();
        }
      );
    } else {
      setUserLocation([3.1390, 101.6869]);
      setMapReady(true);
      fetchData();
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

  if (!mapReady || isLoading) {
    return (
      <div 
        ref={setMapContainerRef}
        className="relative w-full h-full min-h-[600px] rounded-2xl overflow-hidden border border-border/50 bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center"
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Malaysia Air Quality & Healthcare Map...</p>
          <p className="text-gray-500 text-sm mt-2">Generating comprehensive air quality coverage...</p>
        </div>
      </div>
    );
  }

  const averageAQI = airQualityData.length > 0 
    ? Math.round(airQualityData.reduce((sum, point) => sum + point.aqi, 0) / airQualityData.length)
    : 0;

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

        {/* Grid-based Air Quality Coverage */}
        {showHeatmap && gridAirQualityData.map((point, index) => (
          <Circle
            key={`grid-${index}`}
            center={[point.lat, point.lng]}
            radius={8000} // 8km radius for better coverage
            pathOptions={{
              color: getAQIColor(point.aqi),
              fillColor: getAQIColor(point.aqi),
              fillOpacity: 0.25, // Lower opacity for better visualization
              weight: 1,
              opacity: 0.6,
            }}
          >
            <Popup>
              <div className="min-w-[180px]">
                <div className="flex items-center gap-3 mb-2">
                  <div 
                    className="w-6 h-6 rounded-full"
                    style={{ backgroundColor: getAQIColor(point.aqi) }}
                  ></div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm">
                      Regional Air Quality
                    </h3>
                    <p className="text-sm text-gray-600">
                      AQI: <strong>{point.aqi}</strong> - {getAQILabel(point.aqi)}
                    </p>
                  </div>
                </div>
                {point.pollutant && (
                  <p className="text-xs text-gray-600 mb-2">
                    Main Pollutant: <strong>{point.pollutant}</strong>
                  </p>
                )}
                <p className="text-xs text-gray-500">
                  Estimated coverage data
                </p>
              </div>
            </Popup>
          </Circle>
        ))}

        {/* Major City Air Quality Markers */}
        {airQualityData.map((point, index) => (
          <Circle
            key={`city-${index}`}
            center={[point.lat, point.lng]}
            radius={12000} // 12km radius for cities
            pathOptions={{
              color: getAQIColor(point.aqi),
              fillColor: getAQIColor(point.aqi),
              fillOpacity: 0.4,
              weight: 2,
              opacity: 0.8,
            }}
          >
            <Popup>
              <div className="min-w-[200px]">
                <div className="flex items-center gap-3 mb-2">
                  <div 
                    className="w-6 h-6 rounded-full"
                    style={{ backgroundColor: getAQIColor(point.aqi) }}
                  ></div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {point.city || 'Air Quality Station'}
                    </h3>
                    <p className="text-sm text-gray-600">
                      AQI: <strong>{point.aqi}</strong> - {getAQILabel(point.aqi)}
                    </p>
                  </div>
                </div>
                {point.pollutant && (
                  <p className="text-xs text-gray-600 mb-2">
                    Main Pollutant: <strong>{point.pollutant}</strong>
                  </p>
                )}
                {point.timestamp && (
                  <p className="text-xs text-gray-500">
                    Last updated: {new Date(point.timestamp).toLocaleString()}
                  </p>
                )}
              </div>
            </Popup>
          </Circle>
        ))}

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
          onClick={() => setShowHeatmap(!showHeatmap)}
          className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-lg flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors shadow-lg border border-white/20 hover:bg-white"
          title="Toggle Heatmap"
        >
          {showHeatmap ? '🌫️' : '🗺️'}
        </button>
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

      {/* Air Quality Legend */}
      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/20 z-[1000]">
        <div className="text-sm font-semibold text-gray-900 mb-3">Air Quality Index</div>
        <div className="space-y-2">
          {[
            { range: '0-50', label: 'Good', color: '#22c55e' },
            { range: '51-100', label: 'Moderate', color: '#eab308' },
            { range: '101-150', label: 'Unhealthy for Sensitive', color: '#f97316' },
            { range: '151-200', label: 'Unhealthy', color: '#ef4444' },
            { range: '201-300', label: 'Very Unhealthy', color: '#a855f7' },
            { range: '301+', label: 'Hazardous', color: '#991b1b' },
          ].map((item, index) => (
            <div key={index} className="flex items-center gap-2 text-xs">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: item.color }}
              />
              <span className="text-gray-700 w-12">{item.range}</span>
              <span className="text-gray-700 flex-1">{item.label}</span>
            </div>
          ))}
        </div>
        <div className="mt-3 pt-3 border-t border-gray-200">
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <div className="w-3 h-3 rounded-full bg-blue-500 opacity-50"></div>
            <span>Air Quality Coverage</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-600 mt-1">
            <button 
              onClick={() => setShowHeatmap(!showHeatmap)}
              className="text-blue-600 hover:text-blue-800 text-xs"
            >
              {showHeatmap ? 'Hide' : 'Show'} Coverage
            </button>
          </div>
        </div>
      </div>

      {/* Healthcare Legend */}
      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/20 z-[1000]">
        <div className="text-sm font-semibold text-gray-900 mb-3">Healthcare Facilities</div>
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
    </div>
  );
}
