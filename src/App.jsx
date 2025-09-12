import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import AppRoutes from './routes/AppRoutes'
import SideBar from './components/SideBar';

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Navbar onOpen={() => setIsOpen(true)}/>
      <SideBar isOpen={isOpen} onClose={() => setIsOpen(false)}/>
        
      <AppRoutes />
    </>
  )
}

export default App
