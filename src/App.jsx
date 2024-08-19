import { useState } from 'react'
import { Link, Route, Routes } from 'react-router-dom'

import './App.css'
import NavBar from './components/NavBar'
import BookDetails from './pages/BookDetails'
import HomePage from './pages/HomePage'
import Search from './pages/Search'
import Create from './pages/Create'

function App() {
  

  return (
    <>
    <NavBar/>

    <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="books/:id" element={<BookDetails/>} />
      <Route path="search" element={<Search/>} />
      <Route path="/create" element={<Create/>} />
    </Routes>
  
    </>
  )
}

export default App
