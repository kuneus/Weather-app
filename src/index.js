import "./styles.css";
import { loadPageData } from "./loadPageData";
import { changeTempUnit, changeTempBtn } from "./pageFunctions";

const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const toggleTemp = document.getElementById("toggle-temp");

// pre-load page with New York weather
loadPageData("New York");

// load page with weather data after location submitted
searchBtn.addEventListener("click", async () => {
  await loadPageData(searchInput.value);
});

const currentPageInfo = {
  tempUnit: "",
};

// change temp to celsius or fahrenheit
toggleTemp.addEventListener("click", () => {
  changeTempUnit();
  changeTempBtn();
});

export { currentPageInfo };

/*
MODULES
- CurrentWeather
- HourlyWeather
- DailyWeather
- apiFunctions
- pageFunctions
- loadPageData

FUNCTIONS
MODULE: pageFunctions 
----> createAndApppend
----> toggleTheme
----> toggleTemp: function to switch from Fahrenheit to Celsius

MODULE: currentWeather
---->

MODULE: hourlyWeather
---->

MODULE: dailyWeather
---->

MODULE: apiFunctions
----> getLocation

MODULE: loadPageData
----> invokes loadCurrentData(), loadHourlyData(), loadDailyData()



ARRAYS

*/
