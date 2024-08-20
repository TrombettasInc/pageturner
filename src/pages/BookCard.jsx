import { Link }from "react-router-dom";
import {FaStar} from "react-icons/fa";

import "./BookGrid.css"

function BookCard ({book, showLink=true}) {
    

    return (
    <div className="book-card" key={book.id}>
     <img src={book.volumeInfo.imageLinks === undefined
        ? ""
        : `${book.volumeInfo.imageLinks.thumbnail}`
  } alt={book.volumeInfo.title} />
     
      <h2 className="book-title">{book.volumeInfo.title}</h2>
      <p>
        <FaStar /> {book.rating}
      </p>
      {showLink && <Link to={`/reviews/${book.id}`} >Details</Link>}
    </div>


    )
  
}
  
  export default BookCard;