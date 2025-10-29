import { useChat } from '../../hooks/useChat';
import { formatTimestamp } from '../../utils/dateUtils';
import AppWindowFrame from '../ui/AppWindowFrame';
import type { Message } from '../../types/types';
import type { OnlyBookRoomProps } from '../../types/props';
import TextareaAutosize from 'react-textarea-autosize';

const Chat = ({ bookRoom }: OnlyBookRoomProps) => {
 
  const { 
    messages, 
    newMessage, 
    setNewMessage, 
    handleSubmit,
    handleKeyDown 
  } = useChat({ bookRoom });

  return (
    <AppWindowFrame>
      <div className="shrink-0 px-4 sm:px-12 py-5 text-lg">
        <h1>Room: {bookRoom}</h1>
      </div>
      <div className="
            px-4 
            sm:px-12 
            flex-1 
            overflow-y-auto
            scrollbar">
        {messages.map((message: Message) => (
          <article key={message.id} className="flex justify-between my-1 p-1 border">
            <div>
              <span className="font-bold">{message.user}: </span> 
              {message.text}
            </div>
            <div>
              {formatTimestamp(message.createdAt)}
            </div>
          </article>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="shrink-0 flex items-end space-x-2 px-4 sm:px-12 py-5 bg-blue-500">
        <TextareaAutosize
          className="flex-1 p-2 border rounded-lg resize-none bg-white" 
          placeholder="Type your message here..."
          onChange={(e) => setNewMessage(e.target.value)}
          value={newMessage} 
          minRows={2}
          maxRows={6}
          onKeyDown={handleKeyDown}
        />
        <button type="submit" className="p-2 bg-blue-500 text-white rounded-lg">
          Send
        </button>
      </form>
    </AppWindowFrame>
  );
};

export default Chat;