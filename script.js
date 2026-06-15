// Seleção de Elementos
const bookForm = document.querySelector('#book-form');
const booksContainer = document.querySelector('#books-container');
const stars = document.querySelectorAll('.star');
const statusButtons = document.querySelectorAll('.status-btn');
const synopsisTextarea = document.querySelector('#book-synopsis');
const searchInput = document.querySelector('#search-book');
const counterCards = document.querySelectorAll('.counter-card');

// Elementos dos Contadores
const countTotalEl = document.querySelector('#count-total');
const countCompletedEl = document.querySelector('#count-completed');
const countReadingEl = document.querySelector('#count-reading');
const countNotStartedEl = document.querySelector('#count-not-started');

// Variáveis de Controle
let selectedRating = 0;
let selectedStatus = 'not-started'; 
let currentFilter = 'all'; 
let editId = null; 
let books = []; 

// Configuração Inicial ao carregar a página
loadBooksFromStorage();
updateStatusSelection(selectedStatus);

// Crescimento Automático Prático do Textarea
synopsisTextarea.addEventListener('input', function() {
    this.style.height = 'auto';
    this.style.height = this.scrollHeight + 'px';
});

// Clique nas Estrelas (Cadastro)
stars.forEach(function(star) {
    star.addEventListener('click', function() {
        selectedRating = parseInt(star.getAttribute('data-value'));
        
        // Acende ou apaga as estrelas com base no clique
        stars.forEach(function(s) {
            const starValue = parseInt(s.getAttribute('data-value'));
            if (starValue <= selectedRating) {
                s.classList.add('active');
            } else {
                s.classList.remove('active');
            }
        });
    });
});

// Clique nos Botões de Status (Formulário)
statusButtons.forEach(function(button) {
    button.addEventListener('click', function() {
        selectedStatus = button.getAttribute('data-status');
        updateStatusSelection(selectedStatus);
    });
});

function updateStatusSelection(status) {
    statusButtons.forEach(function(button) {
        if (button.getAttribute('data-status') === status) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
}

// Clique nos Contadores Superiores (Filtros)
counterCards.forEach(function(card) {
    card.addEventListener('click', function() {
        counterCards.forEach(function(c) { c.classList.remove('active'); });
        card.classList.add('active');

        currentFilter = card.getAttribute('data-filter');
        renderBooks();
    });
});

// Digitação na Barra de Pesquisa
searchInput.addEventListener('input', function() {
    renderBooks();
});

// Envio do Formulário (Adicionar / Salvar Edição)
bookForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const title = document.querySelector('#book-title').value;
    const author = document.querySelector('#book-author').value;
    const synopsis = synopsisTextarea.value || 'Sem sinopse disponível.';
    const coverUrl = document.querySelector('#book-cover').value;

    if (editId !== null) {
        // Lógica Simples de Edição: procura o item na lista e altera os dados
        for (let i = 0; i < books.length; i++) {
            if (books[i].id === editId) {
                books[i].title = title;
                books[i].author = author;
                books[i].synopsis = synopsis;
                books[i].coverUrl = coverUrl;
                books[i].status = selectedStatus;
                books[i].rating = selectedRating;
            }
        }
        document.querySelector('#btn-add').textContent = 'Adicionar Livro';
        editId = null;
    } else {
        // Lógica Simples de Criação: cria o objeto e joga no array
        const newBook = {
            id: Date.now().toString(),
            title: title,
            author: author,
            synopsis: synopsis,
            coverUrl: coverUrl,
            status: selectedStatus,
            rating: selectedRating
        };
        books.push(newBook);
    }

    saveBooksToStorage();
    renderBooks();

    // Reseta o formulário
    bookForm.reset();
    synopsisTextarea.style.height = 'auto';
    selectedRating = 0;
    selectedStatus = 'not-started';
    updateStatusSelection(selectedStatus);
    stars.forEach(function(s) { s.classList.remove('active'); });
});

// Desenha a Lista de Livros na Tela
function renderBooks() {
    booksContainer.innerHTML = ''; 
    const searchQuery = searchInput.value.toLowerCase().trim();

    // Loops tradicionais 'for' para facilitar o entendimento lógico
    for (let i = 0; i < books.length; i++) {
        const book = books[i];

        // Regras simples de filtragem (Passa para o próximo item se não bater com o filtro)
        if (currentFilter !== 'all' && book.status !== currentFilter) {
            continue; 
        }
        if (searchQuery !== '' && !book.title.toLowerCase().includes(searchQuery)) {
            continue; 
        }

        const card = document.createElement('article');
        card.classList.add('book-card');

        // Cria o texto das estrelas
        let starsString = '';
        for (let s = 1; s <= 5; s++) {
            starsString += (s <= book.rating) ? '&#9733;' : '&#9734;';
        }

        // Rótulo amigável do status
        let labelText = 'Não Lido';
        if (book.status === 'completed') labelText = 'Lido';
        if (book.status === 'reading') labelText = 'Em Andamento';

        // Lógica Simples do "Ver mais" para Sinopses Grandes (maiores que 100 letras)
        const isLong = book.synopsis.length > 100;
        const shortSynopsis = isLong ? book.synopsis.substring(0, 100) + '...' : book.synopsis;

        card.innerHTML = `
            <img src="${book.coverUrl}" alt="Capa">
            <span class="status-badge badge-${book.status}">${labelText}</span>
            <h3>${book.title}</h3>
            <p class="author">Por: ${book.author}</p>
            <p class="synopsis">${shortSynopsis}</p>
            ${isLong ? '<button class="btn-toggle-synopsis">Ver mais</button>' : ''}
            <p class="rating-result">${starsString}</p>
            <div class="card-actions">
                <button class="btn-edit">Editar</button>
                <button class="btn-delete">Remover</button>
            </div>
        `;

        // Ação do Botão "Ver mais / Ver menos"
        if (isLong) {
            const toggleBtn = card.querySelector('.btn-toggle-synopsis');
            const synopsisPara = card.querySelector('.synopsis');
            toggleBtn.addEventListener('click', function() {
                if (toggleBtn.textContent === 'Ver mais') {
                    synopsisPara.textContent = book.synopsis;
                    toggleBtn.textContent = 'Ver menos';
                } else {
                    synopsisPara.textContent = shortSynopsis;
                    toggleBtn.textContent = 'Ver mais';
                }
            });
        }

        // Ação do Botão Remover
        card.querySelector('.btn-delete').addEventListener('click', function() {
            // Remove o item da lista lógica
            const newBooksList = [];
            for (let j = 0; j < books.length; j++) {
                if (books[j].id !== book.id) {
                    newBooksList.push(books[j]);
                }
            }
            books = newBooksList;
            saveBooksToStorage();
            renderBooks();
        });

        // Ação do Botão Editar
        card.querySelector('.btn-edit').addEventListener('click', function() {
            document.querySelector('#book-title').value = book.title;
            document.querySelector('#book-author').value = book.author;
            synopsisTextarea.value = book.synopsis;
            document.querySelector('#book-cover').value = book.coverUrl;
            
            synopsisTextarea.style.height = synopsisTextarea.scrollHeight + 'px';
            
            selectedStatus = book.status;
            updateStatusSelection(selectedStatus);
            
            selectedRating = book.rating;
            stars.forEach(function(s) {
                if (parseInt(s.getAttribute('data-value')) <= selectedRating) {
                    s.classList.add('active');
                } else {
                    s.classList.remove('active');
                }
            });

            document.querySelector('#btn-add').textContent = 'Salvar Alterações';
            editId = book.id; 

            if (window.innerWidth < 1024) {
                bookForm.scrollIntoView({ behavior: 'smooth' });
            }
        });

        booksContainer.appendChild(card);
    }

    updateCounters();
}

// Atualiza os Números do Painel Superior
function updateCounters() {
    let t = 0, c = 0, r = 0, n = 0;
    for (let i = 0; i < books.length; i++) {
        t++;
        if (books[i].status === 'completed') c++;
        if (books[i].status === 'reading') r++;
        if (books[i].status === 'not-started') n++;
    }
    countTotalEl.textContent = t;
    countCompletedEl.textContent = c;
    countReadingEl.textContent = r;
    countNotStartedEl.textContent = n;
}

// Persistência no LocalStorage
function saveBooksToStorage() {
    localStorage.setItem('readboxd_books', JSON.stringify(books));
}

function loadBooksFromStorage() {
    const stored = localStorage.getItem('readboxd_books');
    if (stored) {
        books = JSON.parse(stored);
        renderBooks();
    }
}
