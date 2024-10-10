import axios from 'axios';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import useConversation from '../zustand/useConversation';

const useGetMessages = () => {
  const { setMessages, messages, selectedConversation } = useConversation();
  const [loading, setLoading] = useState(false); // Keep track of loading state

  useEffect(() => {
    const getMessages = async () => {
      // Check if there is a selected conversation
      if (!selectedConversation) {
        return; // No selected conversation, exit early
      }

      setLoading(true); // Set loading to true while fetching messages

      try {
        const res = await axios.get(
          `/api/messages/${selectedConversation._id}`
        );

        // Assuming response data is in res.data
        const { data } = res;

        // Check for errors in response
        if (data.error) throw new Error(data.error);

        // Set messages received from the API
        setMessages(data); // Update messages state with fetched messages
      } catch (error) {
        // Use the AxiosError type to handle errors
        if (axios.isAxiosError(error)) {
          toast.error(error.response?.data?.message || 'An error occurred');
        } else {
          toast.error(
            (error as Error).message || 'An unexpected error occurred'
          );
        }
      } finally {
        setLoading(false); // Reset loading state
      }
    };

    getMessages(); // Call the async function

    // Cleanup function to avoid setting state on unmounted component
    return () => {
      setMessages([]); // Clear messages on unmount or if the conversation changes
    };
  }, [selectedConversation, setMessages]); // Dependency array ensures effect runs when selectedConversation changes
  return { messages, loading };
};

export default useGetMessages;
