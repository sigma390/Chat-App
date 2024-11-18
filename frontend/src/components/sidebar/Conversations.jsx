import useGetConversations from '../../hooks/useGetConversations';
import { getRandomEmoji } from '../../utils/emojis';
import Conversation from './Conversation';

const Conversations = () => {
  // const { loading, conversations } = useGetConversations();
  const { data: Conversations, isLoading } = useGetConversations();
  console.log(Conversations);
  return (
    <div className='py-2 flex flex-col overflow-auto'>
      {Conversations.data.map((conversation, idx) => (
        <Conversation
          key={conversation._id}
          conversation={conversation}
          emoji={getRandomEmoji()}
          lastIdx={idx === Conversations.data.length - 1}
        />
      ))}

      {isLoading ? (
        <span className='loading loading-spinner mx-auto'></span>
      ) : null}
    </div>
  );
};
export default Conversations;
