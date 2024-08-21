import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../config/api";
import { useNavigate, useParams } from "react-router-dom";
import "./EditAReview.css"


function EditAReview() {
    const [review, setReview] = useState("");
    const [rating, setRating] = useState(0);
    const [name, setName] = useState("");
    const [originalReview, setOriginalReview] = useState(null);

    const navigate = useNavigate();
    const { bookId, reviewId } = useParams();
   

    useEffect(() => {
        axios.get(`${API_URL}/${bookId}`)
            .then(response => {
                const book = response.data;
                // Find the existing review by its ID
                const existingReview = book.volumeInfo.userReviews.find(r => r.id === parseInt(reviewId));
                if (existingReview) {
                    setOriginalReview(existingReview.review);
                    setReview(existingReview.review);
                    setRating(existingReview.rating);
                    setName(existingReview.reviewName);
                }
            })
            .catch(e => console.log("Error loading review", e));
    }, [bookId, reviewId]);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        

        const newEditReview = {
            review: review,
            rating: rating,
            reviewName: name
        }

        axios.get(`${API_URL}/${bookId}`)
        .then(response => {
            const book = response.data;
            const updatedReviews = book.volumeInfo.userReviews.map(r => 
                r.review === originalReview ? newEditReview : r
            );

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
        .catch(e => console.log("Error updating review", e));
    }

    const deleteReview = (reviewToDelete) => {
        axios.get(`${API_URL}/${bookId}`)
            .then(response => {
                const book = response.data;
                
                const updatedReviews = book.volumeInfo.userReviews.filter(review => review.review !== reviewToDelete);
                console.log("Updated reviews array:", updatedReviews);
    
                return axios.put(`${API_URL}/${bookId}`, {
                    ...book,
                    volumeInfo: {
                        ...book.volumeInfo,
                        userReviews: updatedReviews
                    }
                });
            })
            .then(() => {
                console.log("Review deleted successfully");
                navigate(`/books/${bookId}`);
            })
            .catch(error => {
                console.error("Error deleting the review", error);
            });
    };


    return (
        <div className="edit-review-container">
            
            <form onSubmit={handleFormSubmit} className="edit-review-form">
            <h2>Edit Review</h2>
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
               <button  onClick={deleteReview}>Delete Review</button>

            </form>

            
        </div>

    )
}

export default EditAReview;