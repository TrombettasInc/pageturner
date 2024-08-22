import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import BookCard from "./BookCard";
import { API_GO, API_KEY } from "../config/api";
import './BookGrid.css';

function Search() {
  const [searchParams] = useSearchParams();
  const [books, setBooks] = useState([]);
  const query = searchParams.get("q"); // Get the search query from the URL

  const getSearchedBooks = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    setBooks(data.items);
    console.log(data);
  };

  useEffect(() => {
    if (query) {
      const searchWithGoogle = `${API_GO}/volumes?q=${query}${API_KEY}`;
      getSearchedBooks(searchWithGoogle);
    }
  }, [query]);

  return (
    <div className="books-container">
      <h2 className="title">
        Search result : <span className="query-text">{query}</span>
      </h2>
      {books.length === 0 && <p>Loading...</p>}
      {books.length > 0 && books.map((book) => (
        <div className="book-card" key={book.id}>
          <img
            src={
              book.volumeInfo && book.volumeInfo.imageLinks
                ? book.volumeInfo.imageLinks.thumbnail
                : ""
            }
            alt={book.volumeInfo ? book.volumeInfo.title : "No title available"}
          />
          <h2 className="book-title">{book.volumeInfo?.title || "No title available"}</h2>
          <p>"rating placeholder"</p>
          <a 
            href={`https://www.google.com/search?tbm=bks&q=${query}`} 
            target="_blank" 
            rel="noopener noreferrer"
          >
            Get it!
          </a>
        </div>
      ))}
    </div>
  );
}

export default Search;
