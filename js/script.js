const btn = document.querySelector('.btn')
btn.addEventListener('click', getQuotes)
let favoriteQuotes = JSON.parse(localStorage.getItem('favoriteQuotes')) || [];

const openModalLink = document.getElementById('openModalLink');
const favoriteModal = document.getElementById('favoriteModal');
const closeBtn = document.querySelector('.close');
const favoriteQuotesContainer = document.getElementById('favoriteQuotesContainer');

openModalLink.addEventListener('click', () => {
    // Afficher les citations favorites
    displayFavoriteQuotes();
    // Ouvrir la modale
    favoriteModal.style.display = 'block';
});

closeBtn.addEventListener('click', () => {
    // Fermer la modale
    favoriteModal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    // Fermer la modale si l'utilisateur clique en dehors de celle-ci
    if (event.target === favoriteModal) {
        favoriteModal.style.display = 'none';
    }
});

function displayFavoriteQuotes() {
    // Effacer le contenu actuel de la modale
    favoriteQuotesContainer.innerHTML = '';

    // Récupérer les identifiants des citations favorites depuis le localstorage
    let favoriteQuotesIds = JSON.parse(localStorage.getItem('favoriteQuotes')) || [];

    if (favoriteQuotesIds.length === 0) {
        // Aucune citation favorite trouvée, afficher "No quotes"
        let noQuotesDiv = document.createElement('div');
        noQuotesDiv.textContent = 'No quotes';
        favoriteQuotesContainer.appendChild(noQuotesDiv);
    } else {
    // Afficher les citations favorites
        favoriteQuotesIds.forEach(quoteId => {
            const quote = quotes.find(q => q.id === quoteId);
            if (quote) {
                let quoteDiv = document.createElement('div');
                quoteDiv.classList.add('quote-modal');

                quoteDiv.innerHTML =
                    `<div class=''>
                        <p class='title-quote-modal'>${quote.title}</p>
                        <p class=''>“${quote.content}”</p>
                    </div> 
                    <div class=''>
                        <p>- ${quote.author}</p>
                    </div>`;
                favoriteQuotesContainer.appendChild(quoteDiv);
            } 
        });
    }
}

function getQuotes() {
    //let randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    // console.table(randomQuote);
    //displayQuote(randomQuote);
    const quoteContainer = document.getElementById('quote-container')

    // Mélanger le tableau de citations
    const shuffledQuotes = quotes.slice().sort(() => Math.random() - 0.5);

    // Sélectionner 5 citations parmi les citations choisies aléatoirement
    const selectedQuotes = shuffledQuotes.slice(0, 5);
    
    quoteContainer.innerHTML = '';
    selectedQuotes.forEach(quote => {
        let quoteDiv = document.createElement('div');
        quoteDiv.classList.add('quote');
        
        quoteDiv.innerHTML = 
        `<div class='quote-text'>
            <p class='title'>${quote.title}</p>
            <p class='content'>“${quote.content}”</p>
        </div> 
        <div class='quote-author'>
            <p>- ${quote.author}</p>
        </div>
        <div class='heart' data-id='${quote.id}'>
            <i class='${favoriteQuotes.includes(quote.id) ? "fa-solid active" : "fa-regular"} fa-heart' title='Add favorite'></i>
        </div>
        `;
        quoteContainer.appendChild(quoteDiv);

        // Sélectionner l'icône "coeur" et ajouter un écouteur d'événement au clic
        const heartIcon = quoteDiv.querySelector('.heart');
        heartIcon.addEventListener('click', () => toggleFavorite(quote.id));
    })
}

function toggleFavorite(quoteId) {
    const heartIcon = document.querySelector(`.heart[data-id='${quoteId}'] i`);

    // Vérifier si la citation est déjà dans les favoris
    if (favoriteQuotes.includes(quoteId)) {
        // Retirer la citation des favoris
        favoriteQuotes = favoriteQuotes.filter(id => id !== quoteId);
        heartIcon.classList.remove('fa-solid');
        heartIcon.classList.add('fa-regular');
        heartIcon.classList.remove('active');
    } else {
        // Ajouter la citation aux favoris
        favoriteQuotes.push(quoteId);
        heartIcon.classList.add('fa-solid');
        heartIcon.classList.remove('fa-regular');
        heartIcon.classList.add('active');
    }

    // Mettre à jour le localstorage
    localStorage.setItem('favoriteQuotes', JSON.stringify(favoriteQuotes));
}

getQuotes();