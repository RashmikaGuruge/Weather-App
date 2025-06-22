import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const WeatherDetails = ({ location, apiKey }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=1`);
        setWeatherData(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };
    fetchWeatherData();
  }, [location, apiKey]);

  if (loading) return <div className="text-white text-center">Loading...</div>;
  if (error) return <div className="text-red-500 text-center">Error: {error.message}</div>;

  const current = weatherData.current;
  const forecast = weatherData.forecast.forecastday[0];

  // Temperature Card Data
  const hourlyTemps = forecast.hour.map(h => ({ time: h.time.split(' ')[1], temp: h.temp_c }));
  const peakTemp = Math.max(...hourlyTemps.map(h => h.temp));
  const peakTime = hourlyTemps.find(h => h.temp === peakTemp).time;
  const nextHourTemp = hourlyTemps[1]?.temp || current.temp_c;
  const tempTrend = nextHourTemp > current.temp_c ? 'RISING' : 'FALLING';

  // Feels Like Card Data
  const feelsLike = current.feelslike_c;
  const dominantFactor = current.humidity > 60 ? 'HUMIDITY' : 'WIND';
  const feelsLikeDesc = feelsLike > current.temp_c ? 'Slightly warmer than actual temperature due to humidity.' : 'Similar to actual temperature.';

  // Cloud Cover Card Data
  const cloudCover = current.cloud;
  const cloudDesc = current.condition.text;
  const cloudTrend = forecast.hour[1].cloud < cloudCover ? 'DECREASING' : 'INCREASING';

  // Precipitation Card Data
  const totalPrecip = forecast.hour.reduce((sum, h) => sum + h.precip_mm, 0);
  const rainHours = forecast.hour.filter(h => h.will_it_rain);
  const timeUntilRainStops = rainHours.length ? (new Date(rainHours[rainHours.length - 1].time) - new Date()) / 3600000 : 0;

  // Wind Card Data
  const windSpeed = current.wind_kph;
  const beaufortScale = windSpeed < 2 ? '0 (CALM)' : windSpeed < 6 ? '1 (LIGHT AIR)' : windSpeed < 12 ? '2 (LIGHT BREEZE)' : '3+';

  // Humidity Card Data
  const humidity = current.humidity;
  const humidityDesc = humidity > 70 ? 'VERY HUMID' : humidity > 50 ? 'MODERATE' : 'LOW';
  const humidityTrend = forecast.hour[1].humidity < humidity ? 'DECREASING' : 'INCREASING';

  const minTemp = -10;
const maxTemp = 35;
const range = maxTemp - minTemp;

// Normalize "feelsLike" to a percentage between 0 and 100
const progressPercentage = Math.min(100, Math.max(0, ((feelsLike - minTemp) / range) * 100));


  return (
    <div className="bg-[#ffffff0d] bg-opacity-80 mt-12 text-white p-8 rounded-3xl shadow-2xl max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-2xl font-bold">Weather details</h2>
          <p className="text-sm">{new Date().toLocaleTimeString()}</p>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {/* Temperature Card */}
        <div className="bg-[#ffffff0d] bg-opacity-80 p-4 rounded-xl">
          <h3 className="text-sm">Temperature</h3>
          <p className="text-3xl font-bold">{current.temp_c}°</p>
          <LineChart width={180} height={80} data={hourlyTemps}>
            <Line type="monotone" dataKey="temp" stroke="#ff4d4f" dot={false} />
            <XAxis dataKey="time" hide />
            <YAxis hide />
            <CartesianGrid strokeOpacity={0.2} />
            <Tooltip />
          </LineChart>
          <p className="text-orange-400 text-sm">{tempTrend} ↗</p>
          <p className="text-xs">Rising with a peak of {peakTemp}° at {peakTime}.</p>
        </div>

        {/* Feels Like Card */}
<div className="bg-[#ffffff0d] bg-opacity-80 p-4 rounded-xl">
  <h3 className="text-sm mb-1">Feels like</h3>

  {/* Progress Bar */}
  <div className="relative h-2 bg-gray-700 rounded-full mb-3">
    <div
      className="absolute top-0 left-0 h-2 bg-yellow-400 rounded-full transition-all duration-300"
      style={{ width: `${progressPercentage}%` }}
    ></div>
  </div>

  <p className="text-xs mb-2 text-gray-300">Dominant factor: {dominantFactor}</p>
  <div className="flex items-center justify-between mb-1">
    <p className="text-2xl">{feelsLike}°</p>
    <p className="text-sm text-gray-300">Temperature: {current.temp_c}°</p>
  </div>
  <p className="text-orange-400 text-sm">SLIGHTLY WARMER ↗</p>
  <p className="text-xs text-gray-400">{feelsLikeDesc}</p>
</div>


        {/* Cloud Cover Card */}
        <div className="bg-[#ffffff0d] bg-opacity-80 p-4 rounded-xl">
          <h3 className="text-sm">Cloud cover</h3>
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-gray-500 rounded-full flex items-center justify-center">{cloudDesc}</div>
          </div>
          <p className="text-sm text-center">({cloudCover}%)</p>
          <p className="text-blue-400 text-sm">{cloudTrend} ↘</p>
          <p className="text-xs">Decreasing with cloudy sky at 1:06 PM.</p>
        </div>

        {/* Precipitation Card */}
        <div className="bg-[#ffffff0d] bg-opacity-80 p-4 rounded-xl">
          <h3 className="text-sm">Precipitation</h3>
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">Rain</div>
          </div>
          <p className="text-2xl text-center">{totalPrecip.toFixed(2)} cm</p>
          <p className="text-sm text-center">In next 24h</p>
          <p className="text-orange-400 text-sm">HEAVY RAIN ↗</p>
          <p className="text-xs">Rain stopping in about {timeUntilRainStops.toFixed(1)} hours.</p>
        </div>

        {/* Wind Card */}
        <div className="bg-[#ffffff0d] bg-opacity-80 p-4 rounded-xl">
          <h3 className="text-sm">Wind</h3>
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-gray-500 rounded-full flex items-center justify-center" style={{ transform: `rotate(${current.wind_degree}deg)` }}>→</div>
          </div>
          <p className="text-sm">From {current.wind_dir} ({current.wind_degree}°)</p>
          <p className="text-sm">Wind Speed: {windSpeed} km/h</p>
          <p className="text-sm">Wind Gust: {current.gust_kph} km/h</p>
          <p className="text-yellow-400 text-sm">FORCE: {beaufortScale}</p>
          <p className="text-xs">Steady with averages holding at 10 km/h.</p>
        </div>

        {/* Humidity Card */}
        <div className="bg-[#ffffff0d] bg-opacity-80 p-4 rounded-xl">
          <h3 className="text-sm">Humidity</h3>
          <p className="text-2xl">{humidity}%</p>
          <div className="flex space-x-1 my-2">
            {[...Array(10)].map((_, i) => (
              <div key={i} className={`h-4 w-2 ${i < Math.round(humidity / 10) ? 'bg-blue-400' : 'bg-gray-600'}`}></div>
            ))}
          </div>
          <p className="text-sm">Dew point: {current.dewpoint_c}°</p>
          <p className="text-blue-400 text-sm">{humidityDesc} ↘</p>
          <p className="text-xs">Decreasing with a low of {humidity}% at 1:06 PM.</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherDetails;