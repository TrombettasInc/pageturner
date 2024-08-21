import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../config/api";
import "./CreateAReview.css"
import { useParams } from "react-router-dom";


function CreateAReview() {

  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [name, setName] = useState("");

  const navigate = useNavigate();
  const { id: bookId } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newReview = {
      review: review,
      rating: rating,
      reviewName: name,
    };

    // get the array of reviews for a specific book//
    axios.get(`${API_URL}/${bookId}`)
      .then(response => {
        const book = response.data;
        const updatedReviews = [...book.volumeInfo.userReviews, newReview];

        // Update the book with the new review//
        return axios.put(`${API_URL}/${bookId}`, {
          ...book,
          volumeInfo: {
            ...book.volumeInfo,
            userReviews: updatedReviews
          }
        });
      })
      .then(() => {
        navigate(`/books/${bookId}`);
      })
      .catch(e => console.error("Error updating reviews", e));
  }


  return (
    <div className="create-review-container">

      <form onSubmit={handleSubmit} className="create-review-form">
        <h2>Add a new Review</h2>

        <label>
          Your Name:
          <input
            type="text"
            name="name"
            placeholder="enter your name"
            value={name}
            onChange={(e) => { setName(e.target.value) }}
          />
          <br />
          Rating:
          <input
            type="number"
            name="rating"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            required
          />
          <br />
          Review:
          <input className="review-text"
            type="text"
            name="title"
            placeholder="enter your review"
            value={review}
            onChange={(e) => { setReview(e.target.value) }}
          />

        </label>

        <button >Create</button>
      </form>
    </div>
  )
}

export default CreateAReview;