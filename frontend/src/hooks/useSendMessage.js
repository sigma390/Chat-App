import { useMutation } from '@tanstack/react-query';

import toast from 'react-hot-toast';
import messageService from '../services/messageService';
import useConversation from '../zustand/useConversation';

const useSendMessage = () => {
  //   const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  const sendMessageMutation = useMutation({
    mutationFn: async (message) =>
      messageService.post(`/send/${selectedConversation?._id}`, { message }),
    onSuccess: (response) => {
      setMessages([...messages, response.data]);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const sendMessage = async (message) => {
    try {
      sendMessageMutation.mutate(message);
    } catch (error) {
      toast.error(error.message);
    }

    // try {
    // 	const res = await fetch(`/api/messages/send/${selectedConversation._id}`, {
    // 		method: "POST",
    // 		headers: {
    // 			"Content-Type": "application/json",
    // 		},
    // 		body: JSON.stringify({ message }),
    // 	});
    // 	const data = await res.json();
    // 	if (data.error) throw new Error(data.error);

    // 	setMessages([...messages, data]);
    // } catch (error) {
    // 	toast.error(error.message);
    // } finally {
    // 	setLoading(false);
    // }
  };

  return { sendMessage, loading: sendMessageMutation.isLoading };
};
export default useSendMessage;
