import { useEffect, useState } from 'react'
import Signup from './pages/Signup'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Homepage from './pages/Homepage'
import JobCreation from './pages/JobCreation'
import { Footer, Navbar } from './features/header-footer'
import Chat from './pages/Chat'

function App() {
  const [count, setCount] = useState(0)
  return (
    <>
    <Navbar />
      <Routes>
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/home' element={<Homepage />} />
        <Route path='/job/create' element={<JobCreation />} />
        <Route path='/messages' element={<Chat />} />
        <Route path='*' element={<h1>Page Not Found</h1>} />
      </Routes>
    <Footer />
    </>
  )
}

export default App
