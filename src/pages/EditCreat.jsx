import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../config/api";
import { useNavigate, useParams } from "react-router-dom";
import "./Create.css"


function EditCreat() {
    const [review, setReview] = useState("");
    const [rating, setRating] = useState("");
    const [name, setName] = useState("");

    const navigate = useNavigate();
    const { id: bookId } = useParams();

    useEffect(() => {
        axios.get(`${API_URL}/${bookId}`) 
            .then(response => {
                setReview(response.data.review)
                setRating(response.data.rating)
                setName(response.data.name)
            })
            .catch(e => console.log(e))

    }, [bookId])

    const handleFormSubmit = (e) => {
        e.preventDefault();

        const newEditReview = {
            review: review,
            rating: rating,
            reviewName: name
        }

        axios.put(`${API_URL}/${bookId}`, {
            ...book,
            volumeInfo: {
              ...book.volumeInfo,
              userReviews: newEditReview
            }
          })
            .then(response => {
                navigate(`/reviews/${bookId}`);
            })
            .catch(e => console.log("error updating review", e))
    }

    const deleteReview = () => {
        axios.delete(`${API_URL}/${bookId}`)
            .then(response => {
                navigate("/reviews");
            })
            .catch(e => console.log("error deleting rewview", e))
    }


    return (
        <div className="EditReview">
            <h3>Edit Review</h3>
            <form onSubmit={handleFormSubmit} >

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

               <button type="submit">Update review</button>

            </form>

            <button onClick={deleteReview}>Delete Review</button>
        </div>

    )
}

export default EditCreat;