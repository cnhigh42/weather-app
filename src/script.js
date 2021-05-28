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
  let minutes = date.getMinutes();
  let amOrPm = hours >= 12 ? "pm" : "am";
  hours = hours % 12 || 12;
  let finalTime = `${hours}:${minutes} ${amOrPm}`;
  return finalTime;
}

//5 day forecast
function formatForecastDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#five-day-forecast");
  let forecast = response.data.daily;

  let forecastHTML = `<div class= "row">`; //why is this div italic?

  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
    <div class="col-sm day-1">
    <div class="col-sm day">
      ${formatForecastDay(forecastDay.dt)}
      </div>
        <div class="col-sm weather-icon">
         <img src = "http://openweathermap.org/img/wn/${
           forecastDay.weather[0].icon
         }@2x.png"
         alt = ${forecastDay.weather[0].description}
         width = "45"/>
          </div>
        <div class="col-sm">
        <span class="weather-high">${Math.round(forecastDay.temp.max)}°</span>  
          <span class="weather-low">${Math.round(forecastDay.temp.min)}°</span>
        </div>
        </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  //console.log(forecastHTML);
  console.log(response.data.daily);
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "347112769ada94c7e605400ea44c8990";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
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

  let temperature = response.data.main.temp;

  cityName.innerHTML = response.data.name;
  todaysTemp.innerHTML = `${Math.round(temperature)}°F`;
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
  console.log(response.data);
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
