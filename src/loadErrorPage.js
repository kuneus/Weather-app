const errorCont = document.getElementById("error-container");
const mainCont = document.getElementById("main");
const failedSearch = document.getElementById("failed-search");
const searchInput = document.getElementById("search-input");

const loadErrorPage = (error) => {
  if (error) {
    errorCont.style.display = "flex";
    mainCont.style.display = "none";
    failedSearch.textContent = searchInput.value;
  } else {
    // clear error container and display main container
    errorCont.style.display = "none";
    mainCont.style.display = "flex";
  }
};

export { loadErrorPage };
