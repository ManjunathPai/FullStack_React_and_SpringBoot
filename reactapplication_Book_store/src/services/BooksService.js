import axios from "axios";

const BOOKS_API_BASE_URL = "http://localhost:8080/api/v1/books";
const BOOKS_API_SAVE_URL = "http://localhost:8080/api/v1/save";
const BOOKS_API_GETBOOKBYID_URL = "http://localhost:8080/api/v1/getBook/";
const BOOKS_API_UPDATE_BOOK_URL = "http://localhost:8080/api/v1/update/";
const BOOKS_API_DELETE_BOOK_URL = "http://localhost:8080/api/v1/delete/";

class BookService{

    getBooks(){
        return axios.get(BOOKS_API_BASE_URL);
    }

    saveBook(book){
        return axios.post(BOOKS_API_SAVE_URL,book);
    }

    getBookById(bookid){
        return axios.get(BOOKS_API_GETBOOKBYID_URL+bookid);
    }

    update(bookid,book){
        return axios.put(BOOKS_API_UPDATE_BOOK_URL+bookid,book);
    }

    delete(bookid){
        return axios.delete(BOOKS_API_DELETE_BOOK_URL+bookid);
    }
}

export default new BookService()