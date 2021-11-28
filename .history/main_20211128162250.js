//keys and host
const rapidApiHost = "imdb8.p.rapidapi.com";
const rapidApiKey = "66295d0a69msh4b03f2b65b0d92dp1ec757jsn5f544aed0b4e";

let movieForm = document.getElementById("movie-form");
movieForm.addEventListener("submit", findHandler);
let dangerDiv = document.getElementById("dangerdiv");
// console.log(dangerDiv);
async function findHandler(e) {
  e.preventDefault();
  let movieText = document.getElementById("movieName").value;
  if (!movieText) {
    dangerDiv.innerHTML = "Please fill the space.";
    // dangerDiv.innerHTML = "";
    return;
  }
  let fetchedData = await fetch(
    `https://imdb8.p.rapidapi.com/title/find?q=${movieText}`,
    {
      headers: {
        "x-rapidapi-host": rapidApiHost,
        "x-rapidapi-key": rapidApiKey,
        "Content-type": "application/json",
      },
    }
  )
    .then((response) => response.json())
    .then((data) => displayMovies(data.results));
  // .then((data) => console.log(data));
  // console.log("fetchedData", fetchedData);
}

function displayMovies(moviesOrShows) {
  let resultDiv = document.querySelector(".results");
  resultDiv.innerHTML = "";
  // console.log("moviesOrShow", moviesOrShow);

  moviesOrShows.forEach((movieOrShow) => {
    let div = document.createElement("div");
    // console.log("arrayOfNames", movieOrShow.principals[0]);

    div.classList.add("card", "card-body", "mb-3");
    div.innerHTML = `
              <div class="row">
                <div class="col-sm-9">
                  <h4>${movieOrShow.title}</h4>
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
                  }">
                </div> 
              </div> 
    
    
  `;
    resultDiv.appendChild(div);
  });

  console.log("data ", moviesOrShows);
}
