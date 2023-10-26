// SET VARIBALE

const submitInput = document.getElementById("submit");
const cardLabel = document.querySelector(".card");

// CREATE EVENT CLICK

submitInput.addEventListener("click", async (e) => {
  e.preventDefault();

  // SET VARIBALE

  let meals;
  let urlModifiee = "";
  let flag = "";

  // CALL MEALS API

  await fetch("https://www.themealdb.com/api/json/v1/1/random.php")
    .then((res) => res.json())
    .then((data) => {
      meals = data.meals[0];

      // REPLACE YOUTUBE URL FOR EMBED

      let url = meals.strYoutube;
      urlModifiee = url.replace(/\/watch\?v=/, "/embed/");
    });
  try {
    // CALL REST COUNTRIES API FOR COUNTRY FLAG

    await fetch(`https://restcountries.com/v3.1/name/${meals.strArea}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        flag = data[0].flags.png;
      });
  } catch {
    return;
  } finally {
    cardLabel.style.display = "block";

    // STOCK INGREDIENT AND MEASURE

    if (meals) {
      const ingredientsList = [];
      for (let i = 1; i <= 20; i++) {
        const ingredient = meals["strIngredient" + i];
        const measure = meals["strMeasure" + i];
        if (ingredient) {
          ingredientsList.push(`${ingredient} ${measure}`);
        }
      }

      // SHOW ALL ELEMENTS IN CARD HTML

      cardLabel.innerHTML = `
      <div class="header">
          <h2>${meals.strMeal} : ${meals.strArea}</h2>
          <img src="${flag}" alt="country flag" id="flag">
      </div>
        <div class="assets">
          <img
            src="${meals.strMealThumb}"
            alt="meal"
            width="420"
            height="315"
          />  
          <div class="video">
            <iframe
              src="${urlModifiee}"
            >
            </iframe> 
          </div>
        </div>
        <div class="ingredients">
          <div class="ingredients-container">
            ${ingredientsList
              .map((ingredient) => `<p>${ingredient}</p>`)
              .join("")}
          </div>
        </div>
      `;
    }
  }
});
