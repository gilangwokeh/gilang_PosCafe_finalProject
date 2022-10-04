import React from 'react'
import Footer2 from '../component/Footer2'
import MainLayout2 from '../layouts/MainLayout2'
import { Link } from 'react-router-dom'

const About = () => {
  return (
    <>
      <MainLayout2>
        <form className='form-about'>
          <label>
            <p className="animate__animated animate__zoomIn animate__delay-1s" id='text-about'>Secara sederhana, Point of Sales atau POS merupakan sistem yang mendukung transaksi penjualan, seperti misalnya di supermarket, restoran, atau kafe. Pada umumnya sistem POS ini akan digandengkan dengan komputer atau cash register (mesin kasir).</p>
            <p className="animate__animated animate__zoomIn animate__delay-1s" id='text-about2'>Namun sekarang ini POS juga sudah bisa digunakan pada tablet, baik yang berbasis sistem operasi android maupun windows. Dan hal ini juga jauh lebih ringkas karena bisa meminimalisir tempat dan terlihat lebih rapih karena tanpa kabel yang berserakan, dan cara pemakaian cukup mudah.</p>
            <button className="animate__animated animate__pulse animate__delay-2s animate__infinite	infinite"><Link to="/">Kembali Halaman utama</Link></button>
          </label>
        </form>
      </MainLayout2>
      <img className='picture' src="./POS.jpg" alt="" />
      <Footer2 />
    </>
  )
}

export default About