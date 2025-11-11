import { useState, useEffect } from 'react';
import {
    query,
    where,
    collection,
    onSnapshot,
    CollectionReference,
    type DocumentData,
    QueryDocumentSnapshot
} from 'firebase/firestore';
import { auth, db } from '../firebase-config';

const MESSAGES_COLLECTION: string = import.meta.env.VITE_FIREBASE_DB_COLLECTION_MESSAGES;
const messagesRef: CollectionReference<DocumentData> = collection(db, MESSAGES_COLLECTION);

const useUnreadCount = (displayedBookId: string | null) => {

    const userProfileUid: string | undefined = auth.currentUser?.uid;

    const [unreadCount, setUnreadCount] = useState<number>(0);
    
    useEffect(() => {
        if (!userProfileUid || !displayedBookId) {
            setUnreadCount(0);
            return;
        }
        const queryMessages = query(
            messagesRef, 
            where("room", "==", displayedBookId)
        );
        const unsubscribe = onSnapshot(queryMessages, (snapshot) => {            
            const unreadMessages: QueryDocumentSnapshot<DocumentData, DocumentData>[] = snapshot.docs.filter(doc => {
                const seenBy = doc.data().seenBy || [userProfileUid];
                return !seenBy.includes(userProfileUid);
            });
            setUnreadCount(unreadMessages.length);
            console.log("unread count: ", unreadCount)
        });
        return () => unsubscribe();

    }, [displayedBookId, userProfileUid]);

    return { unreadCount, setUnreadCount };
};

export default useUnreadCount;