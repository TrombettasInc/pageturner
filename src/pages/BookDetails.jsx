import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import BookCard from "./BookCard";
import { API_GO, API_KEY } from "../config/api"

function BookDetails() {
  const { id } = useParams();   // para chamar todos os paths do app
  const [books, setBooks] = useState(null);

  const getBooksDetails = async (url) => {
    const res = await fetch(url);
    const data = await res.json();

    setBooks(data);
  };

  useEffect(() => {
    const bookUrl = `${API_GO}/volumes/${id}?key=${API_KEY}`
    getBooksDetails(bookUrl)
  }, [])

  return (
    <>
      <div className="book-details-container">
        {books &&
          <>
            <BookCard book={books} showLink={false} />
            <p className="text-snippet">{books.searchInfo.textSnippet} </p>
          </>}
      </div>

      <div>
        <button>
        <Link to={`/create/${books.id}`} />
        </button>
      </div>
    </>
  )
}

export default BookDetails;