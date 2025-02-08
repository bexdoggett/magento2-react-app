import { useState } from 'react'
import Header from './components/Header';
import Category from './components/Category';
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header/>
      <Category/>
    </>
  )
}

export default App
