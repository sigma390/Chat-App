"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protectRoute = exports.secret = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = __importDefault(require("../models/user.model"));
exports.secret = process.env.JWT_SECRET;
const protectRoute = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //get token from Cookies
        const token = req.cookies.JWT;
        if (!token) {
            return res.status(401).json({ message: "Not Authenticated !!!" });
        }
        //if theres Token verify using JWT and Find the User in db 
        const decoded = jsonwebtoken_1.default.verify(token, exports.secret);
        if (!decoded) {
            return res.status(401).json({ message: "No token found!!!" });
        }
        const user = yield user_model_1.default.findById(decoded.userId).select("-password");
        //if user not there
        if (!user) {
            return res.status(400).json({ message: "user not found" });
        }
        req.user = user; //authenticated user
        //call next function
        next();
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Not Authenticated !!!" });
    }
});
exports.protectRoute = protectRoute;
