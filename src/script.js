// При загрузке документа запускаем асинхронную функцию
document.addEventListener('DOMContentLoaded', async function () {
  try {
    // Запрос на получение списка категорий книг
    const categoriesResponse = await axios.get(
      'https://books-backend.p.goit.global/books/category-list'
    );
    // Получаем данные о категориях книг из ответа
    const categories = categoriesResponse.data;
    console.log('Categories:', categories);
    // Рендерим список категорий
    renderCategories(categories);

    // Добавляем обработчик события клика на каждую категорию
    const categoryElements = document.querySelectorAll('.category');
    categoryElements.forEach(category => {
      // При клике на категорию получаем название и вызываем функцию фильтрации книг
      category.addEventListener('click', async () => {
        const categoryName = category.textContent.trim();
        try {
          // Запрос на получение книг выбранной категории
          const categoryBooksResponse = await axios.get(
            `https://books-backend.p.goit.global/books/category?category=${categoryName}`
          );
          // Получаем данные о книгах из ответа
          const categoryBooks = categoryBooksResponse.data;
          console.log(`Books in category "${categoryName}":`, categoryBooks);
          // Рендерим книги выбранной категории
          renderCategoryBooks(categoryBooks);
        } catch (error) {
          console.error(
            `Error fetching books for category "${categoryName}":`,
            error
          );
        }
      });
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
  }

  try {
    // Запрос на получение списка лучших книг
    const bestSellerBooksResponse = await axios.get(
      'https://books-backend.p.goit.global/books/top-books'
    );
    // Получаем данные о лучших книгах из ответа
    let bestSellerBooks = bestSellerBooksResponse.data;
    console.log('Best Seller Books:', bestSellerBooks);
    // Сортируем список лучших книг по id
    bestSellerBooks = bestSellerBooks.sort((a, b) => a.id - b.id);
    // Рендерим список лучших книг
    renderBestSellerBooks(bestSellerBooks);
  } catch (error) {
    console.error('Error fetching best seller books:', error);
  }
});

// Функция для рендеринга списка категорий книг
function renderCategories(categories) {
  const categoriesContainer = document.querySelector('.categories');
  if (categoriesContainer) {
    categoriesContainer.innerHTML = '';

    // Создаем заголовок для списка категорий
    const titleElement = document.createElement('h2');
    titleElement.textContent = 'All Categories';
    categoriesContainer.appendChild(titleElement);

    // Для каждой категории создаем элемент и добавляем его в контейнер
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

// Функция для рендеринга списка лучших книг
function renderBestSellerBooks(categories) {
  const bestSellerBooksContainer = document.getElementById(
    'bestSellerBooksContainer'
  );
  if (bestSellerBooksContainer) {
    bestSellerBooksContainer.innerHTML = '';

    // Для каждой категории создаем контейнер и добавляем его на страницу
    categories.forEach(category => {
      const categoryContainer = document.createElement('div'); // Создание контейнера для категории
      categoryContainer.classList.add('books-category-container');

      // Создаем заголовок категории и добавляем его в контейнер
      const categoryTitle = document.createElement('h3');
      categoryTitle.textContent = category.list_name;
      categoryTitle.classList.add('books-category-title');
      categoryContainer.appendChild(categoryTitle);

      // Создаем список книг и добавляем его в контейнер
      const booksList = document.createElement('ul');
      booksList.classList.add('books-list');

      // Для каждой книги в категории создаем элемент списка и добавляем его в список
      category.books.forEach(book => {
        const bookItem = document.createElement('li');
        bookItem.classList.add('books-item');

        // Создаем изображение книги и добавляем его в элемент списка
        const bookImage = document.createElement('img');
        bookImage.classList.add('books-image');
        bookImage.src = book.book_image;
        bookImage.alt = book.title;
        bookItem.appendChild(bookImage);

        // Создаем блок с информацией о книге и добавляем его в элемент списка
        const bookDetails = document.createElement('div');
        bookDetails.classList.add('book-details');
        bookDetails.innerHTML = `
          <p><strong>${book.title}</strong></p>
          <p>${book.author}</p>
        `;
        bookItem.appendChild(bookDetails);

        // Добавляем элемент списка в список книг
        booksList.appendChild(bookItem);
      });

      // Добавляем список книг в контейнер категории
      categoryContainer.appendChild(booksList);
      // Добавляем контейнер категории на страницу
      bestSellerBooksContainer.appendChild(categoryContainer);
    });
  } else {
    console.error('Best Seller Books container not found');
  }
}

// Функция для рендеринга списка книг выбранной категории
function renderCategoryBooks(books) {
  const categoryBooksContainer = document.getElementById(
    'bestSellerBooksContainer'
  );
  if (categoryBooksContainer) {
    categoryBooksContainer.innerHTML = '';

    // Создаем список книг и добавляем его на страницу
    const booksList = document.createElement('ul');
    booksList.classList.add('books-list');

    // Для каждой книги в списке создаем элемент списка и добавляем его в список
    books.forEach(book => {
      const bookItem = document.createElement('li');
      bookItem.classList.add('books-item');

      // Создаем изображение книги и добавляем его в элемент списка
      const bookImage = document.createElement('img');
      bookImage.classList.add('books-image');
      bookImage.src = book.book_image;
      bookImage.alt = book.title;
      bookItem.appendChild(bookImage);

      // Создаем блок с информацией о книге и добавляем его в элемент списка
      const bookDetails = document.createElement('div');
      bookDetails.classList.add('book-details');
      bookDetails.innerHTML = `
        <p><strong>${book.title}</strong></p>
        <p>${book.author}</p>
      `;
      bookItem.appendChild(bookDetails);

      // Добавляем элемент списка в список книг
      booksList.appendChild(bookItem);
    });

    // Добавляем список книг в контейнер
    categoryBooksContainer.appendChild(booksList);
  } else {
    console.error('Category Books container not found');
  }
}
