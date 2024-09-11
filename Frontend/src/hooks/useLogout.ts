import axios from 'axios';
import { useState } from 'react';
import { useAuthContext } from '../context/AuthContext';

const useLogout = () => {
  // Implement the logic to log out the user
  //loader
  const [loading, setLoading] = useState(false);
  //
  ///logout
  const { setAuthUser } = useAuthContext();

  const logout = async () => {
    setLoading(true);
    try {
      const response = await axios.post('api/auth/logout');

      if (!response) {
        console.log('No response');
      }
      localStorage.removeItem('chat-user');
      setAuthUser(null);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return { loading, logout };
};

export default useLogout;
