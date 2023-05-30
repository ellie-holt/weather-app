function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let currentDay = days[date.getDay()];
  let currentMonth = months[date.getMonth()];
  let currentDate = String(date.getDate()).padStart(2, "0");

  let formattedDate = `${currentDay} ${currentDate} ${currentMonth}`;
  return formattedDate;
}

function formatTime(time) {
  let currentHours = String(time.getHours()).padStart(2, "0");
  let currentMinutes = String(time.getMinutes()).padStart(2, "0");
  let formattedTime = `${currentHours}:${currentMinutes}`;
  return formattedTime;
}

function showWeather(response) {
  let userCityElement = document.querySelector("#user-city");
  let currentTempElement = document.querySelector("#temp-value");
  let maxTempElement = document.querySelector("#max-temp-value");
  let minTempElement = document.querySelector("#min-temp-value");
  let humidityElement = document.querySelector("#humidity-value");
  let windElement = document.querySelector("#wind-value");
  let descriptionElement = document.querySelector("#weather-description");
  // let iconElement = document.querySelector("#weather-icon");

  let currentTemp = Math.round(response.data.main.temp);
  let maxTemp = Math.round(response.data.main.temp_max);
  let minTemp = Math.round(response.data.main.temp_min);
  let humidity = `${response.data.main.humidity}%`;
  let wind = Math.round(response.data.wind.speed * 10) / 10;
  let description = response.data.weather[0].description;

  userCityElement.innerHTML = response.data.name;
  currentTempElement.innerHTML = currentTemp;
  maxTempElement.innerHTML = maxTemp;
  minTempElement.innerHTML = minTemp;
  humidityElement.innerHTML = humidity;
  windElement.innerHTML = wind;
  descriptionElement.innerHTML = description;

  console.log(currentTemp);
}

function searchCity(event) {
  event.preventDefault();
  let searchBar = document.querySelector("#search-bar");
  let userCity = searchBar.value;
  console.log(userCity);
  let apiKey = "ece424250b8bd634c2653a8886cce7a1";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${userCity}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  let userCityHeading = document.querySelector("#user-city");
  userCityHeading.innerHTML = `${userCity}`;
  axios.get(apiUrl).then(showWeather);
}

function getPosition(position) {
  let apiKey = "ece424250b8bd634c2653a8886cce7a1";
  let currentLat = position.coords.latitude;
  let currentLon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${currentLat}&lon=${currentLon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
  console.log(apiUrl);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getPosition);
}

function convertTemp(event) {
  event.preventDefault();
  let convertTempButton = document.querySelector("#convert-temp");
  let tempValue = document.querySelector("#temp-value");
  let tempUnit = document.querySelector("#temp-unit");
  let temperature = tempValue.innerHTML;
  console.log(temperature);
  let farenheitTemp = Math.round(temperature * 1.8 + 32);
  let celciusTemp = Math.round((temperature - 32) / 1.8);
  if (tempUnit.innerHTML === "°C") {
    convertTempButton.innerHTML = "°C";
    tempValue.innerHTML = farenheitTemp;
    tempUnit.innerHTML = "°F";
  } else {
    convertTempButton.innerHTML = "°F";
    tempValue.innerHTML = celciusTemp;
    tempUnit.innerHTML = "°C";
  }
}

let now = new Date();
let fullDate = document.querySelector("#full-date");
let currentTime = document.querySelector("#current-time");
fullDate.innerHTML = formatDate(now);
currentTime.innerHTML = formatTime(now);

navigator.geolocation.getCurrentPosition(getPosition);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchCity);

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", getCurrentLocation);

let convertTempButton = document.querySelector("#convert-temp");
convertTempButton.addEventListener("click", convertTemp);

// function toFarenheit(event) {
//   event.preventDefault();
//   let convertTempButton = document.querySelector("#convert-temp");
//   let tempValue = document.querySelector("#temp-value");
//   let tempUnit = document.querySelector("#temp-unit");
//   convertTempButton.innerHTML = "°C";
//   tempValue.innerHTML = Math.round(temperature * 1.8 + 32);
//   tempUnit.innerHTML = "°F";
// }

// function toCelcius(event) {
//   event.preventDefault();
//   let convertTempButton = document.querySelector("#convert-temp");
//   let tempValue = document.querySelector("#temp-value");
//   let tempUnit = document.querySelector("#temp-unit");
//   convertTempButton.innerHTML = "°F";
//   tempValue.innerHTML = Math.round((temperature - 32) / 1.8);
//   tempUnit.innerHTML = "°C";
// }
