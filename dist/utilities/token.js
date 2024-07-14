"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.createToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createToken = (id, email, expiresIn) => {
    const payload = { id, email };
    const token = jsonwebtoken_1.default.sign(payload, " jwtSecret", {
        expiresIn,
    });
    return token;
};
exports.createToken = createToken;
const verifyToken = async (req, res, next) => {
    const token = req.signedCookies["Cookie_Token"];
    if (!token || token.trim() === "") {
        return res.status(401).json({ message: "Token not Received" });
    }
    return new Promise((resolve, reject) => {
        return jsonwebtoken_1.default.verify(token, " jwtSecret", (err, success) => {
            if (err) {
                reject(err.message);
                return res.status(401).json({ message: "Token Expired" });
            }
            else {
                resolve();
                res.locals.jwtData = success;
                return next();
            }
        });
    });
};
exports.verifyToken = verifyToken;
