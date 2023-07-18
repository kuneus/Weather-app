/* 
This module gets and loads all weather data to the DOM
Get functions retrieve all relevant data
Load functions load the retrieved data to the DOM

*/
import format from "date-fns/format";
import { currentPageInfo } from "./index.js";
import { changeTempBtn } from "./pageFunctions.js";

// DOM elements
const currentLocation = document.getElementById("current-location");
const currentCountry = document.getElementById("current-country");
const currentTime = document.getElementById("current-time");
const currentDate = document.getElementById("current-date");
const tempNow = document.getElementById("temp-now");
const currentHigh = document.getElementById("current-high");
const currentLow = document.getElementById("current-low");
const currentInfo = document.getElementById("current-info");
const feelsLike = document.getElementById("feels-like");
const currentHumidity = document.getElementById("current-humidity");
const currentWind = document.getElementById("current-wind");
const windUnit = document.getElementById("wind-unit");
const windDirection = document.getElementById("wind-direction");

// fetch weather data from weather API
const getData = async (place) => {
  try {
    const response = await fetch(
      "http://api.weatherapi.com/v1/forecast.json?key=e31a4465ef234c37984155853230907&q=" +
        place +
        "&days=7&aqi=no&alerts=no",
      { mode: "cors" },
    );
    const responseJson = await response.json();
    return responseJson;
  } catch (err) {
    console.log("error is : " + err);
  }
};

// gets temp unit data for F or C depending on the country input
const setTemp = async (data, tempType) => {
  if (currentPageInfo.tempUnit === "f") {
    // if tempUnit is Fahrenheit
    switch (tempType) {
      case "temp":
        return await data.temp_f;
      case "maxtemp":
        return await data.maxtemp_f;
      case "mintemp":
        return await data.mintemp_f;
      case "avgtemp":
        return await data.avgtemp_f;
      case "feelslike":
        return await data.feelslike_f;
    }
  } else {
    // if tempUnit is celsius
    switch (tempType) {
      case "temp":
        return await data.temp_c;
      case "maxtemp":
        return await data.maxtemp_c;
      case "mintemp":
        return await data.mintemp_c;
      case "avgtemp":
        return await data.avgtemp_c;
      case "feelslike":
        return await data.feelslike_c;
    }
  }
};

const getWindspeed = async (data) => {
  if (currentPageInfo.tempUnit === "f") {
    // if tempUnit is Fahrenheit, then use miles
    currentPageInfo.windUnit = "mph";
    return await data.wind_mph;
  } else {
    // if tempUnit is celsius, then use kilometers
    currentPageInfo.windUnit = "kph";
    return await data.wind_kph;
  }
};

// loads data for current weather
const loadCurrentData = async (weatherObj) => {
  // Display name of location and region
  currentLocation.textContent =
    (await weatherObj.location.name) +
    ", " +
    (await weatherObj.location.region);

  // country
  currentCountry.textContent = await weatherObj.location.country;

  // get date and time then format it
  const dateAndTime = new Date(await weatherObj.location.localtime);
  const formattedTime = format(dateAndTime, "h:mmaaa");
  const formattedDate = format(dateAndTime, "MMMM dd, yyyy");

  // display location date and time
  currentTime.textContent = formattedTime;
  currentDate.textContent = formattedDate;

  // sets temperature unit to F for countries that primarily use F
  // or sets to C for all other countries
  switch (await weatherObj.location.country) {
    case "United States of America":
    case "USA":
    case "Bahamas":
    case "Liberia":
    case "Antigua and Barbuda":
    case "Belize":
    case "British Virgin Islands":
    case "Cayman Islands":
    case "Micronesia":
    case "Marshall Islands":
    case "Montserrat":
    case "Palau":
    case "Saint Kitts and Nevis":
    case "Cyprus":
    case "Turks and Caicos Islands":
      currentPageInfo.tempUnit = "f";
      changeTempBtn();
      break;
    default:
      currentPageInfo.tempUnit = "c";
      changeTempBtn();
  }

  // current temperature
  tempNow.textContent = await setTemp(weatherObj.current, "temp");

  // today's high
  currentHigh.textContent = await setTemp(
    weatherObj.forecast.forecastday[0].day,
    "maxtemp",
  );

  // today's low
  currentLow.textContent = await setTemp(
    weatherObj.forecast.forecastday[0].day,
    "mintemp",
  );

  // current condition
  currentInfo.textContent = await weatherObj.current.condition.text;

  // feels like
  feelsLike.textContent = await setTemp(weatherObj.current, "feelslike");

  // humidity
  currentHumidity.textContent = await weatherObj.current.humidity;

  // wind in mph or kph
  currentWind.textContent = await getWindspeed(weatherObj.current);

  // wind unit
  windUnit.textContent = currentPageInfo.windUnit;

  // wind direction
  windDirection.textContent = " " + (await weatherObj.current.wind_dir);
};

const loadHourlyData = async (weatherObj) => {
  // function to create hourly elements
  // create loop to loop through hourly elements and update each element
};

const loadPageData = async (place) => {
  // variable for returned weather data object
  const weatherData = await getData(place);

  // load data for "current" container
  await loadCurrentData(weatherData);

  // load data for "hourly" container

  // load data for "daily" container
};
export { loadPageData };
