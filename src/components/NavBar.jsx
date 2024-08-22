import React from "react";
import {FaSistrix, FaBook} from "react-icons/fa"
import {Link, useNavigate} from "react-router-dom"
import "./NavBar.css"
import { useState } from "react";

function NavBar (){

    const [search, setSearch]= useState("");
    const navigate = useNavigate(); // para navegar na search//
    const handleSubmit = (e)=>{
        e.preventDefault()

        if(!search)return;

        navigate(`/search?q=${search}`);
        setSearch("");
    }

    return(
      <>
        <nav id="navbar">
      <h2>
        <Link to="/">
        <FaBook/> PageTurner </Link>
      </h2>
      <form onSubmit={handleSubmit}>
        <input type="text" 
        placeholder="Get inspired" 
        onChange={(e)=>setSearch(e.target.value)}
        value={search} // permite manipular o valor do search de acordo com o state //
        
        />
        <button type="submit">
        <FaSistrix/>
        </button>
      </form>
    </nav>
    <div className="header-image">
    <img src='/src/imgs/bookshelf2.png' alt="Header Background" />
  </div>
  </>

    )
}

export default NavBar;