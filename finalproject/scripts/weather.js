/*****************************************************
 * scripts/weather.js
 * WDD231 – Final Project
 * Weather + 3 Day Forecast
 * Author: Emerson Ronald Pereira
 * Location: Curitiba, Brazil
 *****************************************************/

const weatherData = document.querySelector(".weather-data");
const forecastDataSection = document.querySelector(".forecast-data");

const lat = -25.49;
const lon = -49.30;
const apiKey = "bd04f258ce26ea48af3d34702aabf287";

const forecastUrl =
  `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

const currentUrl =
  `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

export async function initWeather() {

  if (!weatherData || !forecastDataSection) return;

  try {

    const [currentResponse, forecastResponse] = await Promise.all([
      fetch(currentUrl),
      fetch(forecastUrl)
    ]);

    if (!currentResponse.ok || !forecastResponse.ok) {
      throw new Error("Weather data unavailable");
    }

    const currentData = await currentResponse.json();
    const forecastData = await forecastResponse.json();

    const todayMinMax = getTodayMinMax(forecastData);

    displayCurrentWeather(currentData, todayMinMax);
    displayForecast(forecastData);

  } catch (error) {
    console.error("Weather error:", error);
  }
}

/* ================= HELPERS ================= */

function getTodayMinMax(forecastData) {
  const today = new Date().toISOString().split("T")[0];

  const temps = forecastData.list
    .filter(item => item.dt_txt.startsWith(today))
    .map(item => item.main.temp);

  return {
    max: Math.round(Math.max(...temps)),
    min: Math.round(Math.min(...temps))
  };
}

function getWindDirection(deg) {
  const directions = ["N","NE","E","SE","S","SW","W","NW"];
  return directions[Math.round(deg / 45) % 8];
}

/* ================= CURRENT WEATHER ================= */

function displayCurrentWeather(data, todayMinMax) {

  const icon = data.weather[0].icon;
  const description = data.weather[0].description
    .split(" ")
    .map(word => word[0].toUpperCase() + word.slice(1))
    .join(" ");

  const iconURL = `https://openweathermap.org/img/w/${icon}.png`;

  const temp = Math.round(data.main.temp);
  const humidity = data.main.humidity;
  const pressure = data.main.pressure;

  const windSpeed = data.wind.speed;
  const windDirection = getWindDirection(data.wind.deg);

  const sunrise = new Date(data.sys.sunrise * 1000)
    .toLocaleTimeString("en-US",{ hour:"2-digit", minute:"2-digit" });

  const sunset = new Date(data.sys.sunset * 1000)
    .toLocaleTimeString("en-US",{ hour:"2-digit", minute:"2-digit" });

  weatherData.innerHTML = `
    <div class="weather-content">
      <img src="${iconURL}" alt="${description}">
      <div class="weather-info">
        <p><strong>${temp}°C</strong></p>
        <p>${description}</p>
        <p>High: ${todayMinMax.max}°C</p>
        <p>Low: ${todayMinMax.min}°C</p>
        <p>Humidity: ${humidity}%</p>
        <p>Pressure: ${pressure} hPa</p>
        <p>Wind: ${windDirection} ${windSpeed} m/s</p>
        <p>Sunrise: ${sunrise}</p>
        <p>Sunset: ${sunset}</p>
      </div>
    </div>
  `;
}

/* ================= 3 DAY FORECAST ================= */

function displayForecast(data) {

  forecastDataSection.innerHTML = "";

  const days = data.list
    .filter(item => item.dt_txt.includes("12:00:00"))
    .slice(0,3);

  days.forEach(day => {

    const date = new Date(day.dt_txt);
    const dayName = date.toLocaleDateString("en-US",{ weekday:"long" });

    forecastDataSection.innerHTML += `
      <p>${dayName}: <strong>${Math.round(day.main.temp)}°C</strong></p>
    `;
  });
}
