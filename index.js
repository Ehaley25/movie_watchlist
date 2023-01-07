import key from '/apiKey.js'

let movieInfo = document.getElementById("movie-info")
let movieDisplay = ''
let watchList = []
document.getElementById('search-movie').addEventListener('click',()=>{
    console.log(movieInfo.value)
    fetch(`http://www.omdbapi.com/?apikey=${key}&s=${movieInfo.value}`)
        .then(res => res.json())
        .then(data => {
            const movies = data.Search.slice(0, 5)
            movieDisplay = ''
            for(let movie of movies){
                fetch(`http://www.omdbapi.com/?apikey=${key}&i=${movie.imdbID}`)
                .then(res => res.json())
                .then(data => {
                    console.log(data)
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
                    render()
                })
            }
        })
})

function render(){
    document.getElementById('inputMovies').innerHTML = movieDisplay
}

document.addEventListener('click',(e)=>{
    if(e.target.id == 'movie-info'|| e.target.id == 'search-movie' || e.target.id =='inputMovies' || e.target.id == ''){
        return
    }
    watchList.push(e.target.id)
    console.log(watchList)
})



// finish creating localstorage so users can add to their personal watchlist, deploy with API keyy hidden + working 
// maybe find a cleaner way to get the ids' from each movie but for now it works.