import { Book } from './interface.js'; // Anpassa sökvägen till där interfacet finns

const API_URL = "https://my-json-server.typicode.com/zocom-christoffer-wallenberg/books-api/books";

export async function fetchBooks(): Promise<Book[]> {
    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error("Failed to fetch books");
    }
    const data: Book[] = await response.json();
    console.log(data);
    return data;
}