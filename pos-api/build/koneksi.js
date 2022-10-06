"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const { Sequelize } = require('sequelize');
const config_1 = __importDefault(require("./config"));
const sequelize = new Sequelize(config_1.default.Mysql);
try {
    sequelize.authenticate();
    sequelize.sync({ alter: true });
    console.log('Connection mysql established successfully.');
}
catch (error) {
    console.error('Unable to connect to the database:', error);
}
exports.default = sequelize;
