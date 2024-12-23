var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { fetchBooks } from "./api.js";
import { renderBookList } from "./render.js";
import { addSearchFunctionality } from "./search.js";
export let books = [];
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            books = yield fetchBooks();
            renderBookList(books);
            addSearchFunctionality(); // sökfunktionen
        }
        catch (error) {
            console.error(error);
        }
    });
}
init();
