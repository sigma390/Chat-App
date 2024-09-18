import useGetConversations from '../../hooks/useGetConversations';
import Convo from './Convo';

const Conversations = () => {
  const { loading, conversations } = useGetConversations();
  console.log(conversations);
  return (
    <div className='py-2 flex flex-col overflow-auto'>
      <Convo />
      <Convo />
      <Convo />
      <Convo />
      <Convo />
      <Convo />
    </div>
  );
};
export default Conversations;
