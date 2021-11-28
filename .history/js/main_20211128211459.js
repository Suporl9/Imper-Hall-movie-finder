//keys and host
const rapidApiHost = "imdb8.p.rapidapi.com";
const rapidApiKey = "66295d0a69msh4b03f2b65b0d92dp1ec757jsn5f544aed0b4e";

let movieForm = document.getElementById("movie-form");
movieForm.addEventListener("submit", findHandler);
let formEmptyDiv = document.getElementById("dangerdiv");
let alertDangerDiv = document.getElementById("alertDangerDiv");

//submit handler
async function findHandler(e) {
  e.preventDefault();

  let movieText = document.getElementById("movieName").value;

  if (!movieText) {
    formEmptyDiv.innerHTML = "Please fill the space.";
    return;
  }

  await fetch(`https://imdb8.p.rapidapi.com/title/find?q=${movieText}`, {
    headers: {
      "x-rapidapi-host": rapidApiHost,
      "x-rapidapi-key": rapidApiKey,
      "Content-type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => displayMovies(data.results));
}

//display movies handler

function displayMovies(moviesOrShows) {
  let resultDiv = document.querySelector(".results");
  resultDiv.innerHTML = "";
  alertDangerDiv.innerHTML = "";
  console.log("moviesOrShows", moviesOrShows);

  if ((alertDangerDiv.classList = "alert alert-danger")) {
    alertDangerDiv.classList.remove("alert", "alert-danger");
  }

  if (moviesOrShows == undefined) {
    alertDangerDiv.classList.add("alert", "alert-danger");
    alertDangerDiv.innerHTML = "please enter a valid TV/SHOW name";
    return;
  }
  moviesOrShows &&
    moviesOrShows.forEach((movieOrShow) => {
      let div = document.createElement("div");

      div.classList.add("card", "card-body", "mb-3");
      div.innerHTML = `
              <div class="row">
                <div class="col-sm-9">
                  <h4>${movieOrShow.title ? movieOrShow.title : "No Title"}</h4>
                  <p class="text-secondary">${movieOrShow.year}</p>
                  <p>
                    ${
                      movieOrShow.principals
                        ? movieOrShow.principals.map((principal) => {
                            return `<h6>${principal.name}</h6>`;
                          })
                        : ` `
                    }
                  </p>
                  <ul class="list-group">
                      <li class="list-group-item">${
                        movieOrShow.runningTimeInMinutes
                          ? `<li class="list-group-item">Running Time: ${movieOrShow.runningTimeInMinutes} minutes</li>`
                          : ``
                      }</li>
                           ${
                             movieOrShow.titleType
                               ? `<li class="list-group-item">Title Type: ${movieOrShow.titleType}</li>`
                               : ``
                           }
                  </ul>
                </div>
                <div class="col-sm-3">
                  <img class="img-fluid rounded-circle mt-2" style="height:190px;width:200px" src="${
                    movieOrShow.image ? movieOrShow.image.url : ""
                  }" alt="movie picture">
                </div> 
              </div> 
  `;
      resultDiv.appendChild(div);
    });

  formEmptyDiv.innerHTML = "";
}

//now time for validation
