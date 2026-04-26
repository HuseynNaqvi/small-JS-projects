const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const cityDisplay = document.querySelector(".cityDisplay");
const tempDisplay = document.querySelector(".tempDisplay");
const humidityDisplay = document.querySelector(".humidityDisplay");
const descDisplay = document.querySelector(".descDisplay");
const weatherEmoji = document.querySelector(".weatherEmoji");

const apiKey = "26c1579ff8cc3339b089cd3457f8401a";

weatherForm.addEventListener("submit", async event => {
  event.preventDefault();

  const city = cityInput.value;

  if (city) {
    try {
      const weatherData = await getWeatherData(city);
      displayWeatherInfo(weatherData);
    }
    catch (error) {
      displayError(error.message);
    }
  }
  else {
    displayError("Please enter a city");
  }
});

async function getWeatherData(city) {
  const apiUrl =
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  const response = await fetch(apiUrl);

  if (!response.ok) {
    throw new Error("City not found");
  }

  return await response.json();
}

function displayWeatherInfo(data) {
  const { name } = data;
  const { temp, humidity } = data.main;
  const { description, id } = data.weather[0];

  cityDisplay.textContent = name;
  tempDisplay.textContent = `${temp}°C`;
  humidityDisplay.textContent = `Humidity: ${humidity}%`;
  descDisplay.textContent = description;
  weatherEmoji.textContent = getWeatherEmoji(id);

  card.style.display = "block";
}

function getWeatherEmoji(weatherId) {
  if (weatherId >= 200 && weatherId < 300) return "⛈️";
  if (weatherId >= 300 && weatherId < 400) return "🌧️";
  if (weatherId >= 500 && weatherId < 600) return "🌦️";
  if (weatherId >= 600 && weatherId < 700) return "❄️";
  if (weatherId >= 700 && weatherId < 800) return "🌫️";
  if (weatherId === 800) return "☀️";
  if (weatherId > 800) return "☁️";
  return "❓";
}

function displayError(message) {
  card.style.display = "block";
  card.textContent = message;
}
