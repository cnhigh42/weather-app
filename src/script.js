//time and date
let currentTime = new Date();

function dateToday(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
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
    "December"
  ];

  let currentMonth = months[date.getMonth()];
  let currentDay = days[date.getDay()];
  let currentDate = date.getDate();

  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayText = document.querySelector("#today-date-time");
  dayText.innerHTML = `${currentDay}, ${currentMonth} ${currentDate} <br/>${hours}:${minutes}`;
}
dateToday(currentTime);

//celsius button re do this
function handleCelsius(event) {
  event.preventDefault();
  let celsius = document.querySelector("#todays-temperature");
  celsius.innerHTML = "18°";
}

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", handleCelsius);

//fahrenheit button rework this
function handleFahrenheit(event) {
  event.preventDefault();
  let fahrenheit = document.querySelector("#todays-temperature");
  fahrenheit.innerHTML = `${Math.round(fahrenheit.innerText * 1.8 + 32)}°`;
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", handleFahrenheit);

//City change

function search(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let cityValue = cityInput.value;
  let apiKey = "347112769ada94c7e605400ea44c8990";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=imperial`;
  console.log(cityValue);
  axios.get(apiUrl).then(displayWeather);
}
function displayWeather(response) {
  let cityName = document.querySelector("#city");
  cityName.innerHTML = response.data.name;

  let todaysTemp = document.querySelector("#todays-temperature");
  todaysTemp.innerHTML = `${Math.round(response.data.main.temp)}°`;

  let todayHigh = document.querySelector("#today-high");
  todayHigh.innerHTML = `${Math.round(response.data.main.temp_max)}°`;

  let todayLow = document.querySelector("#today-low");
  todayLow.innerHTML = `${Math.round(response.data.main.temp_min)}°`;

  let wind = document.querySelector("#wind");
  wind.innerHTML = `${Math.round(response.data.wind.speed)} mph`;

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `${Math.round(response.data.main.humidity)}%`;

  let tempFeelsLike = document.querySelector("#feels-like");
  tempFeelsLike.innerHTML = `${Math.round(response.data.main.feels_like)}°`;

  /*how do you convert the sunrise/sunset time?! 
    let sunrise= document.querySelector("#sunrise");
    let date = new Date(sunrise*1000);
    let sunriseHours = date.getHours();
    let sunriseMinutes = "0" + date.getMinutes();
    let sunriseFormattedDate = `${sunriseHours}:${sunriseMinutes.substr(-2)}`;
  sunrise.innerHTML = sunriseFormattedDate;
 */
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

function getCurrentTemp(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "imperial";
  let apiKey = "347112769ada94c7e605400ea44c8990";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeather);
}

function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getCurrentTemp);
}

let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", getPosition);