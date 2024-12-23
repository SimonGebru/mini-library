
import { Book } from "./interface.js";
import { fetchBooks } from "./api.js";
import { renderBookDetailsOverlay, renderBookList } from "./render.js";
import { addSearchFunctionality } from "./search.js";

 
export let books: Book[] = [];

async function init(): Promise<void> {
  try {
    books = await fetchBooks();
    renderBookList(books);
    addSearchFunctionality(); // sökfunktionen
  } catch (error) {
    console.error(error);
  }
}


init();