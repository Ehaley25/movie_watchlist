import key from '/apiKey.js'

let movieInfo = document.getElementById("movie-info")
let test = ''
document.getElementById('search-movie').addEventListener('click',()=>{
    console.log(movieInfo.value)
    fetch(`http://www.omdbapi.com/?apikey=${key}&s=${movieInfo.value}`)
        .then(res => res.json())
        .then(data => {
            // console.log(data)
            // console.log(data)
            console.log(data.Search)
            test = ''
            for(let movies of data.Search){
                fetch(`http://www.omdbapi.com/?apikey=${key}&i=${movies.imdbID}`)
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    test += `
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
                                <p id=${data.imdbID}>Watchlist</p>
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
    document.getElementById('inputMovies').innerHTML = test
}

// localStorage.setItem('myWatchList', "test")
// localStorage.clear()
// console.log(localStorage)
// need to create an array to put movies in the watch list section
// need to figure out exactly what information to pass in the array i want to access in the local storage to be able to display each individuals watch list