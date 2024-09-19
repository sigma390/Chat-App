import { create } from 'zustand';

const useConversation = create((set) => ({
  selectedConversation: null,
  setSelectedConversation: (selectedConversation) =>
    set({ selectedConversation }),
  messages: [],
  setMessages: (messages) => set({ messages }), //accept message , and Set new Messages
}));

export default useConversation;
