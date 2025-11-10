import * as Sentry from "@sentry/react";
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
  writeBatch,
  type Query
} from 'firebase/firestore';
import { auth, db } from '../firebase-config';
import { useAppSelector } from '../app/hooks';
import useUserData from './useUserData';
import { selectUserProfileUid, selectUserProfileUsername } from '../features/userProfile/userProfileSelectors';
import { 
  selectCurrentBook,
  selectCurrentBookId, 
  selectCurrentBookTitle, 
  selectCurrentBookAuthors
} from '../features/currentBook/currentBookSelectors';
import { selectUserProfileStoredBooks } from '../features/userProfile/userProfileSelectors';
import { ChatMessage } from '../classes/ChatMessage';
import { ChatHistorialError } from '../classes/Errors/CustomErrors';
import type { DocumentData, DocumentReference, QuerySnapshot, WriteBatch } from 'firebase/firestore';
import type { SentMessage, MessageToFirestore, ChatMessageData } from '../types/messageTypes';
import type { BookItem } from '../types/booksTypes';
import type { CurrentBookInitialState } from '../types/redux';

const MESSAGES_COLLECTION: string = import.meta.env.VITE_FIREBASE_DB_COLLECTION_MESSAGES;
const USERS_COLLECTION: string = import.meta.env.VITE_FIREBASE_DB_COLLECTION_USERS;
const messagesRef: CollectionReference<DocumentData> = collection(db, MESSAGES_COLLECTION);

export const useChat = () => {

  const [messages, setMessages] = useState<SentMessage[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");

  const { addBookToProfile } = useUserData();

  const userProfileUid: string | undefined = auth.currentUser?.uid;
  const userProfileUsername: string | null | undefined = auth.currentUser?.displayName;

  const currentUserUid: string | null = useAppSelector(selectUserProfileUid);
  const currentUserUsername: string | null = useAppSelector(selectUserProfileUsername);
  const userStoredBooks: BookItem[] = useAppSelector(selectUserProfileStoredBooks);

  const currentBook: CurrentBookInitialState = useAppSelector(selectCurrentBook);
  const currentBookId: string | null = useAppSelector(selectCurrentBookId);
  const currentBookTitle: string | null = useAppSelector(selectCurrentBookTitle);
  const currentBookAuthors: string[] = useAppSelector(selectCurrentBookAuthors);

  const isStored: boolean = userStoredBooks.some(book => book.id === currentBookId);

  const getUserUid = (): string | undefined => {
    if(userProfileUid){
      return userProfileUid;
    }else if(currentUserUid){
      return currentUserUid;
    }else {
      return undefined;
    }
  }
  const userUid: string | undefined = getUserUid();

  const getUserUsername = (): string | undefined => {
    if(userProfileUsername){
      return userProfileUsername;
    }else if(currentUserUsername){
      return currentUserUsername;
    }else {
      return undefined;
    }
  }
  const userUsername: string | undefined = getUserUsername();

  useEffect(() => {
    
    if (!currentBook) return;

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

  }, [currentBook, currentBookId]);

  const addChatToHistorial = async (currentRoom: string | null) => {
    try {
      if (!userUid) throw new ChatHistorialError("User is not authenticated.");
      if (!currentRoom) throw new ChatHistorialError("Chat message doesn't contain user's Uid");

      const userDocRef = doc(db, USERS_COLLECTION, userUid);
      await updateDoc(userDocRef, {
        userChatHistorial: arrayUnion(currentRoom) 
      });

    } catch (error) {
      Sentry.captureException(error);
      if(import.meta.env.DEV) console.error("Error actualizing user's chat historial:", error);
    }
  }

  const handleSubmitMessage = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    
    if(newMessage.trim() === '' || !auth.currentUser) return;

    const messageData: ChatMessageData = {
      text: newMessage,
      username: userUsername,
      userUid: userUid,
      room: currentBookId,
      bookTitle: currentBookTitle,
      bookAuthors: currentBookAuthors
    };

    const newChatMessage: ChatMessage = new ChatMessage(
                                          messageData.text, 
                                          messageData.username, 
                                          messageData.userUid, 
                                          messageData.room, 
                                          messageData.bookTitle, 
                                          messageData.bookAuthors
                                        );
    const dataToFirestore: MessageToFirestore = newChatMessage.toFirestoreObject();

    await addDoc(messagesRef, {
      text: dataToFirestore.text,
      createdAt: dataToFirestore.createdAt,
      username: dataToFirestore.username,
      userUid: dataToFirestore.userUid,
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

  const markRoomMessagesAsSeen = async (currentBookId: string | null): Promise<void> => {
    const currentUserUid: string | undefined = auth.currentUser?.uid;
    if (!(currentUserUid && currentBookId)) return;

    const queryRoom: Query<DocumentData, DocumentData> = query(messagesRef, where("room", "==", currentBookId));
    const batch: WriteBatch = writeBatch(db);

    try {
      const querySnapshot: QuerySnapshot<DocumentData, DocumentData> = await getDocs(queryRoom);

      querySnapshot.forEach((document) => {
        const messageDocRef: DocumentReference<DocumentData, DocumentData> = 
          doc(db, MESSAGES_COLLECTION, document.id);
        batch.update(messageDocRef, {
          seenBy: arrayUnion(currentUserUid)
        });
      });   
      await batch.commit();
    } catch (error) {
      if(import.meta.env.DEV) console.error("Error marking messages as 'seen' (batch):", error);
    }
  };

  const handleAddCurrentBook = async (): Promise<void> => { 
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