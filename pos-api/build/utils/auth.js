"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = exports.deleteUser = exports.getIdProduct = exports.getProduct = exports.ProductUpdate = exports.deleteItem = exports.addProduct = exports.getUser = exports.userLogin = exports.userRegister = void 0;
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const User_1 = __importDefault(require("../models/User"));
const config_1 = __importDefault(require("../config"));
const product_1 = __importDefault(require("../models/product"));
const multer = require('multer');
const path_1 = __importDefault(require("path"));
const userRegister = (userDets, role, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let usernameNotTaken = yield (ValidateUsername(userDets.username));
        if (!usernameNotTaken) {
            return res.status(400).json({
                message: "username is already taken,",
                success: false
            }).end();
        }
        const password = yield bcrypt.hash(userDets.password, 12);
        const newUser = new User_1.default(Object.assign(Object.assign({}, userDets), { password,
            role }));
        yield newUser.save();
        return res.status(201).json({
            message: "horre! now you are successfully resgistred. Please nor login.",
            success: true
        }).end();
    }
    catch (error) {
        return res.status(500).json({
            message: "unable to create your account",
            success: false
        }).end();
    }
});
exports.userRegister = userRegister;
const userLogin = (userCreds, role, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { username, password } = userCreds;
    const user = yield User_1.default.findOne({ username });
    if (username.length <= 0) {
        return res.status(401).json({
            message: "username anda kosong !",
            success: false
        }).end();
    }
    if (!user) {
        return res.status(404).json({
            message: "username anda salah !",
            success: false
        }).end();
    }
    if (user.role !== role) {
        return res.status(403).json({
            message: "kata sandi salah !",
            success: false
        }).end();
    }
    if (password.length <= 0) {
        return res.status(402).json({
            message: "kata sandi anda kosong !",
            success: false
        }).end();
    }
    let isMatch = yield bcrypt.compare(password, user.password);
    if (isMatch) {
        let token = jwt.sign({
            user_id: user.id,
            role: user.role,
            username: user.username,
            email: user.email
        }, config_1.default.SECRET, { expiresIn: "1h" }, config_1.default.REFRESH_SECRET);
        let result = {
            username: user.username,
            role: user.role,
            email: user.email,
            token: `Bearer ${token}`,
            expiresIn: "1h"
        };
        return res.status(200)
            .cookie('token', token, ({ maxAge: 50000, httpOnly: true, secure: true, sameTime: true }))
            .json(Object.assign(Object.assign({}, result), { message: "horre! you are now logging.", success: true })).end();
    }
    else {
        return res.status(403).json({
            message: "Kata Sandi anda salah !",
            success: false
        }).end();
    }
});
exports.userLogin = userLogin;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let getUsers = yield User_1.default.find();
        res.status(200).send(getUsers).end();
    }
    catch (error) {
        res.status(500).json({
            message: "users not found",
            success: false
        }).end();
    }
});
exports.getUser = getUser;
const addProduct = (userDets, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newProduct = new product_1.default(Object.assign({}, userDets));
        yield newProduct.save();
        return res.status(201).json({
            message: "horre! now you are successfully add Product",
            success: true
        }).end();
    }
    catch (error) {
        return res.status(500).json({
            message: "unable to create your account",
            success: false
        }).end();
    }
});
exports.addProduct = addProduct;
const ValidateUsername = (username) => __awaiter(void 0, void 0, void 0, function* () {
    let user = yield User_1.default.findOne({ username });
    return user ? false : true;
});
const deleteItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield product_1.default.findById(req.params.id);
        yield product.remove();
        res.status(200).json({
            message: "succesfully delete product",
            success: true
        }).end();
    }
    catch (error) {
        return res.status(500).json({
            message: "error remove id product",
            success: false
        }).end();
    }
});
exports.deleteItem = deleteItem;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findById(req.params.id);
        yield user.remove();
        res.status(200).json({
            message: "succesfully delete user",
            success: true
        }).end();
    }
    catch (error) {
        return res.status(500).json({
            message: "error remove id product",
            success: false
        }).end();
    }
});
exports.deleteUser = deleteUser;
const ProductUpdate = (res, req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield product_1.default.findByIdAndUpdate({ _id: req.params.id }, req.body);
        let updatedProduct = yield product_1.default.findOne({ _id: req.params.id });
        yield res.status(200).send(updatedProduct).end();
    }
    catch (error) {
        return res.status(404).json({
            message: "error update Product",
            success: false
        }).end();
    }
});
exports.ProductUpdate = ProductUpdate;
const getIdProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let result = yield product_1.default.findOne({ _id: req.params.id });
        res.status(200).send(result);
    }
    catch (error) {
        return res.status(404).json({
            message: "error Get id Product",
            success: false
        }).end();
    }
});
exports.getIdProduct = getIdProduct;
const getProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield product_1.default.find();
        res.status(200).send(product).end();
    }
    catch (error) {
        console.log(error);
    }
});
exports.getProduct = getProduct;
const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toString() + '-' + path_1.default.extname(file.originalname));
    }
});
const fileFilter = (res, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
};
const upload = multer({ storage: fileStorage, fileFilter: fileFilter });
exports.upload = upload;
