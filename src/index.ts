interface Book {
    id: number;
    title: string;
    author: string;
    color: string;
    description?: string; 
    audience?: string; 
    pages?: number; 
    year?: number; 
    publisher?: string; 
    plot?: string;
  }
  
  const API_URL = "https://my-json-server.typicode.com/zocom-christoffer-wallenberg/books-api/books";
  
  // Hämta alla böcker
  async function fetchBooks(): Promise<Book[]> {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Failed to fetch books");
    }
    const data: Book[] = await response.json();
    console.log(data);
    return data;
  }
  
  // Funktion för att visa overlay med bokinformation
function renderBookDetailsOverlay(book: Book): void {
    const overlay = document.getElementById("book-overlay");
    const overlayTitle = document.getElementById("overlay-title");
    const overlayAuthor = document.getElementById("overlay-author");
    const overlayDescription = document.getElementById("overlay-description");
    const overlayAudience = document.getElementById("overlay-audience");
    const overlayPages = document.getElementById("overlay-pages");
    const overlayYear = document.getElementById("overlay-year");
    const overlayPublisher = document.getElementById("overlay-publisher");
    const overlayBookItem = document.getElementById("overlay-book-item");
    const closeOverlay = document.getElementById("close-overlay");
  
    
    if (
      !overlay ||
      !overlayTitle ||
      !overlayAuthor ||
      !overlayDescription ||
      !overlayAudience ||
      !overlayPages ||
      !overlayYear ||
      !overlayPublisher ||
      !overlayBookItem ||
      !closeOverlay
    ) {
      console.error("Overlay-element saknas i DOM.");
      return;
    }
  
    
    overlayTitle.textContent = book.title;
    overlayAuthor.textContent = `By ${book.author}`;
    overlayDescription.textContent = book.plot || "No description available.";
    overlayAudience.textContent = book.audience || "Unknown audience";
    overlayPages.textContent = book.pages ? `${book.pages}` : "N/A";
    overlayYear.textContent = book.year ? `${book.year}` : "N/A";
    overlayPublisher.textContent = book.publisher || "Unknown publisher";
  
    overlayBookItem.style.backgroundColor = book.color;
  
    
    overlay.classList.add("visible");
  
    
    closeOverlay.addEventListener("click", () => {
      overlay.classList.remove("visible");
    });
  
    overlay.addEventListener("click", (event) => {
      if (event.target === overlay) {
        overlay.classList.remove("visible");
      }
    });
  }
  
 
  function renderBookList(books: Book[]): void {
    const bookListElement = document.getElementById("book-list");
    if (!bookListElement) return;
  
    bookListElement.innerHTML = books
      .map(
        (book) => `
          <div class="book-item" data-id="${book.id}" style="background-color: ${book.color};">
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
        if (selectedBook) renderBookDetailsOverlay(selectedBook);
      })
    );
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