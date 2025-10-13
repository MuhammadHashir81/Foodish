import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './Components/Layout';
import Cart from './Components/Cart';
import Home from './Components/Home';

function App() {
  const userJWT = localStorage.getItem('userJWT')

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout/>} >
          <Route index element={<Home/>} />
          <Route path='/cart' element={<Cart/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App

