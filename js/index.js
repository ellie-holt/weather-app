function formatDate(date) {
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  return days[day];
}

function showWeather(response) {
  let userCityElement = document.querySelector("#user-city");
  let currentTempElement = document.querySelector("#temp-value");
  let maxTempElement = document.querySelector("#max-temp-value");
  let minTempElement = document.querySelector("#min-temp-value");
  let humidityElement = document.querySelector("#humidity-value");
  let windElement = document.querySelector("#wind-value");
  let descriptionElement = document.querySelector("#weather-description");
  let iconElement = document.querySelector("#weather-icon");

  celciusTemperature = response.data.main.temp;
  maxCelciusTemperature = response.data.main.temp_max;
  minCelciusTemperature = response.data.main.temp_min;

  //To revert temp back to celcius as a default to prevent bugs
  let currentTempUnitElement = document.querySelector("#temp-unit");
  currentTempUnitElement.innerHTML = "°C";
  let maxTempUnitElement = document.querySelector("#max-temp-unit");
  maxTempUnitElement.innerHTML = "°C";
  let minTempUnitElement = document.querySelector("#min-temp-unit");
  minTempUnitElement.innerHTML = "°C";
  toCelciusButton.classList.add("inactive");
  toFarenheitButton.classList.remove("inactive");

  msWindSpeed = response.data.wind.speed;

  //To revert wind speed back to m/s
  let currentWindUnitElement = document.querySelector("#wind-unit");
  currentWindUnitElement.innerHTML = " m/s";
  toMsButton.classList.add("inactive");
  toMphButton.classList.remove("inactive");

  let currentTemp = Math.round(celciusTemperature);
  let maxTemp = Math.round(maxCelciusTemperature);
  let minTemp = Math.round(minCelciusTemperature);
  let humidity = `${response.data.main.humidity}%`;
  let wind = Math.round(msWindSpeed * 10) / 10;
  let description = response.data.weather[0].description;
  let iconCode = response.data.weather[0].icon;

  userCityElement.innerHTML = response.data.name;
  currentTempElement.innerHTML = currentTemp;
  maxTempElement.innerHTML = maxTemp;
  minTempElement.innerHTML = minTemp;
  humidityElement.innerHTML = humidity;
  windElement.innerHTML = wind;
  descriptionElement.innerHTML = description;

  iconElement.setAttribute("src", `../img/${iconCode}.svg`);
  iconElement.setAttribute("alt", description);

  setTheme(response.data.weather[0].icon);
  getForecast(response.data.coord);
}

function setTheme(iconCode) {
  let style = document.documentElement.style;
  switch (iconCode) {
    case "01d":
    case "02d":
      style.setProperty("--primary-background-colour", "#d4edfc");
      style.setProperty("--secondary-background-colour", "#ffffff");
      style.setProperty("--tertiary-background-colour", "#f2f8fc");
      style.setProperty("--primary-element-colour", "#c6e8ff");
      style.setProperty("--secondary-element-colour", "#87bfe5");
      style.setProperty("--accent-colour", "#efc200");
      style.setProperty("--focus-colour", "#87bfe550");
      style.setProperty("--alt-font-colour", "#000000");
      style.setProperty("--selection-colour", "#000000");

      break;
    case "01n":
    case "02n":
      style.setProperty("--primary-background-colour", "#15274b");
      style.setProperty("--secondary-background-colour", "#f7f8fc");
      style.setProperty("--tertiary-background-colour", "#fcfbf2");
      style.setProperty("--primary-element-colour", "#a3aed7");
      style.setProperty("--secondary-element-colour", "#4f72b7");
      style.setProperty("--accent-colour", "#201b56");
      style.setProperty("--focus-colour", "#4f72b750");
      style.setProperty("--alt-font-colour", "#f6f5f9");
      style.setProperty("--selection-colour", "#f6f5f9");
      break;
    case "03d":
    case "04d":
      style.setProperty("--primary-background-colour", "#e2d8ea");
      style.setProperty("--secondary-background-colour", "#ffffff");
      style.setProperty("--tertiary-background-colour", "#f8f5f9");
      style.setProperty("--primary-element-colour", "#f2e1f8");
      style.setProperty("--secondary-element-colour", "#c2aed1");
      style.setProperty("--accent-colour", "#b5b5b5");
      style.setProperty("--focus-colour", "#c2aed150");
      style.setProperty("--alt-font-colour", "#000000");
      style.setProperty("--selection-colour", "#000000");
      break;
    case "03n":
    case "04n":
      style.setProperty("--primary-background-colour", "#603286");
      style.setProperty("--secondary-background-colour", "#faf7fc");
      style.setProperty("--tertiary-background-colour", "#e7deea");
      style.setProperty("--primary-element-colour", "#a380af");
      style.setProperty("--secondary-element-colour", "#7f599c");
      style.setProperty("--accent-colour", "#7a7a7a");
      style.setProperty("--focus-colour", "#7f599c50");
      style.setProperty("--alt-font-colour", "#f8f5f9");
      style.setProperty("--selection-colour", "#f8f5f9");
      break;
    case "09d":
    case "10d":
      style.setProperty("--primary-background-colour", "#e2ebf8");
      style.setProperty("--secondary-background-colour", "#ffffff");
      style.setProperty("--tertiary-background-colour", "#ffffff");
      style.setProperty("--primary-element-colour", "#8ea9d5");
      style.setProperty("--secondary-element-colour", "#466ca4");
      style.setProperty("--accent-colour", "#0f3b7b");
      style.setProperty("--focus-colour", "#466ca450");
      style.setProperty("--alt-font-colour", "#000000");
      style.setProperty("--selection-colour", "#ffffff");
      break;
    case "09n":
    case "10n":
      style.setProperty("--primary-background-colour", "#173b84");
      style.setProperty("--secondary-background-colour", "#f7f8fc");
      style.setProperty("--tertiary-background-colour", "#eaeff8");
      style.setProperty("--primary-element-colour", "#728be4");
      style.setProperty("--secondary-element-colour", "#6e8ac3");
      style.setProperty("--accent-colour", "#2ea7e0");
      style.setProperty("--focus-colour", "#6e8ac350");
      style.setProperty("--alt-font-colour", "#f6f5f9");
      style.setProperty("--selection-colour", "#f6f5f9");
      break;
    case "11d":
    case "11n":
      style.setProperty("--primary-background-colour", "#2a2648");
      style.setProperty("--secondary-background-colour", "#ebebeb");
      style.setProperty("--tertiary-background-colour", "#efedfc");
      style.setProperty("--primary-element-colour", "#99989e");
      style.setProperty("--secondary-element-colour", "#7571b3");
      style.setProperty("--accent-colour", "#817aea");
      style.setProperty("--focus-colour", "#7571b350");
      style.setProperty("--alt-font-colour", "#f7f5f9");
      style.setProperty("--selection-colour", "#f7f5f9");
      break;
    case "13d":
      style.setProperty("--primary-background-colour", "#c8f0fd");
      style.setProperty("--secondary-background-colour", "#ffffff");
      style.setProperty("--tertiary-background-colour", "#f6fdff");
      style.setProperty("--primary-element-colour", "#97dff7");
      style.setProperty("--secondary-element-colour", "#6ccae9");
      style.setProperty("--accent-colour", "#0191c1");
      style.setProperty("--focus-colour", "#6ccae950");
      style.setProperty("--alt-font-colour", "#000000");
      style.setProperty("--selection-colour", "#000000");
      break;
    case "13n":
      style.setProperty("--primary-background-colour", "#387bb5");
      style.setProperty("--secondary-background-colour", "#f7fafc");
      style.setProperty("--tertiary-background-colour", "#eaf3f8");
      style.setProperty("--primary-element-colour", "#79bbe2");
      style.setProperty("--secondary-element-colour", "#7ba4d2");
      style.setProperty("--accent-colour", "#324464");
      style.setProperty("--focus-colour", "#7ba4d250");
      style.setProperty("--alt-font-colour", "#f9f5f8");
      style.setProperty("--selection-colour", "#f9f5f8");
      break;
    case "50d":
      style.setProperty("--primary-background-colour", "#f6e4ee");
      style.setProperty("--secondary-background-colour", "#ffffff");
      style.setProperty("--tertiary-background-colour", "#ffffe");
      style.setProperty("--primary-element-colour", "#ddaec9");
      style.setProperty("--secondary-element-colour", "#d288b3");
      style.setProperty("--accent-colour", "#af4684");
      style.setProperty("--focus-colour", "#d288b350");
      style.setProperty("--alt-font-colour", "#000000");
      style.setProperty("--selection-colour", "#000000");
      break;
    case "50n":
      style.setProperty("--primary-background-colour", "#863271");
      style.setProperty("--secondary-background-colour", "#fcf7fc");
      style.setProperty("--tertiary-background-colour", "#f8ecf7");
      style.setProperty("--primary-element-colour", "#af80ad");
      style.setProperty("--secondary-element-colour", "#9c599a");
      style.setProperty("--accent-colour", "#d87dd8");
      style.setProperty("--focus-colour", "#9c599a50");
      style.setProperty("--alt-font-colour", "#f9f5f8");
      style.setProperty("--selection-colour", "#f9f5f8");
      break;
    default:
      style.setProperty("--primary-background-colour", "#e2ebf8");
      style.setProperty("--secondary-background-colour", "#ffffff");
      style.setProperty("--tertiary-background-colour", "#ffffff");
      style.setProperty("--primary-element-colour", "#8ea9d5");
      style.setProperty("--secondary-element-colour", "#466ca4");
      style.setProperty("--accent-colour", "#0f3b7b");
      style.setProperty("--focus-colour", "#466ca450");
      style.setProperty("--alt-font-colour", "#000000");
      style.setProperty("--selection-colour", "#000000");
  }
  console.log(iconCode);
}

function getForecast(coordinates) {
  let apiKey = "2bd326a60dc89a53287e446e819664df";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude=current,minutely,hourly&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showForecast);
}

function showForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = ``;

  forecast.forEach(function (day, index) {
    if (index > 0 && index < 7) {
      let iconCode = day.weather[0].icon;
      let description = day.weather[0].description;
      forecastHTML += `
          <div class="col-6 col-sm-4 col-lg-2 pt-2 forecast-col">
            <div class="row">
              <h4 class="day">${formatDay(day.dt)}</h4>
            </div>
            <div class="row forecast-contents">
              <div class="col">
                <img class="forecast-icon" src="../img/${iconCode}.svg" alt="${description}"/>
              </div>
              <div class="col">
                <p>
                  <span class="high">${Math.round(day.temp.max)}</span
                      ><span class="high forecast-unit">°C</span>
                </p>
                <p>
                  <span>${Math.round(day.temp.min)}</span
                      ><span class="forecast-unit">°C</span>
                </p>
              </div>
            </div>
          </div>`;
    }
  });

  forecastElement.innerHTML = forecastHTML;
}

function searchCity(event) {
  event.preventDefault();
  let searchBar = document.querySelector("#search-bar");
  let userCity = searchBar.value;
  let apiKey = "ece424250b8bd634c2653a8886cce7a1";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${userCity}&appid=${apiKey}&units=metric`;
  let userCityHeading = document.querySelector("#user-city");
  userCityHeading.innerHTML = `${userCity}`;
  axios.get(apiUrl).then(showWeather);
  console.log(apiUrl);
}

function getPosition(position) {
  let currentLat = position.coords.latitude;
  let currentLon = position.coords.longitude;
  let apiKey = "ece424250b8bd634c2653a8886cce7a1";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${currentLat}&lon=${currentLon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getPosition);
}

function toFarenheit(event) {
  event.preventDefault();
  let currentTempValueElement = document.querySelector("#temp-value");
  let currentTempUnitElement = document.querySelector("#temp-unit");
  let maxTempValueElement = document.querySelector("#max-temp-value");
  let maxTempUnitElement = document.querySelector("#max-temp-unit");
  let minTempValueElement = document.querySelector("#min-temp-value");
  let minTempUnitElement = document.querySelector("#min-temp-unit");

  let farenheitTemperature = celciusTemperature * 1.8 + 32;
  let maxFarenheitTemperature = maxCelciusTemperature * 1.8 + 32;
  let minFarenheitTemperature = minCelciusTemperature * 1.8 + 32;

  toCelciusButton.classList.remove("inactive");
  toFarenheitButton.classList.add("inactive");

  currentTempValueElement.innerHTML = Math.round(farenheitTemperature);
  currentTempUnitElement.innerHTML = "°F";
  maxTempValueElement.innerHTML = Math.round(maxFarenheitTemperature);
  maxTempUnitElement.innerHTML = "°F";
  minTempValueElement.innerHTML = Math.round(minFarenheitTemperature);
  minTempUnitElement.innerHTML = "°F";
}

function toCelcius(event) {
  event.preventDefault();
  let currentTempValueElement = document.querySelector("#temp-value");
  let currentTempUnitElement = document.querySelector("#temp-unit");
  let maxTempValueElement = document.querySelector("#max-temp-value");
  let maxTempUnitElement = document.querySelector("#max-temp-unit");
  let minTempValueElement = document.querySelector("#min-temp-value");
  let minTempUnitElement = document.querySelector("#min-temp-unit");

  toFarenheitButton.classList.remove("inactive");
  toCelciusButton.classList.add("inactive");

  currentTempValueElement.innerHTML = Math.round(celciusTemperature);
  currentTempUnitElement.innerHTML = "°C";
  maxTempValueElement.innerHTML = Math.round(maxCelciusTemperature);
  maxTempUnitElement.innerHTML = "°C";
  minTempValueElement.innerHTML = Math.round(minCelciusTemperature);
  minTempUnitElement.innerHTML = "°C";
}

function toMph(event) {
  event.preventDefault();
  let currentWindValueElement = document.querySelector("#wind-value");
  let currentWindUnitElement = document.querySelector("#wind-unit");

  let mphWindSpeed = msWindSpeed * 2.237;

  toMsButton.classList.remove("inactive");
  toMphButton.classList.add("inactive");

  currentWindValueElement.innerHTML = Math.round(mphWindSpeed * 10) / 10;
  currentWindUnitElement.innerHTML = " mph";
}

function toMs(event) {
  event.preventDefault();
  let currentWindValueElement = document.querySelector("#wind-value");
  let currentWindUnitElement = document.querySelector("#wind-unit");

  toMphButton.classList.remove("inactive");
  toMsButton.classList.add("inactive");

  currentWindValueElement.innerHTML = Math.round(msWindSpeed * 10) / 10;
  currentWindUnitElement.innerHTML = " m/s";
}

let now = new Date();
let fullDate = document.querySelector("#full-date");
let currentTime = document.querySelector("#current-time");
fullDate.innerHTML = formatDate(now);
currentTime.innerHTML = formatTime(now);

navigator.geolocation.getCurrentPosition(getPosition);

let celciusTemperature = null;
let maxCelciusTemperature = null;
let minCelciusTemperature = null;
let msWindSpeed = null;

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchCity);

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", getCurrentLocation);

let toFarenheitButton = document.querySelector("#farenheit-button");
toFarenheitButton.addEventListener("click", toFarenheit);

let toCelciusButton = document.querySelector("#celcius-button");
toCelciusButton.addEventListener("click", toCelcius);

let toMphButton = document.querySelector("#mph-button");
toMphButton.addEventListener("click", toMph);

let toMsButton = document.querySelector("#metrespersecond-button");
toMsButton.addEventListener("click", toMs);
