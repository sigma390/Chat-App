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
exports.getMessages = void 0;
const conversation_model_1 = __importDefault(require("../models/conversation.model"));
const message_model_1 = __importDefault(require("../models/message.model"));
// Middleware or route handler for sending a message
const sendMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { message } = req.body;
        console.log(`this is messaage test ${message}`);
        const { id: receiverId } = req.params;
        const senderId = req.user._id;
        // Find or create a conversation between users
        let conversation = yield conversation_model_1.default.findOne({
            participants: { $all: [senderId, receiverId] },
        });
        if (!conversation) {
            conversation = yield conversation_model_1.default.create({
                participants: [senderId, receiverId],
            });
        }
        // Create and save the new message
        const newMessage = new message_model_1.default({
            senderId: senderId,
            receiverId: receiverId,
            messageText: message,
        });
        yield newMessage.save();
        // Push the new message to the conversation's messages array
        conversation.messages.push(newMessage._id);
        yield conversation.save();
        return res.status(200).json({ newMessage });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});
// get messages Function
const getMessages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id: userToChatId } = req.params; //from url bar
        const senderId = req.user._id; //that protected Id user , means The person who has Logged in
        const conversation = yield conversation_model_1.default.findOne({
            participants: { $all: [senderId, userToChatId] },
        }).populate('messages'); //becoz Conversation Model has Array of messages but not text so we used
        //inbuilt method .populate("messages")
        if (!conversation)
            res.status(200).json([]);
        const messages = conversation === null || conversation === void 0 ? void 0 : conversation.messages;
        return res.status(200).json(messages); // Ensure to return after sending response
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.getMessages = getMessages;
exports.default = sendMessage;
