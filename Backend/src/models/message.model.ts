import mongoose from "mongoose";

interface Message { 
    senderId: any,
    recieverId : any,
    messageText: string,
    timestamp: Date
}

const messageSchema = new mongoose.Schema<Message>({
    senderId: { type: mongoose.Schema.ObjectId, required: true, ref:"User" },
    recieverId: {type: mongoose.Schema.ObjectId, required: true, ref:"User" },
    messageText: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
})

const Message = mongoose.model("Message", messageSchema);
export default Message;