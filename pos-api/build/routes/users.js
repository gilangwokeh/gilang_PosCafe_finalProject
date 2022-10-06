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
const router = require('express').Router();
const auth_1 = require("../utils/auth");
const order_1 = __importDefault(require("../models/order"));
router.post("/register-admin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield res.set('Access-Control-Allow-Origin', '*');
    yield (0, auth_1.userRegister)(req.body, 'admin', res);
}));
router.post("/register-super-admin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield res.set('Access-Control-Allow-Origin', '*');
    yield (0, auth_1.userRegister)(req.body, 'super-admin', res);
}));
router.post("/login-admin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield res.set('Access-Control-Allow-Origin', '*');
    yield (0, auth_1.userLogin)(req.body, "admin", res);
}));
router.post("/login-super-admin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield res.set('Access-Control-Allow-Origin', '*');
    yield (0, auth_1.userLogin)(req.body, "super-admin", res);
}));
router.post('/addProduct', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, auth_1.addProduct)(req.body, res);
}));
router.get('/user', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, auth_1.getUser)(req.body, res);
}));
router.get('/product', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, auth_1.getProduct)(req.body, res);
}));
router.get('/getIdproduct/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, auth_1.getIdProduct)(req, res);
}));
router.get('/order', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, auth_1.orderMidtrans)(req.body, res);
}));
router.get('/statusOrder/:order_id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    auth_1.coreApi.transaction.status(req.params.order_id)
        .then((statusResponse) => {
        let responseMidtrans = JSON.stringify(statusResponse);
        order_1.default.update({ response_midtrans: responseMidtrans }, {
            where: { id: req.params.order_id }
        })
            .then((data) => {
            res.status(200).json({
                success: true,
                mesagge: "berhasil cek status",
                data: statusResponse
            });
        })
            .catch((err) => {
            res.status(500).json({
                success: false,
                mesagge: "gagal cek status : " + err.message,
                data: []
            });
        });
    });
}));
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, auth_1.deleteItem)(req, res);
}));
router.delete('/user/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, auth_1.deleteUser)(req, res);
}));
router.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, auth_1.ProductUpdate)(res, req);
}));
router.post('/upload', auth_1.upload.single("image"), (req, res) => {
    res.send('single file upload success');
});
router.post('/charge', (req, res) => {
    auth_1.coreApi.charge(req.body)
        .then((chargeResponse) => {
        let dataOrder = {
            id: chargeResponse.order_id,
            tiket_id: req.body.tiket_id,
            nama: req.body.nama,
            response_midtrans: JSON.stringify(chargeResponse)
        };
        order_1.default.create(dataOrder)
            .then((data) => {
            res.status(200).json({
                success: true,
                mesagge: "berhasil order",
                data: data
            });
        })
            .catch((err) => {
            res.status(402).json({
                success: false,
                mesagge: "gagal order : " + err.message,
                data: []
            });
        });
    })
        .catch((err) => {
        res.status(402).json({
            mesagge: "gagal orderan : " + err.message,
            success: false,
        });
    });
});
router.post('/notifikasi', (req, res) => {
    auth_1.coreApi.transaction.notification(req.body)
        .then((statusResponse) => {
        let orderId = statusResponse.order_id;
        let responseMidtrans = JSON.stringify(statusResponse);
        order_1.default.update({ response_midtrans: responseMidtrans }, {
            where: { id: orderId }
        })
            .then((data) => {
            res.status(200).json({
                success: true,
                mesagge: "berhasil notifikasi",
                data: data
            });
        })
            .catch((err) => {
            res.status(500).json({
                success: false,
                mesagge: "gagal notifikasi : " + err.message,
                data: []
            });
        });
    });
});
module.exports = router;
