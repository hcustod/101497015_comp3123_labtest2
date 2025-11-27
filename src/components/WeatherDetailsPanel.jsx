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

function formatTimeWithOffset(unixSeconds, timezoneOffsetSeconds) {
  if (typeof unixSeconds !== "number" || typeof timezoneOffsetSeconds !== "number") {
    return "N/A";
  }
  const localMs = (unixSeconds + timezoneOffsetSeconds) * 1000;
  return new Date(localMs).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function WeatherDetailsPanel({ weather, unit }) {
  if (!weather || !weather.main) {
    return null;
  }

  const { main, wind = {}, visibility, coord = {}, dt, sys = {}, timezone } = weather;

  const visibilityKm =
    typeof visibility === "number" ? (visibility / 1000).toFixed(1) : "N/A";
  const updatedAt =
    typeof dt === "number"
      ? new Date(dt * 1000).toLocaleTimeString()
      : "N/A";
  const updatedLocal =
    typeof dt === "number" && typeof timezone === "number"
      ? formatTimeWithOffset(dt, timezone)
      : "N/A";

  return (
    <section className="card details">
      <h3>Details</h3>
      <div className="details__grid">
        <div>
          <h4>Humidity</h4>
          <p>{main.humidity != null ? `${main.humidity}%` : "N/A"}</p>
        </div>
        <div>
          <h4>Pressure</h4>
          <p>{main.pressure != null ? `${main.pressure} hPa` : "N/A"}</p>
        </div>
        <div>
          <h4>Wind</h4>
          <p>
            {wind.speed != null ? `${wind.speed} m/s` : "N/A"}{" "}
            {wind.deg != null ? `· ${wind.deg}°` : ""}
          </p>
        </div>
        <div>
          <h4>Visibility</h4>
          <p>{visibilityKm !== "N/A" ? `${visibilityKm} km` : "N/A"}</p>
        </div>
        <div>
          <h4>Max temp</h4>
          <p>{formatTemp(main.temp_max, unit)}</p>
        </div>
        <div>
          <h4>Min temp</h4>
          <p>{formatTemp(main.temp_min, unit)}</p>
        </div>
        <div>
          <h4>Coordinates</h4>
          <p>
            {coord.lat != null && coord.lon != null
              ? `${coord.lat}, ${coord.lon}`
              : "N/A"}
          </p>
        </div>
        <div>
          <h4>Sunrise</h4>
          <p>
            {sys.sunrise != null && typeof timezone === "number"
              ? formatTimeWithOffset(sys.sunrise, timezone)
              : "N/A"}
          </p>
        </div>
        <div>
          <h4>Sunset</h4>
          <p>
            {sys.sunset != null && typeof timezone === "number"
              ? formatTimeWithOffset(sys.sunset, timezone)
              : "N/A"}
          </p>
        </div>
        <div>
          <h4>Updated</h4>
          <p>{updatedAt}</p>
        </div>
        <div>
          <h4>Updated (Local Time)</h4>
          <p>{updatedLocal}</p>
        </div>
      </div>
    </section>
  );
}

export default WeatherDetailsPanel;
