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

function renderBookList(books) {
    const bookListElement = document.getElementById("book-list");
    if (!bookListElement)
        return;
    bookListElement.innerHTML = books
        .map((book) => `
          <div class="book-item" data-id="${book.id}">
            <img src="${book.coverImage || 'https://via.placeholder.com/150'}" alt="${book.title}" />
            <h2>${book.title}</h2>
            <p>${book.author}</p>
          </div>
        `)
        .join("");
    const bookItems = document.querySelectorAll(".book-item");
    bookItems.forEach((item) => item.addEventListener("click", () => {
        const bookId = Number(item.getAttribute("data-id"));
        const selectedBook = books.find((book) => book.id === bookId);
        console.log(selectedBook); 
        if (selectedBook)
            renderBookDetails(selectedBook);
    }));
}

function renderBookDetails(book) {
    const bookDetailsElement = document.getElementById("book-details");
    if (!bookDetailsElement)
        return;
    bookDetailsElement.style.display = "block";
    bookDetailsElement.innerHTML = `
        <h2>${book.title}</h2>
        <p><strong>Författare:</strong> ${book.author}</p>
        <p>${book.description}</p>
        <img src="${book.coverImage || 'https://via.placeholder.com/300'}" alt="${book.title}" />
      `;
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
