import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';
import useConversation from '../zustand/useConversation';

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  const sendMessage = async (message: string) => {
    if (!selectedConversation) {
      toast.error('No conversation selected');
      return;
    }

    setLoading(true);
    try {
      console.log('Selected Conversation ID:', selectedConversation._id);
      console.log(message);
      const msg = JSON.stringify(message);
      // Send the POST request using Axios
      const { data } = await axios.post(
        `/api/messages/send/${selectedConversation._id}`,
        { message: msg }, // Ensure you're sending the message correctly
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (data.error) {
        throw new Error(data.error);
      }

      // Assuming the response contains a message field
      setMessages([...messages, data.message]);
    } catch (error) {
      // Log the full error response for debugging
      console.error('Error sending message:', error);

      if (axios.isAxiosError(error) && error.response) {
        // Extract the error message from the server response
        const serverMessage =
          error.response.data?.message || 'Unknown server error';
        toast.error(serverMessage);
      } else {
        toast.error((error as Error).message);
      }
    } finally {
      setLoading(false);
    }
  };

  return { loading, sendMessage };
};

export default useSendMessage;
