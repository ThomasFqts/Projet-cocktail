// https://www.thecocktaildb.com/api.php

let searchbtn = document.getElementById("searchbtn");
let searchInput = document.getElementById("searcharea");
let searchByName = document.getElementById("name");
let formrandom = document.getElementById("cocktail-random");
let form = document.getElementById("search-cocktail");
let listcocktail = document.getElementById("list-cocktail");
let random = document.getElementById("randomcocktail");

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
  let card;
  for (let cocktail of _cocktail) {
    card = document.createElement("div");
    card.setAttribute("class", "card cocktail-size");
    let img = cocktail.strDrinkThumb;
    let nom = cocktail.strDrink;
    let id = cocktail.idDrink;
    console.log(ingredients);
    card.innerHTML = `
    <div class="card-img-top">
        <img src="${img}">
    </div>
    <div class="card-body">
        <h3>${nom}</h3>
        <button type="button" class="btn btn-primary detailsbtn" id="${id}" data-bs-toggle="modal" data-bs-target="#showdetails" onclick="getdetails(${id})">En savoir plus.</button>
    </div>`;
    listcocktail.appendChild(card);
    console.log("nom : " + nom + " \nid : " + id);
  }
}

function getdetails(id) {
  fetch(`${API_BASE}lookup.php?i=${id}`)
    .then((response) => response.json())
    .then((data) => {
      showdetails(data.drinks[0]);
      getsimilarcocktails(data.drinks[0].strCategory);
    })
    .catch(console.error);
}

function getsimilarcocktails(_cocktail) {
  fetch(`${API_BASE}filter.php?c=${_cocktail}`)
    .then((response) => response.json())
    .then((data) => {
      showsimilarcocktail(data.drinks);
      console.log(data.drinks[0].strCategory);
    })
    .catch(console.error);
}

function showsimilarcocktail(_cocktail) {
  let similarcocktails = document.getElementById("similar-cocktails");
  let similarcocktailstitle = document.getElementById(
    "similar-cocktails-title"
  );
  similarcocktails.setAttribute("class", "card");

  for (let cocktail of _cocktail) {
    let img = cocktail.strDrinkThumb;
    let nom = cocktail.strDrink;

    similarcocktailstitle.innerHTML = `
  <h1>Similar Cocktail</h1>`;

    similarcocktails.innerHTML = `
  <div class="card-img-top">
    <img src="${img}">
  </div>
  <div class="card-body">
    <h5>${nom}</h5>
  </div>`;

    similarcocktailstitle.appendChild(similarcocktails);
  }
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
}
