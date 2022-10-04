import React from 'react'
import { NavLink } from 'react-router-dom'
import { ToastContainer, } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
type Props = {
  children: React.ReactNode
}
const MainLayout3 = ({ children }: Props) => {
  return (
    <>
      <header>
        <nav className="navbar bg-dark">
          <div className="container">
            <NavLink to="/HomeSuperAdmin" className="navbar-brand">Keluar</NavLink>
            <NavLink to="/Users" className="navbar-brand">user</NavLink>
            <NavLink to="/pos2" className="navbar-brand">Halaman Super Admin</NavLink>
          </div>
        </nav>
        <span className='target'></span>
      </header>
      <main>
        <div className='container mt-3'>
          {children}
        </div>
        <ToastContainer />
      </main>
    </>
  )
}

export default MainLayout3