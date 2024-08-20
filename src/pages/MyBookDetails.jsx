import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { API_URL } from "../config/api"
import BookCard from "./BookCard";
import './BookGrid.css'


function MyBookDetails() {

    const [books, setBooks] = useState(null);

    const { id } = useParams();

    const GetBook = () => {
        axios
            .get(`${API_URL}reviews/${id}`)
            .then((response) => {
                setBooks(response.data);
            })
            .catch((error) => console.log("error loading", error));
    }

    useEffect(() => {
        GetBook();
    }, [])

    return (
        <div>
            {books &&
                <>
                    <BookCard book={books} showLink={false} />
                    <p className="authors">{books.volumeInfo.authors}</p>
                    <p className="text-snippet">{books.searchInfo.textSnippet} </p>
                    <p className="category">{books.volumeInfo.categories}</p>
                    <p className="review">{books.review}</p>
                    <button className="button"> Create a review
                        <Link to={`create/${id}`} />
                    </button>

                </>}


        </div>
    )
}

export default MyBookDetails;


