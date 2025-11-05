import { useState, useEffect } from 'react';
import { 
  addDoc, 
  getDocs,
  serverTimestamp, 
  onSnapshot,
  query,
  where,
  orderBy,
  collection,
  CollectionReference,
  doc,
  arrayUnion,
  writeBatch
} from 'firebase/firestore';
import { auth, db } from '../firebase-config';
import type { DocumentData } from 'firebase/firestore';
import type { Message } from '../types/types';
import { useAppSelector } from '../app/hooks';
import { 
  selectCurrentBookId, 
  selectCurrentBookTitle, 
  selectCurrentBookAuthors
} from '../features/currentBook/currentBookSelectors';

const MESSAGES_COLLECTION = import.meta.env.VITE_FIREBASE_DB_COLLECTION_MESSAGES;
const messagesRef: CollectionReference<DocumentData> = collection(db, MESSAGES_COLLECTION);

export const useChat = () => {

  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");

  const currentBookId: string | null = useAppSelector(selectCurrentBookId);
  const currentBookTitle: string | null = useAppSelector(selectCurrentBookTitle);
  const currentBookAuthors: string[] = useAppSelector(selectCurrentBookAuthors);

  useEffect(() => {

    if (!(currentBookId && currentBookTitle && currentBookAuthors)) return;

    markRoomMessagesAsSeen(currentBookId);

    const queryMessages = query(
      messagesRef,
      where("room", "==", currentBookId),
      orderBy("createdAt")
    );

    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
      const arrMessages: Message[] = [];
      snapshot.forEach((doc) => {
        arrMessages.push({ ...doc.data() as Omit<Message, 'id'>, id: doc.id });
      });
      setMessages(arrMessages);
    });

    return () => unsubscribe();

  }, [currentBookId]);

  const handleSubmitMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if(newMessage.trim() === '' || !auth.currentUser) return;

    await addDoc(messagesRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: auth.currentUser.displayName,
      userId: auth.currentUser.uid,
      room: currentBookId,
      bookTitle: currentBookTitle,
      bookAuthors: currentBookAuthors,
      seenBy: [ auth.currentUser.uid ]
    });

    setNewMessage('');
  } ; 

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>): void => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); 
      handleSubmitMessage(e); 
    }
  };

  const markRoomMessagesAsSeen = async (currentBookId: string | null) => {
    const currentUserId = auth.currentUser?.uid;
    if (!(currentUserId && currentBookId)) return;

    const queryRoom = query(messagesRef, where("room", "==", currentBookId));

    const batch = writeBatch(db);

    try {
      const querySnapshot = await getDocs(queryRoom);

      querySnapshot.forEach((document) => {
        const messageDocRef = doc(db, MESSAGES_COLLECTION, document.id);
        batch.update(messageDocRef, {
          seenBy: arrayUnion(currentUserId)
        });
      });
    
      await batch.commit();

    } catch (error) {
      console.error("Error en marcar missatges com a llegits (batch): ", error, 4000);
    }
  };

  return {
    messages,
    newMessage,
    setNewMessage,
    handleSubmitMessage,
    handleKeyDown
  };
};