// css selectors
const movieSearchBox = document.getElementById("movie-search-box");
const searchList = document.getElementById("search-list");
const hideSearchlistContainer = document.querySelector(
  ".hide-search-list-container"
);

// event listner for search
hideSearchlistContainer.addEventListener("click", () => {
  searchList.classList.add("hide-search-list");
});

// fetch movies from API
async function loadMovies(searchTerm) {
  const URL = `https://omdbapi.com/?s=${searchTerm}&page=1&apikey=fc1fef96`;
  const res = await fetch(`${URL}`);
  const data = await res.json();
  console.log(data.Search);
  if (data.Response == "True") displayMovieList(data.Search);
}
// auto complete the search
function findMovies() {
  let searchTerm = movieSearchBox.value.trim();
  // console.log(searchTerm);
  if (searchTerm.length > 0) {
    searchList.classList.remove("hide-search-list");
    loadMovies(searchTerm);
  } else {
    searchList.classList.add("hide-search-list");
  }
}
// display search item
function displayMovieList(movies) {
  searchList.innerHTML = "";
  let localFavorites = localStorage.getItem("favorites");
  if (localFavorites == null) {
    favoriteList = [];
  } else {
    favoriteList = JSON.parse(localFavorites);
    favoriteList = [...new Set(favoriteList)];
  }
  let checked = "";

  for (let data of movies) {
    if (favoriteList.includes(data.imdbID)) {
      checked = "checked";
    } else {
      checked = "";
    }

    let movieListItem = document.createElement("div");
    // movieListItem.dataset.id = movies[idx].imdbID; // setting movie id in  data-id
    // movieListItem.classList.add("search-list-item");
    if (data.Poster != "N/A") moviePoster = data.Poster;
    else moviePoster = "image_not_found.png";

    movieListItem.innerHTML = `<div class="search-list-item id=" ${data.imdbID}" >
    
    <div class="search-item-thumbnail search-click" onclick="viewContentSearch('${data.imdbID}')">
        <img src="${moviePoster}">
    </div>
    <div class="search-item-info search-click" onclick="viewContentSearch('${data.imdbID}')">
        <h3>${data.Title}</h3>
        <p>${data.Year}</p>
    </div>
    
    
    <label class="like search-like">
        <input class="fav" type="checkbox" onclick="likeButtonSearch('${data.imdbID}')"  ${checked}/>
        <div class="hearth" />
    </label>
    
</div>
                    `;

    searchList.appendChild(movieListItem);
  }
}
// send to other page for detaled description
function viewContentSearch(id) {
  console.log("this is id" + id);
  sessionStorage.setItem("detailed_content_id", id);
  window.location.href = "./content_details.html";
}
// Favorite heart button for serach
function likeButtonSearch(id) {
  // saving in local storage
  if (id.id != undefined) {
    id = id.id;
  }

  let localFavorites = localStorage.getItem("favorites");
  if (localFavorites == null) {
    favoriteList = [];
  } else {
    favoriteList = JSON.parse(localFavorites);
    favoriteList = [...new Set(favoriteList)];
  }

  // putting in favorites list
  if (id != undefined) {
    favoriteList.push(id);
    localStorage.setItem("favorites", JSON.stringify(favoriteList));
    loadFavorite();
  }
}
