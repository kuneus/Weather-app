import "./styles.css";
import { loadPageData } from "./loadPageData";
import {
  changeTempUnit,
  changeTempBtn,
  changeWindUnit,
  changeWindValue,
} from "./pageFunctions";

const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const toggleTemp = document.getElementById("toggle-temp");

// pre-load page with New York weather
loadPageData("New York");

// load page with weather data after location submitted
searchBtn.addEventListener("click", async () => {
  await loadPageData(searchInput.value);
});
// load page if 'enter' is clicked
searchInput.addEventListener("keypress", async (event) => {
  if (event.key === "Enter") {
    await loadPageData(searchInput.value);
  }
});

const currentPageInfo = {
  tempUnit: "",
  windUnit: "",
};

// change temp to celsius or fahrenheit
toggleTemp.addEventListener("click", () => {
  changeTempUnit();
  changeTempBtn();
  changeWindValue();
  changeWindUnit();
});

export { currentPageInfo };

/*
to-do:
----> OPTIONAL: add loading screen
----> add error page


STYLE:
----> style page title with font and size
----> style temp unit toggle button
----> style elements in the Current container
----> add Made By footer element
----> add mobile accessibility

*/
