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
const { connect } = require('mongoose');
const product_1 = __importDefault(require("./models/product"));
const data_1 = __importDefault(require("./utils/data"));
const { success, error } = require("consola");
const config_1 = __importDefault(require("./config"));
//for input to the database mongoose
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
const importData = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // await getProductController.deleteMany()
        yield product_1.default.insertMany(data_1.default);
        console.log('insert succesFully');
        process.exit();
    }
    catch (error) {
        console.log('error');
        process.exit();
    }
});
importData();
