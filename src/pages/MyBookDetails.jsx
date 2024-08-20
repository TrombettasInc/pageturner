import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { API_URL } from "../config/api"
import BookCard from "./BookCard";
import './BookGrid.css'


function MyBookDetails() {

    const [review, setReview] = useState(null);

    const { id } = useParams();

    const GetBook = () => {
        axios
            .get(`${API_URL}reviews/${id}`)
            .then((response) => {
                setReview(response.data);
            })
            .catch((error) => console.log("error loading", error));
    }

    useEffect(() => {
        GetBook();
    }, [])

    return (
        <div>
            {review &&
                <>
                    <BookCard book={review} showLink={false} />
                    <p className="authors">{review.volumeInfo.authors}</p>
                    <p className="text-snippet">{review.searchInfo.textSnippet} </p>
                    <p className="category">{review.volumeInfo.categories}</p>
                    <p className="review">{review.review}</p>
                    <button className="button"> Create a review
                        <Link to={`/create/${review.id}`} />
                    </button>
                </>}


        </div>
    )
}

export default MyBookDetails;