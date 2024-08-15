"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const messageSchema = new mongoose_1.default.Schema({
    senderId: { type: mongoose_1.default.Schema.ObjectId, required: true, ref: "User" },
    recieverId: { type: mongoose_1.default.Schema.ObjectId, required: true, ref: "User" },
    messageText: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
});
const Message = mongoose_1.default.model("Message", messageSchema);
exports.default = Message;
