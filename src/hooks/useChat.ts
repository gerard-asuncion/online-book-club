import { useState, useEffect } from 'react';
import { 
  addDoc, 
  serverTimestamp, 
  onSnapshot,
  query,
  where,
  orderBy,
  collection,
  CollectionReference,
  Timestamp
} from 'firebase/firestore';
import { auth, db } from '../firebase-config';
import type { DocumentData } from 'firebase/firestore';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { 
  selectLastViewedDate, 
  selectLastViewedKey, 
  selectUnreadMessagesCount 
} from '../features/bookRoom/bookRoomSelectors';
import { 
  setLastViewedKey, 
  setLastViewedDate,
  setUnreadMessagesCount,
  clearUnreadMessagesCount
} from '../features/bookRoom/bookRoomSlice';
import type { Message } from '../types/types'; 

const MESSAGES_COLLECTION = import.meta.env.VITE_FIREBASE_DB_COLLECTION;
const messagesRef: CollectionReference<DocumentData> = collection(db, MESSAGES_COLLECTION);

export const useChat = (bookRoom: string) => {
  
  const [newMessage, setNewMessage] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);

  const lastViewedKey = useAppSelector(selectLastViewedKey);
  const lastViewedDate = useAppSelector(selectLastViewedDate);
  const unreadMessagesCount = useAppSelector(selectUnreadMessagesCount);

  const lastViewedTimestamp = Timestamp.fromMillis(lastViewedDate);

  const dispatch = useAppDispatch();

  useEffect(() => {

    if (!bookRoom) return;

    dispatch(setLastViewedKey({ lastViewedKey: bookRoom }));
    dispatch(setLastViewedDate({ key: lastViewedKey }));
    
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
        const currentUserId = auth.currentUser?.uid;
        const unreadMessages = snapshot.docs.filter(doc => {
          return doc.data().createdAt > lastViewedTimestamp && doc.data().userId !== currentUserId;
        });
        const totalUnreadMessages = unreadMessages.length;
      // setUnreadMessagesCount(unreadMessages.length);
    });

    return () => unsubscribe();
  }, [bookRoom]);

  const handleSubmitMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if(newMessage.trim() === '' || !auth.currentUser) return;

    await addDoc(messagesRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: auth.currentUser.displayName,
      userId: auth.currentUser.uid,
      room: bookRoom,
    });

    setNewMessage('');
  } ; 

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); 
      handleSubmitMessage(e); 
    }
  };

  return {
    messages,
    newMessage,
    unreadMessagesCount,
    setNewMessage,
    handleSubmitMessage,
    handleKeyDown
  };
};