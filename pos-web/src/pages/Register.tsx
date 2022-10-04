import React, { useState } from 'react'
import Footer2 from '../component/Footer2'
import { Link, Navigate } from 'react-router-dom'
import axios from 'axios'
import swal from 'sweetalert'
import MainLayout2 from '../layouts/MainLayout2'
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai'
const Register = () => {
  const [user, setUser] = useState("")
  const [password, setPassword] = useState("")
  const [state, setState] = useState(false)
  const [error, setError] = useState('')
  const [error2, setError2] = useState('')
  const [navigate, setNavigate] = useState(false);
  const toggleBtn = (e: any) => {
    e.preventDefault();
    setState(prevState => !prevState)
  }
  const handleSend = async (e: any) => {
    e.preventDefault()
    const _user = {
      username: user,
      password: password,
    }
    if (!user) {
      setError('username anda kosong')
    }
    if (user.length >= 20) {
      setError('isi username anda lebih dari 20 kata')
    }
    if (!password) {
      setError2('password anda kosong')
    }
    const urlPost = "register-admin"
    await axios.post(urlPost, _user)
      .then((res) => {
        swal("Daftar", "berhasi! Daftar", "success");
        setNavigate(true)
      })
      .catch((e) => console.log("register gagal"));
  }
  const onChangeUser = (e: any) => {
    const value = e.target.value
    setUser(value)
    setError('')
  }
  const onChangePassword = (e: any) => {
    const value = e.target.value
    setPassword(value)
    setError2('')
  }
  return (
    <>
      <MainLayout2 >
        <div>
          {
            navigate && (
              <Navigate to="/" />
            )
          }
        </div>
        <div className="animate__animated animate__backInRight animate__delay-0.52s animate__slow 10s" id='layout-register'>
          <form className='register'>
            <label>
              <p className='text-register2'>Pendaftaran POS ADMIN</p>
              <input type="input" placeholder='username' value={user} onChange={onChangeUser} />
              {
                error && (
                  <p className='error2'>{error}</p>
                )
              }
              <input type={state ? "text" : "password"} placeholder='kata sandi' value={password} onChange={onChangePassword} />
              {
                error2 && (
                  <p className='error3'>{error2}</p>
                )
              }
              <button name="aiout" aria-label='button' className='btn-aiOut' onClick={toggleBtn}>
                {
                  state ?
                    <AiOutlineEye />
                    : <AiOutlineEyeInvisible />
                }
              </button>
              <button className='btn btn-dark' id='btn-register' onClick={handleSend}>Kirim</button>
              <p className='text-register3'>kamu Sudah mempunyai akun ? </p>
              <p className='test-register-admin'><Link to="/">klik untuk ke Halaman Login ADMIN</Link></p>
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

export default Register