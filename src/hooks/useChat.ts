import { useState, useEffect } from 'react';
import { 
  addDoc,
  updateDoc,
  getDocs,
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
import { useAppSelector } from '../app/hooks';
import useUserData from './useUserData';
import { selectUserProfileUid, selectUserProfileUsername } from '../features/userProfile/userProfileSelectors';
import { 
  selectCurrentBookId, 
  selectCurrentBookTitle, 
  selectCurrentBookAuthors
} from '../features/currentBook/currentBookSelectors';
import { selectUserProfileStoredBooks } from '../features/userProfile/userProfileSelectors';
import { ChatMessage } from '../classes/ChatMessage';
import type { DocumentData } from 'firebase/firestore';
import type { SentMessage, MessageToFirestore, ChatMessageData } from '../types/messageTypes';
import type { BookItem } from '../types/booksTypes';

const MESSAGES_COLLECTION = import.meta.env.VITE_FIREBASE_DB_COLLECTION_MESSAGES;
const USERS_COLLECTION = import.meta.env.VITE_FIREBASE_DB_COLLECTION_USERS;
const messagesRef: CollectionReference<DocumentData> = collection(db, MESSAGES_COLLECTION);

export const useChat = () => {

  const [messages, setMessages] = useState<SentMessage[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");

  const { addBookToProfile } = useUserData();

  const currentUserUid: string | null = useAppSelector(selectUserProfileUid);
  const currentUsername: string | null = useAppSelector(selectUserProfileUsername);
  const userStoredBooks: BookItem[] = useAppSelector(selectUserProfileStoredBooks);

  const currentBookId: string | null = useAppSelector(selectCurrentBookId);
  const currentBookTitle: string | null = useAppSelector(selectCurrentBookTitle);
  const currentBookAuthors: string[] = useAppSelector(selectCurrentBookAuthors);

  const isStored = userStoredBooks.some(book => book.id === currentBookId);

  useEffect(() => {

    if (!(currentBookId && currentBookTitle && currentBookAuthors)) return;

    markRoomMessagesAsSeen(currentBookId);

    const queryMessages = query(
      messagesRef,
      where("room", "==", currentBookId),
      orderBy("createdAt")
    );

    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
      const arrMessages: SentMessage[] = [];
      snapshot.forEach((doc) => {
        arrMessages.push({ ...doc.data() as Omit<SentMessage, 'id'>, id: doc.id });
      });
      setMessages(arrMessages);
    });
    
    return () => unsubscribe();

  }, [currentBookId]);

  const addChatToHistorial = async (currentRoom: string | null) => {
    
    if (!currentUserUid) {
      console.error("Error: L'usuari no està autenticat.");
      return;
    }
    if (!currentRoom) {
      console.error("Error: El missatge no conté l'id de l'usuari.");
      return;
    }
    try {
      const userDocRef = doc(db, USERS_COLLECTION, currentUserUid);
      await updateDoc(userDocRef, {
        userChatHistorial: arrayUnion(currentRoom) 
      });

    } catch (error) {
      console.error("Error en actualitzar l'historial de xat:", error);
    }
  }

  const handleSubmitMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if(newMessage.trim() === '' || !auth.currentUser) return;

    const messageData: ChatMessageData = {
      text: newMessage,
      username: currentUsername,
      userId: currentUserUid,
      room: currentBookId,
      bookTitle: currentBookTitle,
      bookAuthors: currentBookAuthors
    };

    const newChatMessage: ChatMessage = new ChatMessage(
                                          messageData.text, 
                                          messageData.username, 
                                          messageData.userId, 
                                          messageData.room, 
                                          messageData.bookTitle, 
                                          messageData.bookAuthors
                                        );
    const dataToFirestore: MessageToFirestore = newChatMessage.toFirestoreObject();

    await addDoc(messagesRef, {
      text: dataToFirestore.text,
      createdAt: dataToFirestore.createdAt,
      username: dataToFirestore.username,
      userId: dataToFirestore.userId,
      room: dataToFirestore.room,
      bookTitle: dataToFirestore.bookTitle,
      bookAuthors: dataToFirestore.bookAuthors,
      seenBy: dataToFirestore.seenBy
    });

    setNewMessage('');
    addChatToHistorial(currentBookId);

  } ; 

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>): void => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); 
      handleSubmitMessage(e); 
    }
  };

  const markRoomMessagesAsSeen = async (currentBookId: string | null) => {
    const currentUserUid = auth.currentUser?.uid;
    if (!(currentUserUid && currentBookId)) return;

    const queryRoom = query(messagesRef, where("room", "==", currentBookId));
    const batch = writeBatch(db);

    try {
      const querySnapshot = await getDocs(queryRoom);

      querySnapshot.forEach((document) => {
        const messageDocRef = doc(db, MESSAGES_COLLECTION, document.id);
        batch.update(messageDocRef, {
          seenBy: arrayUnion(currentUserUid)
        });
      });   
      await batch.commit();
    } catch (error) {
      console.error("Error en marcar missatges com a llegits (batch): ", error, 4000);
    }
  };

  const handleAddCurrentBook = async () => { 
    if(!currentBookId) return;
    addBookToProfile(currentBookId);
  }

  return {
    messages,
    newMessage,
    setNewMessage,
    handleSubmitMessage,
    handleKeyDown,
    handleAddCurrentBook,
    isStored
  };
};