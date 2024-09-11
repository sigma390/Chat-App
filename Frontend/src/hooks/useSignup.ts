import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { z } from 'zod';
import { useAuthContext } from '../context/AuthContext';
import { Inputs } from '../pages/signup/Signup';
import { signupSchema } from './Zod schema/zod';

export const backendBaseUrl = 'http://localhost:5000';

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const signup = async ({
    fullname,
    username,
    password,
    confirmPass,
    gender,
  }: Inputs) => {
    console.log('Signup function called');
    try {
      signupSchema.parse({
        fullname,
        username,
        password,
        confirmPass,
        gender,
      });
      console.log('Validation passed');

      // Prepare data for the backend
      const data = {
        fullname,
        username,
        password,
        confirmPass, // Note: `confirmPass` should not be sent to the backend
        gender,
      };
      console.log('Data to be sent:', data);
      //set Local storage so that We Redirect to Home page
      localStorage.setItem('chat-user', JSON.stringify(data));
      setAuthUser(data);

      setLoading(true);
      console.log('Loading state set to true');

      try {
        const response = await axios.post('/api/auth/signup', data);
        console.log('API response:', response); // Log the API response

        toast.success(response.data.message);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          toast.error(error.response.data.message || 'Something went wrong');
        } else {
          toast.error('Something went wrong');
        }
      } finally {
        setLoading(false);
        console.log('Loading state set to false');
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.errors.forEach((e) => toast.error(e.message));
      }
    }
  };

  return { loading, signup };
};

export default useSignup;
