import mongoose from 'mongoose';

interface IMessage {
  senderId: mongoose.Types.ObjectId;
  receiverId: mongoose.Types.ObjectId; // Corrected spelling
  messageText: string;
}

const messageSchema = new mongoose.Schema<IMessage>(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    }, // Corrected spelling
    messageText: { type: String, required: true }, // Ensure messageText is a required string
  },
  { timestamps: true }
);

const Message = mongoose.model('Message', messageSchema);
export default Message;
