import React, { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import CurrentWeatherCard from "./components/CurrentWeatherCard";
import WeatherDetailsPanel from "./components/WeatherDetailsPanel";
import "./App.css";

const API_KEY = process.env.REACT_APP_OPENWEATHER_KEY || ""; // look for key in .env.

function App() {
  const [city, setCity] = useState("Toronto");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [unit, setUnit] = useState("metric"); // "metric" = C, "imperial" = F.  

  const toggleUnit = () => {
    setUnit((prev) => (prev === "metric" ? "imperial" : "metric"));
  };

  const fetchWeather = async (cityName) => {
    const trimmedCity = cityName.trim();
    if (!trimmedCity) {
      setError("Please enter a city name.");
      return;
    }
    if (!API_KEY) {
      setError("Missing API key. Set REACT_APP_OPENWEATHER_KEY in your .env file.");
      return;
    }
    try {
      setLoading(true);
      setError("");
      const encodedCity = encodeURIComponent(trimmedCity);
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodedCity}&appid=${API_KEY}`;
      const res = await fetch(url);
      const data = await res.json();
      if (!res.ok || data.cod !== 200) {
        setWeather(null);
        setError(data.message || "City not found. Please try another search.");
      } else {
        setWeather(data);
        setCity(trimmedCity);
      }
    } catch (err) {
      setWeather(null);
      setError("Unable to load weather data. Check your network and try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(city);
  }, []);  // load default city once

  const handleSearch = (newCity) => {
    fetchWeather(newCity);
  };

  const mainCondition = weather?.weather?.[0]?.main?.toLowerCase() || "default";

  return (
    <div className={`app app--${mainCondition}`}>
      <div className="app__content">
        <SearchBar onSearch={handleSearch} loading={loading} />
        {error && <p className="app__error">{error}</p>}
        {weather && (
          <>
            <CurrentWeatherCard
              city={city}
              weather={weather}
              unit={unit}
              onToggleUnit={toggleUnit}
            />
            <WeatherDetailsPanel weather={weather} unit={unit} />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
