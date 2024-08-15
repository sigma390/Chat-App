import express, { Request, Response } from "express";
import Conversation from "../models/conversation.model";
import Message from "../models/message.model";
import User from "../models/user.model";

// Middleware or route handler for sending a message
const sendMessage = async (req: any, res: Response) => {
    try {
        const { messageText } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        // Find or create a conversation between users
        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        });

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId]
            });
        }

        // Create and save the new message
        const newMessage = new Message({
            senderId: senderId,
            recieverId: receiverId,
            messageText: messageText
        });
        await newMessage.save();

        // Push the new message to the conversation's messages array
        conversation.messages.push(newMessage._id);
        await conversation.save();

        return res.status(200).json({ newMessage });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export default sendMessage;
