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
Object.defineProperty(exports, "__esModule", { value: true });
const router = require('express').Router();
const auth_1 = require("../utils/auth");
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
module.exports = router;
