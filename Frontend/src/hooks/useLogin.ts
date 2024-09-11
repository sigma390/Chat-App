import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { z } from 'zod';
import { useAuthContext } from '../context/AuthContext';
import { loginSchema } from './Zod schema/zod';

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();
  const login = async (username: string, password: string) => {
    try {
      loginSchema.parse({
        username,
        password,
      });
      console.log('Validation passed');
      setLoading(true);
      try {
        const response = await axios.post('/api/auth/login', {
          username,
          password,
        });
        const data = response.data;
        // Handle success and navigate to home page
        if (data.error) {
          toast.error(data.error);
        }
        //if user exists and Pass matches
        //set USER AT local strioarge
        localStorage.setItem('chat-user', JSON.stringify(data));
        setAuthUser(data);
      } catch (error) {
        toast.error((error as Error).message);
        // Handle error
      } finally {
        setLoading(false);
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.errors.forEach((e) => toast.error(e.message));
      }
    }
  };
  return { loading, login };
};

export default useLogin;
