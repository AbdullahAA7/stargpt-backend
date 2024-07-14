"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//importing packages/files
const express_1 = require("express");
const users_js_1 = require("../controllers/users.js");
const validator_js_1 = require("../utilities/validator.js");
const token_js_1 = require("../utilities/token.js");
//Variables
let userRouter = (0, express_1.Router)();
//Router
userRouter.get("/", users_js_1.getAllUsers);
userRouter.post("/signup", (0, validator_js_1.validate)(validator_js_1.signupValidator), users_js_1.userSignup);
userRouter.post("/login", (0, validator_js_1.validate)(validator_js_1.loginValidator), users_js_1.userLogin);
userRouter.get("/auth-status", token_js_1.verifyToken, users_js_1.verifyUser);
userRouter.get("/logout", token_js_1.verifyToken, users_js_1.logoutUser);
//Exporting Router
exports.default = userRouter;
