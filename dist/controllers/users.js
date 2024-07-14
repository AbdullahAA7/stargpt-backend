"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutUser = exports.verifyUser = exports.userLogin = exports.userSignup = exports.getAllUsers = void 0;
const bcrypt_1 = require("bcrypt");
const userModel_js_1 = __importDefault(require("../models/userModel.js"));
const token_js_1 = require("../utilities/token.js");
const getAllUsers = async (req, res, next) => {
    try {
        //Getting all users
        let users = await userModel_js_1.default.find();
        return res.status(200).json({ message: "OK", users });
    }
    catch (error) {
        console.log(error);
    }
};
exports.getAllUsers = getAllUsers;
const userSignup = async (req, res, next) => {
    try {
        //Signup the new user
        const { name, email, password } = req.body;
        const exsistingUser = await userModel_js_1.default.findOne({ email });
        if (exsistingUser) {
            return res.send("user already exists");
        }
        const Password = await (0, bcrypt_1.hash)(password, 10);
        const user = new userModel_js_1.default({ name, email, password: Password });
        await user.save();
        // creating token and storing cookies for user
        res.clearCookie("Cookie_Token", {
            path: "/",
            domain: "localhost",
            httpOnly: true,
            signed: true,
        });
        const token = (0, token_js_1.createToken)(user._id.toString(), user.email, "7d");
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        res.cookie("Cookie_Token", token, {
            path: "/",
            domain: "localhost",
            expires,
            httpOnly: true,
            signed: true,
        });
        return res.status(201).json({
            message: "Signup successful",
            name: user.name,
            email: user.email,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: "ERROR", cause: error.message });
    }
};
exports.userSignup = userSignup;
const userLogin = async (req, res, next) => {
    try {
        //login the exsisting user
        let { email, password } = req.body;
        const user = await userModel_js_1.default.findOne({ email });
        if (!user) {
            return res.status(401).send("User not Registered");
        }
        let isPassword = await (0, bcrypt_1.compare)(password, user.password);
        if (!isPassword) {
            return res.status(400).send("Incorrect Password");
        }
        // //creating token and storing cookies for user
        res.clearCookie("Cookie_Token", {
            path: "/",
            domain: "localhost",
            httpOnly: true,
            signed: true,
        });
        const token = (0, token_js_1.createToken)(user._id.toString(), user.email, "7d");
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        res.cookie("Cookie_Token", token, {
            path: "/",
            domain: "localhost",
            expires,
            httpOnly: true,
            signed: true,
        });
        return res.status(200).json({
            message: "Login successful",
            name: user.name,
            email: user.email,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: "ERROR", cause: error.message });
    }
};
exports.userLogin = userLogin;
const verifyUser = async (req, res, next) => {
    try {
        const user = await userModel_js_1.default.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).send("User not Registered");
        }
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("Permission didn't match ");
        }
        return res.status(200).json({
            message: "OK",
            name: user.name,
            email: user.email,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: "ERROR", cause: error.message });
    }
};
exports.verifyUser = verifyUser;
const logoutUser = async (req, res, next) => {
    try {
        const user = await userModel_js_1.default.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).send("User not found");
        }
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("Permission didn't match ");
        }
        res.clearCookie("Cookie_Token", {
            path: "/",
            domain: "localhost",
            httpOnly: true,
            signed: true,
        });
        return res.status(200).json({
            message: "Login successful",
            name: user.name,
            email: user.email,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: "ERROR", cause: error.message });
    }
};
exports.logoutUser = logoutUser;
