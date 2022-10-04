import React from 'react'
import Datetime from './Datatime';
export const ComponentToPrint = React.forwardRef((props: any, ref: any) => {
  const { cart, totalAmount } = props
  return (
    <div ref={ref} className="p-5">
      <p className='text-center'>POS CAFE</p>
      <table className='table'>
        <thead>
          <tr>
            <td>name</td>
            <td>pesanan</td>
            <td>harga</td>
            <td>Total</td>
            <td>Tanggal</td>
          </tr>
        </thead>
        <tbody>
          {
            cart ? cart.map((cardProduct: any, key: string) => <tr key={key}>
              <td>{cardProduct.name}</td>
              <td>{cardProduct.price}</td>
              <td>{cardProduct.quantity}</td>
              <td>{cardProduct.totalAmount}</td>
              <td><Datetime /></td>
            </tr>)
              : ''}
        </tbody>
      </table>
      <h2 className='px-2'>total pembayaran: Rp {Number(totalAmount)}</h2>
    </div>
  );
});