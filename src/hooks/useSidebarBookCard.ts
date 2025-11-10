import { useState, useEffect } from 'react';
import useUserData from './useUserData';
import useSidebar from './useSidebar';
import useMainContentRouter from './useMainContentRouter';
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
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { clearCurrentBook, setCurrentBook } from "../features/currentBook/currentBookSlice";
import { selectUserProfilePremium } from '../features/userProfile/userProfileSelectors';

const MESSAGES_COLLECTION: string = import.meta.env.VITE_FIREBASE_DB_COLLECTION_MESSAGES;
const messagesRef: CollectionReference<DocumentData> = collection(db, MESSAGES_COLLECTION);

const useSidebarBookCard = (displayedBookId: string | null) => {

    const userProfileUid: string | undefined = auth.currentUser?.uid;

    const isPremiumUser: boolean = useAppSelector(selectUserProfilePremium);

    const [unreadCount, setUnreadCount] = useState<number>(0);

    const { removeBookFromProfile } = useUserData();
    const { hideSidebarInMobile } = useSidebar();
    const { isChat, switchContent } = useMainContentRouter();

    const dispatch = useAppDispatch();
    
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

    const handleBookCardClick = (id: string, title: string, authors: string[], removeMode: boolean) : void => {

        if(removeMode){      
            removeBookFromProfile(id, isPremiumUser);
        } else {
            dispatch(clearCurrentBook());
            dispatch(setCurrentBook({ bookId: id, bookTitle: title, bookAuthors: authors }));
            if(!isChat){
                switchContent("chatRoom");
            };
            hideSidebarInMobile();
        }
    }

    return { unreadCount, setUnreadCount, handleBookCardClick };
};

export default useSidebarBookCard;