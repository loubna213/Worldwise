import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider } from 'react-router-dom';
import Homepage from './pages/Homepage'
import Product from './pages/Product'
import Pricing from './pages/Pricing'
import NotFound from './pages/NotFount'
import AppLayout from './pages/AppLayout'
import Login from './pages/Login'
import CityList from './components/CityList';
import CountryList from './components/CountryList';
import City from './components/City';
import Form from './components/Form';
import { CitiesProvider } from './contexts/CitiesContext';
import { AuthProvider } from './contexts/FakeAuthContext';
import ProtectedRoute from './pages/ProtectedRoute';


const App = () => {
  const router = createBrowserRouter(createRoutesFromElements(
    <Route path='/'>
      <Route index element={<Homepage/>}/>
      <Route path='Product' element={<Product/>}/>
      <Route path='Pricing' element={<Pricing/>}/>
      <Route path='Login' element={<Login/>}/>
      <Route path='App' element={<ProtectedRoute><AppLayout/></ProtectedRoute>}>
        <Route index element={<Navigate replace to='Cities'/>}/>
        <Route path='Cities' element={<CityList/>}/>
        <Route path='Cities/:id' element={<City/>}/>
        <Route path='Countries' element={<CountryList/>}/>
        <Route path='Form' element={<Form/>}/>
      </Route>
      <Route path='*' element={<NotFound/>}/>
    </Route>
  ))

  return (
    <AuthProvider>
      <CitiesProvider>
        <RouterProvider router={router}/>
      </CitiesProvider>
    </AuthProvider>
  )
}


const container = document.getElementById('root')
const root = ReactDOM.createRoot(container)
root.render(<App/>)