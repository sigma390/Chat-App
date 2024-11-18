import { useQuery } from '@tanstack/react-query';

import userService from '../services/userService';

const useGetConversations = () => {
  // Use the useQuery hook to fetch conversations from the backend

  return useQuery({
    queryKey: ['conversations'], // Make sure this key is unique and matches where it's used in the app
    queryFn: () => userService.getAll(''), // This calls the getAll method of authService
    onError: (error) => {
      // Handle error (you can also use a toast notification here)
      console.error('Error fetching conversations:', error.message);
    },
  });
};

export default useGetConversations;
