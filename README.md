# 🌤️ Simple Weather Reporter Website

A modern, responsive web application that displays real-time weather information for any city using the [WeatherAPI.com](https://www.weatherapi.com/). Built with **React + Vite** and styled using **Tailwind CSS**, the app provides an intuitive and visually appealing user experience.

## 🚀 Features

- 🌍 **Search for any location** to view current weather
- 🌡️ Displays:
  - Temperature (°C)
  - Humidity (%)
  - Wind Speed (km/h)
  - UV Index
  - Weather Condition (with icons)
  - Feels Like, Cloud Cover, and more
- 🔄 **Loading state** with animated spinner
- 💬 **Error handling** for invalid locations or failed requests
- 💻 **Responsive design** for mobile, tablet, and desktop
- ✨ Smooth UI animations and transitions

## 🛠 Tech Stack

- **Frontend**: [React](https://reactjs.org/) + [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: Tailwind transitions (or optionally Framer Motion)
- **API**: [WeatherAPI.com](https://www.weatherapi.com/)

## 📦 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/simple-weather-reporter.git
cd simple-weather-reporter

### 2. Install dependencies

```bash
npm install

### 3. Set up your API key

```bash
VITE_APP_WEATHER_API_KEY=your_api_key

### 4. Run the development server

```bash
npm run dev

### 5. Build for production

```bash
npm run build

## Live Demo

https://simple-weathernow.netlify.app/


## 🧠 Design Choices & Notes

- Chose Vite for fast development and hot reload support.
- Tailwind CSS was used for efficient styling and responsive layouts.
- WeatherAPI.com provides rich and easy-to-use data, including icons and UV index.
- The app is componentized for better maintainability and reusability.


## 📝 License

- This project is open-source and available under the MIT License.