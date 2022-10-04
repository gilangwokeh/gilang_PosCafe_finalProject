const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
import express, { Response, Request } from 'express'
import UserSchema from '../models/User';
import Config from '../config';
import Product from '../models/product';
const multer = require('multer')
import path from 'path';
import Order from '../models/order'
const midtransClient = require('midtrans-client');


const userRegister = async (userDets: any, role: String, res: Response) => {
  try {
    let usernameNotTaken = await (ValidateUsername(userDets.username))
    if (!usernameNotTaken) {
      return res.status(400).json({
        message: "username is already taken,",
        success: false
      }).end()
    }
    if (userDets.username.length >= 20) {
      return res.status(500).json({
        message: "username anda lebih dari 20 kata",
        success: false
      }).end()
    }
    if (userDets.password <= 0) {
      return res.status(400).json({
        message: "password kosong",
        success: false
      }).end()
    }
    const password = await bcrypt.hash(userDets.password, 10);
    const newUser = new UserSchema({
      ...userDets,
      password,
      role
    })
    await newUser.save();
    return res.status(201).json({
      message: "horre! now you are successfully resgistred. Please nor login.",
      success: true
    }).end()
  } catch (error) {
    return res.status(500).json({
      message: "unable to create your account",
      success: false
    }).end()
  }
}
const userLogin = async (userCreds: any, role: String, res: any) => {
  let { username, password } = userCreds;
  const user = await UserSchema.findOne({ username });
  if (username.length <= 0) {
    return res.status(401).json({
      message: "username anda kosong !",
      success: false
    }).end()
  }
  if (!user) {
    return res.status(404).json({
      message: "username anda salah !",
      success: false
    }).end()
  }
  if (user.role !== role) {
    return res.status(403).json({
      message: "kata sandi salah !",
      success: false
    }).end()
  }
  if (password.length <= 0) {
    return res.status(402).json({
      message: "kata sandi anda kosong !",
      success: false
    }).end()
  }
  let isMatch = await bcrypt.compare(password, user.password);
  if (isMatch) {
    let token = jwt.sign(
      {
        user_id: user.id,
        role: user.role,
        username: user.username,
        email: user.email
      }, Config.SECRET, { expiresIn: "1h" }, Config.REFRESH_SECRET);
    let result = {
      username: user.username,
      role: user.role,
      email: user.email,
      token: `Bearer ${token}`,
      expiresIn: "1h"
    }
    return res.status(200)
      .cookie('token', token, ({ maxAge: 50000, httpOnly: true, secure: true, sameTime: true }))
      .json({
        ...result,
        message: "horre! you are now logging.",
        success: true
      }).end()
  } else {
    return res.status(403).json({
      message: "Kata Sandi anda salah !",
      success: false
    }).end()
  }
}


const getUser = async (req: Request, res: Response) => {
  try {
    let getUsers = await UserSchema.find()
    res.status(200).send(getUsers).end()
  } catch (error) {
    res.status(500).json({
      message: "users not found",
      success: false
    }).end()
  }
}
const addProduct = async (userDets: any, res: Response) => {
  try {
    const newProduct = new Product({
      ...userDets,
    })
    await newProduct.save();
    return res.status(201).json({
      message: "horre! now you are successfully add Product",
      success: true
    }).end()
  } catch (error) {
    return res.status(500).json({
      message: "unable to create your account",
      success: false
    }).end()
  }
}
const ValidateUsername = async (username: any) => {
  let user = await UserSchema.findOne({ username })
  return user ? false : true
};
const deleteItem = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id)
    await product.remove()
    res.status(200).json({
      message: "succesfully delete product",
      success: true
    }).end()
  } catch (error) {
    return res.status(500).json({
      message: "error remove id product",
      success: false
    }).end()
  }
}
const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = await UserSchema.findById(req.params.id)
    await user.remove()
    res.status(200).json({
      message: "succesfully delete user",
      success: true
    }).end()
  } catch (error) {
    return res.status(500).json({
      message: "error remove id product",
      success: false
    }).end()
  }
}
const ProductUpdate = async (res: Response, req: Request) => {
  try {
    await Product.findByIdAndUpdate({ _id: req.params.id }, req.body);
    let updatedProduct = await Product.findOne({ _id: req.params.id });
    await res.status(200).send(updatedProduct).end();
  } catch (error) {
    return res.status(404).json({
      message: "error update Product",
      success: false
    }).end()
  }
}
const getIdProduct = async (req: Request, res: Response) => {
  try {
    let result = await Product.findOne({ _id: req.params.id })
    res.status(200).send(result)
  } catch (error) {
    return res.status(404).json({
      message: "error Get id Product",
      success: false
    }).end()
  }
}
const getProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.find()
    res.status(200).send(product).end()
  } catch (error) {
    console.log(error)
  }
}
const fileStorage = multer.diskStorage({
  destination: (req: Request, file: any, cb: any) => {
    cb(null, 'images')
  },
  filename: (req: Request, file: any, cb: any) => {
    cb(null, new Date().toString() + '-' + path.extname(file.originalname))
  }
})
const fileFilter = (res: Response, file: any, cb: any) => {
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
    cb(null, true)
  } else {
    cb(null, false)
  }
}

const upload = multer({ storage: fileStorage, fileFilter: fileFilter })

const coreApi = new midtransClient.CoreApi({
  isProduction: false,
  serverKey: 'SB-Mid-server-ce-L_V2SRMVFIWPhK5pxPA4H',
  clientKey: 'SB-Mid-client-owq088SSL6Uk-O67'
});
const orderMidtrans = async (req: Request, res: Response) => {
  await Order.findAll()
    .then((data: any) => {
      let tampilData = data.map((item: any) => {
        return {
          id: item.id,
          tiket_id: item.tiket_id,
          nama: item.nama,
          response_midtrans: JSON.parse(item.response_midtrans),
          createAt: item.createAt,
          updateAt: item.updateAt
        }
      })
      res.status(200).json({
        mesagge: "berhasil tampil",
        success: true,
        data: tampilData
      })
    })
    .catch((err: Error) => {
      res.status(500).json({
        mesagge: "berhasil tampil" + err.message,
        success: true,
      })
    })
}

export {
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
}