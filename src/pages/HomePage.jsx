import { useState, useEffect } from "react";
import axios from "axios";
import BookCard from "./BookCard";
import { API_URL } from "../config/api";

import "./BookGrid.css"

function HomePage() {

  const [books, setBooks] = useState([]);

  const getBooks = () => {
    axios
      .get(API_URL)
      .then((response) => {
        setBooks(response.data)
      })
      .catch((error) => console.log(error));

  };

  useEffect(() => {
    getBooks();
  }, [])

  return (
    <div className="books-container">
     {books.length === 0 && <p>Loading...</p> }
     {books.length > 0 && books.map((book)=> <BookCard key={books.id} book={book}/>)}
    </div>
    
  )
}

export default HomePage;


