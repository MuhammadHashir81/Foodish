import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './Components/Layout';
import Cart from './Components/Cart';
import Home from './Components/Home';
import PaymentSuccess from './Components/PaymentSuccess';
import { GoogleOAuthProvider } from '@react-oauth/google';
import UserOrders from './Components/UserOrders';


function App() {
  const userJWT = localStorage.getItem('userJWT')
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;


  return (
    <div>
      <GoogleOAuthProvider clientId={googleClientId} >

      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout/>} >
          <Route index element={<Home/>} />
          <Route path='/cart' element={<Cart/>} />
          <Route path='/orders' element={<UserOrders/>} />
          </Route>
          <Route path='/payment-success' element={<PaymentSuccess/>}/>
        </Routes>
      </BrowserRouter>
      </GoogleOAuthProvider>
    </div>
  )
}

export default App

