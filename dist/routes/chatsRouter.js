"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//importing packages/files
const express_1 = require("express");
const token_js_1 = require("../utilities/token.js");
const validator_js_1 = require("../utilities/validator.js");
const chats_js_1 = require("../controllers/chats.js");
//Variables
let chatsRouter = (0, express_1.Router)();
//Router
chatsRouter.post("/new", (0, validator_js_1.validate)(validator_js_1.chatCompValidator), token_js_1.verifyToken, chats_js_1.genChats);
chatsRouter.get("/all-chats", token_js_1.verifyToken, chats_js_1.sendAllChats);
chatsRouter.delete("/delete", token_js_1.verifyToken, chats_js_1.deleteChats);
//Exporting Router
exports.default = chatsRouter;
