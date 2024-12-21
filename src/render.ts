import { Book } from "./interface.js";
export function renderBookDetailsOverlay(book: Book): void {
    const overlay = document.getElementById("book-overlay");
    const overlayTitle = document.getElementById("overlay-title");
    const overlayAuthor = document.getElementById("overlay-author");
    const overlayDescription = document.getElementById("overlay-description");
    const overlayAudience = document.getElementById("overlay-audience");
    const overlayPages = document.getElementById("overlay-pages");
    const overlayYear = document.getElementById("overlay-year");
    const overlayPublisher = document.getElementById("overlay-publisher");
    const overlayBookCover = document.getElementById("overlay-book-cover") as HTMLImageElement;
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
      !overlayBookCover ||
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
  
    // Ställ in rätt bokomslag
    overlayBookCover.src = `Cover/${book.id}.jpg`; 
    overlayBookCover.alt = `${book.title} cover`;
  
  
    
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
  
 
  export function renderBookList(books: Book[]): void {
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