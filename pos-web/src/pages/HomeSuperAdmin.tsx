import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import Footer2 from '../component/Footer2'
import axios from 'axios'
import swal from 'sweetalert'
import MainLayout from '../layouts/MainLayout'
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai'
const HomeSuperAdmin = () => {
  const [superAdmin, setSuperAdmin] = useState('');
  const [password, setPassword] = useState("");
  const [navigate, setNavigate] = useState(false);
  const [error, setError] = useState('')
  const [state, setState] = useState(false)
  const toggleBtn = (e: any) => {
    e.preventDefault();
    setState(prevState => !prevState)
  }
  const onChangeUsername = (e: any) => {
    const value = e.target.value
    setSuperAdmin(value)
    setError('')
  }
  const onChangePassword = (e: any) => {
    const value = e.target.value
    setPassword(value)
    setError('')
  }
  const submitLogin = (e: any) => {
    e.preventDefault();
    const data = {
      username: superAdmin,
      password: password
    }
    axios.post("login-super-admin", data)
      .then(login => {
        if (login) {
          swal("Login Super Admin", "berhasil Login ya!", "success")
          localStorage.setItem('token', login.data.token)
          setNavigate(true)
        }
      })
      .catch((e) => setError(e.response.data.message))
  }
  const token = localStorage.getItem('token')
  if (!token) {
    return <Navigate to="/" />
  }
  return (
    <>
      <MainLayout >
        <div>
          {
            navigate && (
              <Navigate to="/pos2" />
            )
          }
        </div>
        <div className="animate__animated animate__backInDown animate__delay-0.52s animate__slow 10s" id='layout-login'>
          <form className='login'>
            {
              error && (
                <p className='error'>{error}</p>
              )
            }
            <label>
              <p className='text-Login-super-admin'>Login POS SUPER ADMIN</p>
              <input type="input" placeholder='username' value={superAdmin} onChange={onChangeUsername} />
              <input type={state ? "text" : "password"} placeholder='kata sandi' required value={password} onChange={onChangePassword} />
              <button aria-label='button' className='btn-aiOut' onClick={toggleBtn}>
                {
                  state ?
                    <AiOutlineEye />
                    : <AiOutlineEyeInvisible />
                }
              </button>
              <button className='btn btn-dark' id='btn-Login' onClick={submitLogin}>Login</button>
              <p className='text-login2'>kamu tidak mempunyai akun ?</p>
              <p className='text-login-super-admin2'>Daftar SUPER ADMIN : <button className='btn-klik'><a href='https://wa.me/6289631119809?text=Saya%20ingin%20daftar%20Super%20Admin%20Mas?'>KLIK</a></button></p>
            </label>
          </form>
        </div>
      </MainLayout >
      <h1 className='text-header'>POS CAFE SEDERHANA</h1>
      <p className='text2'>Melakukan Pembayaran dengan Berbagai Menu Pilihan Lebih Mudah Dengan Menggunakan Pos.</p>
      <img className='picture' src="./POS.jpg" alt="" />
      <Footer2 />
    </>
  )
}

export default HomeSuperAdmin