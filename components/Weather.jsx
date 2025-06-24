import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SearchBar from './SearchBar';
import WeatherSkeleton from './WeatherSkeleton';
import ErrorMessage from './ErrorMessage';
import WeatherCard from './WeatherCard';
import WeatherDetails from './WeatherDetails';
import { weatherThemes, conditionToTheme } from '../config/weatherConfig';

const Weather = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [theme, setTheme] = useState(weatherThemes.default);
  const [location, setLocation] = useState('London');

  const API_KEY = import.meta.env.VITE_APP_WEATHER_API_KEY;

  const fetchWeather = async (city) => {
    setLoading(true);
    setError('');
    setLocation(city);
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`
      );
      if (!response.ok) {
        throw new Error('City not found or API error');
      }
      const data = await response.json();
      setWeather(data);
      const themeKey = conditionToTheme[data.current.condition.text] || 'default';
      setTheme(weatherThemes[themeKey]);
    } catch (err) {
      setError(err.message || 'Failed to fetch weather data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather('London');
  }, []);

  return (
    <div className={`min-h-screen ${theme.bgClass} ${theme.textClass}`}>
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className={`text-4xl font-bold text-white mb-4`}
          >
            Get Real-Time Weather
          </motion.h2>
          <p className={`text-l text-gray-200 mb-8`}>
            Search for any city to see current weather conditions
          </p>
          <SearchBar onSearch={fetchWeather} loading={loading} />
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {loading && <WeatherSkeleton />}
          {error && !loading && <ErrorMessage message={error} />}
          {weather && !loading && !error && <WeatherCard weather={weather} />}
          {weather && !loading && !error && <WeatherDetails location={location} apiKey={API_KEY} />}
        </motion.div>
      </main>
      
    </div>
  );
}

export default Weather;