import React from 'react'
import Footer2 from '../component/Footer2'
import Icon from '../component/Icon'
import Location from '../component/Location'
import MainLayout2 from '../layouts/MainLayout2'
const Contact = () => {
  return (
    <>
      <MainLayout2>
        <div className='grid-container'>
          <div className='grid-item2'>
            <p>Pesan POS :</p>
            <form>
              <label>
                <input type="text" placeholder='Nama anda' />
                <input type="text" placeholder='email anda' />
                <input type="text" placeholder='nomor telp anda' />
                <textarea placeholder='keterangan anda yang mau kirim pesan' id="" cols={30} rows={10}></textarea>
                <button type='submit'>Kirim</button>
              </label>
            </form>
          </div>
        </div>
      </MainLayout2>
      <img className='picture2' src="./POS1.jpg" alt="" />
      <Location />
      <Icon />
      <Footer2 />
    </>
  )
}

export default Contact