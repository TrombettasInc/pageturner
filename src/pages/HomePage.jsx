import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const booksUrl = "https://pageturner.adaptable.app"

function HomePage() {

  
  const [books, setBooks] = useState([]);



  const getBooks = () => {
    axios
      .get(`${booksUrl}/reviews`)
      .then((response) => {
        setBooks(response.data)
      })
      .catch((error) => console.log(error));

  };


  useEffect(() => {
    getBooks();
  }, [])

  return (
    <div className="ProjectListPage">

      {books.map((element) => {
        return (
          <div className="books-container" key={books.id} >
            <Link to={`/reviews/${element.id}`}>
              <h3>{element.bookTitle}</h3>
            </Link>
          </div>
        );
      })}

    </div>
  )
}

export default HomePage;


