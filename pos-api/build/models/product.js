"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { Schema, model } = require("mongoose");
const productSchema = new Schema({
    name: {
        type: String,
    },
    price: {
        type: String,
    },
    image: {
        type: String
    }
});
const Product = model('product', productSchema);
exports.default = Product;
