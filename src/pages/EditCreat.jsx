import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../config/api";
import { useNavigate, useParams } from "react-router-dom";
import "./Create.css"


function EditCreat() {
    const [review, setReview] = useState("");
    const [rating, setRating] = useState(0);
    const [name, setName] = useState("");
    const [originalReview, setOriginalReview] = useState(null);

    const navigate = useNavigate();
    const { id: bookId } = useParams();
    const { reviewId: reviewId } = useParams()

    useEffect(() => {
        axios.get(`${API_URL}/${bookId}`) 
        .then(response => {
            const book = response.data;
            // carrega o formulario com os dados que ja existem 
            const existingReview = book.volumeInfo.userReviews[0];;
            if (existingReview) {
                setOriginalReview(existingReview.review)
                setReview(existingReview.review);
                setRating(existingReview.rating);
                setName(existingReview.reviewName);
            }
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
            navigate(`/reviews/${bookId}`);
        })
        .catch(e => console.log("Error updating review", e));
    }

    const deleteReview = (reviewToDelete) => {
        axios.get(`${API_URL}/${bookId}`)
            .then(response => {
                const book = response.data;
                const updatedReviews = book.volumeInfo.userReviews.filter(review => review.review !== reviewToDelete);
    
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
                navigate(`/reviews/${bookId}`);
            })
            .catch(error => {
                console.error("Error deleting the review", error);
            });
    };


    return (
        <div className="create-review-container">
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