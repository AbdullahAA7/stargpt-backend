"use strict";
//importing packages/files
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_js_1 = __importDefault(require("./app.js"));
const connect_js_1 = require("./DB/connect.js");
//Variables
let PORT = process.env.PORT || 3000;
//Connection & listenners
app_js_1.default.listen(PORT, () => {
    console.log(`App is litening on ${PORT}`);
});
(0, connect_js_1.connectDB)().then(() => {
    console.log("Connected to database ");
});
