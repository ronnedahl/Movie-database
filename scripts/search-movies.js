

//titles API : 'http://www.omdbapi.com/?s=tt3896198&apikey=33183ef7'
//details API  'http://www.omdbapi.com/?i=tt3896198&apikey=33183ef7'

const movieSearchBox = document.querySelector('#movie-search-box')
const searchList = document.querySelector('#search-list')
const  resultGrid = document.querySelector('#result-grid')

// Load movies from API
async function loadMovies(searchTerm) {
    const URL = `http://www.omdbapi.com/?s=${searchTerm}&tt3896198&apikey=33183ef7`
    const resp = await fetch(`${URL}`)
    const data = await resp.json()
    console.log(data)
    displayMovieList(data.search)
    
    
}



function findMovies(){

    let searchTerm = (movieSearchBox.value)
    console.log(searchTerm)
}


function displayMovieList(movies){


}
