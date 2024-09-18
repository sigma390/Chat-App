import { create } from 'zustand';

const useConversation = create((set) => ({
  selectedConversation: null,
  setSelectedConversation: (selectedConversation: unknown) =>
    set({ selectedConversation }),
  messages: [],
  setMessages: (messages: unknown) => set({ messages }), //accept message , and Set new Messages
}));

export default useConversation;
