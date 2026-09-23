import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Dashboard } from '../pages/Dashboard'
import { Computadores } from '../pages/Computadores'

export const AppRoutes = () => {
  return (
    <Routes >
        <Route path='/'  element={<Dashboard />}/>
        <Route path='/computadores' element={<Computadores />} />
    </Routes>
  )
}
