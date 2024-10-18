// Movie Search App

const apiKey = '6e620f58';  // Your OMDb API key
const searchButton = document.getElementById('searchButton');
const searchInput = document.getElementById('searchInput');
const moviesList = document.getElementById('moviesList');

// Search Movies Function
searchButton.addEventListener('click', () => {
    const query = searchInput.value.trim();
    if (query) {
        fetchMovies(query);
    } else {
        alert('Please enter a movie name!');
    }
});

function fetchMovies(query) {
    const apiUrl = `https://www.omdbapi.com/?s=${query}&apikey=${apiKey}`;
    
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.Response === 'True') {
                displayMovies(data.Search);
            } else {
                alert(data.Error);
            }
        })
        .catch(error => {
            console.error('Error fetching movies:', error);
        });
}

// Display Movies
function displayMovies(movies) {
    moviesList.innerHTML = '';
    movies.forEach(movie => {
        const movieItem = document.createElement('div');
        movieItem.classList.add('movie');
        movieItem.innerHTML = `
            <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/150x200?text=No+Image'}" alt="${movie.Title}">
            <h3>${movie.Title}</h3>
            <p>Year: ${movie.Year}</p>
            <p>Type: ${movie.Type}</p>
            <button class="favorite-button" data-movie='${JSON.stringify(movie)}'>Add to Favorites</button>
            <label for="rating-${movie.imdbID}">Rating: </label>
            <input type="number" id="rating-${movie.imdbID}" min="1" max="5" placeholder="1-5">
            <label for="review-${movie.imdbID}">Review: </label>
            <textarea id="review-${movie.imdbID}" rows="2" placeholder="Write a review..."></textarea>
            <button class="submit-review-button" data-movie='${JSON.stringify(movie)}'>Submit Review</button>
        `;
        moviesList.appendChild(movieItem);
    });

    // Add event listeners to "Favorite" and "Submit Review" buttons
    document.querySelectorAll('.favorite-button').forEach(button => {
        button.addEventListener('click', event => {
            const movie = JSON.parse(event.target.getAttribute('data-movie'));
            addToFavorites(movie);
        });
    });

    document.querySelectorAll('.submit-review-button').forEach(button => {
        button.addEventListener('click', event => {
            const movie = JSON.parse(event.target.getAttribute('data-movie'));
            const rating = document.getElementById(`rating-${movie.imdbID}`).value;
            const review = document.getElementById(`review-${movie.imdbID}`).value;
            submitReview(movie, rating, review);
        });
    });
}

// Add to Favorites
function addToFavorites(movie) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (!favorites.some(fav => fav.imdbID === movie.imdbID)) {
        favorites.push(movie);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        alert(`${movie.Title} has been added to your favorites!`);
    } else {
        alert(`${movie.Title} is already in your favorites.`);
    }
}

// Submit Review
function submitReview(movie, rating, review) {
    if (rating < 1 || rating > 5 || review.trim() === '') {
        alert('Please enter a valid rating (1-5) and review.');
        return;
    }

    let reviews = JSON.parse(localStorage.getItem('reviews')) || [];
    reviews.push({ movie: movie.Title, rating, review });
    localStorage.setItem('reviews', JSON.stringify(reviews));

    alert(`Your review for ${movie.Title} has been submitted!`);
}

// View Favorites
document.getElementById('viewFavoritesButton').addEventListener('click', () => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (favorites.length === 0) {
        alert('No favorites yet!');
    } else {
        displayMovies(favorites);
    }
});
