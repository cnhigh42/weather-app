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
//to do:make the active classes switch
function handleCelsius(event) {
  event.preventDefault();
  let celsius = document.querySelector("#todays-temperature");
  celsius.innerHTML = `${Math.round(((fahrenheitTemperature - 32) * 5) / 9)}°`;
  let fTemp = document.getElementsByClassName("f-temp-change");
  if (fTemp.classList.contains("disabled") = true){
   ftemp.classList.add("active").remove("disabled");
  }
  let cTemp = document.getElementsByClassName("c-temp-change");
  if(cTemp.classList.contains("active")=true){
    cTemp.classList.add("disabled").remove("active");
  }
}

let celsiusButton = document.querySelector("#celsius-button");
celsiusButton.addEventListener("click", handleCelsius);

//to do:make the active classes switch
function handleFahrenheit(event) {
  event.preventDefault();
  let fahrenheit = document.querySelector("#todays-temperature");
  fahrenheit.innerHTML = `${Math.round(fahrenheitTemperature)}°`;

  let fTemp = document.getElementsByClassName("f-temp-change");
  if (fTemp.classList.contains("active") = true){
   fTemp.classList.add("disabled").remove("active");
  }
  let cTemp = document.getElementsByClassName("c-temp-change");
  if(cTemp.classList.contains("disabled")=true){
    cTemp.classList.add("active").remove("disabled");
  }
}

let fahrenheitButton = document.querySelector("#fahrenheit-button");
fahrenheitButton.addEventListener("click", handleFahrenheit);

let fahrenheitTemperature = null;

//City change

function displayWeather(response) {
  //console.log(response);

  fahrenheitTemperature = response.data.main.temp;

  let cityName = document.querySelector("#city");
  cityName.innerHTML = response.data.name;

  let todaysTemp = document.querySelector("#todays-temperature");
  todaysTemp.innerHTML = `${Math.round(fahrenheitTemperature)}°`;

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

  let weatherCondition = document.querySelector("#weather-condition");
  weatherCondition.innerHTML = response.data.weather[0].description;

  let dateElement = document.querySelector("#today-date");
  dateElement.innerHTML = dateToday(response.data.dt * 1000);

  let timeElement = document.querySelector("#time");
  timeElement.innerHTML = timeToday(response.data.dt * 1000);

  let todayIcon = document.querySelector("#today-icon");
  todayIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  todayIcon.setAttribute("alt", response.data.weather[0].description);
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
