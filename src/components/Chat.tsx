import { useChat } from '../hooks/useChat'; // Ajusta el path
import type { Message } from '../types/types'; // Necessari per al tipatge del map
import type { ChatProps } from '../types/props';

const Chat = ({ bookRoom }: ChatProps) => {
  // 1. Crida el hook i desestructura els valors retornats
  const { 
    messages, 
    newMessage, 
    setNewMessage, 
    handleSubmit 
  } = useChat({ bookRoom });

  return (
    <div className="chat-app">
      <div className="header">
        <h1>Welcome to: {bookRoom.toUpperCase()}</h1>
      </div>
      <div className="messages">
        {/* El map utilitza l'array 'messages' del hook */}
        {messages.map((message: Message) => (
          <div key={message.id} className="message">
            <span className="user">{message.user}:</span> 
            {message.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="new-message-form">
        <input 
          className="new-message-input" 
          placeholder="Type your message here..."
          // Les funcions de gestió d'estat i l'estat venen del hook
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