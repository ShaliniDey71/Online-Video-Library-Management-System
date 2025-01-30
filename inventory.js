// Array to store movie inventory data
const movieData = [
    { "title": "Inception", "director": "Christopher Nolan", "genre": "Sci-Fi", "year": "2010", "stock": 5 },
    { "title": "The Dark Knight", "director": "Christopher Nolan", "genre": "Action", "year": "2008", "stock": 4 },
    { "title": "The Godfather", "director": "Francis Ford Coppola", "genre": "Crime", "year": "1972", "stock": 6 },
    { "title": "The Shawshank Redemption", "director": "Frank Darabont", "genre": "Drama", "year": "1994", "stock": 3 },
    { "title": "Pulp Fiction", "director": "Quentin Tarantino", "genre": "Crime", "year": "1994", "stock": 2 }
];

// Function to populate the table with movie data
function loadMovies() {
    const tableBody = document.getElementById('movie-table-body');
    
    movieData.forEach((movie, index) => {
        const row = document.createElement('tr');
        
        // Create and append columns for movie data
        const titleCell = document.createElement('td');
        titleCell.textContent = movie.title;
        row.appendChild(titleCell);
        
        const directorCell = document.createElement('td');
        directorCell.textContent = movie.director;
        row.appendChild(directorCell);
        
        const genreCell = document.createElement('td');
        genreCell.textContent = movie.genre;
        row.appendChild(genreCell);
        
        const yearCell = document.createElement('td');
        yearCell.textContent = movie.year;
        row.appendChild(yearCell);
        
        const stockCell = document.createElement('td');
        stockCell.id = `stock-${index}`; // Unique ID for each stock cell
        stockCell.textContent = movie.stock;
        row.appendChild(stockCell);
        
        const actionsCell = document.createElement('td');

        // Increase Stock Button
        const increaseButton = document.createElement('button');
        increaseButton.textContent = 'Increase Stock';
        increaseButton.onclick = () => increaseStock(index); // Attach event to increase stock
        actionsCell.appendChild(increaseButton);

        // Decrease Stock Button
        const decreaseButton = document.createElement('button');
        decreaseButton.textContent = 'Decrease Stock';
        decreaseButton.onclick = () => decreaseStock(index); // Attach event to decrease stock
        decreaseButton.style.marginLeft = '10px'; // Add some spacing between buttons
        actionsCell.appendChild(decreaseButton);
        
        row.appendChild(actionsCell);
        
        // Append the row to the table body
        tableBody.appendChild(row);
    });
}

// Function to increase the stock count
function increaseStock(index) {
    const stockCell = document.getElementById(`stock-${index}`);
    movieData[index].stock += 1; // Update stock in data
    stockCell.textContent = movieData[index].stock; // Update displayed stock
}

// Function to decrease the stock count
function decreaseStock(index) {
    const stockCell = document.getElementById(`stock-${index}`);
    if (movieData[index].stock > 0) { // Ensure stock doesn't go below 0
        movieData[index].stock -= 1; // Update stock in data
        stockCell.textContent = movieData[index].stock; // Update displayed stock
    } else {
        alert('Stock cannot be less than 0!');
    }
}

// Call loadMovies on page load
window.onload = loadMovies;
