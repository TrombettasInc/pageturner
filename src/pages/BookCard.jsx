import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import "./BookGrid.css";

function BookCard({ book, showLink = true }) {

  const calculateAverageRating = (reviews) => {
    if (!reviews || reviews.length === 0) return "0";
    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    return (total / reviews.length).toFixed(1); // Round to 1 decimal place
  };

  const averageRating = calculateAverageRating(book.volumeInfo?.userReviews);
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
      <h2 className="book-title">{book.volumeInfo?.title || "0"}</h2>
      <p className="books-container div svg">
        <FaStar/> {averageRating}
      </p>
      {showLink && <Link to={`/books/${book.id}`}>Details</Link>}
    </div>
  );
}

export default BookCard;
