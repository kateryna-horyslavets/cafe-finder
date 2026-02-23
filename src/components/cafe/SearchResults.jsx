import Navbar from "./Navbar";
import Footer from "./Footer";
import CafeList from "./CafeList";

export default function SearchResults() {
  const sortOptions = ["Name", "Rating", "Distance"];

  return (
    <div className="search-results-container flex flex-col min-h-screen">
      <Navbar />
      
      <div className="page-background flex-1 bg-linear-to-tr from-[#A5CD20] to-[#FFFFFF] p-10">
        <div className="flex bg-white rounded-lg shadow-2xl overflow-hidden h-screen">
            <CafeList />

          <div className="flex-1 relative bg-gray-100">

            <div className="radius-button-container absolute top-4 left-4 z-20 bg-white rounded-lg px-4 py-2 shadow-md flex items-center gap-4">
              <span className="text-[#314000] text-sm font-semibold whitespace-nowrap">Show in radius</span>
              <div className="flex gap-1">
                {['1 km', '3 km', '5 km', '10 km'].map((dist) => (
                  <button key={dist} className="bg-[#4a5d23] text-white font-semibold px-6 py-1 rounded text-sm hover:bg-[#65800D] transition cursor-pointer">
                    {dist}
                  </button>
                ))}
              </div>
            </div>

            <div className="group absolute top-4 right-4 z-30">
              <div className="bg-white text-[#314000] font-semibold rounded-lg px-4 py-2 shadow-md cursor-pointer border border-gray-200 flex items-center gap-2 min-w-[140px] justify-between group-hover:bg-gray-50">
                <div className="flex items-center gap-2">
                  <img src="/sort icon.svg" className="w-4 h-4" />
                  Sort by
                </div>
                <svg className="w-3 h-3 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>

              <div className="hidden group-hover:block absolute right-0 pt-2 w-full">
                <div className="bg-white rounded-lg shadow-xl overflow-hidden">
                  {sortOptions.map((option) => (
                    <button
                      key={option}
                      className="w-full text-left px-4 py-3 text-sm text-[#314000] hover:bg-gray-200 transition-colors font-semibold cursor-pointer"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="w-full h-full flex items-center justify-center text-gray-400 italic bg-[#f8f9fa]">
              Map is loading...
            </div>

          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}