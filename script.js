let searchInfo = document.getElementById('searchInfo')
let searchForm = document.getElementById('movieSearch')
let movieContainer = document.querySelector(".movieContainer")
let loadMovieBtn = document.querySelector('#load-more-movies-btn')
let clearBtn = document.querySelector('#clearBtn')
let movieList = document.querySelector('#load-more')

let apiKey = "fee248df7e9c0e62a621dbc9f52748eb";
let newUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=`;
let moviePage = 1

console.log(searchInfo); 

function display(movieDisplay){
    movieDisplay.forEach(movie => movieContainer.append(movieCard(movie)))
}

//submit button function
const handleSubmitFunction = (event) => {
    event.preventDefault()
    const query = searchInfo.value
    // Update url to include the query
    let updatedUrl = updateUrl(query)

    // call the newAPIcall
    movieList.innerHTML = ""
    console.log(movieContainer)
    newApiCall(updatedUrl)
}

searchForm.addEventListener('submit', handleSubmitFunction)


// https://api.themoviedb.org/3/search/movie?query=super%20mario&include_adult=false&language=en-US&page=1


const updateUrl = (queryInfo) => {
   let testUrl = newUrl + queryInfo
    return testUrl
}

const newApiCall = async (url) => {
    
    const response = await fetch(url)
    const jsonData = await response.json()

    console.log(jsonData)
    display(jsonData.results)

}

//creating movie displays/cards
const movieCard = (moviesList) => {

    //movie title
    let newMovieTitle = document.createElement('div')
    newMovieTitle.classList.add('movieTitle')
    let movieName = moviesList.title
    newMovieTitle.innerHTML = movieName
    movieList.appendChild(newMovieTitle)


    // create movie image element
    let image = document.createElement('img');
    image.classList.add('movie-poster');
    image.src = 'https://image.tmdb.org/t/p/w342' + moviesList.poster_path;
    movieList.appendChild(image)

    
    //Rating

    let newRating = document.createElement('p')


    let star = document.createElement('p')
    let starContent = document.createTextNode('⭐️')
    star.appendChild(starContent)
   
    let ratingContent = document.createTextNode(moviesList.vote_average)
    star.appendChild(ratingContent)

    
    let starContainer = document.createElement('div')
    starContainer.appendChild(star)
    starContainer.appendChild(newRating)

    
  //  newRating.classList.add('newRating')
  //  let ratingInfo = moviesList.vote_average
   // newRating.innerHTML = ratingInfo

    movieList.appendChild(star)
    movieList.appendChild(newRating)
    movieList.appendChild(starContainer)


   movieContainer.appendChild(movieList) 
    return movieList
    }

//function for getting movie data from API
async function movieData(){
   
    const response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&page=${moviePage}`)
    const movies = await response.json(); //converts data to json
    console.log(movies)
    return movies.results

}

async function movieSearch(){
   
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchInfo.value}`)
    const movieSearch = await response.json(); //converts data to json
    console.log(movieSearch)
    return movieSearch.results

}

//adds more movies when user clicks button
async function addMovies(){
    moviePage++
    const response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&page=${moviePage}`)
    const newMovies = await response.json(); //converts data to json
    console.log("this is in the addMovies function")
    console.log(newMovies)
    display(newMovies.results)

}


loadMovieBtn.addEventListener('click',addMovies)

clearBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    movieList.innerHTML = "";
    fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&page=1`)
    .then(res =>res.json())
    .then(data =>{
        data.results.forEach((movie)=>movieContainer.append(movieCard(movie)))
    })
})

window.onload = async function(){
movieData()
movieSearch()
const movieArray = await movieData(); 
const movieSearchArray = await movieSearch()

display(movieArray)
display(movieSearchArray)

}
