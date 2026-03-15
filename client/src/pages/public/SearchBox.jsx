import React, { useEffect, useState } from 'react'
import { Hotel, Plane, Car, Train, Bus, MapPin, Calendar, Users, Search, ArrowRight, LucideBellElectric } from 'lucide-react'

const SearchBox = () => {
  const [activeTab, setActiveTab] = useState("hotel");
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // const [showG, setshowG] = useState(second)

  // Mock data for suggestion
  const cities = ["New York", "London", "Paris", "Tokyo", "Dubai", "Mumbai", "Singapore"];

  // Handel Autocomplete Logic
  useEffect(() => {
    if (query.length > 1) {
      const filtered = cities.filter(city =>
        city.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
    }
  }, [query]);

  const tabs = [
    { id: "hotel", label: "Hotels", icon: <Hotel size={18} /> },
    { id: "flight", label: "Flights", icon: <Plane size={18} /> },
    { id: "cab", label: "Cabs", icon: <Car size={18} /> },
    { id: "train", label: "Trains", icon: <Train size={18} /> },
    { id: "bus", label: "Bus", icon: <Bus size={18} /> }
  ];

  return (
    <div className='w-full max-w-6xl mx-auto px-4 '>
      {/* Tab */}
      <div className='flex  bg-white/90 backdrop-blur-md w-full md:w-fit rounded-t-2xl overflow-x-auto  no-scrollbar shadow-sm'>
        {tabs.map((tab) => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            className={`flex-shrink-0 flex items-center gap-2 px-4 md:px-6 py-3 transition-all 
          ${activeTab === tab.id ? "bg-blue-600 text-white "
                : "text-gray-600 hover:bg-gray-100"} `}>
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Search container */}
      <div className='bg-white rounded-b-2xl rounded-tr-2xl shadow-2xl p-6 relative'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 border rounded=xl overflow-hidden'>

          {/* City Input with Suggestions */}
          <div className='relative p-4 border-r hover:bg-slate-50 transition-colors'>
            <label className='flex items-center gap-2 text-blue-600 font-bold text-xs uppercase mb-1'>
              <MapPin size={14} />
              {activeTab === "flight" ? "From" : "Destination"}
            </label>
            <input type="text" value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder='Where are you going?'
              className='w-full bg-transparent outline-none text-gray-800 font-semibold placeholder:text-gray-400' />
            {/* Suggestions Dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <ul className='absolute left-0 top-full bg-white shadow-xl rounded-b-lg z-[60] border-t'>
                {suggestions.map((city) => (
                  <li
                    key={city}
                    onClick={() => { setQuery(city); setShowSuggestions(false); }}
                    className='p-3 hover:bg-blue-50 cursor-pointer flex items-center gap-3 text-sm'>
                    <MapPin size={14} className='text-gray-400' /> {city}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Date input */}
          <div className='p-4 border-r hover:bg-slate-50 transition-colors'>
            <label className='flex items-center gap-2 text-blue-600 font-bold text-xs uppercase mb-1'>
              <Calendar size={14} /> {activeTab === "hotel" ? "Check In" : "Date"}
            </label>
            <input type="date" className='w-full bg-transparent outline-none text-gray-800 font-semibold' />
          </div>

          {/* Conditional Date Input for hotel flight */}
          {(activeTab === "hotel" || activeTab === "flight") && (
            <div className='p-4 border-r hover:bg-slate-50 transition-colors animate-in duration-300'>
              <label className='flex items-center gap-2 text-blue-600 font-bold text-xs uppercase mb-1'>
                <Calendar size={14} />{activeTab === "hotel" ? "Check Out" : "Return"}
              </label>
              <input type="date" className='w-full bg-transparent outline-none text-gray-800 font-semibold' />
            </div>
          )}

          {/* guests */}
          <div className='relative p-4 hover:bg-slate-50 transition-colors'>
            <label className='flex items-center gap-2 text-blue-600 font-bold text-xs uppercase mb-1'>
              <Users size={14} />
              {activeTab === "cab" || activeTab === "train" || activeTab === "bus" || activeTab === "flight" ? "Trip Type" : "Guests & Rooms"}

            </label>
            <select className='w-full bg-transparent outline-none text-gray-800 font-semibold appearance-none cursor-pointer'>
              {activeTab === "cab" || activeTab === "train" || activeTab === "bus" || activeTab === "flight" ? (
                <>
                  <option >One Way</option>
                  <option >Round Trip</option>
                </>
              ) : (
                <option>2 Adults, 1 Room</option>
              )}
            </select>
          </div>
        </div>

        {/* Search button */}
        <div className='absolute -bottom-6 left-1/2 -translate-x-1/2'>
          <button className='bg-blue-800 hover:bg-blue-900 text-white px-10 py-4 rounded-full font-bold shadow-lg 
          flex items-center gap-2 transition-transform active:scale-95'>
            Search {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}s
            <ArrowRight size={18}/>
          </button>
        </div>
      </div>
    </div>
  )
};
export default SearchBox