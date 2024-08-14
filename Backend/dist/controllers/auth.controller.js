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
exports.logout = exports.signup = exports.login = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_model_1 = __importDefault(require("../models/user.model"));
const generateToken_1 = __importDefault(require("../utils/generateToken"));
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send('Login endpoint');
});
exports.login = login;
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { fullname, username, password, confirmPass, gender } = req.body;
        //check for password and Confirm Passwords
        if (confirmPass != password) {
            return res.status(400).json({ message: "Password Dont Match" });
        }
        const user = yield user_model_1.default.findOne({ username: username });
        if (user) {
            res.status(400).json({ message: "user Already exists" });
        }
        //hashing passwordss
        const salt = yield bcryptjs_1.default.genSalt(10);
        const hashedPassword = yield bcryptjs_1.default.hash(password, salt);
        console.log(hashedPassword);
        //assign Randon Profile pic At start
        //https://avatar.iran.liara.run/public/boy
        const boyPfp = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlPfp = `https://avatar.iran.liara.run/public/girl?username=${username}`;
        const newUser = new user_model_1.default({
            fullname,
            username,
            password: hashedPassword,
            gender,
            profilePic: gender === "male" ? boyPfp : girlPfp
        });
        if (newUser) {
            (0, generateToken_1.default)(newUser._id, res);
            yield newUser.save(); //save New User To Database
            res.status(201).json({ message: "User Created Successfully",
                hashedPassword,
                _id: newUser._id
            });
        }
        else {
            res.status(400).json({ message: "NO new User" });
        }
    }
    catch (error) {
        res.status(500);
    }
});
exports.signup = signup;
const logout = (req, res) => {
    res.send("logout Endpoint");
};
exports.logout = logout;
