import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { API_URL } from "../config/api"
import BookCard from "./BookCard";
import './BookGrid.css'


function MyBookDetails() {

    const [books, setBooks] = useState(null);
    const [review, setReview] = useState(null);

    const { bookId, reviewId } = useParams();


    const GetBook = () => {
        axios
            .get(`${API_URL}/${bookId}`)
            .then((response) => {
                setBooks(response.data);
                setReview(response.data.volumeInfo.userReviews)

            })
            .catch((error) => console.log("error loading", error));

    }

    useEffect(() => {
        GetBook();

    }, [bookId, reviewId])



    return (
        <div>
            {books && review && (
                <>
                    <BookCard book={books} showLink={false} />
                    <div className="review-info">
                        <p className="authors"><strong>Authors:</strong> {books.volumeInfo.authors}</p>
                        <p className="text-snippet"><strong>Description:</strong> {books.searchInfo.textSnippet} </p>
                        <p className="category"><strong>Genre:</strong> {books.volumeInfo.categories}</p>
                    </div>

                    <div className="reviews-box">

                        <h4>Top Reviews:</h4>
                        {books.volumeInfo.userReviews && books.volumeInfo.userReviews.length > 0 ? (
                            books.volumeInfo.userReviews.map((element, index) => (
                                <div key={index} className="reviews-container">
                                    <p>{element.review}</p>
                                    <p><strong>Reviewed by:</strong> {element.reviewName}</p>
                                    <p><strong>Rating:</strong> {element.rating}</p>

                                    <Link to={`/books/${bookId}/edit-review/${element.id}`}>
                                        <button className="review-button">Edit review</button>

                                    </Link>
                                </div>
                            ))
                        ) : (
                            <p>No reviews yet.</p>
                        )}
                    </div>
                    <Link to={`/create-review/${books.id}`}>
                        <button className="create-button">Create a review</button>
                    </Link>

                </>
            )}
        </div>
    );

}

export default MyBookDetails;


