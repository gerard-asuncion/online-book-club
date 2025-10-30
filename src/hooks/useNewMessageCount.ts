import { useState, useEffect } from 'react';
import {
    query,
    where,
    collection,
    onSnapshot,
    Timestamp,
    CollectionReference,
} from 'firebase/firestore';
import { auth, db } from '../firebase-config';
import type { DocumentData } from 'firebase/firestore';
import type { UseNewMessageCountProps } from '../types/props';

const MESSAGES_COLLECTION = import.meta.env.VITE_FIREBASE_DB_COLLECTION;
const messagesRef: CollectionReference<DocumentData> = collection(db, MESSAGES_COLLECTION);

export const getLastViewedKey = (bookRoomName: string) => `lastViewed_${bookRoomName}`;

const useNewMessageCount = ({ bookRoomName }: UseNewMessageCountProps) => {

    const [count, setCount] = useState<number>(0);

    useEffect(() => {
        if(!auth.currentUser || !bookRoomName) return;

        const lastViewedStorage = localStorage.getItem(getLastViewedKey(bookRoomName));

        const lastViewedTimestamp = lastViewedStorage 
            ? Timestamp.fromDate(new Date(lastViewedStorage)) 
            : new Date(0);

        const queryMessages = query(
            messagesRef,
            where("room", "==", bookRoomName),
            where("createdAt", ">", lastViewedTimestamp),
        );

        const unsubscribe = onSnapshot(queryMessages, (snapshot) => {

            const currentUserId = auth.currentUser?.uid;

            const newMessages = snapshot.docs.filter(doc => {
                return doc.data().userId !== currentUserId;
            });

            setCount(newMessages.length);

        });

        return () => unsubscribe();

    }, [bookRoomName]); 

    return { count, setCount };
};

export default useNewMessageCount;