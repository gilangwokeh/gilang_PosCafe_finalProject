import React from 'react'
import { NavLink } from 'react-router-dom'
import { ToastContainer, } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
type Props = {
  children: React.ReactNode
}
const MainLayout = ({ children }: Props) => {

  const logout = async (e: any) => {
    localStorage.clear()
  }
  return (
    <>
      <header>
        <nav className="navbar bg-dark">
          <div className="container">
            <NavLink to="/" className="navbar-brand" onClick={logout}>Keluar</NavLink>
            <NavLink to="/HomeSuperAdmin" className='navbar-brand' >Login Super Admin</NavLink>
            <NavLink to="/pos" className="navbar-brand">Halaman Admin</NavLink>
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

export default MainLayout
