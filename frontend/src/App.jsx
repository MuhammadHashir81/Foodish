import { useState } from 'react'
import './App.css'
import Navbar from './Components/Navbar'
import Hero from './Components/Hero'
import AllFood from './Components/AllFood'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Navbar/>
      <Hero/>
      <AllFood/>
    </div>
  )
}

export default App
