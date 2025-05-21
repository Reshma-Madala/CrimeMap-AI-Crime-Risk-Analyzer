// MapView.jsx
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './mapStyles.css';

delete L.Icon.Default.prototype._getIconUrl;

const redIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const yellowIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-yellow.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const greenIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const getIconBySafetyScore = (score) => {
  if (score == null) return redIcon;
  if (score >= 0.7) return greenIcon;
  if (score >= 0.4) return yellowIcon;
  return redIcon;
};

const MapView = ({ onClose, cities = [] }) => (
  <div className="map-overlay">
    <button className="close-btn" onClick={onClose}>X</button>
    <MapContainer center={[22.9734, 78.6569]} zoom={5} style={{ height: '100%', width: '100%' }}>
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {cities.map((cityData, idx) => (
        <Marker
          key={idx}
          position={[cityData.latitude, cityData.longitude]}
          icon={getIconBySafetyScore(cityData.safetyScore)}
        >
          <Popup>
            <div>
              <h3>{cityData.city}</h3>
              <p><strong>Safety Score:</strong> {cityData.safetyScore?.toFixed(3) ?? 'N/A'}</p>
              <p><strong>Common Crime:</strong> {cityData.mostCommonCrime}</p>
              <p><strong>Common Weapon:</strong> {cityData.mostCommonWeapon}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  </div>
);

export default MapView;
