let url = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';

// dom elements:
const drinkBox = document.getElementById('drinkBox');
const loadingEl = document.getElementById('loading');

// loading
async function loadingImg() {
    await loadingEl.classList.add('hide');
}

// fetch coctile api by id:
fetchCoctileApiById();
async function fetchCoctileApiById() {
    let id = getcoctileIdFromLs();
    const resp = await fetch(`${url}${id}`);
    const respData = await resp.json();
    loadingImg();
    showCoctileById(respData.drinks[0]);
}

function showCoctileById(respData) {
    // clear container:
    drinkBox.innerHTML = '';
    let rowEl = document.createElement('div');
    rowEl.classList.add('row');

    // get coctile ingredients:
    let ingredientsList = [];
    for (let i = 1; i <= 15; i++) {
        if (respData[`strIngredient${i}`]) {
            ingredientsList.push(respData[`strIngredient${i}`]);
        } else {
            break;
        }
    }
    console.log(ingredientsList);

    let rwosTR = `<div class="img-box">
        <img src=${respData.strDrinkThumb} alt=${respData.strDrink} id="img">
    </div>
    <div class="text">
        <h3 class="drink-title" id="drinkTitle">${respData.strDrink}</h3>
        <p class="drink-desc" id="drinkDesc">${respData.strInstructions}</p>
        <ul class="drink-ingredients">${ingredientsList.map(ing => `<li><i class="far fa-check-square"></i>${ing}</li>`).join('')}</ul>
        <a href="index.html" class="btn">ALL COCKTAILS</a>
    </div>`;
    rowEl.innerHTML = rwosTR;
    drinkBox.appendChild(rowEl);
}

// get coctileId from localStorage:
function getcoctileIdFromLs() {
    const coctileId = localStorage.getItem('coctileId');
    return localStorage.getItem('coctileId') !== null ? coctileId : '';
}