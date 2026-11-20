import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home_Page from './Home_Page'

function App() {
  

  return (
    <>

    <BrowserRouter> 

    <Routes>

      <Route path="/" element={<Home_Page />} />

      

    </Routes>
    
    
    
    
    </BrowserRouter>
      
    </>
  )
}

export default App
