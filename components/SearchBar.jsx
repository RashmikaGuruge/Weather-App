import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';

const SearchBar = ({ onSearch, loading }) => {
  const [city, setCity] = useState('');

  const handleSubmit = () => {
    if (city.trim()) {
      onSearch(city.trim());
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto mb-8"
    >
      <div className="relative">
        <input
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyPress={handleKeyPress}
          className="w-full px-4 py-3 pl-12 pr-16 text-gray-700 bg-white border-2 border-gray-300 rounded-full focus:outline-none focus:border-[#1a2350] focus:ring-2 focus:ring-blue-200 transition-all duration-300 shadow-lg disabled:opacity-50"
          disabled={loading}
        />
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSubmit}
          disabled={loading || !city.trim()}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#1a2350] hover:bg-[#121938] disabled:bg-gray-400 text-white px-4 py-1.5 rounded-full transition-colors duration-300 text-sm font-medium cursor-pointer"
        >
          Search
        </motion.button>
      </div>
    </motion.div>
  );
};

export default SearchBar;