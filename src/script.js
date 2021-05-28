//time and date

function dateToday(timestamp) {
  let date = new Date(timestamp);
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

  let currentMonth = months[date.getMonth()];
  let currentDay = days[date.getDay()];
  let currentDate = date.getDate();

  /*let dayText = document.querySelector("#today-date-time");
  dayText.innerHTML = `${currentDay}, ${currentMonth} ${currentDate} <br/>${hours}:${minutes}`;*/
  return `${currentDay}, ${currentMonth} ${currentDate}`;
}

function timeToday(timestamp) {
  let date = new Date(timestamp);

  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

//Unit conversion
function handleCelsius(event) {
  event.preventDefault();
  let celsius = document.querySelector("#todays-temperature");
  celsius.innerHTML = `${Math.round(((fahrenheitTemperature - 32) * 5) / 9)}°`;
  fahrenheitButton.classList.remove("active");
  celsiusButton.classList.add("active");
}
let celsiusButton = document.querySelector("#celsius-button");
celsiusButton.addEventListener("click", handleCelsius);

function handleFahrenheit(event) {
  event.preventDefault();
  let fahrenheit = document.querySelector("#todays-temperature");
  fahrenheit.innerHTML = `${Math.round(fahrenheitTemperature)}°`;
  fahrenheitButton.classList.add("active");
  celsiusButton.classList.remove("active");
}

let fahrenheitButton = document.querySelector("#fahrenheit-button");
fahrenheitButton.addEventListener("click", handleFahrenheit);

let fahrenheitTemperature = null;

//5 day forecast

function displayForecast(response) {
  let forecastElement = document.querySelector("#five-day-forecast");

  //why is this div italic?
  let forecastHTML = `<div class= "row">`;

  let days = ["Wed", "Thu", "Fri", "Sat", "Sun"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
    <div class="col-sm day-1">
    <div class="col-sm day">
      ${day}
      </div>
        <div class="col-sm weather-icon">
          <i class="fas fa-cloud-sun"></i>	
          </div>
        <div class="col-sm">
        <span class="weather-high">58°</span>  
          <span class="weather-low">39°</span>
        </div>
        </div>
  `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  //console.log(forecastHTML);
  console.log(response.data.daily);
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "347112769ada94c7e605400ea44c8990";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

//City change
function displayWeather(response) {
  let cityName = document.querySelector("#city");
  let todaysTemp = document.querySelector("#todays-temperature");
  let todayHigh = document.querySelector("#today-high");
  let todayLow = document.querySelector("#today-low");
  let wind = document.querySelector("#wind");
  let humidity = document.querySelector("#humidity");
  let tempFeelsLike = document.querySelector("#feels-like");
  let weatherCondition = document.querySelector("#weather-condition");
  let dateElement = document.querySelector("#today-date");
  let timeElement = document.querySelector("#time");
  let todayIcon = document.querySelector("#today-icon");

  fahrenheitTemperature = response.data.main.temp;

  cityName.innerHTML = response.data.name;
  todaysTemp.innerHTML = `${Math.round(fahrenheitTemperature)}°`;
  todayHigh.innerHTML = `${Math.round(response.data.main.temp_max)}°`;
  todayLow.innerHTML = `${Math.round(response.data.main.temp_min)}°`;
  wind.innerHTML = `${Math.round(response.data.wind.speed)} mph`;
  humidity.innerHTML = `${Math.round(response.data.main.humidity)}%`;
  tempFeelsLike.innerHTML = `${Math.round(response.data.main.feels_like)}°`;
  weatherCondition.innerHTML = response.data.weather[0].description;
  dateElement.innerHTML = dateToday(response.data.dt * 1000);
  timeElement.innerHTML = timeToday(response.data.dt * 1000);
  todayIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  todayIcon.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
  //console.log(response.data);
}

function search(city) {
  let apiKey = "347112769ada94c7e605400ea44c8990";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  //console.log(city);
  axios.get(apiUrl).then(displayWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  search(cityInput.value);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

//get current location

function getCurrentTemp(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "347112769ada94c7e605400ea44c8990";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayWeather);
}

function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getCurrentTemp);
}

let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", getPosition);

search("Chicago");
//displayForecast();
