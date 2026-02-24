import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { geocodeAddress } from '../../api/cafeAPI';

export default function Homepage() {
  const navigate = useNavigate();
  const [manualLocation, setManualLocation] = useState('');
  const [error, setError] = useState('');

  const handleShareLocation = () => {
    if (!navigator.geolocation) {
      alert("Your browser does not support geolocation");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        navigate('/results', { state: { lat: latitude, lng: longitude } });
      },
      (err) => {
        console.error(err);
        alert("Please allow location access to find nearby cafes");
      }
    );
  };

const handleManualSearch = async (e) => {
    e.preventDefault();
    if (!manualLocation.trim()) return;
    setError('');
    try {
      const data = await geocodeAddress(manualLocation);
      if (!data.lat || !data.lng) {
        setError('Location not found. Please try a different city name.');
        return;
      }
      navigate('/results', { state: { lat: data.lat, lng: data.lng } });
    } catch (err) {
      setError('Something went wrong. Please try again.');
    }
};

  return (
    <div className="homepage-container">
      <div className="bg-[url('/background.png')] flex flex-col items-center justify-center min-h-screen w-full bg-cover bg-center px-4">
        <div className="text-center max-w-xl">
          <h1 className="homepage-title text-[#314000] text-5xl md:text-5xl font-bold leading-tight">
            Find a place to eat anywhere
          </h1>
          <p className="homepage-description text-[#314000] opacity-70 mt-4 text-lg md:text-xl">
            Discover the taste of the best cafes near your location
          </p>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-4 mt-8 w-full md:w-auto">
          <button
            onClick={handleShareLocation}
            className="w-full md:w-auto px-8 py-3 bg-[#314000] text-white rounded-xl hover:bg-[#4E6308] transition shadow-lg text-center cursor-pointer"
          >
            Share location
          </button>

          <span className="text-[#314000] font-medium opacity-60">or</span>
          <form
            onSubmit={handleManualSearch}
            className="flex flex-col sm:flex-row gap-1 w-full md:w-auto"
          >
            <input
              type="text"
              value={manualLocation}
              onChange={(e) => setManualLocation(e.target.value)}
              placeholder="Enter location manually"
              className="px-6 py-3 rounded-xl bg-white border border-[#314000] outline-none w-full text-center"
            />
            <button type="submit" className="px-8 py-3 bg-[#314000] text-white rounded-xl hover:bg-[#4E6308] transition">
              Search
            </button>
          </form>
        </div>
        {error && <p className="mt-4 bg-[#314000]/50 rounded-lg px-4 py-2 text-white font-semibold">{error}</p>}
      </div>
    </div>
  );
}