"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.disCsonnectDB = exports.connectDB = void 0;
const mongoose_1 = require("mongoose");
let MONGODB_URL = process.env.MONGODB_URL || "mongodb://localhost:27017/ChatBot";
async function connectDB() {
    try {
        await (0, mongoose_1.connect)(MONGODB_URL);
    }
    catch (error) {
        console.log(error);
        throw new Error("Could not Connect To MongoDB");
    }
}
exports.connectDB = connectDB;
async function disCsonnectDB() {
    try {
        await (0, mongoose_1.disconnect)();
    }
    catch (error) {
        console.log(error);
        throw new Error("Could not Disconnect From MongoDB");
    }
}
exports.disCsonnectDB = disCsonnectDB;
