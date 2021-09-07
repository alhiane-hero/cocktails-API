// api:
const baseApi = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";

// dom elements:
const errorEl = document.getElementById('errorEl');
const form  = document.getElementById('form');
const searchInputEl = document.getElementById('searchInput');
const cocktailsEl = document.getElementById('cocktails');
const loadingEl = document.getElementById('loading');

// loading:
async function loadingImg() {
    await loadingEl.classList.add('hide');
}

// show error msg:
function showError() {
    let errorText = '<p>Sorry,No Drinks Matched Your Search!</p>';
    errorEl.innerHTML = errorText;
}

// fetch all coctiles:
fetchCoctilesApi();
async function fetchCoctilesApi() {
    const resp = await fetch(baseApi);
    const respData = await resp.json();
    showAllCoctiles(respData.drinks);
    loadingImg();
}
// List all cocktails by first letter:
async function searchCoctilesApi(url) {
    let respData;
    try {
        // clear error element:
        errorEl.innerHTML = '';
        loadingEl.classList.remove('hide');
        const resp = await fetch(url);
        respData = await resp.json();
        showAllCoctiles(respData.drinks);
        loadingImg();
    } catch {
        showError();
        loadingImg();
    }
}

// show all coctiles on screen:
function showAllCoctiles(respData) {
    // clear container:
    cocktailsEl.innerHTML = '';
    respData.map(data => {
        let cocktailEl = document.createElement('a');
        cocktailEl.classList.add('cocktail');
        cocktailEl.setAttribute('href', 'drink.html');
        let articleEl = `<article data-id=${data.idDrink}>
            <img src=${data.strDrinkThumb} alt=${data.strDrink}>
            <h3>${data.strDrink}</h3>
        </article>`;
        cocktailEl.innerHTML = articleEl;

        cocktailEl.addEventListener('click', _ => {
            let id = cocktailEl.querySelector('article').getAttribute('data-id');
            addcoctileIdToLs(id);
        });

        cocktailsEl.appendChild(cocktailEl);
    });
}

// keyUp on input:
form.addEventListener('keyup', event => {
    event.preventDefault();
    let term = searchInputEl.value;
    if (!term) fetchCoctilesApi();
    searchCoctilesApi(`${baseApi}${term}`);
});

// get coctileId from localStorage:
function addcoctileIdToLs(coctileId) {
    localStorage.setItem('coctileId', coctileId);
}