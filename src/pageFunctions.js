import { currentPageInfo } from "./index";

const tempUnitsToChange = document.getElementsByClassName("temp-unit");
const arrOfTemps = Array.from(tempUnitsToChange);
const celsiusSpan = document.getElementById("celsius-span");
const fahrenheitSpan = document.getElementById("fahrenheit-span");

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

const changeTempBtn = () => {
  if (currentPageInfo.tempUnit === "f") {
    fahrenheitSpan.style.fontWeight = "800";
    fahrenheitSpan.style.fontSize = "1.1rem";
    celsiusSpan.style.fontSize = "1rem";
    celsiusSpan.style.fontWeight = "250";
  } else {
    fahrenheitSpan.style.fontWeight = "250";
    fahrenheitSpan.style.fontSize = "1rem";
    celsiusSpan.style.fontSize = "1.1rem";
    celsiusSpan.style.fontWeight = "800";
  }
};

export { changeTempUnit, changeTempBtn };
