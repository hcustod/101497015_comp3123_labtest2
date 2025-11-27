import React from "react";

function kelvinToC(k) {
  return k - 273.15;
}

function kelvinToF(k) {
  return ((k - 273.15) * 9) / 5 + 32;
}

function formatTemp(k, unit) {
  if (typeof k !== "number") {
    return "N/A";
  }
  if (unit === "imperial") {
    return `${Math.round(kelvinToF(k))}°F`;
  }
  return `${Math.round(kelvinToC(k))}°C`;
}

function CurrentWeatherCard({ city, weather, unit, onToggleUnit }) {
  if (!weather || !weather.main || !weather.weather || !weather.sys) {
    return null;
  }

  const { main, weather: weatherArr, sys } = weather;
  const w = weatherArr[0];

  if (!w) {
    return null;
  }

  const iconCode = w.icon || "01d";
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

  return (
    <section className="card current">
      <div className="current__main">
        <div>
          <h2>
            {city}, {sys.country}
          </h2>
          <p className="current__description">
            {w.main} · {w.description}
          </p>
        </div>
        <div className="current__temp">
          <span className="current__temp-value">
            {formatTemp(main.temp, unit)}
          </span>
          <button
            type="button"
            className="current__unit-toggle"
            onClick={onToggleUnit}
          >
            {unit === "metric" ? "Show °F" : "Show °C"}
          </button>
          <img src={iconUrl} alt={w.description || "Weather icon"} />
        </div>
      </div>
      <div className="current__sub">
        <span>Feels like {formatTemp(main.feels_like, unit)}</span>
        <span>
          Min {formatTemp(main.temp_min, unit)} · Max {formatTemp(main.temp_max, unit)}
        </span>
      </div>
    </section>
  );
}

export default CurrentWeatherCard;
