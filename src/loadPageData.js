/* 
This module gets and loads all weather data to the DOM
Get functions retrieve all relevant data
Load functions load the retrieved data to the DOM

*/

// DOM elements
const searchInput = document.getElementById("search-input");
const currentLocation = document.getElementById("current-location");
const currentCountry = document.getElementById("current-country");
const currentTime = document.getElementById("current-time");
const tempNow = document.getElementById("temp-now");
const currentHigh = document.getElementById("current-high");
const currentLow = document.getElementById("current-low");
const currentInfo = document.getElementById("current-info");

// const pageInfo = {
//   currentLocation: "",
//   currentTime: "",
// };

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

const loadCurrentData = async (place) => {
  // variable for returned data object
  const retrievedLocation = await getData(place);

  // Display name of location and region
  currentLocation.textContent =
    (await retrievedLocation.location.name) +
    ", " +
    (await retrievedLocation.location.region);

  // country
  currentCountry.textContent = await retrievedLocation.location.country;

  // display location date and time
  currentTime.textContent = await retrievedLocation.location.localtime;

  let tempUnit = false;
  // sets temperature unit to F for countries that primarily use F
  // or sets to C for all other countries
  switch (await retrievedLocation.location.country) {
    case "United States of America":
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
      console.log("this country has a silly measurement system");
      tempUnit = true;
      break;
    default:
      console.log("this is a country with a sensible measurement system");
      tempUnit = false;
  }

  // sets temp unit to F or C depending on whether above block declared
  // tempUnit to true or false
  const setTemp = async (data, tempType) => {
    if (tempUnit === true) {
      switch (tempType) {
        case "temp":
          return await data.temp_f;
        case "maxtemp":
          return await data.maxtemp_f;
        case "mintemp":
          return await data.mintemp_f;
        case "avgtemp":
          return await data.avgtemp_f;
      }
    } else {
      switch (tempType) {
        case "temp":
          return await data.temp_c;
        case "maxtemp":
          return await data.maxtemp_c;
        case "mintemp":
          return await data.mintemp_c;
        case "avgtemp":
          return await data.avgtemp_c;
      }
    }
  };

  // current temperature
  tempNow.textContent = await setTemp(retrievedLocation.current, "temp");

  // today's high
  currentHigh.textContent =
    "H:" +
    (await setTemp(retrievedLocation.forecast.forecastday[0].day, "maxtemp"));

  // today's low
  currentLow.textContent =
    "L:" +
    (await setTemp(retrievedLocation.forecast.forecastday[0].day, "mintemp"));

  // current condition
  currentInfo.textContent = await retrievedLocation.forecast.forecastday[0].day
    .condition.text;
};

const loadPageData = async (place) => {
  // load data for "current" container
  await loadCurrentData(place);

  // load data for "hourly" container

  // load data for "daily" container
};
export { loadPageData };
