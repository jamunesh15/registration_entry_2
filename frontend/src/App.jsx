import React from 'react'
import { Route, Routes } from "react-router-dom";
import Home from './pages/Home';
import Addpeople from './pages/Addpeople';

const App = () => {

  return (
    <div className="min-h-screen bg-black">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addpeople" element={<Addpeople />} />
      </Routes>
    </div>
  )
}

export default App