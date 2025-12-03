import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import AboutUS from './pages/AboutUs'
import Services from './pages/Services'
import Highlights from './pages/Highlights'
import Contact from './pages/Contact'
import Navbar from './components/layout/Navbar'

const App = () => {
  return(
    <>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/work" element={<Home/>}/>
      <Route path="/about" element={<AboutUS/>}/>
      <Route path="/services" element={<Services/>}/>
      <Route path="/highlights" element={<Highlights/>}/>
      <Route path="/contact" element={<Contact/>}/>
    </Routes>
    </>
  )
}

export default App