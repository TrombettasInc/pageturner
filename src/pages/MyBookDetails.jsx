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
            .get(`${API_URL}/${id}`)
            .then((response) => {
                setBooks(response.data);
            })
            .catch((error) => console.log("error loading", error));
    }

    useEffect(() => {
        GetBook();
    }, [])

    console.log(books)

    return (
        <div>
            {books &&
                <>
                    <BookCard book={books} showLink={false} />
                    <p className="authors">Authors: {books.volumeInfo.authors}</p>
                    <p className="text-snippet">Description: {books.searchInfo.textSnippet} </p>
                    <p className="category">Genre: {books.volumeInfo.categories}</p>
                    <p className="review">Current Review: {books.volumeInfo.review}</p>
                    <p className="review-name">reviewed by: {books.volumeInfo.reviewName}</p>
                    <button className="button"> Create a review
                        <Link to={`/create/${books.id}`} />
                    </button>

                </>}


        </div>
    )
}

export default MyBookDetails;


