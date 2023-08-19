const movie = document.getElementById("movie");
console.log(movie.value);
let movieSelected = +movie.value;

const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const container = document.getElementById("container");

const price = document.getElementById("price");
const count = document.getElementById("count");

let selectedSeatCount = 0;

const populateSeats = () => {
    const selectedSeats = JSON.parse(localStorage.getItem("seats"));
    console.log(selectedSeats);
    [...seats].map((s) => {
        if (selectedSeats.includes([...seats].indexOf(s))) {
            s.classList.add("selected");
        }
    });
    const cachedMovieIndex = localStorage.getItem("movieIndex");
    const cachedMoviePrice = localStorage.getItem("moviePrice");

    movieSelected = cachedMoviePrice;
    // [cachedMovieIndex].attr("selected", "selected");
};

populateSeats();
movie.addEventListener("change", (e) => {
    console.log(e.target.value);
    movieSelected = +e.target.value;
    updateSelectedCount();
    movieData(e.target.selectedIndex, e.target.value);
});

const movieData = (movieIndex, moviePrice) => {
    localStorage.setItem("movieIndex", movieIndex);
    localStorage.setItem("moviePrice", moviePrice);
};

container.addEventListener("click", (e) => {
    if (
        e.target.classList.contains("seat") &&
        !e.target.classList.contains("occupied")
    ) {
        e.target.classList.toggle("selected");
        updateSelectedCount();
    }
});

const updateSelectedCount = () => {
    const selectedSeats = document.querySelectorAll(".row .seat.selected");
    selectedSeatCount = selectedSeats.length;
    console.log(selectedSeatCount);
    const arr = [...selectedSeats].map((s) => [...seats].indexOf(s));
    localStorage.setItem("seats", JSON.stringify(arr));
    count.innerText = selectedSeatCount;
    price.innerText = selectedSeatCount * movieSelected;
};

updateSelectedCount();