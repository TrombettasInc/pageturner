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
    const [bookData, setBookData] = useState(null);
    

    const navigate = useNavigate();
    const { bookId, reviewId } = useParams();


    useEffect(() => {
        console.log("Received reviewId from params:", reviewId);
        axios.get(`${API_URL}/${bookId}`)
            .then(response => {
                const book = response.data;
                setBookData(book);

                console.log("Book Data:", book);
                console.log("User Reviews:", book.volumeInfo.userReviews);

                // Find the existing review by its ID
                const existingReview = book.volumeInfo.userReviews.find(r => r.id === parseInt(reviewId));

               
                console.log("Existing Review:", existingReview);
                if (existingReview) {
                    setOriginalReview(existingReview.review);
                    setReview(existingReview.review);
                    setRating(existingReview.rating);
                    setName(existingReview.reviewName);
                    
                }
                else {
                    console.error("Review not found"); // **para ver se a review nao foi encontrada**
                }
            })
            .catch(e => console.log("Error loading review", e));
    }, [bookId, reviewId]);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        
        if (!bookData) { // **Added check for bookData being null**
            console.error("Book data not loaded");
            return;
        }

        const newEditReview = {
            review: review,
            rating: rating,
            reviewName: name,
        }

        const updatedReviews = bookData.volumeInfo.userReviews.map(r =>
            r.review === originalReview ? newEditReview : r
        );

        axios.put(`${API_URL}/${bookId}`, {
            
            ...bookData,
            volumeInfo: {
                ...bookData.volumeInfo,
                userReviews: updatedReviews
            }
        })
            .then(() => {
                navigate(`/books/${bookId}`);
            })
            .catch(e => console.log("Error updating review", e));
    }

    const deleteReview = () => {
        
        if (!bookData) { // **Added check for bookData being null**
            console.error("Book data not loaded");
            return;
        }
        
        const updatedReviews = bookData.volumeInfo.userReviews.filter(review => review.review !== originalReview);

        axios.put(`${API_URL}/${bookId}`, {
            ...bookData,
            volumeInfo: {
                ...bookData.volumeInfo,
                userReviews: updatedReviews
            }
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

            <form onSubmit={handleFormSubmit} className="edit-review-form" >
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

                <button type="submit" >Update review</button>
                <button type= "button" onClick={deleteReview} >Delete Review</button>

            </form>


        </div>

    )
}

export default EditAReview;