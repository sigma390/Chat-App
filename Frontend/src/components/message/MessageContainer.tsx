// import MessageInput from './MessageInput';
// import Messages from './Messages';

import { useEffect } from 'react';
import useConversation from '../../zustand/useConversation';
import MessageInput from './MessageInpt';
import Messages from './Messages';
import NoChatSelected from './Nochat';

const MessageContainer = () => {
  //global state
  const { selectedConversation, setSelectedConversation } = useConversation();

  //when logout then reset
  useEffect(() => {
    //cleanup funxtion
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);
  return (
    <div className='md:min-w-[450px] flex flex-col'>
      <>
        {/* Header */}

        {!selectedConversation ? (
          <NoChatSelected />
        ) : (
          <>
            <div className='bg-slate-500 px-4 py-2 mb-2 '>
              <div className=' flex items-start'>
                <span className='text-gray-900 font-bold text-'>
                  {selectedConversation.fullname}{' '}
                </span>
              </div>
            </div>

            <Messages />
            <MessageInput />
          </>
        )}
      </>
    </div>
  );
};
export default MessageContainer;
