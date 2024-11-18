import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import useConversation from '../zustand/useConversation';
const useGetMessages = () => {
  const [loading, setLoading] = useState(null);
  const { messages, setMessages, selectedConversation } = useConversation();

  // const { isLoading } = useQuery({
  //   queryKey: ['messages', selectedConversation?._id],
  //   queryFn: async () => messageService.get(selectedConversation?._id),
  //   onSuccess: (response) => {
  //     console.log(response);
  //     setMessages(response.data);
  //   },
  //   onError: (error) => toast.error(error.message),
  //   refetchInterval: 5000, // refetch every 5 seconds
  // });

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/messages/${selectedConversation._id}`);
        const data = await res.json();
        if (data.error) throw new Error(data.error);
        setMessages(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (selectedConversation?._id) getMessages();
  }, [selectedConversation?._id, setMessages]);

  return { messages, loading };
};
export default useGetMessages;
