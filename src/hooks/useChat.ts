import { useState, useEffect } from 'react';
import useBookRoom from './useBookRoom';
import { 
  addDoc, 
  serverTimestamp, 
  onSnapshot,
  query,
  where,
  orderBy,
  collection,
  CollectionReference,
} from 'firebase/firestore';
import { auth, db } from '../firebase-config';
import type { DocumentData } from 'firebase/firestore';
import type { Message } from '../types/types'; 
import type { UseChatProps } from '../types/props';

// import bookRoomSlice

const MESSAGES_COLLECTION = import.meta.env.VITE_FIREBASE_DB_COLLECTION;
const messagesRef: CollectionReference<DocumentData> = collection(db, MESSAGES_COLLECTION);

export const useChat = ({ bookRoom }: UseChatProps) => {
  
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (!bookRoom) return; 

    const queryMessages = query(
      messagesRef,
      where("room", "==", bookRoom),
      orderBy("createdAt")
    );

    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
      let arrMessages: Message[] = [];
      snapshot.forEach((doc) => {
        arrMessages.push({ ...doc.data() as Omit<Message, 'id'>, id: doc.id });
      });
      setMessages(arrMessages);
    });

    return () => unsubscribe();
  }, [bookRoom]); 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if(newMessage.trim() === '' || !auth.currentUser) return;

    await addDoc(messagesRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: auth.currentUser.displayName,
      userId: auth.currentUser.uid,
      room: bookRoom 
    });

    setNewMessage('');
  } ; 

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); 
      handleSubmit(e); 
    }
  };

  return {
    messages,
    newMessage,
    setNewMessage,
    handleSubmit,
    handleKeyDown
  };
};