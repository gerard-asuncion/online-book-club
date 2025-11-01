import { useState, useEffect } from 'react';
import {
    query,
    where,
    collection,
    onSnapshot,
    CollectionReference,
} from 'firebase/firestore';
import { auth, db } from '../firebase-config';
import type { DocumentData } from 'firebase/firestore';
import type { User } from 'firebase/auth';

const MESSAGES_COLLECTION = import.meta.env.VITE_FIREBASE_DB_COLLECTION;
const messagesRef: CollectionReference<DocumentData> = collection(db, MESSAGES_COLLECTION);

const useUnreadCounter = (bookRoom: string, user: User | null) => {

    const [unreadCount, setUnreadCount] = useState<number>(0);
    
    useEffect(() => {

        const currentUserId = auth.currentUser?.uid;

        if (!currentUserId || !bookRoom) {
            setUnreadCount(0);
            return;
        }

        const queryMessages = query(
            messagesRef, 
            where("room", "==", bookRoom)
        );

        const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
            
            const unreadMessages = snapshot.docs.filter(doc => {
                const seenBy = doc.data().seenBy || [currentUserId];
                return !seenBy.includes(currentUserId);
            });

            setUnreadCount(unreadMessages.length);
        });

        return () => unsubscribe();

    }, [bookRoom, user]); 

    return { unreadCount, setUnreadCount };
};

export default useUnreadCounter;