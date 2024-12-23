import { Book } from "./interface.js"; 
import { renderBookList } from "./render.js"; 
import { fetchBooks } from "./api.js";

import { books } from "./index.js";

export function addSearchFunctionality(): void {
    const searchInput = document.getElementById("search-input") as HTMLInputElement;
    const searchButton = document.getElementById("search-button") as HTMLButtonElement;
  
    if (!searchInput || !searchButton) {
      console.error("Sökelementen kunde inte hittas i DOM.");
      return;
    }
  
    const handleSearch = (): void => {
      const query = searchInput.value.trim().toLowerCase();
      if (!query) {
        alert("Vänligen ange en boktitel att söka efter.");
        return;
      }
  
      const filteredBooks = books.filter((book) =>
        book.title.toLowerCase().includes(query)
      );
  
      if (filteredBooks.length > 0) {
        renderBookList(filteredBooks);
      } else {
        alert("Ingen bok matchar din sökning.");
      }
    };
  
    
    searchButton.addEventListener("click", handleSearch);
  
    
    searchInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        handleSearch();
      }
    });
  }