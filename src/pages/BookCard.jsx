import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import Rating from "../components/Rating";
import "./BookGrid.css";

function BookCard({ book, showLink = true }) {
  return (
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
      <p>
        <Rating value={book.volumeInfo?.rating || 0} /> {book.volumeInfo?.rating || "No rating"}
      </p>
      {showLink && <Link to={`/books/${book.id}`}>Details</Link>}
    </div>
  );
}

export default BookCard;
