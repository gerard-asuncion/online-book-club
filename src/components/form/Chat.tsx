import { useRef, useLayoutEffect } from 'react';
import { useChat } from '../../hooks/useChat';
import MainContentFrame from '../ui/MainContentFrame';
import TextareaAutosize from 'react-textarea-autosize';
import { displayDate } from '../../utils/dateUtils';
import { alineateMessages, displayUserName, styleMessages } from '../../utils/classNameUtils';
import type { Message } from "../../types/types";
import { useAppSelector } from '../../app/hooks';
import { selectCurrentBookTitle } from '../../features/currentBook/currentBookSelectors';
import type { MainContentRouterProps } from '../../types/props';
import { selectIsMobile } from '../../features/responsive/responsiveSelectors';

const Chat = ({ currentUser }: MainContentRouterProps) => {
  
  const currentBookTitle: string | null = useAppSelector(selectCurrentBookTitle);

  const isMobile: boolean = useAppSelector(selectIsMobile);
 
  const { 
    messages,
    newMessage,
    setNewMessage, 
    handleSubmitMessage,
    handleKeyDown 
  } = useChat();

  const userId: string | undefined = currentUser?.uid;

  const scrollerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    scrollerRef.current?.lastElementChild?.scrollIntoView({
      block: "end",
      inline: "nearest"
    });
  }, [messages]);

  return (
    <MainContentFrame>
      <article className="shrink-0 md:flex items-center sm:text-lg w-95/100 mx-auto">
        <div className='flex justify-between items-center w-full px-4 sm:px-12 py-1 lg:py-5'>
          <h1 className='
            text-white
            text-sm
            md:text-base'>Room: {currentBookTitle}</h1>
          <button
            className="
              text-main-color
              text-xs 
              md:text-sm 
              p-2 border-2
              border-default-bg
              md:hover:border-main-color
              md:hover:text-white
              rounded-md
              transition-color
              ease-in
              active:text-white
              cursor-pointer"
            onClick={() => {alert("room deleted")}}
          >
            Save / Remove
          </button>
        </div>
      </article>
      <section
        ref={scrollerRef} 
        className="
          mx-auto
          md:w-95/100
          px-4 
          sm:px-12
          flex-1
          overflow-y-auto
          scrollbar
          flex
          flex-col
          gap-1     
          py-2
        ">
        {messages.map((message: Message) => (
          <article
            key={message.id}
            className={`
              flex w-full
              ${alineateMessages(userId, message.userId)}
            `}
          >
            <div 
              key={message.id} 
              className={`
                  ${styleMessages(userId, message.userId)}
                  flex 
                  flex-col
                  min-w-60/100
                  justify-between 
                  my-2 sm:my-1 p-2 sm:p-3
                  rounded-lg
                `}
              >
              <div className='flex justify-between'>
                <div className={`
                  ${displayUserName(userId, message.userId)}
                  text-main-color            
                  font-bold 
                  sm:text-base 
                  text-sm
                `}>
                  {message.user}
                </div> 
                <div className="text-xs sm:text-sm text-gray-400">{displayDate(message.createdAt, isMobile)}</div>
              </div>
              <div className="text-white">
                {message.text}
              </div>
            </div>
          </article>
        ))}
      </section>
      <div className="shrink-0 md:flex md:justify-center">
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
            bg-default-bg">
          <TextareaAutosize
            className="flex-1 p-2 rounded-lg resize-none bg-white" 
            placeholder="Type your message here..."
            onChange={(e) => setNewMessage(e.target.value)}
            value={newMessage} 
            minRows={2}
            maxRows={6}
            onKeyDown={handleKeyDown}
          />
          <button type="submit" className="font-semibold p-2 md:w-20 bg-main-color text-white rounded-lg cursor-pointer">
            Send
          </button>
       </form>
      </div>
    </MainContentFrame>
  );
};

export default Chat;