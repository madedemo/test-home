// localStorage.clear();

const API_URL_POPULAR = 'https://books-backend.p.goit.global/books/top-books';

// Create .books container in JavaScript
const container = document.querySelector('.container');
const booksEl = document.createElement('div');
booksEl.classList.add('books');
container.appendChild(booksEl);

getBooks(API_URL_POPULAR);

async function getBooks(url) {
  try {
    const response = await axios.get(url);
    const responseData = response.data;
    console.log('Response Data:', responseData);
    responseData.forEach(category => {
      renderCategory(category);
    });
  } catch (error) {
    console.error('Error fetching books:', error);
  }
}

function renderCategory(category) {
  const categoryContainer = document.createElement('div');
  categoryContainer.classList.add('category-container');
  const categoryEl = document.createElement('div');
  categoryEl.classList.add('category');
  categoryEl.textContent = category.list_name;
  categoryContainer.appendChild(categoryEl);
  const booksGroup = document.createElement('div');
  booksGroup.classList.add('books-group');
  for (let i = 0; i < 5; i++) {
    if (category.books[i]) {
      const book = category.books[i];
      renderBook(booksGroup, book);
    }
  }
  categoryContainer.appendChild(booksGroup);
  booksEl.appendChild(categoryContainer);
}

function renderBook(booksGroup, book) {
  const bookEl = document.createElement('div');
  bookEl.classList.add('book');
  bookEl.innerHTML = `
    <div class="book__cover-inner">
      <img src="${book.book_image}" />
      <div class="book__cover--darkened"></div>
    </div>
    <div class="book__info">
      <div class="book__title">${book.title}</div>
      <div class="book__author">${book.author}</div>
    </div>
  `;
  booksGroup.appendChild(bookEl);

  const bookCoverInner = bookEl.querySelector('.book__cover-inner');
  bookCoverInner.addEventListener('click', () => openBookModal(book._id));
}

//modal
const modalEl = document.querySelector('.modal');

async function openBookModal(bookId) {
  try {
    const bookUrl = `https://books-backend.p.goit.global/books/${bookId}`;
    const response = await fetch(bookUrl);
    const bookData = await response.json();

    modalEl.classList.add('modal--show');
    document.body.classList.add('stop-scrolling');

    modalEl.innerHTML = `
      <div class="modal__card">
        <img class="modal__book-cover" src="${bookData.book_image}" alt="">
        <h2>
          <span class="modal__book-title">${bookData.title}</span>
          <span class="modal__book-author"> - ${bookData.author}</span>
        </h2>
        <button type="button" class="modal__button-action">${
          isBookInCart(bookData) ? 'Delete from shopping' : 'Add to shoping'
        }</button>
        <button type="button" class="modal__button-close">Закрыть</button>
      </div>
    `;

    const btnAction = document.querySelector('.modal__button-action');
    btnAction.addEventListener('click', () => {
      if (isBookInCart(bookData)) {
        removeFromCart(bookData);
        btnAction.textContent = 'Rem book';
      } else {
        addToCart(bookData);
        btnAction.textContent = 'Add book';
      }
    });

    const btnClose = document.querySelector('.modal__button-close');
    btnClose.addEventListener('click', () => closeModal());
  } catch (error) {
    console.error('Error fetching book details:', error);
  }
}

function closeModal() {
  modalEl.classList.remove('modal--show');
  document.body.classList.remove('stop-scrolling');
}

function getCart() {
  return JSON.parse(localStorage.getItem('cart')) || [];
}

function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function isBookInCart(book) {
  const cart = getCart();
  return cart.some(
    item => item.title === book.title && item.author === book.author
  );
}

function removeFromCart(book) {
  let cart = getCart();
  cart = cart.filter(
    item => !(item.title === book.title && item.author === book.author)
  );
  saveCart(cart);
  console.log('book removed:', book.title);
}

function addToCart(book) {
  let cart = getCart();
  cart.push(book);
  saveCart(cart);
  console.log('book added:', book.title);
}

console.log('shoping:', getCart());
