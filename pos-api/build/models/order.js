"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koneksi_1 = __importDefault(require("../koneksi"));
const sequelize_1 = require("sequelize");
const orders = koneksi_1.default.define('orders', {
    id: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true
    },
    tiket_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    nama: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    response_midtrans: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true
    },
}, {
    timestamp: true,
    freezeTableName: true
});
exports.default = orders;
