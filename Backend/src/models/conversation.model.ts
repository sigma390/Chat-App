import mongoose from "mongoose";

interface Conversation{
    participants : any[],
    messages : any[]
}

const conversationSchema = new mongoose.Schema<Conversation>({
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    messages: [{type : mongoose.Schema.Types.ObjectId, ref:"Message" , default:[] }]
},{timestamps: true});

const Conversation  = mongoose.model("Conversation", conversationSchema);
export default Conversation;