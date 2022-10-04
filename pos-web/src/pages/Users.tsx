import React, { useState, useEffect } from 'react'
import MoonLoader from "react-spinners/MoonLoader";
import axios from 'axios'
import { Navigate } from 'react-router-dom'
import Footer2 from '../component/Footer2'
import MainLayout3 from '../layouts/MainLayout3'
import swal from 'sweetalert'
const Users = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [users, setUsers] = useState([])
  const fectProduct = async () => {
    setIsLoading(true);
    const result = await axios.get('user')
    setUsers(await result.data)
    setIsLoading(false)
  }
  const deleteUsers = async (_id: string) => {
    swal("user", "berhasil di hapus!", "success")
    await fetch(`user/${_id}`, {
      method: 'DELETE'
    })
      .then((result: any) => {
        result.json()
          .then((res: any) => {
            console.warn(res)
            setIsLoading(true)
            setTimeout(() => {
              fectProduct();
            }, 2000);
          })
      })
  }
  useEffect(() => {
    setIsLoading(true)
    setTimeout(() => {
      fectProduct();
    }, 2000);
  }, [])
  const token = localStorage.getItem('token')
  if (!token) {
    return <Navigate to="/" />
  }
  return (
    <>
      <MainLayout3>
        <div className='col-lg-13'>
          {isLoading ? <div>
            <MoonLoader
              color={'black'}
              className='IsLoading2'
              loading={isLoading}
              size={100} />
            <p className='textLoading-users2'>Sedang Memuat...</p>
          </div>
            : <div className='row' id='table-row'>
              <div className="table-responsive">
                <table className='table-user'>
                  <thead>
                    <tr>
                      <th>username</th>
                      <th className='password-user'>Kata sandi</th>
                      <th>role</th>
                      <th>Tindakan</th>
                    </tr>
                  </thead>
                  {users.map((user: any, key: any) =>
                    <tbody>
                      <tr>
                        <td>{user.username}</td>
                        <td className='password-user'>{user.password}</td>
                        <td >{user.role}</td>
                        <td>
                          <button className='btn btn-primary' onClick={() => deleteUsers(user._id)}>Hapus</button>
                        </td>
                      </tr>
                    </tbody>
                  )}
                </table>
              </div>
            </div>}
        </div>
      </MainLayout3>
      <Footer2 />
    </>
  )
}

export default Users