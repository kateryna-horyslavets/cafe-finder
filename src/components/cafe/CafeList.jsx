export default function CafeList() {
  const cafes = [
    {
      id: 1,
      name: "Sweetlo family cafe",
      address: "Ihor Serdyk street, 8",
      hours: "10:00-23:00",
      rating: 5
    },
    {
      id: 2,
      name: "KOFAN",
      address: "Soborna street, 32/29",
      hours: "9:00-22:00",
      rating: 4
    },
    {
      id: 3,
      name: "Happy grill & pizza",
      address: "Soborna street, 17",
      hours: "9:00-23:00",
      rating: 2
    },
    {
        id: 4,
        name: "Dust",
        address: "Ukrainian renaissance boulevard, 2",
        hours: "8:00-22:30",
        rating: 4
    },
    {
        id: 5,
        name: "Cossak's brovarnya",
        address: "Ukrainian renaissance boulevard, 20",
        hours: "9:00-24:00",
        rating: 3
    }
  ];

  const renderStars = (rating) => {
    return "★".repeat(rating) + "☆".repeat(5 - rating);
  };

  return (
    <div className="w-88 h-screen bg-white overflow-y-auto custom-scrollbar">
      {cafes.map((cafe) => (
        <div 
          key={cafe.id} 
          className="p-6 border-b border-[#4E6308] last:border-b-0 hover:bg-gray-50 transition-colors"
        >
          <h2 className="text-2xl font-bold text-[#314000] mb-2 leading-tight">
            {cafe.name}
          </h2>
          
          <div className="space-y-1 text-[#314000] text-sm">
            <p><span className="font-semibold">Adress:</span> {cafe.address}</p>
            <p><span className="font-semibold">Opening hours:</span> {cafe.hours}</p>
            <div className="flex items-center gap-1">
              <span className="font-semibold">Rating:</span>
              <span className="text-yellow-400 text-lg leading-none">
                {renderStars(cafe.rating)}
              </span>
            </div>
          </div>

          <button className="mt-2 text-sm font-medium text-[#314000] hover:underline">
            Show on map
          </button>
        </div>
      ))}
    </div>
  );
};
