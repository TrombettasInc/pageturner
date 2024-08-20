import { useState } from 'react'
import { Link, Route, Routes } from 'react-router-dom'

import './App.css'
import NavBar from './components/NavBar'
import MyBookDetails from './pages/MyBookDetails'
import HomePage from './pages/HomePage'
import Search from './pages/Search'
import Create from './pages/Create'

function App() {
  

  return (
    <>
    <NavBar/>

    <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="reviews/:id" element={<MyBookDetails/>} />
      <Route path="create/:id" element={<Create/>}/>
      <Route path="search" element={<Search/>} />
    </Routes>
  
    </>
  )
}

export default App
