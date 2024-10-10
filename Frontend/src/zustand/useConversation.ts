import { create } from 'zustand';

// Define types for conversation and message
interface Conversation {
  _id: string;
  [key: string]: string; // For any other properties the conversation might have
}

interface ConversationState {
  selectedConversation: Conversation | null;
  setSelectedConversation: (selectedConversation: Conversation | null) => void;
  messages: string[];
  setMessages: (messages: string[]) => void;
}

const useConversation = create<ConversationState>((set) => ({
  selectedConversation: null,
  setSelectedConversation: (selectedConversation) =>
    set({ selectedConversation }),
  messages: [],
  setMessages: (messages) => set({ messages }),
}));

export default useConversation;
