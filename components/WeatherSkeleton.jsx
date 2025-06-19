const WeatherSkeleton = () => (
  <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-2xl mx-auto animate-pulse">
    <div className="flex items-center justify-center mb-6">
      <div className="w-5 h-5 bg-gray-300 rounded-full mr-2"></div>
      <div className="h-6 bg-gray-300 rounded w-1/2"></div>
    </div>
    <div className="text-center mb-8">
      <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4"></div>
      <div className="h-12 bg-gray-300 rounded w-1/3 mx-auto mb-2"></div>
      <div className="h-6 bg-gray-300 rounded w-1/4 mx-auto mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-1/5 mx-auto"></div>
    </div>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="bg-gray-100 rounded-xl p-4">
          <div className="w-8 h-8 bg-gray-300 rounded-full mx-auto mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto mb-1"></div>
          <div className="h-6 bg-gray-300 rounded w-1/2 mx-auto"></div>
        </div>
      ))}
    </div>
  </div>
);

export default WeatherSkeleton;