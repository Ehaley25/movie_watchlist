import key from '/script/apiKey.js'

let movieInfo = document.getElementById("movie-info")
let movieDisplay = ''
let watchList = []
export let moviesFromLocalStorage = JSON.parse( localStorage.getItem("myWatchList") )
// console.log(moviesFromLocalStorage)
document.getElementById('search-movie').addEventListener('click',()=>{
    // console.log(movieInfo.value)
    fetch(`http://www.omdbapi.com/?apikey=${key}&s=${movieInfo.value}`)
        .then(res => res.json())
        .then(data => {
            const movies = data.Search.slice(0, 5)
            movieDisplay = ''
            for(let movie of movies){
                fetch(`http://www.omdbapi.com/?apikey=${key}&i=${movie.imdbID}`)
                .then(res => res.json())
                .then(data => {
                    // console.log(data)
                    movieDisplay += `
                    <div class=" movie content-width">
                        <div class="side-one">
                            <img src="${data.Poster}" alt="">            
                        </div>
                        <div class="side-two">
                            <div class="flex">
                                <h3> ${data.Title}</h3>
                                <p>${data.imdbRating}</p>
                            </div>
                            <div class="flex">
                                <p>${data.Runtime}</p>
                                <p>${data.Genre}</p>
                                <p class = 'movieID' id=${data.imdbID}>Watchlist</p>
                            </div>
                            <div class="description">
                                <p>${data.Plot}</p>
                            </div>
                        </div>
                    </div>
                    `
                    render(movieDisplay)
                })
            }
        })
        movieInfo.value = ''

})

export function render(html){
    document.getElementById('inputMovies').innerHTML = html
}

document.addEventListener('click',(e)=>{
    if(e.target.id == 'movie-info'|| e.target.id == 'search-movie' || e.target.id =='inputMovies' || e.target.id == ''){
        return
    }
    watchList.push(e.target.id)
    // console.log(watchList)
    localStorage.setItem("myWatchList", JSON.stringify(watchList) )
    // console.log(localStorage)
    // for(let movies of watchList){
    //     console.log(movies)
    // }
})

if (moviesFromLocalStorage) {
    watchList = moviesFromLocalStorage
}

