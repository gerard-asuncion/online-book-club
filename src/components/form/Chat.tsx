import { useRef, useLayoutEffect } from 'react';
import { useChat } from '../../hooks/useChat';
import MainContentFrame from '../ui/MainContentFrame';
import TextareaAutosize from 'react-textarea-autosize';
import { displayDate } from '../../utils/dateUtils';
import { detectDeletedUser } from '../../utils/utils';
import { alineateMessages, displayUserName, styleMessages } from '../../utils/classNameUtils';
import type { SentMessage } from "../../types/messageTypes";
import { useAppSelector } from '../../app/hooks';
import { selectCurrentBookTitle } from '../../features/currentBook/currentBookSelectors';
import { selectIsMobile } from '../../features/responsive/responsiveSelectors';
import { auth } from '../../firebase-config';
import { selectUserProfilePremium } from '../../features/userProfile/userProfileSelectors';

const Chat = () => {

  const userProfileUid: string | undefined = auth.currentUser?.uid;

  const currentBookTitle: string | null = useAppSelector(selectCurrentBookTitle);
  const isPremiumUser: boolean = useAppSelector(selectUserProfilePremium);
  const isMobile: boolean = useAppSelector(selectIsMobile);
 
  const { 
    messages,
    newMessage,
    setNewMessage, 
    handleSubmitMessage,
    handleKeyDown,
    handleAddCurrentBook,
    isStored
  } = useChat();

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
            text-xs
            md:text-sm'>Book: {currentBookTitle}</h1>
          {isPremiumUser && !isStored && 
            <button
              className={`
                text-main-color 
                hover:text-white 
                cursor-pointer
                text-xs 
                p-2
                transition-color
                ease-in
                active:text-white
              `}
              onClick={handleAddCurrentBook}
            >
              Store Book in Sidebar
            </button>
          }
        </div>
      </article>
      <section
        ref={scrollerRef} 
        className="
          mx-auto
          w-95/100
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
        {messages.map((message: SentMessage) => (
          <article
            key={message.id}
            className={`
              flex w-full
              ${alineateMessages(userProfileUid, message.userUid)}
            `}
          >
            <div 
              key={message.id} 
              className={`
                  ${styleMessages(userProfileUid, message.userUid)}
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
                  ${displayUserName(userProfileUid, message.userUid, message.username)}           
                  font-bold 
                  sm:text-base 
                  text-sm
                `}>
                  {detectDeletedUser(message.username)}
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
            className="flex-1 p-2 rounded-lg resize-none bg-secondary-color border-main-color border-2 text-white placeholder:text-gray-400 placeholder:italic" 
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