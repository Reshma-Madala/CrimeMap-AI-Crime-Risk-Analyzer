// ResultsHandler.jsx
import React, { useEffect, useState } from 'react';
import MapView from './MapView';

const cityCoordinates = {
  Agra: { latitude: 27.1767, longitude: 78.0081 },
  Ahmedabad: { latitude: 23.0225, longitude: 72.5714 },
  Bangalore: { latitude: 12.9716, longitude: 77.5946 },
  Bhopal: { latitude: 23.2599, longitude: 77.4126 },
  Chennai: { latitude: 13.0827, longitude: 80.2707 },
  Delhi: { latitude: 28.7041, longitude: 77.1025 },
  Faridabad: { latitude: 28.4089, longitude: 77.3178 },
  Ghaziabad: { latitude: 28.6692, longitude: 77.4538 },
  Hyderabad: { latitude: 17.385, longitude: 78.4867 },
  Indore: { latitude: 22.7196, longitude: 75.8577 },
  Jaipur: { latitude: 26.9124, longitude: 75.7873 },
  Kalyan: { latitude: 19.2403, longitude: 73.1305 },
  Kanpur: { latitude: 26.4499, longitude: 80.3319 },
  Kolkata: { latitude: 22.5726, longitude: 88.3639 },
  Lucknow: { latitude: 26.8467, longitude: 80.9462 },
  Ludhiana: { latitude: 30.9, longitude: 75.8573 },
  Meerut: { latitude: 28.9845, longitude: 77.7064 },
  Mumbai: { latitude: 19.076, longitude: 72.8777 },
  Nagpur: { latitude: 21.1458, longitude: 79.0882 },
  Nashik: { latitude: 19.9975, longitude: 73.7898 },
  Patna: { latitude: 25.5941, longitude: 85.1376 },
  Pune: { latitude: 18.5204, longitude: 73.8567 },
  Rajkot: { latitude: 22.3039, longitude: 70.8022 },
  Srinagar: { latitude: 34.0837, longitude: 74.7973 },
  Surat: { latitude: 21.1702, longitude: 72.8311 },
  Thane: { latitude: 19.2183, longitude: 72.9781 },
  Varanasi: { latitude: 25.3176, longitude: 82.9739 },
  Vasai: { latitude: 19.3919, longitude: 72.8397 },
  Visakhapatnam: { latitude: 17.6868, longitude: 83.2185 },
};

const ResultsHandler = ({ simulateTyping, onClose }) => {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/safety')
      .then(res => res.json())
      .then(apiData => {
        const merged = apiData.map(entry => {
          const coords = cityCoordinates[entry.City];
          return coords
            ? {
                city: entry.City,
                latitude: coords.latitude,
                longitude: coords.longitude,
                safetyScore: entry['Safety Score'],
                mostCommonCrime: entry['Most Common Crime'],
                mostCommonWeapon: entry['Most Common Weapon'],
              }
            : null;
        }).filter(Boolean);

        setCities(merged);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching safety data:', err);
        simulateTyping('Failed to fetch safety data.', '#ff5555');
        setLoading(false);
      });
  }, [simulateTyping]);

  if (loading) {
    return <div style={{ padding: '1rem', color: '#f8f8f2' }}>Loading safety map...</div>;
  }

  return <MapView cities={cities} onClose={onClose} />;
};

export default ResultsHandler;
