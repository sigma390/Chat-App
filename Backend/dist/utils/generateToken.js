"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secret = process.env.JWT_SECRET;
const secuirity = process.env.NODE_ENV === 'production' ? true : false;
const generatejwt = (userId, res) => {
    const token = jsonwebtoken_1.default.sign({ userId }, secret, { expiresIn: '1h' });
    res.cookie("JWT", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000, //milisecs
        httpOnly: true, //prevent xss attacks
        sameSite: "strict", //CSRF Attacks
        secure: secuirity
    });
};
exports.default = generatejwt;
