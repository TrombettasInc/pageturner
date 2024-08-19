import React from "react";
import {FaSistrix, FaBook} from "react-icons/fa"
import {Link} from "react-router-dom"

function NavBar (){
    return(
        <nav id="navbar">
      <h2>
        <Link to="/">
        <FaBook/> My Books</Link>
      </h2>
      <form>
        <input type="text" placeholder="Search Book" />
        <button type="submit">
        <FaSistrix/>
        </button>
      </form>
    </nav>

    )
}

export default NavBar;