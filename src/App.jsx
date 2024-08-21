
import { Route, Routes } from 'react-router-dom'

import './App.css'
import NavBar from './components/NavBar'
import MyBookDetails from './pages/MyBookDetails'
import HomePage from './pages/HomePage'
import Search from './pages/Search'
import CreateAReview from './pages/CreateAReview'
import EditAReview from './pages/EditAReview'

function App() {
  

  return (
    <>
    <NavBar/>

    <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="books/:bookId" element={<MyBookDetails/>} />
      <Route path="create-review/:bookId" element={<CreateAReview/>}/>
      <Route path="books/:bookId/edit-review/:reviewId" element={<EditAReview/>}/>
      <Route path="search" element={<Search/>} />
    </Routes>
  
    </>
  )
}

export default App
