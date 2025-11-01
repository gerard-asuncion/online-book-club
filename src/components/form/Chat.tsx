import { useRef, useLayoutEffect } from 'react';
import { useChat } from '../../hooks/useChat';
import MainContentFrame from '../ui/MainContentFrame';
import TextareaAutosize from 'react-textarea-autosize';
import useBookRoom from '../../hooks/useBookRoom';
import { formatTimestamp } from '../../utils/dateUtils';
import type { Message } from "../../types/types";
import { setMessageBackgroundColor } from '../../utils/classNameUtils';

const Chat = () => {

  const { bookRoom } = useBookRoom();
 
  const { 
    messages,
    newMessage,
    setNewMessage, 
    handleSubmitMessage,
    handleKeyDown 
  } = useChat(bookRoom);

  const scrollerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    scrollerRef.current?.lastElementChild?.scrollIntoView({
      block: "end",
      inline: "nearest"
    });
  }, [messages]);

  return (
    <MainContentFrame>
      <article className="shrink-0 md:flex md:justify-center sm:text-lg w-full">
        <div className='flex justify-between items-center md:w-95/100 px-4 sm:px-12 py-5'>
          <h1 className='
            text-white
            text-sm
            md:text-base'>Room: {bookRoom}</h1>
          <button
            className="
              text-white
              text-xs 
              md:text-sm 
              p-2 border-3
              border-gray-900
              hover:border-green-800 
              rounded-md c
              cursor-pointer"
            onClick={() => {}}
          >
            Leave Room
          </button>
        </div>
      </article>
      <section
        ref={scrollerRef} 
        className="
          px-4 
          sm:px-12
          flex-1
          overflow-y-auto
          scrollbar
          md:flex 
          md:flex-col
          md:items-center">
        {messages.map((message: Message) => (
          <article 
            key={message.id} 
            className={`
              ${setMessageBackgroundColor(null)}
              flex 
              flex-col 
              md:w-95/100
              justify-between 
              my-1 p-2 sm:p-3
              rounded-md
            `}>
            <div className='flex justify-between'>
              <div className="font-bold sm:text-base text-sm">{message.user}</div> 
              <div className='text-xs sm:text-sm text-gray-600'>{formatTimestamp(message.createdAt)}</div>
            </div>
            <div className=''>
              {message.text}
            </div>
          </article>
        ))}
      </section>
      <div className='md:flex md:justify-center'>
        <form 
          onSubmit={handleSubmitMessage} 
          className="
            shrink-0 
            flex
            space-x-2
            px-4 
            sm:px-12
            md:w-95/100
            py-5 
            bg-gray-900">
          <TextareaAutosize
            className="flex-1 p-2 rounded-lg resize-none bg-white" 
            placeholder="Type your message here..."
            onChange={(e) => setNewMessage(e.target.value)}
            value={newMessage} 
            minRows={2}
            maxRows={6}
            onKeyDown={handleKeyDown}
          />
          <button type="submit" className="font-semibold p-2 md:w-20 bg-green-800 text-white rounded-lg cursor-pointer">
            Send
          </button>
       </form>
      </div>
    </MainContentFrame>
  );
};

export default Chat;