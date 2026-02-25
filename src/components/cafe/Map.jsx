import { GoogleMap, useJsApiLoader, InfoWindow } from '@react-google-maps/api';
import { useState, useEffect } from 'react';

const libraries = ['marker'];

export default function Map({ userCoords, cafes, activeCafe, setActiveCafe }) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY,
    libraries
  });
  
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    if (!map || !window.google?.maps?.marker) return;

    markers.forEach(marker => marker.map = null);

    const newMarkers = [];

    const userPin = document.createElement('div');
    userPin.style.width = '20px';
    userPin.style.height = '20px';
    userPin.style.borderRadius = '50%';
    userPin.style.backgroundColor = '#4185F4';
    userPin.style.border = '3px solid #ffffff';
    userPin.style.boxShadow = '0 2px 6px rgba(0,0,0,0.3)';

    const userMarker = new window.google.maps.marker.AdvancedMarkerElement({
      map,
      position: userCoords,
      content: userPin,
      title: 'Your location'
    });
    newMarkers.push(userMarker);

    cafes.forEach(cafe => {
      const marker = new window.google.maps.marker.AdvancedMarkerElement({
        map,
        position: cafe.geometry.location,
        title: cafe.name
      });

      marker.addListener('gmp-click', () => {
        setActiveCafe(cafe);
      });

      newMarkers.push(marker);
    });

    setMarkers(newMarkers);

    return () => {
      newMarkers.forEach(marker => marker.map = null);
    };
  }, [map, cafes, userCoords, setActiveCafe]);

  useEffect(() => {
    if (map && activeCafe) {
      map.panTo({
        lat: activeCafe.geometry.location.lat,
        lng: activeCafe.geometry.location.lng
      });
      map.setZoom(17);
    }
  }, [activeCafe, map]);

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <GoogleMap
      mapContainerStyle={{ width: '100%', height: '100%' }}
      center={userCoords}
      zoom={14}
      onLoad={m => setMap(m)}
      options={{
        mapId: '8b4a2009e9e0a118375161ea'
      }}
    >
      {activeCafe && (
        <InfoWindow
          position={activeCafe.geometry.location}
          onCloseClick={() => setActiveCafe(null)}
        >
          <div className="text-[#314000] max-w-55">
            {activeCafe.photo_url && (
              <img 
                src={activeCafe.photo_url} 
                className="w-full h-30 object-cover rounded-lg mb-2" 
                alt={activeCafe.name} 
              />
            )}
            <h4 className="font-bold text-sm mb-1">{activeCafe.name}</h4>
            
            <p className="text-xs text-[#314000] opacity-50 font-semibold uppercase mb-0.5">Address</p>
            <p className="text-xs mb-1">{activeCafe.vicinity}</p>
            {activeCafe.opening_hours?.weekday_text && (
              <>
                <p className="text-xs text-[#314000] opacity-50 font-semibold uppercase mb-0.5">Working hours</p>
                <p className="text-xs mb-1">
                  {activeCafe.opening_hours.weekday_text[new Date().getDay() === 0 ? 6 : new Date().getDay() - 1]?.replace(/^[^:]+:\s*/, '')}
                </p>
              </>
            )}
            <p className="text-xs text-[#314000] opacity-50 font-semibold uppercase mb-0.5">Rating</p>
            <p className="text-xs mb-1">⭐ {activeCafe.rating?.toFixed(1)} ({activeCafe.user_ratings_total})</p>
            {activeCafe.formatted_phone_number && (
              <>
                <p className="text-xs text-[#314000] opacity-50 font-semibold uppercase mb-0.5">Phone</p>
                <p className="text-xs">{activeCafe.formatted_phone_number}</p>
              </>
            )}
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
}