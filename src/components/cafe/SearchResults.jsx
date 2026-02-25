import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getNearbyCafes, getCafeDetails } from "../../api/cafeAPI";
import Navbar from "./Navbar";
import Footer from "./Footer";
import CafeList from "./CafeList";
import Map from "./Map";

export default function SearchResults() {
  const { state } = useLocation();
  const [cafes, setCafes] = useState([]);
  const [activeCafe, setActiveCafe] = useState(null);
  const [radius, setRadius] = useState(1);
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState("Name");

  const sortOptions = ["Name", "Rating", "Distance"];

  useEffect(() => {
    if (state?.lat && state?.lng) {
      setLoading(true);
      getNearbyCafes(state.lat, state.lng, radius)
        .then(async (data) => {
          const basic = data || [];
          const detailed = await Promise.all(
            basic.map(async (cafe) => {
              try {
                const details = await getCafeDetails(cafe.place_id);
                return { ...cafe, ...details };
              } catch {
                return cafe;
              }
            }),
          );
          setCafes(detailed);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [state, radius]);

  const handleCafeSelect = async (cafe) => {
    setActiveCafe(cafe);
    try {
      const details = await getCafeDetails(cafe.place_id);
      setActiveCafe((prev) => ({ ...prev, ...details }));
    } catch (err) {
      console.error(err);
    }
  };

  const sortedCafes = [...cafes].sort((a, b) => {
    if (sortBy === "Name") return a.name.localeCompare(b.name);
    if (sortBy === "Rating") return (b.rating || 0) - (a.rating || 0);
    return 0;
  });

  const RadiusAndSort = () => (
    <div className="flex items-center justify-between gap-2 bg-white rounded-lg px-4 py-2 shadow-md">
      <div className="flex items-center gap-2">
        <span className="text-[#314000] text-sm font-semibold whitespace-nowrap">
          Show in radius
        </span>
        <div className="flex gap-1">
          {["1 km", "3 km", "5 km", "10 km"].map((dist) => (
            <button
              key={dist}
              onClick={() => setRadius(parseInt(dist))}
              className="bg-[#4a5d23] text-white font-semibold px-3 py-1 rounded text-sm hover:bg-[#65800D] transition cursor-pointer"
            >
              {dist}
            </button>
          ))}
        </div>
      </div>

      <div className="group relative">
        <div className="bg-white text-[#314000] font-semibold rounded-lg px-4 py-2 shadow-md cursor-pointer border border-gray-200 flex items-center gap-2 min-w-[140px] justify-between group-hover:bg-gray-50">
          <div className="flex items-center gap-2">
            <img src="/sort icon.svg" className="w-4 h-4" alt="sort icon" />
            Sort by
          </div>
          <svg
            className="w-3 h-3 transition-transform group-hover:rotate-180"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
        <div className="hidden group-hover:block absolute right-0 pt-2 w-full z-30">
          <div className="bg-white rounded-lg shadow-xl overflow-hidden">
            {sortOptions.map((option) => (
              <button
                key={option}
                onClick={() => setSortBy(option)}
                className="w-full text-left px-4 py-3 text-sm text-[#314000] hover:bg-gray-200 transition-colors font-semibold cursor-pointer"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="search-results-container flex flex-col min-h-screen">
      <Navbar />

      <div className="flex flex-col flex-1 md:hidden bg-linear-to-tr from-[#A5CD20] to-[#FFFFFF]">
        <div className="h-100 w-full">
          <CafeList
            cafes={sortedCafes}
            isLoading={loading}
            activeCafeId={activeCafe?.place_id}
            onCafeSelect={handleCafeSelect}
          />
        </div>

        <div className="p-3 bg-linear-to-tr from-[#A5CD20] to-[#FFFFFF] shadow-md flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="text-[#314000] text-sm font-semibold whitespace-nowrap">
              Show in radius
            </span>
            <div className="flex gap-2">
              {["1 km", "3 km", "5 km", "10 km"].map((dist) => (
                <button
                  key={dist}
                  onClick={() => setRadius(parseInt(dist))}
                  className="bg-[#4a5d23] text-white font-semibold px-3 py-1 rounded text-sm hover:bg-[#65800D] transition cursor-pointer"
                >
                  {dist}
                </button>
              ))}
            </div>
          </div>

          <div className="group relative w-full">
            <div className="bg-white text-[#314000] font-semibold rounded-lg px-4 py-2 shadow-md cursor-pointer border border-gray-200 flex items-center justify-between group-hover:bg-gray-50">
              <div className="flex items-center gap-2">
                <img src="/sort icon.svg" className="w-4 h-4" alt="sort icon" />
                Sort by: {sortBy}
              </div>
              <svg
                className="w-3 h-3 transition-transform group-hover:rotate-180"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
            <div className="hidden group-hover:block absolute left-0 right-0 pt-1 z-30">
              <div className="bg-white rounded-lg shadow-xl overflow-hidden">
                {sortOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => setSortBy(option)}
                    className="w-full text-left px-4 py-3 text-sm text-[#314000] hover:bg-gray-200 transition-colors font-semibold cursor-pointer"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="h-[40vh]">
          {state?.lat && state?.lng ? (
            <Map
              userCoords={{ lat: state.lat, lng: state.lng }}
              cafes={sortedCafes}
              activeCafe={activeCafe}
              setActiveCafe={handleCafeSelect}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 italic bg-[#f8f9fa]">
              Map is loading...
            </div>
          )}
        </div>
      </div>

      <div className="hidden md:block flex-1 bg-linear-to-tr from-[#A5CD20] to-[#FFFFFF] p-10">
        <div className="flex bg-white rounded-lg shadow-2xl overflow-hidden h-[85vh]">
          <CafeList
            cafes={sortedCafes}
            isLoading={loading}
            activeCafeId={activeCafe?.place_id}
            onCafeSelect={handleCafeSelect}
          />

          <div className="flex-1 relative bg-gray-100">
            <div className="radius-button-container absolute top-4 left-4 z-20 bg-white rounded-lg px-4 py-2 shadow-md flex items-center gap-4">
              <span className="text-[#314000] text-sm font-semibold whitespace-nowrap">
                Show in radius
              </span>
              <div className="flex gap-1">
                {["1 km", "3 km", "5 km", "10 km"].map((dist) => (
                  <button
                    key={dist}
                    onClick={() => setRadius(parseInt(dist))}
                    className="bg-[#4a5d23] text-white font-semibold px-6 py-1 rounded text-sm hover:bg-[#65800D] transition cursor-pointer"
                  >
                    {dist}
                  </button>
                ))}
              </div>
            </div>

            <div className="group absolute top-4 right-4 z-30">
              <div className="bg-white text-[#314000] font-semibold rounded-lg px-4 py-2 shadow-md cursor-pointer border border-gray-200 flex items-center gap-2 min-w-[140px] justify-between group-hover:bg-gray-50">
                <div className="flex items-center gap-2">
                  <img
                    src="/sort icon.svg"
                    className="w-4 h-4"
                    alt="sort icon"
                  />
                  Sort by
                </div>
                <svg
                  className="w-3 h-3 transition-transform group-hover:rotate-180"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
              <div className="hidden group-hover:block absolute right-0 pt-2 w-full">
                <div className="bg-white rounded-lg shadow-xl overflow-hidden">
                  {sortOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => setSortBy(option)}
                      className="w-full text-left px-4 py-3 text-sm text-[#314000] hover:bg-gray-200 transition-colors font-semibold cursor-pointer"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="w-full h-full">
              {state?.lat && state?.lng ? (
                <Map
                  userCoords={{ lat: state.lat, lng: state.lng }}
                  cafes={sortedCafes}
                  activeCafe={activeCafe}
                  setActiveCafe={handleCafeSelect}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400 italic bg-[#f8f9fa]">
                  Map is loading...
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
