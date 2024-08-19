import { Link }from "react-router-dom";
import {FaStar} from "react-icons/fa";

import "./BookGrid.css"

function BookCard ({book, showLink=true}) {
    

    return (
    <div className="book-card" key={book.id}>
     <img src={book.image} alt={book.bookTitle} />
     
      <h2 className="book-title">{book.bookTitle}</h2>
      <p>
        <FaStar /> {book.rating}
      </p>
      {showLink && <Link to={`/reviews/${book.id}`} >Details</Link>}
    </div>


    )
  
}
  
  export default BookCard;