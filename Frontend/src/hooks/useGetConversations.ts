import axios from 'axios'; // Import Axios
import { useEffect, useState } from 'react';

const useGetConversations = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const getConversations = async () => {
      setLoading(true); // Set loading to true before making the request
      try {
        const response = await axios.get('/api/userss'); // Make the GET request using Axios
        setConversations(response.data); // Set the data from the response
      } catch (error) {
        console.error('Failed to fetch conversations:', error);
      } finally {
        setLoading(false); // Always set loading to false after the request completes
      }
    };

    getConversations();
  }, []); // Empty dependency array ensures the effect runs once when the component mounts

  return { loading, conversations }; // Return the loading state and fetched conversations
};

export default useGetConversations;
