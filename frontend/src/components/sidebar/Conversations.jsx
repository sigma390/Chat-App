import useGetConversations from '../../hooks/useGetConversations';
import { getRandomEmoji } from '../../utils/emojis';
import Conversation from './Conversation';

const Conversations = () => {
  const {
    data: conversations,
    isLoading,
    isError,
    error,
  } = useGetConversations();

  if (isLoading) {
    return <span className='loading loading-spinner mx-auto'></span>;
  }

  if (isError) {
    return (
      <div className='error-message'>
        Error: {error?.message || 'Failed to fetch conversations'}
      </div>
    );
  }

  // Ensure that conversations data exists before trying to map over it
  if (!conversations || !Array.isArray(conversations.data)) {
    return <div>No conversations available</div>;
  }

  return (
    <div className='py-2 flex flex-col overflow-auto'>
      {conversations.data.map((conversation, idx) => (
        <Conversation
          key={conversation._id}
          conversation={conversation}
          emoji={getRandomEmoji()}
          lastIdx={idx === conversations.data.length - 1}
        />
      ))}
    </div>
  );
};

export default Conversations;
