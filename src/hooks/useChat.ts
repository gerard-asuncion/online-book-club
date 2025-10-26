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
} from 'firebase/firestore';
import { auth, db } from '../firebase-config'; // Assegura't que el path sigui correcte
import type { Message } from '../types/types'; // La teva interfície de missatge
import type { UseChatProps } from '../types/props'
import type { DocumentData } from 'firebase/firestore'

// Defineix el tipus de les propietats que rebrà el hook

// Defineix la referència de la col·lecció fora del hook per a bones pràctiques
// IMPORTANT: Utilitza el teu tipatge correcte per a Message[] aquí!
const MESSAGES_COLLECTION = import.meta.env.VITE_FIREBASE_DB_COLLECTION;
const messagesRef: CollectionReference<DocumentData> = collection(db, MESSAGES_COLLECTION);


export const useChat = ({ bookRoom }: UseChatProps) => {
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);

  // 1. Lògica per carregar i escoltar missatges (useEffect)
  useEffect(() => {
    if (!bookRoom) return; // Protecció si bookRoom és null/undefined

    const queryMessages = query(
      messagesRef,
      where("room", "==", bookRoom),
      orderBy("createdAt")
    );

    // Tipatge corregit per arrMessages i forçat el cast per a la compatibilitat amb Firestore
    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
      let arrMessages: Message[] = [];
      snapshot.forEach((doc) => {
        // CORRECCIÓ DE TIPATGE: Utilitza el tipus Message forçant el cast
        arrMessages.push({ ...doc.data() as Omit<Message, 'id'>, id: doc.id });
      });
      setMessages(arrMessages);
    });

    return () => unsubscribe();
  }, [bookRoom]); // S'executa cada cop que canvia la sala

  // 2. Lògica per enviar missatges (handleSubmit)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Assegurem que l'usuari estigui autenticat i que hi hagi missatge
    if(newMessage.trim() === '' || !auth.currentUser) return;

    await addDoc(messagesRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: auth.currentUser.displayName,
      userId: auth.currentUser.uid,
      room: bookRoom // Utilitza bookRoom del hook
    });

    setNewMessage('');
  } ; // Dependències per a useCallback

  // 3. Retorna totes les dades i funcions que el component de vista necessita
  return {
    messages,
    newMessage,
    setNewMessage,
    handleSubmit
  };
};