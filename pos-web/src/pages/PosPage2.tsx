import React, { useEffect, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import MainLayout3 from '../layouts/MainLayout3';
import MoonLoader from "react-spinners/MoonLoader";
import swal from 'sweetalert'
import axios from 'axios'
import Footer2 from '../component/Footer2';
const PosPage2 = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [products, setProducts] = useState([])
  const fectProduct = async () => {
    setIsLoading(true);
    const result = await axios.get('product')
    setProducts(await result.data)
    setIsLoading(false)
  }
  const deleteProduct = async (_id: string) => {
    swal("Product", "berhasil di hapus!", "success")
    await fetch(`${_id}`, {
      method: 'DELETE'
    })
      .then((result: any) => {
        result.json()
          .then((res: any) => {
            console.warn(res)
            setIsLoading(true)
            setTimeout(() => {
              fectProduct();
            }, 4000);
          })
      })
  }
  useEffect(() => {
    setIsLoading(true)
    setTimeout(() => {
      fectProduct();
    }, 4000);
  }, [])
  const token = localStorage.getItem('token')
  if (!token) {
    return <Navigate to="/" />
  }
  return (
    <>
      <MainLayout3>
        <button className='btn-add3'><Link to="/AddProduct"><img src="./addProduct.png" alt="addProduct" width={20} height={20} /> Tambah Produk</Link></button>
        <br /><br />
        <div className='row'>
          <div className='col-lg-8'>
            {isLoading ? <div>
              <MoonLoader
                color={'black'}
                className='IsLoading'
                loading={isLoading}
                size={100} />
              <p className='textLoading'>Sedang Memuat...</p>
            </div>
              : <div className='row'>
                {products.map((product: any, key: any) =>
                  <div key={key} className='col-lg-4'>
                    <button type='submit' className='btn-product' onClick={() => deleteProduct(product._id)}>x</button>
                    <button type='submit' className='btn-product2'><Link to={"/EditProduct/" + product._id}><img src="./editProduct.png" alt="edit" width={10} height={10} /></Link></button>
                    <div className='pos-item px-3 text-center border'>
                      <p className='text-product'>{product.name}</p>
                      <img src={product.image} className="img-fluid" alt={product.name} />
                      <p className='text-price'>Rp {product.price}</p>
                    </div>
                  </div>
                )}
              </div>}
          </div>
        </div>
      </MainLayout3>
      <Footer2 />
    </>
  )
}

export default PosPage2