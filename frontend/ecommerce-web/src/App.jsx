import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import MainLayout from './MainLayout'
import HomeAppliances from './pages/HomeAppliances'
import AudioVideo from './pages/AudioVideo'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<MainLayout />} >
          <Route index element={<HomePage />} />
          <Route path='home-appliances' element={<HomeAppliances />} />
          <Route path='audio-video' element={<AudioVideo />} />
        </Route>
      </Routes>
    </>
  )
}


export default App
