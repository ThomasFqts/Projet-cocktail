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
});

function createCocktail(_cocktail) {
  listcocktail.innerHTML = "";
  // let id = _cocktail.idDrink;
  for (let cocktail of _cocktail) {
    let card = document.createElement("div");
    card.setAttribute("class", "card cocktail-size");
    let img = cocktail.strDrinkThumb;
    let nom = cocktail.strDrink;
    let id = cocktail.idDrink;
    card.innerHTML = `<div class="card-img-top">
        <img src="${img}">
        </div>
        <div class="card-body">
        <h3>${nom}</h3>
        <button type="button" class="btn btn-primary detailsbtn" id="${id}" "data-bs-toggle="modal" data-bs-target="#showdetails" onclick="getdetails(${id})">En savoir plus.</button>
        </div>`;
    listcocktail.appendChild(card);
    console.log("nom : " + nom + " \nid : " + id);
  }
}

// let detailsbtn = document.getElementsByClassName("detailsbtn");

// Array.from(detailsbtn).forEach((btn) => {
//   btn.addEventListener("click", (event) => {
//     event.preventDefault();
//     const cocktailid = event.target.getAttribute("id");
//     getdetails(cocktailid);
//   });
// });

function getdetails(id) {
  fetch(`${API_BASE}lookup.php?i=${id}`)
    .then((response) => response.json())
    .then((data) => showdetails(data.drinks[0]))
    .catch(console.error);
}

function showdetails(_cocktail) {
  let cocktail_img = document.getElementById("cocktail-img");
  let cocktail_name = document.getElementById("cocktail-name");
  let cocktail_category = document.getElementById("category");
  let cocktail_Gtu = document.getElementById("Gtu");
  let cocktail_Type = document.getElementById("Type");
  let cocktail_Ingredients = document.getElementById("Ingredients");
  let cocktail_Instructions = document.getElementById("Instructions");

  let img = _cocktail.strDrinkThumb;
  let nom = _cocktail.strDrink;
  let category = _cocktail.strCategory;
  let gtu = _cocktail.strGlass;
  let type = _cocktail.strAlcoholic;
  let ingredients = "";
  for (let i = 1; i <= 15; i++) {
    const ingredient = _cocktail[`strIngredient${i}`];
    const measure = _cocktail[`strMeasure${i}`];
    if (ingredient) {
      ingredients += `<li>${ingredient} : ${measure}</li>`;
    }
  }
  let instructions = _cocktail.strInstructions;

  cocktail_img.innerHTML = `<img src="${img}" alt="${nom}">`;
  cocktail_name.innerHTML = `<p>${nom}</p>`;
  cocktail_category.innerHTML = `<p>Category: ${category}</p>`;
  cocktail_Gtu.innerHTML = `<p>Glass to use: ${gtu}</p>`;
  cocktail_Type.innerHTML = `<p>Type: ${type}</p>`;
  cocktail_Ingredients.innerHTML = `<ul>${ingredients}</ul>`;
  cocktail_Instructions.innerHTML = `<p>Instructions \n${instructions}</p>`;

  let details = document.getElementById("details");
  details.appendChild(cocktail_img);
  details.appendChild(cocktail_name);
  details.appendChild(cocktail_category);
  details.appendChild(cocktail_Gtu);
  details.appendChild(cocktail_Type);
  details.appendChild(cocktail_Ingredients);
  details.appendChild(cocktail_Instructions);
}