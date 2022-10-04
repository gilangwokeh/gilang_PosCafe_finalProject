import React, { useState } from 'react'
import MainLayout3 from '../layouts/MainLayout3'
import axios from 'axios'
import swal from 'sweetalert'
import { Link, Navigate } from 'react-router-dom'
import Footer2 from '../component/Footer2'
const AddProduct = () => {
  const [name, setName] = useState([])
  const [price, setPrice] = useState([])
  const [image, setImage] = useState([])
  const [error, setError] = useState('')
  const [error2, setError2] = useState('')
  const [error3, setError3] = useState('')
  const [navigate, setNavigate] = useState(false);
  const handleSend = async (e: any) => {
    e.preventDefault()
    const _user = {
      name: name,
      price: price,
      image: image,
    }
    if (name.length <= 0) {
      setError('name produk kosong')
    }
    if (price.length <= 0) {
      setError2('harga produk kosong')
    }
    if (image.length <= 0) {
      setError3('gambar url kosong')
    }
    const urlPost = "addProduct"
    await axios.post(urlPost, _user)
      .then((add) => {
        if (add) {
          swal("tambah produk", "tambah produk berhasil!", "success")
          setNavigate(true)
        }
      })
      .catch((e) => console.log("product failed create"));
  }
  const onChangeName = (e: any) => {
    const value = e.target.value
    setName(value)
    setError('')
  }
  const onChangePrice = (e: any) => {
    const value = e.target.value
    setPrice(value)
    setError2('')
  }
  const onChangeImage = (e: any) => {
    const value = e.target.value
    setImage(value)
    setError3('')
  }
  const token = localStorage.getItem('token')
  if (!token) {
    return <Navigate to="/" />
  }
  return (
    <>
      <MainLayout3>
        <div>
          {
            navigate && (
              <Navigate to="/pos2" />
            )
          }
        </div>
        <form className='addProduct'>
          <label>
            <h1>Formulir Tambah Produk</h1>
            <input type="input" placeholder='nama produk' value={name} onChange={onChangeName} />
            {
              error && (
                <p className='error-text-name'>{error}</p>
              )
            }
            <input type="number" placeholder='harga produk' value={price} onChange={onChangePrice} />
            {
              error2 && (
                <p className='error-text-price'>{error2}</p>
              )
            }
            <input type="input" placeholder='Link url gambar' value={image} onChange={onChangeImage} />
            {
              error3 && (
                <p className='error-text-image'>{error3}</p>
              )
            }
            <button className='btn btn-primary' id="btn-add" onClick={handleSend}>kirim</button>
            <Link to="/pos2"><button className='btn btn-primary' id="btn-add2">Kembali</button></Link>
          </label>
        </form>
      </MainLayout3>
      <Footer2 />
    </>
  )
}

export default AddProduct