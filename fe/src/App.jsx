import './App.css'
import AuthLayout from './components/auth/AuthLayout'
import { Navigate, Route, Routes } from 'react-router-dom'
import ProductsLayout from './components/products/ProductsLayout'
import ProductsPage from './components/products/ProductsPage'
import HomePage from './components/products/HomePage'
import ProfilePage from './components/products/ProfilePage'

function App() {
  return (
    <Routes>
      <Route path='/' element={<AuthLayout />} />
      <Route element={<ProductsLayout />}>
        <Route path='/home' element={<HomePage />} />
        <Route path='/products' element={<ProductsPage />} />
        <Route path='/profile' element={<ProfilePage />} />
      </Route>
      <Route path='*' element={<Navigate to='/' replace />} />
    </Routes>
  )
}

export default App
