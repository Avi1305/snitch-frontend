import React, { useEffect } from 'react'
import { RouterProvider } from 'react-router'
import router from './app.routes'
import './App.css'
import { useAuth } from '../features/auth/hooks/useAuth'
import { useSelector } from 'react-redux'
const App = () => {

  const user = useSelector(state=>state.auth.user);
  console.log(user);

  const {handleGetMe} = useAuth()
  useEffect(() => {
    handleGetMe()
  }, [] )
  return (
    <RouterProvider router={router} />
  )
}

export default App