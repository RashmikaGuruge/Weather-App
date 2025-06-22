export const weatherThemes = {
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

export const conditionToTheme = {
  'Sunny': 'Sunny',
  'Clear': 'Sunny',
  'Partly cloudy': 'Cloudy',
  'Cloudy': 'Cloudy',
  'Overcast': 'Cloudy',
  'Mist': 'Cloudy',
  'Fog': 'Cloudy',
  'Rain': 'Rain',
  'Light rain': 'Rain',
  'Moderate rain': 'Rain',
  'Heavy rain': 'Rain',
  'Patchy rain possible': 'Rain',
  'Light drizzle': 'Rain',
  'Drizzle': 'Rain'
};
