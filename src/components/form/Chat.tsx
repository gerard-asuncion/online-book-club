import { useChat } from '../../hooks/useChat';
import { formatTimestamp } from '../../utils/dateUtils';
import type { Message } from '../../types/types';
import type { ChatProps } from '../../types/props';

const Chat = ({ bookRoom }: ChatProps) => {
 
  const { 
    messages, 
    newMessage, 
    setNewMessage, 
    handleSubmit 
  } = useChat({ bookRoom });

  return (
    <div className="flex flex-col justify-between p-5">
      <div className="">
        <h1>Book: {bookRoom.toUpperCase()}</h1>
      </div>
      <div className="py-1">
        {messages.map((message: Message) => (
          <article key={message.id} className="flex justify-between">
            <div className="">
              <span className="font-bold">{message.user}:</span> 
              {message.text}
            </div>
            <div>
              {formatTimestamp(message.createdAt)}
            </div>
          </article>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="new-message-form">
        <input 
          className="new-message-input" 
          placeholder="Type your message here..."
          onChange={(e) => setNewMessage(e.target.value)}
          value={newMessage} 
        />
        <button type="submit" className="send-button">
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;