"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteChats = exports.sendAllChats = exports.genChats = exports.modelName = void 0;
const generative_ai_1 = require("@google/generative-ai");
const userModel_js_1 = __importDefault(require("../models/userModel.js"));
const apiKey = "AIzaSyAVmkHOiqyyx4B6z0kbRsQ-K0N-hX7XLwY";
exports.modelName = "gemini-pro";
const genChats = async (req, res, next) => {
    const { message } = req.body;
    console.log(process.env.COOKIE_SECRET);
    try {
        const user = await userModel_js_1.default.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).json({ message: "User not Registered" });
        }
        const chats = user.chats.map(({ role, content }) => ({ role, content }));
        chats.push({ content: message, role: "user" });
        user.chats.push({ content: message, role: "user" });
        const genAI = new generative_ai_1.GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({
            model: exports.modelName,
        });
        const generationConfig = {
            temperature: 0.9,
            topP: 1,
            topK: 0,
            maxOutputTokens: 2048,
            responseMimeType: "text/plain",
        };
        const safetySettings = [
            {
                category: generative_ai_1.HarmCategory.HARM_CATEGORY_HARASSMENT,
                threshold: generative_ai_1.HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
            },
            {
                category: generative_ai_1.HarmCategory.HARM_CATEGORY_HATE_SPEECH,
                threshold: generative_ai_1.HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
            },
            {
                category: generative_ai_1.HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
                threshold: generative_ai_1.HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
            },
            {
                category: generative_ai_1.HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
                threshold: generative_ai_1.HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
            },
        ];
        const hist = user.chats.map(({ role, content }) => ({
            role: role,
            parts: [{ text: content }],
        }));
        const chatSession = model.startChat({
            generationConfig,
            safetySettings,
            history: hist,
        });
        const result = await chatSession.sendMessage(message);
        user.chats.push({ content: result.response.text(), role: "model" });
        await user.save();
        return res.status(200).json({ chats: user.chats });
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Something went wrong" });
    }
};
exports.genChats = genChats;
const sendAllChats = async (req, res, next) => {
    try {
        const user = await userModel_js_1.default.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).send("User not found");
        }
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("Permission didn't match ");
        }
        return res.status(200).json({
            message: "OK",
            chats: user.chats,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: "ERROR", cause: error.message });
    }
};
exports.sendAllChats = sendAllChats;
const deleteChats = async (req, res, next) => {
    try {
        const user = await userModel_js_1.default.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).send("User not found");
        }
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("Permission didn't match ");
        }
        //@ts-ignore
        user.chats = [];
        await user.save();
        return res.status(200).json({
            message: "OK",
        });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: "ERROR", cause: error.message });
    }
};
exports.deleteChats = deleteChats;
