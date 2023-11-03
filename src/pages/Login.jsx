import React from 'react'
import LoginForm from '../features/authentication/components/LoginForm'

function Login() {
  return (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
      <LoginForm />
    </div>
  )
}

export default Login