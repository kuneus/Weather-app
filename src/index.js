import "./styles.css";
import { loadPageData } from "./loadPageData";

const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");

// pageFunctions module

searchBtn.addEventListener("click", async () => {
  await loadPageData(searchInput.value);
});

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
