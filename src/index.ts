
import { Book } from "./interface.js";
import { fetchBooks } from "./api.js";
import { renderBookDetailsOverlay, renderBookList } from "./render.js";

 
  async function init(): Promise<void> {
    try {
      const books = await fetchBooks();
      renderBookList(books);
    } catch (error) {
      console.error(error);
    }
  }
  
  init();