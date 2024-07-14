"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//importing packages/files
const express_1 = require("express");
const userRouter_js_1 = __importDefault(require("./userRouter.js"));
const chatsRouter_js_1 = __importDefault(require("./chatsRouter.js"));
let starRouter = (0, express_1.Router)();
//middlewares
starRouter.use("/user", userRouter_js_1.default); // Domain/star/user => userRouter.js
starRouter.use("/chat", chatsRouter_js_1.default); // Domain/star/chat=> chatsRouter.js
//Exporting Router
exports.default = starRouter;
