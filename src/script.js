document.addEventListener('DOMContentLoaded', async function () {
  try {
    const categoriesResponse = await axios.get(
      'https://books-backend.p.goit.global/books/category-list'
    );
    const categories = categoriesResponse.data;
    console.log('Categories:', categories);
    renderCategories(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
  }

  try {
    const bestSellerBooksResponse = await axios.get(
      'https://books-backend.p.goit.global/books/top-books'
    );
    let bestSellerBooks = bestSellerBooksResponse.data;
    console.log('Best Seller Books:', bestSellerBooks);
    bestSellerBooks = bestSellerBooks.sort((a, b) => a.id - b.id);
    renderBestSellerBooks(bestSellerBooks);
  } catch (error) {
    console.error('Error fetching best seller books:', error);
  }
});

function renderCategories(categories) {
  const categoriesContainer = document.querySelector('.categories');
  if (categoriesContainer) {
    categoriesContainer.innerHTML = '';

    const titleElement = document.createElement('h2');
    titleElement.textContent = 'All Categories';
    categoriesContainer.appendChild(titleElement);

    categories.forEach(category => {
      const categoryElement = document.createElement('div');
      categoryElement.classList.add('category');
      categoryElement.textContent = category.list_name;
      categoriesContainer.appendChild(categoryElement);
    });
  } else {
    console.error('Categories container not found');
  }
}

function renderBestSellerBooks(categories) {
  const bestSellerBooksContainer = document.getElementById(
    'bestSellerBooksContainer'
  );
  if (bestSellerBooksContainer) {
    bestSellerBooksContainer.innerHTML = '';

    categories.forEach(category => {
      const categoryTitle = document.createElement('h3');
      categoryTitle.textContent = category.list_name;
      bestSellerBooksContainer.appendChild(categoryTitle);

      const booksList = document.createElement('ul');
      booksList.classList.add('books-list');

      category.books.forEach(book => {
        const bookItem = document.createElement('li');
        bookItem.classList.add('book-item');

        const bookImage = document.createElement('img');
        bookImage.classList.add('book-image');
        bookImage.src = book.book_image;
        bookImage.alt = book.title;
        bookItem.appendChild(bookImage);

        const bookDetails = document.createElement('div');
        bookDetails.classList.add('book-details');
        bookDetails.innerHTML = `
          <p><strong>${book.title}</strong></p>
          <p>${book.author}</p>
        `;
        bookItem.appendChild(bookDetails);

        booksList.appendChild(bookItem);
      });

      bestSellerBooksContainer.appendChild(booksList);
    });
  } else {
    console.error('Best Seller Books container not found');
  }
}
