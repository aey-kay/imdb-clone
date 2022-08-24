//  api key
const apiKey = "d21b963e";
// css query selectores
const topMoviesCard = document.querySelector("#topMovies .slider");
const topSeriesCard = document.querySelector("#topSeries .slider");
const favoriteCard = document.querySelector("#favorite .slider");
const batman = document.querySelector("#batman");
const topGun = document.querySelector("#topGun");
const dr = document.querySelector("#drStrange");

// movies for cards to diplay
let topMovies = [
  "Top Gun Maverick",
  "Doctor Strange",
  "Morbius",
  "Fantastic Beasts",
  "Everything Everywhere All At Once",
  "The Batman",
  "Sonic the Hedgehog 2",
  "Nobody",
  "Spider-Man No Way Home",
  "The Bad Guys",
];
// Tv Shows for cards to diplay
let topSeries = [
  "Stranger Things",
  "The Boys",
  "Better Call Saul",
  "The Lincoln Lawyer",
  "Love, Death & Robots",
  "Game of Thrones",
  "Ozark",
  "Barry",
  "Bosch: Legacy",
  "Breaking Bad",
];

// load movies from API
for (let movie of topMovies) {
  loadMoviesApi(movie, displayTopMovies, "t");
}
for (let movie of topSeries) {
  loadMoviesApi(movie, displayTopSeries, "t");
}

// async Api calls
async function loadMoviesApi(searchTerm, displayFunction, type) {
  const URL = `https://www.omdbapi.com/?${type}=${searchTerm}&y=&plot=short&r=json&apikey=${apiKey}`;
  const res = await fetch(`${URL}`);
  const data = await res.json();
  if (data.Response == "True") displayFunction(data);
}
// html contents for top movies
function displayTopMovies(data) {
  topMoviesCard.innerHTML += `<div class=" card" id="${data.imdbID}">
                        <div class="face face1"  onclick="viewContent(${data.imdbID})">
                            <div class="content">
                                <div class="icon">
                                <img src=${data.Poster} alt="">
                                
                                </div>
                            </div>
                        </div>
                        <div class="face face2">
                            <div class="content">
                                <h4 class="rating-like-button"><strong>⭐${data.imdbRating}</strong>

                                    <label class="like">
                                        <input onclick="likeButton(${data.imdbID})" class="fav"type="checkbox" />
                                        <div class="hearth" />
                                    </label>
                                </h4>
                                <h3 class="card-title">${data.Title}
                                </h3>
                                <div><span class="card-trailer" onclick="playTrailer(${data.imdbID})"><i class="fa-solid fa-play"></i> Trailer</span>
                                    
                                </div>

                            </div>
                        </div>
            </div>`;
}
//  html contents of top serires
function displayTopSeries(data) {
  topSeriesCard.innerHTML += `<div class=" card" id="${data.imdbID}">
                        <div class="face face1"  onclick="viewContent(${data.imdbID})">
                            <div class="content">
                                <div class="icon">
                                <img src=${data.Poster} alt="">
                                
                                </div>
                            </div>
                        </div>
                        <div class="face face2">
                            <div class="content">
                                <h4 class="rating-like-button"><strong>⭐${data.imdbRating}</strong>

                                    <label class="like">
                                        <input onclick="likeButton(${data.imdbID})"class="fav" type="checkbox" />
                                        <div class="hearth" />
                                    </label>
                                </h4>
                                <h3 class="card-title">${data.Title}
                                </h3>
                                <div><span class="card-trailer" onclick="playTrailer(${data.imdbID})"><i class="fa-solid fa-play"></i> Trailer</span>
                                    
                                </div>

                            </div>
                        </div>
            </div>`;
}
// html contents of favorites
function displayFavorites(data) {
  favoriteCard.innerHTML += `<div class=" card" >
                        <div class="face face1"  onclick="viewContent('${data.imdbID}')">
                            <div class="content">
                                <div class="icon">
                                <img src=${data.Poster} alt="">
                                
                                </div>
                            </div>
                        </div>
                        <div class="face face2">
                            <div class="content">
                                <h4 class="rating-like-button"><strong>⭐${data.imdbRating}</strong>

                                    <label class="like" >
                                        <input class="fav" type="checkbox" onclick="removeFavorite('${data.imdbID}')"checked/>
                                        <div class="hearth" />
                                    </label>
                                </h4>
                                <h3 class="card-title">${data.Title}
                                </h3>
                                <div><span class="card-trailer" onclick="playTrailer(${data.imdbID})"><i class="fa-solid fa-play"></i> Trailer</span>
                                    
                                </div>

                            </div>
                        </div>
            </div>`;
}
// requets for another page with details
function viewContent(id) {
  if (id.id != undefined) {
    id = id.id;
  }

  console.log("this is id" + id);
  sessionStorage.setItem("detailed_content_id", id);
  window.open("./content_details.html", "_self");
}
// Event listner for slid show
batman.addEventListener("click", () => {
  window.location.href = "./index.html#topMovies";
});

// Favorite heart button
function likeButton(id) {
  // saving in local storage
  if (id.id != undefined) {
    id = id.id;
  }
  console.log("is running", id);

  let localFavorites = localStorage.getItem("favorites");
  if (localFavorites == null) {
    favoriteList = [];
  } else {
    favoriteList = JSON.parse(localFavorites);
    favoriteList = [...new Set(favoriteList)];
  }
  // console.log(id);
  // putting in favorites list
  if (id != undefined) {
    let isLikeChecked = document.querySelector(`#${id} .fav`).checked;
    if (isLikeChecked) {
      favoriteList.push(id);
      // console.log("added " + id.id);
      localStorage.setItem("favorites", JSON.stringify(favoriteList));
      loadFavorite();
    } else {
      // removing from favorite list
      if (favoriteList.length != 0) {
        let idIndex = favoriteList.indexOf(id);
        // console.log(idIndex);
        if (idIndex != undefined) {
          favoriteList.splice(idIndex, 1);
          localStorage.setItem("favorites", JSON.stringify(favoriteList));
          // console.log("removed " + id.id);
          loadFavorite();
        }
      }
    }
  }
}
// reload the favorite section
function loadFavorite() {
  favoriteCard.innerHTML = "";
  let localFavorites = localStorage.getItem("favorites");
  if (localFavorites != null) {
    favoriteList = JSON.parse(localFavorites);
    favoriteList = [...new Set(favoriteList)];
    for (let card of favoriteList) {
      loadMoviesApi(card, displayFavorites, "i");
      if (document.querySelector(`#${card} .fav`) != null) {
        document.querySelector(`#${card} .fav`).checked = true;
      }
    }
  }
}
// remove favorite item
function removeFavorite(id) {
  if (id.id != undefined) {
    id = id.id;
  }

  let idIndex = favoriteList.indexOf(id);
  if (idIndex != undefined) {
    favoriteList.splice(idIndex, 1);
    localStorage.setItem("favorites", JSON.stringify(favoriteList));
    // console.log("removed " + id.id);
    loadFavorite();
  }
}
//  trailer link to imdb website
function playTrailer(id) {
  window.open(`https://www.imdb.com/title/${id.id}/`, "_blank").focus();
}

// loadfavorite delayed for api loading
setTimeout(loadFavorite, 1000);
