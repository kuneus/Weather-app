import { currentPageInfo } from "./index";

const tempUnitsToChange = document.getElementsByClassName("temp-unit");
const arrOfTemps = Array.from(tempUnitsToChange);
const celsiusSpan = document.getElementById("celsius-span");
const fahrenheitSpan = document.getElementById("fahrenheit-span");
const currentWind = document.getElementById("current-wind");
const windUnit = document.getElementById("wind-unit");

// function for creating and appending new elements
const createAndAppend = (el, elId, elClass, elParent) => {
  let element = document.createElement(el);

  if (elId) {
    element.setAttribute("id", elId);
  }

  if (elClass) {
    element.setAttribute("class", elClass);
  }

  elParent.appendChild(element);

  return element;
};

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

// setBackground function to change BG based on time and weather
export {
  createAndAppend,
  changeTempUnit,
  changeTempBtn,
  changeWindUnit,
  changeWindValue,
};
