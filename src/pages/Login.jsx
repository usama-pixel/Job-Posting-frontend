import React from 'react'
import LoginForm from '../features/authentication/components/LoginForm'

function Login({ socket }) {
  return (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
      <LoginForm socket={socket} />
    </div>
  )
}

export default Login