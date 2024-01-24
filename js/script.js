// Selecting elements
const btn = document.querySelector('.btn');
const openModalLink = document.getElementById('openModalLink');
const favoriteModal = document.getElementById('favoriteModal');
const closeBtn = document.querySelector('.close');
const favoriteQuotesContainer = document.getElementById('favoriteQuotesContainer');
const quoteContainer = document.getElementById('quote-container');

// Event listeners
btn.addEventListener('click', getQuotes);
openModalLink.addEventListener('click', openFavoriteModal);
closeBtn.addEventListener('click', closeFavoriteModal);
window.addEventListener('click', (event) => {
    // Close the modal if the user clicks outside of it
    if (event.target === favoriteModal) {
        closeFavoriteModal();
    }
});

// Initializations
let favoriteQuotes = JSON.parse(localStorage.getItem('favoriteQuotes')) || [];

// Display favorite quotes in the modal
function openFavoriteModal() {
    displayFavoriteQuotes();
    favoriteModal.style.display = 'block';
}

// Close the favorite quotes modal
function closeFavoriteModal() {
    favoriteModal.style.display = 'none';
}

// Display favorite quotes in the modal
function displayFavoriteQuotes() {
    favoriteQuotesContainer.innerHTML = '';

    // Retrieve favorite quote IDs from local storage
    let favoriteQuotesIds = JSON.parse(localStorage.getItem('favoriteQuotes')) || [];

    if (favoriteQuotesIds.length === 0) {
        // Display a message when there are no favorite quotes
        let noQuotesDiv = document.createElement('div');
        noQuotesDiv.textContent = 'No quotes';
        favoriteQuotesContainer.appendChild(noQuotesDiv);
    } else {
        // Display each favorite quote
        favoriteQuotesIds.forEach(quoteId => {
            const quote = quotes.find(q => q.id === quoteId);
            if (quote) {
                // Create and append the HTML for each favorite quote
                let quoteDiv = createQuoteElement(quote);
                favoriteQuotesContainer.appendChild(quoteDiv);
            } 
        });
    }
}

// Generate HTML for a quote element
function createQuoteElement(quote) {
    let quoteDiv = document.createElement('div');
    quoteDiv.classList.add('quote-modal');

    // Populate the quote element with HTML content
    quoteDiv.innerHTML =
        `<div class=''>
            <p class='title'>${quote.title}</p>
            <p class='content'>“${quote.content}”</p>
        </div> 
        <div class=''>
            <p class='author'>- ${quote.author}</p>
        </div>`;

    return quoteDiv;
}

// Fetch and display quotes
function getQuotes() {
    // Shuffle the quotes array
    const shuffledQuotes = quotes.slice().sort(() => Math.random() - 0.5);
    // Select the first 5 shuffled quotes
    const selectedQuotes = shuffledQuotes.slice(0, 5);
    
    // Clear the quote container
    quoteContainer.innerHTML = '';
    // Display each selected quote
    selectedQuotes.forEach(quote => {
        let quoteDiv = createQuoteElement(quote);
        quoteDiv.classList.add('quote');

        // Create and append the heart icon with event listener
        const heartIcon = document.createElement('div');
        heartIcon.classList.add('heart');
        heartIcon.setAttribute('data-id', quote.id);
        heartIcon.innerHTML = `<i class='${favoriteQuotes.includes(quote.id) ? "fa-solid active" : "fa-regular"} fa-heart' title='Add favorite'></i>`;

        quoteDiv.appendChild(heartIcon);
        quoteContainer.appendChild(quoteDiv);

        // Add event listener to the heart icon for toggling favorite status
        heartIcon.addEventListener('click', () => toggleFavorite(quote.id));
    });
}

// Toggle favorite status and update localStorage
function toggleFavorite(quoteId) {
    const heartIcon = document.querySelector(`.heart[data-id='${quoteId}'] i`);

    if (favoriteQuotes.includes(quoteId)) {
        // Remove the quote from favorites
        favoriteQuotes = favoriteQuotes.filter(id => id !== quoteId);
        heartIcon.classList.remove('fa-solid', 'active');
        heartIcon.classList.add('fa-regular');
    } else {
        // Add the quote to favorites
        favoriteQuotes.push(quoteId);
        heartIcon.classList.add('fa-solid', 'active');
        heartIcon.classList.remove('fa-regular');
    }

    // Update localStorage with the latest favorite quotes
    localStorage.setItem('favoriteQuotes', JSON.stringify(favoriteQuotes));
}

// Initial fetch and display of quotes
getQuotes();
