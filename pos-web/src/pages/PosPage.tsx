import React, { useRef, useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import MoonLoader from "react-spinners/MoonLoader";
import axios from 'axios'
import { toast } from 'react-toastify';
import { useReactToPrint } from 'react-to-print';
import Footer2 from '../component/Footer2';
import { ComponentToPrint } from '../component/ComponentToPrint';
const PosPage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState<any>([])
  const [totalAmount, setTotalAmount] = useState<Number>(0);
  const toastOptions = {
    autoClose: 400,
    pauseOnHover: true,
  }
  const fectProduct = async () => {
    setIsLoading(true);
    const result = await axios.get('product')
    setProducts(await result.data)
    setIsLoading(false)
  }
  const addProductToCard = async (product: any) => {
    let findProductInCard = await cart.find((i: any) => {
      return i.name === product.name
    });
    if (findProductInCard) {
      let newCart: Array<String> = [];
      let newItem: any;

      cart.forEach((cartItem: any) => {
        if (cartItem.name === product.name) {
          newItem = {
            ...cartItem,
            quantity: cartItem.quantity + 1,
            totalAmount: cartItem.price * (cartItem.quantity + 1)
          }
          newCart.push(newItem);
        } else {
          newCart.push(cartItem);
        }
      });
      setCart(newCart);
      toast(`Berhasil Pesan ${newItem.name}`, toastOptions)
    } else {
      let addingProduct = {
        ...product,
        'quantity': 1,
        'totalAmount': product.price,
      }
      setCart([...cart, addingProduct])
      toast(`Berhasil Pesan ${product.name}`, toastOptions)
    }
  }
  const removeProduct = async (product: any) => {
    const newCart = cart.filter((cartItem: any) => cartItem.name !== product.name);
    setCart(newCart);
  }
  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'Print Struk',
  })
  useEffect(() => {
    setIsLoading(true)
    setTimeout(() => {
      fectProduct();
    }, 5000);
  }, [])
  useEffect(() => {
    let newTotalAmount = 0;
    cart.forEach((icart: any) => {
      newTotalAmount = newTotalAmount + parseInt(icart.totalAmount);
    });
    setTotalAmount(newTotalAmount);
  }, [cart])
  const token = localStorage.getItem('token')
  if (!token) {
    return <Navigate to="/" />
  }
  return (
    <>
      <MainLayout>
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
                    <div className='pos-item px-3 text-center border' onClick={() => addProductToCard(product)}>
                      <img src={product.image} className="img-fluid" alt={product.name} />
                      <p className='text-product'>{product.name}</p>
                    </div>
                  </div>
                )}
              </div>}
          </div>
          <div className='col-lg-4'>
            <div style={{ display: "none" }}>
              <ComponentToPrint cart={cart} totalAmount={totalAmount} ref={componentRef} />
            </div>
            <div className='table-responsive bg-dark' id='table-menu'>
              <table className='table table-responsive table-dark table-hover'>
                <thead>
                  <tr>
                    <td>Nama</td>
                    <td>Harga</td>
                    <td>Pesanan</td>
                    <td>Total</td>
                    <td>Tindakan</td>
                  </tr>
                </thead>
                <tbody>
                  {
                    cart ? cart.map((cardProduct: any, key: any) => <tr key={key}>
                      <td>{cardProduct.name}</td>
                      <td>{cardProduct.price}</td>
                      <td className='qty'>{cardProduct.quantity}</td>
                      <td>{cardProduct.totalAmount}</td>
                      <td>
                        <button className='btn btn-danger btn-sm' onClick={() => removeProduct(cardProduct)}>Hapus</button>
                      </td>
                    </tr>)
                      : 'No item in cart'}
                </tbody>
              </table>
              <h2 className='px-2 text-white' id='text-TotalAmount'>total pembayaran: Rp {Number(totalAmount)}</h2>
            </div>
            <div className='mt-3'>
              {
                totalAmount !== 0 ? <div>
                  <button className='btn btn-primary btn-lg' id='btn-buy' onClick={handlePrint}> bayar</button>
                </div> : "pesanan anda tidak ada : "
              }
            </div>
          </div>
        </div>
      </MainLayout>
      <Footer2 />
    </>
  )
}

export default PosPage