import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';
import authService from '../services/authService';

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const loginMutation = useMutation({
    mutationFn: (credentials) => authService.post('/login', credentials),
    onSuccess: (response) => {
      const userData = response.data;
      localStorage.setItem('chat-user', JSON.stringify(userData));
      setAuthUser(userData);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const login = async (username, password) => {
    const success = handleInputErrors(username, password);
    console.log(username);
    if (!success) return;
    setLoading(true);

    loginMutation.mutate(JSON.stringify({ username, password }));
  };

  return { loading, login };
};
export default useLogin;

function handleInputErrors(username, password) {
  if (!username || !password) {
    toast.error('Please fill in all fields');
    return false;
  }

  return true;
}
