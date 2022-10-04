import React, { useEffect, useState } from 'react'
import MainLayout3 from '../layouts/MainLayout3'
import axios from 'axios'
import swal from 'sweetalert'
import { Navigate, Link, useParams } from 'react-router-dom'
import Footer2 from '../component/Footer2'
const EditProduct = () => {
  const [name, setName] = React.useState('')
  const [price, setPrice] = React.useState('')
  const [image, setImage] = React.useState('')
  const [navigate, setNavigate] = useState(false);
  const params = useParams();
  useEffect(() => {
    getProductDetails()
  }, [])
  const getProductDetails = async () => {
    let result = await axios.get(`http://localhost:8000/api/users//getIdproduct/${params.id}`);
    setName(result.data.name)
    setPrice(result.data.price)
    setImage(result.data.image)
  }
  const updateProduct = async (e: any) => {
    e.preventDefault()
    try {
      const _product = {
        name: name,
        price: price,
        image: image,
      }
      await axios.put(`http://localhost:8000/api/users/${params.id}`, _product)
        .then((Edit) => {
          if (Edit) {
            swal("Edit produk", "Edit produk berhasil!", "success")
            setNavigate(true)
          }
        });
    } catch (error) {
      console.log(error)
    }
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
            <p className='change-product'>Formulir edit produk</p>
            <input type="input" placeholder='nama produk' value={name} onChange={(e) => { setName(e.target.value) }} />
            <input type="number" placeholder='harga produk' value={price} onChange={(e) => { setPrice(e.target.value) }} />
            <input type="input" placeholder='Link url gambar' value={image} onChange={(e) => { setImage(e.target.value) }} />
            <button className='btn btn-primary' id="btn-add" onClick={updateProduct}>kirim</button>
            <Link to="/pos2"><button className='btn btn-primary' id="btn-add3">Kembali</button></Link>
          </label>
        </form>
      </MainLayout3>
      <Footer2 />
    </>
  )
}

export default EditProduct