import React, { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import Footer2 from '../component/Footer2'
import swal from 'sweetalert'
import axios from 'axios'
import MainLayout2 from '../layouts/MainLayout2'
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai'
const Homepage = () => {

  const [username, setUsername] = useState('');
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
    setUsername(value)
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
      username: username,
      password: password
    }
    axios.post("login-admin", data)
      .then(login => {
        if (login) {
          swal("Login Admin", "berhasil Login ya!", "success")
          localStorage.setItem('token', login.data.token)
          setNavigate(true)
        }
      })
      .catch((e) => setError(e.response.data.message))
  }
  return (
    <>
      <MainLayout2 >
        <div>
          {
            navigate && (
              <Navigate to="/pos" />
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
              <p className='text-Login'>Login POS ADMIN</p>
              <input type="input" placeholder='username' value={username} onChange={onChangeUsername} />
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
              <p className='text-login-admin'><Link to="/Register">klik untuk ke Halaman Daftar ADMIN</Link></p>
            </label>
          </form>
        </div>
      </MainLayout2 >
      <h1 className='text-header'>POS CAFE SEDERHANA</h1>
      <p className='text2'>Melakukan Pembayaran dengan Berbagai Menu Pilihan Lebih Mudah Dengan Menggunakan Pos.</p>
      <img className='picture' src="./POS.jpg" alt="" />
      <Footer2 />
    </>
  )
}

export default Homepage