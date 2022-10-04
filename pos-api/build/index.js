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
const cors = require('cors');
const exprees = require('express');
const body = require("body-parser");
const { connect } = require('mongoose');
const { success, error } = require("consola");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const config_1 = __importDefault(require("./config"));
const app = exprees();
app.use(cors());
app.use(body.json());
app.use((0, cookie_parser_1.default)());
//user middleware
app.use("/api/users", require('./routes/users'));
const startApp = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield connect(config_1.default.DB_mongodb, { useUnifiedTopology: true, useNewUrlParser: true })
            .then(() => success({ message: `Successfully connection with the database \n ${config_1.default.DB_mongodb}`, badge: true }));
    }
    catch (error) {
        ((error) => error({ message: `unable to connection the database  \n ${error}`, badge: true }));
    }
});
startApp();
app.listen(config_1.default.PORT, () => success({ message: `server started server on port ${config_1.default.PORT}`, badge: true }));
exports.default = startApp;
