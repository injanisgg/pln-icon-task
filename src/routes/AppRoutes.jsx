import React from 'react'
import { Routes, Route } from 'react-router-dom'
import DashboardPage from '../pages/DashboardPage'
import FormPage from '../pages/FormPage'

export default function AppRoutes() {
  return (
    <Routes>
        <Route path='/' element={<DashboardPage />}/>
        <Route path='/form' element={<FormPage />}/>
    </Routes>
  )
}
