import { useState } from 'react'

import './App.css'
import AuthLayout from './components/auth/AuthLayout'
import { Route, Routes } from 'react-router-dom'
import ProductsLayout from './components/products/ProductsLayout'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<AuthLayout />} />
        <Route path='/products' element={<ProductsLayout />} />
      </Routes>
    </>
  )
}

export default App
