import { motion } from 'framer-motion';
import { Search, MapPin, Thermometer, Droplets, Wind, Sun, Eye, Cloud, Loader2 } from 'lucide-react';
import ReactAnimatedWeather from 'react-animated-weather';

const weatherThemes = {
  Sunny: {
    bgClass: 'bg-gradient-to-br from-[#443d71] via-[#302e56] to-[#171e43]',
    textClass: 'text-white',
    textLabel: 'text-gray-800',
    cardBg: 'bg-[#ffffff0d] bg-opacity-80'
  },
  Cloudy: {
    bgClass: 'bg-gradient-to-br from-[#1e467a] via-[#17294b] to-[#14203d]',
    textClass: 'text-white',
    textLabel: 'text-gray-800',
    cardBg: 'bg-[#ffffff0d] bg-opacity-80'
  },
  Rain: {
    bgClass: 'bg-gradient-to-br from-[#394dae] via-[#203482] to-[#121f51]',
    textClass: 'text-white',
    textLabel: 'text-gray-800',
    cardBg: 'bg-[#ffffff0d] bg-opacity-80'
  },
  default: {
    bgClass: 'bg-gradient-to-br from-[#443d71] via-[#302e56] to-[#171e43]',
    textClass: 'text-white',
    textLabel: 'text-gray-800',
    cardBg: 'bg-[#ffffff0d] bg-opacity-80'
  }
};


const WeatherCard = ({ weather }) => {
  const { location, current } = weather;
  const theme = weatherThemes[conditionToTheme[current.condition.text] || 'default'];

  // Map API weather conditions to animated icons
  const iconMap = {
    'Sunny': 'CLEAR_DAY',
    'Clear': 'CLEAR_DAY',
    'Partly cloudy': 'PARTLY_CLOUDY_DAY',
    'Cloudy': 'CLOUDY',
    'Overcast': 'CLOUDY',
    'Mist': 'FOG',
    'Fog': 'FOG',
    'Rain': 'RAIN',
    'Light rain': 'RAIN',
    'Moderate rain': 'RAIN',
    'Heavy rain': 'RAIN',
    'Patchy rain possible': 'RAIN',
    'Light drizzle': 'RAIN',
    'Drizzle': 'RAIN',
    'Snow': 'SNOW',
    'Wind': 'WIND'
  };
  const icon = iconMap[current.condition.text] || 'CLEAR_DAY';

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`rounded-3xl shadow-2xl p-8 max-w-2xl mx-auto ${theme.cardBg}`}
    >
      <div className="flex items-center justify-center mb-6">
        <MapPin className="w-5 h-5 text-red-500 mr-2" />
        <h2 className={`text-2xl font-bold ${theme.textClass}`}>
          {location.name}, {location.country}
        </h2>
      </div>
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
          className="flex items-center justify-center mb-4"
        >
          <ReactAnimatedWeather
            icon={icon}
            color={theme.textClass === 'text-white' ? '#ffffff' : '#000000'}
            size={64}
            animate={true}
          />
        </motion.div>
        <div className={`text-6xl font-bold ${theme.textClass} mb-2`}>
          {Math.round(current.temp_c)}°C
        </div>
        <div className={`text-xl ${theme.textClass} mb-2`}>
          {current.condition.text}
        </div>
        <div className={`text-[15px] text-gray-200`}>
          Feels like {Math.round(current.feelslike_c)}°C
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { icon: Droplets, label: 'Humidity', value: `${current.humidity}%`, bg: 'bg-blue-50 hover:bg-blue-100' },
          { icon: Wind, label: 'Wind', value: `${current.wind_kph} km/h`, bg: 'bg-green-50 hover:bg-green-100' },
          { icon: Sun, label: 'UV Index', value: current.uv, bg: 'bg-yellow-50 hover:bg-yellow-100' },
          { icon: Eye, label: 'Visibility', value: `${current.vis_km} km`, bg: 'bg-purple-50 hover:bg-purple-100' }
        ].map((item, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            className={`${item.bg} rounded-xl p-4 text-center transition-colors duration-300`}
          >
            <item.icon className={`w-8 h-8 mx-auto mb-2 ${theme.textLabel}`} />
            <div className={`text-sm ${theme.textLabel} mb-1`}>{item.label}</div>
            <div className={`text-xl font-bold ${theme.textLabel}`}>{item.value}</div>
          </motion.div>
        ))}
      </div>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { icon: Cloud, label: 'Cloud Cover', value: `${current.cloud}%` },
          { icon: Thermometer, label: 'Pressure', value: `${current.pressure_mb} mb` }
        ].map((item, index) => (
          <div key={index} className="bg-gray-50 rounded-xl p-4 flex items-center">
            <item.icon className={`w-6 h-6 ${theme.textLabel} mr-3`} />
            <div>
              <div className="text-sm text-gray-600">{item.label}</div>
              <div className={`text-lg font-semibold ${theme.textLabel}`}>{item.value}</div>
            </div>
          </div>
        ))}
      </div>
      <div className={`mt-6 text-center text-sm ${theme.textClass.replace('text-', 'text-gray-')}`}>
        Last updated: {new Date().toLocaleString('en-LK', { timeZone: 'Asia/Colombo' })}
      </div>

    </motion.div>
  );
};

export default WeatherCard;