import {Link} from 'react-router-dom';

export default function Homepage() {
  return (
    <div className="homepage-container">
      <div className="bg-[url(/background.png)] flex flex-col items-center justify-center min-h-screen w-full bg-cover bg-center">

          <h1 className="homepage-title animate-appear text-[#314000] text-5xl font-bold">Find a place to eat anywhere</h1>
          <p className="homepage-description text-[#314000] opacity-60 mt-4">Discover the taste of the best cafes near your location</p>
          
          <div className="homepage-buttons mt-6">
            <Link to="/results" className="homepage-button px-4 py-3 bg-[#314000] text-white rounded-xl hover:bg-[#4E6308] transition duration-300">
              Share location
            </Link>
            <span className="homepage-or text-[#314000] ml-4">or</span>
            <form action="/results" method="get" className="inline-block ml-4">
                <input type="text" name="location" placeholder="Enter location manually" className="homepage-input px-2 py-3 rounded-xl bg-white border border-[#314000] focus:outline-none text-center" />
                <button type="submit" className="homepage-button ml-1 px-4 py-3 bg-[#314000] text-white rounded-xl hover:bg-[#4E6308] transition duration-300">
                  Search
                </button>
            </form>
        </div>
      </div>
    </div>
  );
}