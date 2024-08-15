import mongoose from "mongoose";

interface IMessage {
    senderId: mongoose.Types.ObjectId;
    recieverId: mongoose.Types.ObjectId;
    messageText: string;
}

const messageSchema = new mongoose.Schema<IMessage>({
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    recieverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Ensure `recieverId` is required
    messageText: { type: String, required: true }
}, { timestamps: true });

const Message = mongoose.model("Message", messageSchema);
export default Message;
