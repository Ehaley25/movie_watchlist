import key from '/script/apiKey.js'



let moviesFromLocalStorage = JSON.parse( localStorage.getItem("myWatchList") )


function render(html){
    document.getElementById('inputMovies').innerHTML = html
}
// console.log(localStorage.myWatchList)

let watchListHtml = ''
let localStorageMovies = ''
if (moviesFromLocalStorage) {
    localStorageMovies = moviesFromLocalStorage
}

// console.log(localStorageMovies)
function localStorageSearch(){
    for(let movie of localStorageMovies){
        fetch(`http://www.omdbapi.com/?apikey=${key}&i=${movie}`)
            .then(res => res.json())
            .then(data => {
                watchListHtml += `
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
                        <label for="watched">Watched</label>
                        <input type="checkbox" name="watched" id="watched">
                    </div>
                    <div class="description">
                        <p>${data.Plot}</p>
                    </div>
                </div>
            </div>
            `
            render(watchListHtml)
            })
        }
}
localStorageSearch()

