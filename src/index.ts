interface Book {
    id: number;
    title: string;
    author: string;
    description: string;
    coverImage?: string; 
  }
  
  const API_URL = "https://my-json-server.typicode.com/zocom-christoffer-wallenberg/books-api/books";
  
  
  async function fetchBooks(): Promise<Book[]> {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Failed to fetch books");
    }
    const data: Book[] = await response.json();
    console.log(data); 
    return data;
  }
  
  
  function renderBookList(books: Book[]): void {
    const bookListElement = document.getElementById("book-list");
    if (!bookListElement) return;
  
    bookListElement.innerHTML = books
      .map(
        (book) => `
          <div class="book-item" data-id="${book.id}">
            <img src="${book.coverImage || 'https://via.placeholder.com/150'}" alt="${book.title}" />
            <h2>${book.title}</h2>
            <p>${book.author}</p>
          </div>
        `
      )
      .join("");
  
    const bookItems = document.querySelectorAll(".book-item");
    bookItems.forEach((item) =>
      item.addEventListener("click", () => {
        const bookId = Number(item.getAttribute("data-id"));
        const selectedBook = books.find((book) => book.id === bookId);
        console.log(selectedBook); 
        if (selectedBook) renderBookDetails(selectedBook);
      })
    );
  }
  
  
  function renderBookDetails(book: Book): void {
    const bookDetailsElement = document.getElementById("book-details");
    if (!bookDetailsElement) return;
  
    bookDetailsElement.style.display = "block";
    bookDetailsElement.innerHTML = `
        <h2>${book.title}</h2>
        <p><strong>Författare:</strong> ${book.author}</p>
        <p>${book.description}</p>
        <img src="${book.coverImage || 'https://via.placeholder.com/300'}" alt="${book.title}" />
      `;
  }
  
  
  async function init(): Promise<void> {
    try {
      const books = await fetchBooks();
      renderBookList(books);
    } catch (error) {
      console.error(error);
    }
  }
  
  init();