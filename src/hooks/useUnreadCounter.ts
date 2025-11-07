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
import { db } from '../firebase-config';
import { useAppSelector } from '../app/hooks';
import { selectUserProfileUid } from '../features/userProfile/userProfileSelectors';

const MESSAGES_COLLECTION: string = import.meta.env.VITE_FIREBASE_DB_COLLECTION_MESSAGES;
const messagesRef: CollectionReference<DocumentData> = collection(db, MESSAGES_COLLECTION);

const useUnreadCounter = (displayedBookId: string | null) => {

    const userProfileUid: string | null = useAppSelector(selectUserProfileUid);

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
        });

        return () => unsubscribe();

    }, [displayedBookId, userProfileUid]); 

    return { unreadCount, setUnreadCount };
};

export default useUnreadCounter;