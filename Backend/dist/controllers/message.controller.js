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
const conversation_model_1 = __importDefault(require("../models/conversation.model"));
const message_model_1 = __importDefault(require("../models/message.model"));
// Middleware or route handler for sending a message
const sendMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { messageText } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;
        // Find or create a conversation between users
        let conversation = yield conversation_model_1.default.findOne({
            participants: { $all: [senderId, receiverId] }
        });
        if (!conversation) {
            conversation = yield conversation_model_1.default.create({
                participants: [senderId, receiverId]
            });
        }
        // Create and save the new message
        const newMessage = new message_model_1.default({
            senderId: senderId,
            recieverId: receiverId,
            messageText: messageText
        });
        yield newMessage.save();
        // Push the new message to the conversation's messages array
        conversation.messages.push(newMessage._id);
        yield conversation.save();
        return res.status(200).json({ newMessage });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.default = sendMessage;
