"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
//importing packages/files
const express_1 = __importDefault(require("express"));

const starRouter_js_1 = __importDefault(require("./routes/starRouter.js"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
//Variables
let app = (0, express_1.default)();
//middlewares
app.use(
  (0, cors_1.default)({ origin: "http://localhost:5173", credentials: true })
);
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)("cookieSecret"));

app.use("/star", starRouter_js_1.default); // Domain/star => starRouter.js
//we will remove this at the time of deployment
exports.default = app;
