import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from '../Home/Home.jsx'
import Add from '../Add/Add.jsx'

function App() {
 

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/add" element={<Add/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
