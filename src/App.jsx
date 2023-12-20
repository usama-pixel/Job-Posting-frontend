import { useEffect, useState } from 'react'
import Signup from './pages/Signup'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Homepage from './pages/Homepage'
import JobCreation from './pages/JobCreation'
import { Footer, Navbar } from './features/header-footer'
import Chat from './pages/Chat'
import io from 'socket.io-client'
import Cookies from 'js-cookie'

function App() {
  // const [socket, setSocket] = useState(null)
  const socket = io('http://localhost:3001')
  // const socket = null
  // setSocket(newSocket)
  useEffect(() => {
    return () => {
      socket.disconnect()
    }
  },[])
  return (
    <>
    <Navbar socket={socket} />
    <Routes>
      <Route path='/signup' element={<Signup />} />
      <Route path='/login' element={<Login socket={socket} />} />
      <Route path='/home' element={<Homepage socket={socket} />} />
      <Route path='/job/create' element={<JobCreation />} />
      <Route path='/messages' element={<Chat socket={socket} />} />
      <Route path='*' element={<h1>Page Not Found</h1>} />
    </Routes>
    <Footer />
    </>
  )
}

export default App
