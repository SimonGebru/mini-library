"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const API_URL = "https://my-json-server.typicode.com/zocom-christoffer-wallenberg/books-api/books";
// Hämta alla böcker
function fetchBooks() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(API_URL);
        if (!response.ok) {
            throw new Error("Failed to fetch books");
        }
        const data = yield response.json();
        console.log(data);
        return data;
    });
}
// Funktion för att visa overlay med bokinformation
function renderBookDetailsOverlay(book) {
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
    if (!overlay ||
        !overlayTitle ||
        !overlayAuthor ||
        !overlayDescription ||
        !overlayAudience ||
        !overlayPages ||
        !overlayYear ||
        !overlayPublisher ||
        !overlayBookItem ||
        !closeOverlay) {
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
function renderBookList(books) {
    const bookListElement = document.getElementById("book-list");
    if (!bookListElement)
        return;
    bookListElement.innerHTML = books
        .map((book) => `
          <div class="book-item" data-id="${book.id}" style="background-color: ${book.color};">
            <h2>${book.title}</h2>
            <p>${book.author}</p>
          </div>
        `)
        .join("");
    const bookItems = document.querySelectorAll(".book-item");
    bookItems.forEach((item) => item.addEventListener("click", () => {
        const bookId = Number(item.getAttribute("data-id"));
        const selectedBook = books.find((book) => book.id === bookId);
        if (selectedBook)
            renderBookDetailsOverlay(selectedBook);
    }));
}
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const books = yield fetchBooks();
            renderBookList(books);
        }
        catch (error) {
            console.error(error);
        }
    });
}
init();
