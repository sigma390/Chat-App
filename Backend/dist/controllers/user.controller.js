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
exports.getUsersForSidebar = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const getUsersForSidebar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const loggedInUserId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id; // Ensure req.user exists
        if (!loggedInUserId)
            return res.status(400).json({ message: 'User not found' });
        const filteredUsers = yield user_model_1.default.find({ _id: { $ne: loggedInUserId } });
        console.log(filteredUsers);
        res.status(200).json(filteredUsers);
    }
    catch (error) {
        console.error(error); // Log error for debugging
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.getUsersForSidebar = getUsersForSidebar;
