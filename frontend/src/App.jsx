import { useState } from 'react'
import './App.css'
import Navbar from './Components/Navbar'
import Foodish from './Components/Foodish'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Navbar/>
      <Foodish/>
    </div>
  )
}

export default App
