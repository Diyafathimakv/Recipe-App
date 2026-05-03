import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Login from './Pages/Auth/Login/App'
import SignUp from './Pages/Auth/Signup/App'
const App = () => {
  return (
    <div>
      
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
      </Routes>
    </div>
  )
}

export default App
