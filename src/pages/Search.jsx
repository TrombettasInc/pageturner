import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import BookCard from "./BookCard";
import { API_GO, API_KEY } from "../config/api"
import './BookGrid.css'


function Search() {
  const [searchParams] = useSearchParams()
  
  const [books, setBooks] = useState([]);
  const query = searchParams.get("q"); // para saber que esta procurando tal livro

  const getSearchedBooks = async (url) => {
  const res = await fetch(url);
  const data = await res.json();

  setBooks(data.items);
  console.log(data);

  };

  useEffect(() => {
    const searchWithGoogle = `${API_GO}/volumes?q=${query}${API_KEY}`;

    getSearchedBooks(searchWithGoogle);
  }, [query])
  

    return (
      <div className="books-container">
        <h2 className="title">
          Search result : <span className="query-text">{query}</span>
        </h2>
      {books.length === 0 && <p>Loading...</p> }
      {books.length > 0 && books.map((book)=> <BookCard key={books.id} book={book}/>)}
     </div>
    )
  }
  
  export default Search;