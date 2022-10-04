import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { ToastContainer, } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import './navbar.css'
type Props = {
  children: React.ReactNode
}
const MainLayout2 = ({ children }: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <nav className='Navbar' >
        <span className='nav-logo'><img src="./icon-pos2.png" alt="" width={50} height={50} /></span>
        <div className={`nav-items ${isOpen && 'open'}`} >
          <NavLink to="/" >Login Admin</NavLink>
          <NavLink to="/Register" >Pendaftaran Admin</NavLink>
          <NavLink to="/Contact" className="navbar-brand">Kontak</NavLink>
          <NavLink to="/About" className="navbar-brand">Tentang</NavLink>
        </div>
        <div className={`nav-toggle ${isOpen && 'open'}`} onClick={() => setIsOpen(!isOpen)}>
          <div className='bar'></div>
        </div>
      </nav>
      <main>
        <div className='container mt-3'>
          {children}
        </div>
        <ToastContainer />
      </main>
    </>
  )
}

export default MainLayout2