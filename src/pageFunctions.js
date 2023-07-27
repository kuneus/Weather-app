import { currentPageInfo } from "./index";
import format from "date-fns/format";

const tempUnitsToChange = document.getElementsByClassName("temp-unit");
const arrOfTemps = Array.from(tempUnitsToChange);
const celsiusSpan = document.getElementById("celsius-span");
const fahrenheitSpan = document.getElementById("fahrenheit-span");
const currentWind = document.getElementById("current-wind");
const windUnit = document.getElementById("wind-unit");

// changes temperature unit to Fahrenheit or Celsius
const changeTempUnit = () => {
  for (let i = 0; i < arrOfTemps.length; i += 1) {
    // if current unit is celsius
    if (currentPageInfo.tempUnit === "c") {
      let parsed = parseFloat(arrOfTemps[i].textContent);
      let changeUnit = parsed * (9 / 5) + 32;
      let finalUnit = Math.round((changeUnit + Number.EPSILON) * 10) / 10;

      arrOfTemps[i].textContent = finalUnit;
    } else if (currentPageInfo.tempUnit === "f") {
      // if current unit is fahrenheit

      let parsed = parseFloat(arrOfTemps[i].textContent);
      let changeUnit = (parsed - 32) * (5 / 9);
      let finalUnit = Math.round((changeUnit + Number.EPSILON) * 10) / 10;

      arrOfTemps[i].textContent = finalUnit;
    }
  }

  // switch current temp unit
  if (currentPageInfo.tempUnit === "c") {
    currentPageInfo.tempUnit = "f";
  } else {
    currentPageInfo.tempUnit = "c";
  }
};

// switch wind unit to mph or kph
const changeWindUnit = () => {
  if (windUnit.textContent === "mph") {
    windUnit.textContent = "kph";
  } else {
    windUnit.textContent = "mph";
  }
};

// switch wind value to mph or kph
const changeWindValue = () => {
  const parsed = parseFloat(currentWind.textContent);
  if (windUnit.textContent === "mph") {
    const toKPH = parsed * 1.60934;
    const calculated = Math.round((toKPH + Number.EPSILON) * 10) / 10;
    currentWind.textContent = calculated;
  } else {
    const toMPH = parsed / 1.60934;
    const calculated = Math.round((toMPH + Number.EPSILON) * 10) / 10;
    currentWind.textContent = calculated;
  }
};

const changeTempBtn = () => {
  if (currentPageInfo.tempUnit === "f") {
    fahrenheitSpan.style.fontWeight = "800";
    fahrenheitSpan.style.fontSize = "1.1rem";
    // fahrenheitSpan.style.border = "solid 1px black";
    // fahrenheitSpan.style.borderRadius = "10px";
    // fahrenheitSpan.style.padding = "5px";

    celsiusSpan.style.fontSize = "1rem";
    celsiusSpan.style.fontWeight = "250";
    // celsiusSpan.style.borderRadius = "";
    // celsiusSpan.style.padding = "0px";
    // celsiusSpan.style.border = "none";
  } else {
    fahrenheitSpan.style.fontWeight = "250";
    fahrenheitSpan.style.fontSize = "1rem";
    // fahrenheitSpan.style.border = "none";
    // fahrenheitSpan.style.borderRadius = "";
    // fahrenheitSpan.style.padding = "0px";

    celsiusSpan.style.fontSize = "1.1rem";
    celsiusSpan.style.fontWeight = "800";
    // celsiusSpan.style.borderRadius = "10px";
    // celsiusSpan.style.padding = "5px";
    // celsiusSpan.style.border = "solid 1px black";
  }
};

// change the class of the root document
const changeRootClass = (theme) => {
  const root = document.documentElement;

  // root.className = theme;

  switch (theme) {
    case "sunny":
      root.className = theme;
      break;
    case "cloudy":
      root.className = theme;
      break;
    case "raining":
      root.className = theme;
      break;
    case "snowing":
      root.className = theme;
      break;
    case "misty":
      root.className = theme;
      break;
    case "clearSky":
      root.className = theme;
      break;
    default:
      console.log("wrong argument provided");
  }
};

// return author of background photo
const getAuthorCredit = (theme) => {
  switch (theme) {
    case "sunny":
      return 'Photo by <a href="https://unsplash.com/es/@lukeelliscraven?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Luke Ellis-Craven</a> on <a href="https://unsplash.com/photos/KycXgkezIJ8?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>';
    case "clearSky":
      return 'Photo by <a href="https://unsplash.com/@jxndreas?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Andreas Kind</a> on <a href="https://unsplash.com/photos/jhnvYd8FFQc?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>';
    case "cloudy":
      return 'Photo by <a href="https://unsplash.com/es/@jfelise?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Josh Felise</a> on <a href="https://unsplash.com/photos/3eIXF8DFpj4?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>';
    case "raining":
      return 'Photo by <a href="https://unsplash.com/@pueblovista?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Paul Pastourmatzis</a> on <a href="https://unsplash.com/photos/rEHuLF3jWjQ?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>';
    case "snowing":
      return 'Photo by <a href="https://unsplash.com/de/@sametomorrow?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Adam Chang</a> on <a href="https://unsplash.com/photos/IWenq-4JHqo?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>';
    case "misty":
      return 'Photo by <a href="https://unsplash.com/@heytowner?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">JOHN TOWNER</a> on <a href="https://unsplash.com/photos/89PFnHKg8HE?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>';
  }
};

// add author of background photo to photo credit element
const setAuthorCredit = (condition) => {
  const authorEl = document.getElementById("author-credit");
  authorEl.innerHTML = getAuthorCredit(condition);
};

// all codes for the weather conditions
const allCodes = [
  {
    code: [1003, 1006, 1009],
    condition: "cloudy",
  },
  {
    code: [1066, 1114, 1117, 1210, 1213, 1216, 1219, 1222, 1225, 1279, 1282],
    condition: "snowing",
  },
  {
    code: [
      1063, 1069, 1072, 1087, 1150, 1153, 1168, 1171, 1180, 1183, 1186, 1189,
      1192, 1195, 1198, 1201, 1204, 1207, 1237, 1240, 1243, 1246, 1249, 1252,
      1261, 1264, 1273, 1276,
    ],
    condition: "raining",
  },
  {
    code: [1030, 1135, 1147],
    condition: "misty",
  },
];

const setTheme = async (weatherObj) => {
  // get current time and format it for the hour
  const currentTime = new Date(await weatherObj.location.localtime);
  const currentHour = format(currentTime, "H");

  // get the sunset and sunrise time and format it for the hour
  const sunset = await weatherObj.forecast.forecastday[0].astro.sunset;
  const formatSunset = sunset.slice(0, 2);
  const sunrise = await weatherObj.forecast.forecastday[0].astro.sunrise;
  const formatSunrise = sunrise.slice(0, 2);

  const sunsetHour = parseInt(formatSunset) + 12;
  const sunriseHour = parseInt(formatSunrise);

  // code for the current weather condition
  const conditionCode = await weatherObj.current.condition.code;

  // loop through all the weather codes and then change the root class
  // once match is found
  for (let i = 0; i < 3; i += 1) {
    let stopLoop = false;
    let condition;

    for (let n = 0; n < allCodes[i].code.length; n += 1) {
      if (conditionCode === 1000) {
        // change theme to sunny if during the day
        if (currentHour < sunsetHour && currentHour > sunriseHour) {
          changeRootClass("sunny");
          condition = "sunny";
          stopLoop = true;
          break;
        } else {
          // change theme to clear night sky if during the night
          changeRootClass("clearSky");
          condition = "clearSky";
          stopLoop = true;
          break;
        }
      } else if (conditionCode === allCodes[i].code[n]) {
        changeRootClass(allCodes[i].condition);
        condition = allCodes[i].condition;
        stopLoop = true;
        break;
      }
    }

    // set background image author credit
    if (condition) {
      setAuthorCredit(condition);
    }

    // once match is found, exit loop
    if (stopLoop === true) {
      break;
    }
  }
};

const loadTheme = async (weatherObj) => {
  await setTheme(weatherObj);
};

export {
  changeTempUnit,
  changeTempBtn,
  changeWindUnit,
  changeWindValue,
  loadTheme,
};
