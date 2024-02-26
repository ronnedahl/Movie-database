

//titles API : 'http://www.omdbapi.com/?s=tt3896198&apikey=33183ef7'
//details API  'http://www.omdbapi.com/?i=${movie.dataset.id}&tt3896198&apikey=33183ef7'

const movieSearchBox = document.querySelector('#movie-search-box')
const searchList = document.querySelector('#search-list')
const  resultGrid = document.querySelector('#result-grid')
const form = document.querySelector('form')

form.addEventListener('submit',function(event){
    event.preventDefault()
    let searchTerm = (movieSearchBox.value)
    loadMovies(searchTerm)


// Load movies from API
async function loadMovies(searchTerm) {
    const URL = `http://www.omdbapi.com/?s=${searchTerm}&tt3896198&apikey=33183ef7`
    const resp = await fetch(`${URL}`)
    const data = await resp.json()
   // console.log(data)
    displayMovieList(data)
    
    
}





//Display Movies
function displayMovieList(movies){
    console.log(movies)
    searchList.innerHTML = "";
    console.log(searchList)
    for(let i = 0; i < movies.length; i++){
        console.log(movies.length)
        console.log(`här ska det vara ett värde ${i}`)
        let movieListItem = document.createElement('div');
        movieListItem.dataset.id = movies[i].imdbID; // setting movie id in  data-id
        console.log(movies)
        
        movieListItem.classList.add('search-list-item');
        if(movies[i].Poster != "N/A")
            moviePoster = movies[i].Poster;
        else 
            moviePoster = "image_not_found.png";

        movieListItem.innerHTML = `
        <div class = "search-item-thumbnail">
            <img src = "${moviePoster}">
        </div>
        <div class = "search-item-info">
            <h3>${movies[i].Title}</h3>
            <p>${movies[i].Year}</p>
        </div>
        `;
        searchList.appendChild(movieListItem);
    } 
   loadMovieDetails()
}
function loadMovieDetails(){
    const searchListMovies = searchList.querySelectorAll('.search-list-item');
    searchListMovies.forEach(movie => {
        movie.addEventListener('click', async () => {
            // console.log(movie.dataset.id);
            searchList.classList.add('hide-search-list');
            movieSearchBox.value = "";
            const result = await fetch(`http://www.omdbapi.com/?i=${movie.dataset.id}&tt3896198&apikey=33183ef7`);
            const movieDetails = await result.json();
            // console.log(movieDetails);
            displayMovieDetails(movieDetails);
        });
    });
}

function displayMovieDetails(details){
    resultGrid.innerHTML = `
    <div class = "movie-poster">
        <img src = "${(details.Poster != "N/A") ? details.Poster : "image_not_found.png"}" alt = "movie poster">
    </div>
    <div class = "movie-info">
        <h3 class = "movie-title">${details.Title}</h3>
        <ul class = "movie-misc-info">
            <li class = "year">Year: ${details.Year}</li>
            <li class = "rated">Ratings: ${details.Rated}</li>
            <li class = "released">Released: ${details.Released}</li>
        </ul>
        <p class = "genre"><b>Genre:</b> ${details.Genre}</p>
        <p class = "writer"><b>Writer:</b> ${details.Writer}</p>
        <p class = "actors"><b>Actors: </b>${details.Actors}</p>
        <p class = "plot"><b>Plot:</b> ${details.Plot}</p>
        <p class = "language"><b>Language:</b> ${details.Language}</p>
        <p class = "awards"><b><i class = "fas fa-award"></i></b> ${details.Awards}</p>
    </div>
    `;
}

    


})
  
