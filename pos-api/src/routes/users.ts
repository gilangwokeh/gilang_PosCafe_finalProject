import express, { Response, Request, NextFunction, response } from 'express'
const router = require('express').Router();
import {
  userRegister,
  userLogin,
  getUser,
  addProduct,
  deleteItem,
  ProductUpdate,
  getProduct,
  getIdProduct,
  deleteUser,
  upload,
  orderMidtrans,
  coreApi,
} from '../utils/auth'
import Order from '../models/order'

router.post("/register-admin", async (req: Request, res: Response) => {
  await res.set('Access-Control-Allow-Origin', '*');
  await userRegister(req.body, 'admin', res);
})
router.post("/register-super-admin", async (req: Request, res: Response) => {
  await res.set('Access-Control-Allow-Origin', '*');
  await userRegister(req.body, 'super-admin', res);
})
router.post("/login-admin", async (req: Request, res: Response) => {
  await res.set('Access-Control-Allow-Origin', '*');
  await userLogin(req.body, "admin", res);
})
router.post("/login-super-admin", async (req: Request, res: Response) => {
  await res.set('Access-Control-Allow-Origin', '*');
  await userLogin(req.body, "super-admin", res);
})
router.post('/addProduct', async (req: Request, res: Response) => {
  await addProduct(req.body, res)
})
router.get('/user', async (req: Request, res: Response) => {
  await getUser(req.body, res)
})
router.get('/product', async (req: Request, res: Response) => {
  await getProduct(req.body, res)
})
router.get('/getIdproduct/:id', async (req: Request, res: Response) => {
  await getIdProduct(req, res)
})
router.get('/order', async (req: Request, res: Response) => {
  await orderMidtrans(req.body, res)
})
router.get('/statusOrder/:order_id', async (req: Request, res: Response) => {
  coreApi.transaction.status(req.params.order_id)
    .then((statusResponse: any) => {
      let responseMidtrans = JSON.stringify(statusResponse)

      Order.update({ response_midtrans: responseMidtrans }, {
        where: { id: req.params.order_id }
      })
        .then((data: any) => {
          res.status(200).json({
            success: true,
            mesagge: "berhasil cek status",
            data: statusResponse
          })
        })
        .catch((err: Error) => {
          res.status(500).json({
            success: false,
            mesagge: "gagal cek status : " + err.message,
            data: []
          })
        })
    });
})
router.delete('/:id', async (req: Request, res: Response) => {
  await deleteItem(req, res)
})
router.delete('/user/:id', async (req: Request, res: Response) => {
  await deleteUser(req, res)
})
router.put("/:id", async (req: Request, res: Response) => {
  await ProductUpdate(res, req)
});
router.post('/upload', upload.single("image"), (req: Request, res: Response) => {
  res.send('single file upload success')
})
router.post('/charge', (req: Request, res: Response) => {
  coreApi.charge(req.body)
    .then((chargeResponse: any) => {
      let dataOrder = {
        id: chargeResponse.order_id,
        tiket_id: req.body.tiket_id,
        nama: req.body.nama,
        response_midtrans: JSON.stringify(chargeResponse)
      }
      Order.create(dataOrder)
        .then((data: any) => {
          res.status(200).json({
            success: true,
            mesagge: "berhasil order",
            data: data
          })
        })
        .catch((err: Error) => {
          res.status(402).json({
            success: false,
            mesagge: "gagal order : " + err.message,
            data: []
          })
        })
    })
    .catch((err: Error) => {
      res.status(402).json({
        mesagge: "gagal orderan : " + err.message,
        success: false,
      })

    });
})
router.post('/notifikasi', (req: Request, res: Response) => {

  coreApi.transaction.notification(req.body)
    .then((statusResponse: any) => {
      let orderId = statusResponse.order_id;
      let responseMidtrans = JSON.stringify(statusResponse)

      Order.update({ response_midtrans: responseMidtrans }, {
        where: { id: orderId }
      })
        .then((data: any) => {
          res.status(200).json({
            success: true,
            mesagge: "berhasil notifikasi",
            data: data
          })
        })
        .catch((err: Error) => {
          res.status(500).json({
            success: false,
            mesagge: "gagal notifikasi : " + err.message,
            data: []
          })
        })
    });
});
module.exports = router

