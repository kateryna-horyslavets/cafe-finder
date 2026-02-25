export default function CafeList({ cafes, isLoading, onCafeSelect, activeCafeId }) {
  const renderStars = (rating) => "★".repeat(Math.round(rating || 0)) + "☆".repeat(5 - Math.round(rating || 0));

  const formatHours = (cafe) => {
    if (!cafe.opening_hours?.weekday_text) return null;
    const today = new Date().getDay();
    const index = today === 0 ? 6 : today - 1;
    const todayLine = cafe.opening_hours.weekday_text[index];
    return todayLine ? todayLine.replace(/^[^:]+:\s*/, '') : null;
  };

  if (isLoading) return <div className="w-88 flex items-center justify-center text-[#314000] font-semibold">Searching for cafes...</div>;

  return (
    <div className="w-full md:w-88 h-full bg-white overflow-y-auto custom-scrollbar border-r border-gray-200 ">
      {cafes.map((cafe) => (
        <div key={cafe.place_id} className={`p-6 border-b transition-all ${activeCafeId === cafe.place_id ? 'bg-gray-50 border-l-4 border-gray-200' : 'hover:bg-gray-50'}`}>
          {cafe.photo_url && <img src={cafe.photo_url} className="w-full h-32 object-cover rounded-lg mb-3 shadow-sm"/>}
          <h2 className="text-xl font-bold text-[#314000]">{cafe.name}</h2>

          <div className="mt-3 space-y-2 text-xs text-[#314000]">
            <div>
              <p className="font-semibold uppercase tracking-wide opacity-50 mb-0.5">Address</p>
              <p className="font-semibold mt-1"> {cafe.vicinity}</p>
            </div>

            {formatHours(cafe) && (
              <div>
                <p className="font-semibold uppercase tracking-wide opacity-50 mb-0.5">Working hours</p>
                <p className="font-semibold mt-1">{formatHours(cafe)}</p>
              </div>
            )}

            <div>
              <p className="font-semibold uppercase tracking-wide opacity-50 mb-0.5">Rating</p>
              <div className="flex items-center gap-1">
                <span className="text-yellow-500 text-xl">{renderStars(cafe.rating)}</span>
                <span className="font-semibold ml-1 mt-0.5">{cafe.rating?.toFixed(1)}</span>
                <span className="text-gray-400 mt-0.5">({cafe.user_ratings_total})</span>
              </div>
            </div>
          </div>

          <button onClick={() => onCafeSelect(cafe)} className="mt-4 w-full py-2 bg-[#314000] text-white rounded-lg text-xs font-semibold hover:bg-[#4E6308] transition cursor-pointer">
            Show on map
          </button>
        </div>
      ))}
    </div>
  );
}