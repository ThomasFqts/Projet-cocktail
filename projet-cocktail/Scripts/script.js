// https://www.thecocktaildb.com/api.php
// Download Postman

let searchbtn = document.getElementById("searchbtn");
let searchInput = document.getElementById("searcharea");
let searchByName = document.getElementById("name");
let formrandom = document.getElementById("cocktail-random");
let form = document.getElementById("search-cocktail");
let listcocktail = document.getElementById("list-cocktail");

formrandom.addEventListener("submit", (event) => {
  event.preventDefault();
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
});

const API_BASE = "https://www.thecocktaildb.com/api/json/v1/1/";
searchbtn.addEventListener("click", () => {
  const query = searchInput.value.trim();
  const searchType = searchByName.checked ? "name" : "ingredients";
  if (!query) return alert("Veuillez entrer un terme de recherche.");
  const endpoint =
    searchType === "name"
      ? `${API_BASE}search.php?s=${query}`
      : `${API_BASE}filter.php?i=${query}`;
  fetch(endpoint)
    .then((response) => response.json())
    .then((data) => createCocktail(data.drinks))
    .catch(console.error);
  console.log(query);
  console.log(searchType);
});

function createCocktail(_cocktail) {
    listcocktail.innerHTML = "";

    for (let cocktail of _cocktail) {
        let card = document.createElement("div");
        card.setAttribute("class", "card");
        let img = cocktail.strDrinkThumb;
        card.innerHTML = `<img src="${img}">`;
    }
}