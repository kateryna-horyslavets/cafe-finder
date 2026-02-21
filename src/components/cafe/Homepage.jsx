import {Link} from 'react-router-dom';

export default function Homepage() {
  return (
    <div className="homepage-container">
      <div className="bg-[url('/background.png')] flex flex-col items-center justify-center min-h-screen w-full bg-cover bg-center px-4">
  <div className="text-center max-w-xl">
    <h1 className="homepage-title animate-appear text-[#314000] text-5xl md:text-6xl font-bold leading-tight">
      Find a place to eat anywhere
    </h1>
    <p className="homepage-description text-[#314000] opacity-70 mt-4 text-lg md:text-xl">
      Discover the taste of the best cafes near your location
    </p>
  </div>
  <div className="flex flex-col md:flex-row items-center gap-4 mt-8 w-full md:w-auto">
    <Link to="/results" className="w-full md:w-auto px-8 py-3 bg-[#314000] text-white rounded-xl hover:bg-[#4E6308] transition shadow-lg text-center">
      Share location
    </Link>
    
    <span className="text-[#314000] font-medium opacity-60">or</span>

            <form action="/results" method="get" className="flex flex-col sm:flex-row gap-1 w-full md:w-auto">
            <input 
                type="text" 
                placeholder="Enter location manually" 
                className="px-6 py-3 rounded-xl bg-white border border-[#314000] outline-none w-full text-center"
            />
            <button className="px-8 py-3 bg-[#314000] text-white rounded-xl hover:bg-[#4E6308] transition">
                Search
            </button>
            </form>
        </div>
    </div>
</div>
  );
}