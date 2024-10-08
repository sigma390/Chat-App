import express, { Request, Response } from 'express';
import Conversation from '../models/conversation.model';
import Message from '../models/message.model';
import User from '../models/user.model';

// Middleware or route handler for sending a message
const sendMessage = async (req: any, res: Response) => {
  try {
    const { message } = req.body;

    console.log(`this is messaage test ${message}`);
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    // Find or create a conversation between users
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    // Create and save the new message
    const newMessage = new Message({
      senderId: senderId,
      receiverId: receiverId,
      messageText: message,
    });
    await newMessage.save();

    // Push the new message to the conversation's messages array
    conversation.messages.push(newMessage._id);
    await conversation.save();

    return res.status(200).json({ newMessage });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

// get messages Function

export const getMessages = async (req: any, res: Response) => {
  try {
    const { id: userToChatId } = req.params; //from url bar
    const senderId = req.user._id; //that protected Id user , means The person who has Logged in

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate('messages'); //becoz Conversation Model has Array of messages but not text so we used
    //inbuilt method .populate("messages")
    if (!conversation) res.status(200).json([]);
    const messages = conversation?.messages;
    res.status(200).json(messages);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export default sendMessage;
